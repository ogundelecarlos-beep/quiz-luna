/* ==========================================================================
   QUIZ DE QUÍMICA — lógica do quiz (sem dependências)
   ========================================================================== */
(function () {
  'use strict';

  const Q = window.QUESTOES || [];
  const ILUS = window.ILUSTRACOES || {};
  const LETRAS = ['A', 'B', 'C', 'D', 'E'];
  const NIVEIS = {
    facil: { nome: 'Fácil', cls: 'facil', cor: 'var(--facil)' },
    media: { nome: 'Média', cls: 'media', cor: 'var(--media)' },
    dificil: { nome: 'Difícil', cls: 'dificil', cor: 'var(--dificil)' }
  };
  const CORES = ['#d6303b', '#1d7fd6', '#238c52', '#d98200', '#8e44ad', '#0e9a9a'];

  const $ = (s) => document.querySelector(s);
  const el = {
    inicio: $('#tela-inicio'), quiz: $('#tela-quiz'), fim: $('#tela-fim'),
    nomes: $('#nomes-equipes'), chkTimer: $('#chk-timer'), chkEmb: $('#chk-embaralhar'), chkEmbFim: $('#chk-embaralhar-fim'),
    progTxt: $('#prog-txt'), progBar: $('#prog-bar'), barra: $('#barra'), selo: $('#selo'), tema: $('#tema'), acertos: $('#acertos'),
    timer: $('#timer'), timerTxt: $('#timer-txt'), timerBar: $('#timer-bar'), btnPausa: $('#btn-pausa'),
    placar: $('#placar'), ilus: $('#ilus'), enunciado: $('#enunciado'), opcoes: $('#opcoes'),
    fb: $('#feedback'), fbTitulo: $('#fb-titulo'), fbResp: $('#fb-resp'), fbExp: $('#fb-exp'), award: $('#award'), awardBtns: $('#award-btns'),
    prev: $('#btn-prev'), conf: $('#btn-conf'), next: $('#btn-next'), toast: $('#toast')
  };

  /* ---------- estado ---------- */
  const S = {
    equipes: 0, nomes: [], timer: false, segs: 30, embaralhar: false,
    i: 0, resp: [], ordem: [], pontos: [], tid: null, fim: 0, restante: 0, pausado: false
  };

  /* ---------- utilidades ---------- */
  function trySet(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignorado */ } }
  function tryGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }

  let toastId = null;
  function toast(msg) {
    el.toast.textContent = msg;
    el.toast.classList.add('show');
    clearTimeout(toastId);
    toastId = setTimeout(() => el.toast.classList.remove('show'), 2400);
  }

  function mostrar(tela) {
    [el.inicio, el.quiz, el.fim].forEach((t) => (t.hidden = t !== tela));
    const h = tela.querySelector('h1, h2');
    if (h) h.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }
  const telaAtual = () => (!el.quiz.hidden ? 'quiz' : !el.fim.hidden ? 'fim' : 'inicio');

  function embaralhar(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }

  /* ---------- tema e tela cheia ---------- */
  function aplicaTema(t) { document.documentElement.setAttribute('data-theme', t); }
  (function iniciaTema() {
    const salvo = tryGet('quiz-tema');
    if (salvo === 'dark' || salvo === 'light') aplicaTema(salvo);
  })();
  $('#btn-tema').addEventListener('click', () => {
    const atual = document.documentElement.getAttribute('data-theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const novo = atual === 'dark' ? 'light' : 'dark';
    aplicaTema(novo); trySet('quiz-tema', novo);
  });
  function telaCheia() {
    if (document.fullscreenElement) document.exitFullscreen();
    else if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen().catch(() => toast('Seu navegador não permitiu a tela cheia.'));
    else toast('Tela cheia não disponível neste navegador.');
  }
  $('#btn-tela-cheia').addEventListener('click', telaCheia);

  /* ---------- tela inicial ---------- */
  $('#total-perguntas').textContent = Q.length;

  function desenhaNomes() {
    const n = S.equipes;
    el.nomes.innerHTML = '';
    el.nomes.hidden = n < 1;
    for (let k = 0; k < n; k++) {
      const wrap = document.createElement('label');
      wrap.className = 'nome';
      wrap.style.borderLeftColor = CORES[k];
      const inp = document.createElement('input');
      inp.type = 'text'; inp.maxLength = 22; inp.value = S.nomes[k] || ('Equipe ' + (k + 1));
      inp.setAttribute('aria-label', 'Nome da equipe ' + (k + 1));
      inp.addEventListener('input', () => (S.nomes[k] = inp.value));
      wrap.appendChild(inp);
      el.nomes.appendChild(wrap);
    }
  }
  document.querySelectorAll('input[name="equipes"]').forEach((r) =>
    r.addEventListener('change', () => { S.equipes = parseInt(r.value, 10); desenhaNomes(); }));

  el.chkTimer.addEventListener('change', () => {
    document.querySelectorAll('input[name="tempo"]').forEach((r) => (r.disabled = !el.chkTimer.checked));
  });
  el.chkEmb.addEventListener('change', () => (el.chkEmbFim.checked = el.chkEmb.checked));
  el.chkEmbFim.addEventListener('change', () => (el.chkEmb.checked = el.chkEmbFim.checked));

  function leConfig() {
    S.equipes = parseInt(document.querySelector('input[name="equipes"]:checked').value, 10);
    S.timer = el.chkTimer.checked;
    S.segs = parseInt(document.querySelector('input[name="tempo"]:checked').value, 10);
    S.embaralhar = el.chkEmbFim.checked || el.chkEmb.checked;
    const inputs = el.nomes.querySelectorAll('input');
    S.nomes = [];
    for (let k = 0; k < S.equipes; k++) S.nomes.push(((inputs[k] && inputs[k].value) || '').trim() || 'Equipe ' + (k + 1));
  }

  function comecar() {
    S.embaralhar = el.chkEmb.checked;
    leConfig();
    S.i = 0;
    S.resp = Q.map(() => ({ sel: null, ok: null, feito: false, tempo: false }));
    S.ordem = Q.map(() => (S.embaralhar ? embaralhar([0, 1, 2, 3, 4]) : [0, 1, 2, 3, 4]));
    S.pontos = Q.map(() => new Set());
    el.placar.hidden = S.equipes < 1;
    mostrar(el.quiz);
    desenhaPergunta();
  }
  $('#btn-comecar').addEventListener('click', comecar);

  /* ---------- pergunta ---------- */
  const idxCorreta = (q) => LETRAS.indexOf(q.correta);
  const totalAcertos = () => S.resp.filter((r) => r.ok).length;

  function desenhaPergunta() {
    const q = Q[S.i], r = S.resp[S.i], n = Q.length, nv = NIVEIS[q.nivel] || NIVEIS.facil;
    el.progTxt.textContent = 'Pergunta ' + (S.i + 1) + ' de ' + n;
    el.progBar.style.width = ((S.i + 1) / n * 100) + '%';
    el.barra.setAttribute('aria-valuemax', n); el.barra.setAttribute('aria-valuenow', S.i + 1);
    el.selo.textContent = nv.nome; el.selo.className = 'selo ' + nv.cls;
    el.tema.textContent = q.tema || '';

    const fn = ILUS[q.ilustracao];
    el.ilus.style.animation = 'none'; void el.ilus.offsetWidth; el.ilus.style.animation = '';
    el.ilus.innerHTML = fn ? fn() : '<p style="padding:2rem;text-align:center">Ilustração não encontrada: ' + String(q.ilustracao) + '</p>';

    el.enunciado.textContent = q.enunciado;
    desenhaOpcoes();
    desenhaFeedback();
    desenhaControles();
    desenhaPlacar();
    iniciaTimer();
  }

  function desenhaOpcoes() {
    const q = Q[S.i], r = S.resp[S.i], ord = S.ordem[S.i], correta = idxCorreta(q);
    el.opcoes.innerHTML = '';
    ord.forEach((orig, k) => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'opcao'; b.style.setProperty('--i', k);
      b.setAttribute('role', 'radio');
      b.setAttribute('aria-checked', String(r.sel === k));
      b.setAttribute('aria-label', 'Alternativa ' + LETRAS[k] + ': ' + q.alternativas[orig]);
      b.dataset.k = k;
      const l = document.createElement('span'); l.className = 'letra'; l.textContent = LETRAS[k]; l.setAttribute('aria-hidden', 'true');
      const t = document.createElement('span'); t.className = 'texto'; t.textContent = q.alternativas[orig];
      b.append(l, t);
      if (r.feito) {
        b.setAttribute('aria-disabled', 'true');
        if (orig === correta) { b.classList.add('correta'); b.append(marca('✓ Correta')); b.setAttribute('aria-checked', String(r.sel === k)); }
        else if (r.sel === k) { b.classList.add('errada'); b.append(marca('✗ Marcada')); }
      }
      b.addEventListener('click', () => escolhe(k));
      el.opcoes.appendChild(b);
    });
  }
  function marca(txt) { const s = document.createElement('span'); s.className = 'marca'; s.textContent = txt; return s; }

  function escolhe(k) {
    const r = S.resp[S.i];
    if (r.feito || k < 0 || k > 4) return;
    r.sel = k;
    desenhaOpcoes(); desenhaControles();
    const b = el.opcoes.children[k]; if (b) b.focus({ preventScroll: true });
  }

  function confirmar(porTempo) {
    const r = S.resp[S.i], q = Q[S.i];
    if (r.feito) return;
    if (r.sel === null && !porTempo) { toast('Escolha uma alternativa antes de confirmar.'); return; }
    pararTimer();
    el.timer.hidden = true;
    r.feito = true;
    r.tempo = !!porTempo;
    r.ok = r.sel !== null && S.ordem[S.i][r.sel] === idxCorreta(q);
    desenhaOpcoes(); desenhaFeedback(); desenhaControles(); desenhaPlacar();
    el.next.focus({ preventScroll: true });
    el.fb.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  function desenhaFeedback() {
    const q = Q[S.i], r = S.resp[S.i];
    if (!r.feito) { el.fb.hidden = true; return; }
    el.fb.hidden = false;
    el.fb.className = 'feedback ' + (r.ok ? 'ok' : 'erro');
    el.fbTitulo.textContent = r.ok ? '✓ Resposta correta!' : (r.sel === null ? '⏱ Tempo esgotado!' : '✗ Resposta incorreta');
    const ci = S.ordem[S.i].indexOf(idxCorreta(q));
    el.fbResp.textContent = r.ok ? '' : 'Resposta correta: ' + LETRAS[ci] + ') ' + q.alternativas[idxCorreta(q)];
    el.fbResp.hidden = r.ok;
    el.fbExp.textContent = q.explicacao || '';
    // atribuir ponto a equipes
    el.awardBtns.innerHTML = '';
    el.award.hidden = S.equipes < 1;
    for (let t = 0; t < S.equipes; t++) {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'award-btn'; b.style.setProperty('--cor', CORES[t]);
      b.textContent = '+1 ' + S.nomes[t];
      b.setAttribute('aria-pressed', String(S.pontos[S.i].has(t)));
      b.addEventListener('click', () => {
        const set = S.pontos[S.i];
        set.has(t) ? set.delete(t) : set.add(t);
        b.setAttribute('aria-pressed', String(set.has(t)));
        desenhaPlacar(t);
      });
      el.awardBtns.appendChild(b);
    }
  }

  function desenhaControles() {
    const r = S.resp[S.i], ultima = S.i === Q.length - 1;
    el.prev.disabled = S.i === 0;
    el.conf.hidden = r.feito;
    el.conf.disabled = r.sel === null;
    el.next.hidden = !r.feito;
    el.next.textContent = ultima ? 'Ver resultado →' : 'Próxima →';
  }

  function pontosEquipe(t) { return S.pontos.reduce((s, set) => s + (set.has(t) ? 1 : 0), 0); }

  function desenhaPlacar(pulsa) {
    el.acertos.textContent = '✔ ' + totalAcertos() + ' acerto' + (totalAcertos() === 1 ? '' : 's');
    el.acertos.hidden = S.equipes > 0;
    if (S.equipes < 1) return;
    el.placar.innerHTML = '';
    for (let t = 0; t < S.equipes; t++) {
      const d = document.createElement('div');
      d.className = 'equipe' + (pulsa === t ? ' pulsa' : '');
      d.style.setProperty('--cor', CORES[t]);
      const n = document.createElement('span'); n.className = 'nm'; n.textContent = S.nomes[t];
      const p = document.createElement('span'); p.className = 'pt'; p.textContent = pontosEquipe(t);
      p.setAttribute('aria-label', pontosEquipe(t) + ' ponto(s)');
      d.append(n, p); el.placar.appendChild(d);
    }
  }

  /* ---------- navegação ---------- */
  function proxima() {
    const r = S.resp[S.i];
    if (!r.feito) { toast('Confirme a resposta antes de avançar.'); return; }
    if (S.i < Q.length - 1) { S.i++; desenhaPergunta(); } else finalizar();
  }
  function anterior() { if (S.i > 0) { S.i--; desenhaPergunta(); } }
  el.conf.addEventListener('click', () => confirmar(false));
  el.next.addEventListener('click', proxima);
  el.prev.addEventListener('click', anterior);
  $('#btn-sair').addEventListener('click', () => {
    if (window.confirm('Encerrar o quiz e voltar ao início?')) { pararTimer(); mostrar(el.inicio); }
  });

  /* ---------- cronômetro ---------- */
  function fmt(s) { return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0'); }

  function pararTimer() { clearInterval(S.tid); S.tid = null; }

  function iniciaTimer() {
    pararTimer();
    const r = S.resp[S.i];
    el.timer.hidden = !S.timer || r.feito;
    S.pausado = false; el.btnPausa.textContent = '⏸'; el.btnPausa.setAttribute('aria-label', 'Pausar cronômetro');
    if (!S.timer || r.feito) return;
    S.restante = S.segs * 1000;
    S.fim = Date.now() + S.restante;
    pintaTimer();
    S.tid = setInterval(tique, 200);
  }
  function tique() {
    S.restante = Math.max(0, S.fim - Date.now());
    pintaTimer();
    if (S.restante <= 0) { pararTimer(); toast('Tempo esgotado!'); confirmar(true); }
  }
  function pintaTimer() {
    const s = Math.ceil(S.restante / 1000);
    el.timerTxt.textContent = fmt(s);
    el.timerBar.style.width = (S.restante / (S.segs * 1000) * 100) + '%';
    el.timer.classList.toggle('alerta', s <= 10);
  }
  el.btnPausa.addEventListener('click', () => {
    if (!S.timer || S.resp[S.i].feito) return;
    if (S.pausado) {
      S.pausado = false; S.fim = Date.now() + S.restante; S.tid = setInterval(tique, 200);
      el.btnPausa.textContent = '⏸'; el.btnPausa.setAttribute('aria-label', 'Pausar cronômetro');
    } else {
      S.pausado = true; S.restante = Math.max(0, S.fim - Date.now()); pararTimer();
      el.btnPausa.textContent = '▶'; el.btnPausa.setAttribute('aria-label', 'Retomar cronômetro');
    }
  });

  /* ---------- tela final ---------- */
  function finalizar() {
    pararTimer();
    const n = Q.length, ac = totalAcertos(), pct = Math.round(ac / n * 100);
    $('#fim-pct').textContent = pct + '%';
    $('#fim-frac').textContent = ac + ' de ' + n;
    const msg = pct >= 90 ? 'Excelente! Domínio de Química!' : pct >= 70 ? 'Muito bom! Quase lá!' : pct >= 50 ? 'Bom resultado! Dá para melhorar.' : 'Vamos revisar e tentar de novo!';
    $('#fim-msg').textContent = msg;

    const circ = 2 * Math.PI * 52, v = $('#anel-valor');
    v.style.strokeDasharray = circ; v.style.strokeDashoffset = circ;
    requestAnimationFrame(() => requestAnimationFrame(() => (v.style.strokeDashoffset = circ * (1 - ac / n))));

    const box = $('#fim-niveis'); box.innerHTML = '';
    Object.keys(NIVEIS).forEach((k) => {
      const idx = Q.map((q, i) => (q.nivel === k ? i : -1)).filter((i) => i >= 0);
      if (!idx.length) return;
      const ok = idx.filter((i) => S.resp[i].ok).length;
      const linha = document.createElement('div'); linha.className = 'nivel-linha';
      linha.innerHTML = '<div class="topo"><span></span><span></span></div><div class="trilha"><i></i></div>';
      linha.querySelector('span:first-child').textContent = NIVEIS[k].nome;
      linha.querySelector('span:last-child').textContent = ok + ' de ' + idx.length;
      const barra = linha.querySelector('i'); barra.style.background = NIVEIS[k].cor;
      box.appendChild(linha);
      requestAnimationFrame(() => requestAnimationFrame(() => (barra.style.width = (ok / idx.length * 100) + '%')));
    });

    const ce = $('#fim-equipes');
    ce.hidden = S.equipes < 1;
    if (S.equipes >= 1) {
      const lista = $('#fim-rank'); lista.innerHTML = '';
      const rank = S.nomes.map((nm, t) => ({ nm, t, p: pontosEquipe(t) })).sort((a, b) => b.p - a.p);
      rank.forEach((e, pos) => {
        const li = document.createElement('li'); li.style.setProperty('--cor', CORES[e.t]);
        if (pos === 0 && e.p > 0 && (!rank[1] || rank[1].p < e.p)) li.classList.add('lider');
        const a = document.createElement('span'); a.textContent = e.nm;
        const b = document.createElement('span'); b.className = 'pt'; b.textContent = e.p + (e.p === 1 ? ' ponto' : ' pontos');
        li.append(a, b); lista.appendChild(li);
      });
    }
    el.chkEmbFim.checked = S.embaralhar;
    mostrar(el.fim);
  }

  $('#btn-denovo').addEventListener('click', () => { el.chkEmb.checked = el.chkEmbFim.checked; comecar(); });
  $('#btn-inicio').addEventListener('click', () => mostrar(el.inicio));

  /* ---------- teclado ---------- */
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.altKey || e.metaKey) return;
    const alvo = e.target, tag = alvo && alvo.tagName;
    const emCampo = tag === 'INPUT' && alvo.type === 'text';
    if (emCampo || tag === 'SELECT' || tag === 'TEXTAREA') return;
    const key = e.key;

    if ((key === 'f' || key === 'F') && telaAtual() !== 'quiz') { e.preventDefault(); telaCheia(); return; }

    const tela = telaAtual();
    if (tela === 'inicio') {
      if (key === 'Enter' && tag !== 'BUTTON' && tag !== 'INPUT' && tag !== 'A') { e.preventDefault(); comecar(); }
      return;
    }
    if (tela === 'fim') {
      if (key === 'Enter' && tag !== 'BUTTON') { e.preventDefault(); el.chkEmb.checked = el.chkEmbFim.checked; comecar(); }
      return;
    }
    // ---- tela do quiz ----
    const r = S.resp[S.i];
    if (key === 'f' || key === 'F') { e.preventDefault(); telaCheia(); return; }
    if (/^[1-5]$/.test(key)) { e.preventDefault(); escolhe(parseInt(key, 10) - 1); return; }
    if (/^[a-eA-E]$/.test(key)) { e.preventDefault(); escolhe(LETRAS.indexOf(key.toUpperCase())); return; }
    if (key === 'Enter') {
      e.preventDefault();
      if (!r.feito) confirmar(false); else proxima();
      return;
    }
    if (key === 'ArrowLeft') { e.preventDefault(); anterior(); return; }
    if (key === 'ArrowRight') { e.preventDefault(); proxima(); return; }
    if ((key === 'ArrowDown' || key === 'ArrowUp') && !r.feito && tag === 'BUTTON' && alvo.classList.contains('opcao')) {
      e.preventDefault();
      const k = parseInt(alvo.dataset.k, 10) + (key === 'ArrowDown' ? 1 : -1);
      escolhe(Math.max(0, Math.min(4, k)));
    }
  });

  /* ---------- validação do banco de perguntas (avisos no console) ---------- */
  Q.forEach((q, i) => {
    if (!q.alternativas || q.alternativas.length !== 5) console.warn('Pergunta ' + (i + 1) + ': são necessárias exatamente 5 alternativas.');
    if (LETRAS.indexOf(q.correta) < 0) console.warn('Pergunta ' + (i + 1) + ': campo "correta" deve ser A, B, C, D ou E.');
    if (!ILUS[q.ilustracao]) console.warn('Pergunta ' + (i + 1) + ': ilustração "' + q.ilustracao + '" não encontrada.');
    if (!NIVEIS[q.nivel]) console.warn('Pergunta ' + (i + 1) + ': nivel deve ser "facil", "media" ou "dificil".');
  });
})();
