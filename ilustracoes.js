/* ==========================================================================
   QUIZ DE QUÍMICA — ILUSTRAÇÕES SVG (inline, 100% offline)
   Cada chave abaixo corresponde ao campo "ilustracao" de uma pergunta em
   questions.js. Todas usam a mesma paleta e o mesmo traço (viewBox 400×300).
   ========================================================================== */
(function () {
  'use strict';

  /* ---------- paleta ---------- */
  const K = {
    ink: '#1b3558', water: '#4fb0e8', waterD: '#1f78b4', waterL: '#a9d7f4',
    amber: '#f5a524', red: '#d93a41', redT: '#c62d33', green: '#2fb36d',
    purple: '#6b4fc9', grey: '#8a98a8', lite: '#dcebf8', bg: '#f3f8fd',
    teal: '#14a89c', brown: '#9a6a3a'
  };

  /* ---------- helpers de desenho ---------- */
  const svg = (id, title, desc, body) =>
    `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="${id}-t ${id}-d">` +
    `<title id="${id}-t">${title}</title><desc id="${id}-d">${desc}</desc>` +
    `<rect width="400" height="300" fill="${K.bg}"/>${body}</svg>`;

  const T = (x, y, s, o = {}) =>
    `<text x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" font-size="${o.s || 17}" font-weight="${o.w || 700}" fill="${o.f || K.ink}"` +
    (o.halo ? ` stroke="${K.bg}" stroke-width="5" paint-order="stroke"` : '') +
    (o.mono ? ' font-family="Consolas, monospace"' : '') +
    (o.r ? ` transform="rotate(${o.r} ${x} ${y})"` : '') + `>${s}</text>`;

  const P = (d, o = {}) =>
    `<path d="${d}" fill="${o.fill || 'none'}" stroke="${o.stroke || K.ink}" stroke-width="${o.w || 3}" stroke-linecap="round" stroke-linejoin="round"` +
    (o.dash ? ` stroke-dasharray="${o.dash}"` : '') + (o.op ? ` fill-opacity="${o.op}"` : '') + '/>';

  const L = (x1, y1, x2, y2, o = {}) => P(`M${x1} ${y1}L${x2} ${y2}`, o);

  const C = (x, y, r, fill, o = {}) =>
    `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${o.stroke === undefined ? K.ink : o.stroke}" stroke-width="${o.w || 2.5}"` +
    (o.op ? ` fill-opacity="${o.op}"` : '') + '/>';

  const R = (x, y, w, h, fill, o = {}) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.rx || 0}" fill="${fill}" stroke="${o.stroke === undefined ? K.ink : o.stroke}" stroke-width="${o.w || 3}"/>`;

  const E = (x, y, rx, ry, fill, o = {}) =>
    `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${fill}" stroke="${o.stroke === undefined ? K.ink : o.stroke}" stroke-width="${o.w || 2.5}"/>`;

  const arrow = (x1, y1, x2, y2, c = K.ink, w = 3) => {
    const a = Math.atan2(y2 - y1, x2 - x1), h = 12;
    const p = (da) => `${(x2 - h * Math.cos(a + da)).toFixed(1)},${(y2 - h * Math.sin(a + da)).toFixed(1)}`;
    return `<line x1="${x1}" y1="${y1}" x2="${(x2 - 5 * Math.cos(a)).toFixed(1)}" y2="${(y2 - 5 * Math.sin(a)).toFixed(1)}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/>` +
      `<polygon points="${x2},${y2} ${p(-0.45)} ${p(0.45)}" fill="${c}"/>`;
  };

  /* vidraria: contorno + líquido recortado pelo formato */
  const vessel = (id, d, layers = [], deco = '') => {
    let s = `<clipPath id="${id}"><path d="${d}"/></clipPath><g clip-path="url(#${id})"><path d="${d}" fill="#e8f3fc"/>`;
    layers.forEach((l, i) => {
      const y2 = i + 1 < layers.length ? layers[i + 1].y : 300;
      s += `<rect x="0" y="${l.y}" width="400" height="${y2 - l.y}" fill="${l.c}"/>`;
    });
    return s + deco + `</g><path d="${d}" fill="none" stroke="${K.ink}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>`;
  };

  const bkD = (x, y, w, h) => `M${x} ${y}V${y + h - 12}Q${x} ${y + h} ${x + 12} ${y + h}H${x + w - 12}Q${x + w} ${y + h} ${x + w} ${y + h - 12}V${y}`;
  const tubeD = (x, y, w, h) => `M${x} ${y}V${y + h - w / 2}A${w / 2} ${w / 2} 0 0 0 ${x + w} ${y + h - w / 2}V${y}`;
  const flD = (cx, y, wb, h, nw = 15) => `M${cx - nw} ${y}V${y + h * 0.32}L${cx - wb / 2} ${y + h}H${cx + wb / 2}L${cx + nw} ${y + h * 0.32}V${y}`;
  const volD = (cx, top, cy, r, nw = 12) => {
    const yi = cy - Math.sqrt(r * r - nw * nw);
    return `M${cx - nw} ${top}V${yi.toFixed(1)}A${r} ${r} 0 1 0 ${cx + nw} ${yi.toFixed(1)}V${top}`;
  };

  const rnd = (seed) => () => (seed = (seed * 16807) % 2147483647) / 2147483647;

  /* elétrons distribuídos em uma camada */
  const dots = (cx, cy, r, n, slots, start, fill, dr = 5.5) => {
    let s = '';
    for (let k = 0; k < n; k++) {
      const a = start + (2 * Math.PI * k) / slots;
      s += C((cx + r * Math.cos(a)).toFixed(1), (cy + r * Math.sin(a)).toFixed(1), dr, fill, { stroke: K.ink, w: 1.5 });
    }
    return s;
  };

  /* trecho da tabela periódica (cores neutras, destaque opcional) */
  const periodic = (rows, hi, y0) => {
    const pitch = 21, x0 = 11;
    const present = (p, g) => (p === 1 ? g === 1 || g === 18 : p <= 3 ? g <= 2 || g >= 13 : true);
    let s = '';
    for (let p = 1; p <= rows; p++) {
      for (let g = 1; g <= 18; g++) {
        if (!present(p, g)) continue;
        const h = hi(p, g);
        s += R(x0 + (g - 1) * pitch, y0 + (p - 1) * pitch, 20, 20, h || K.lite, { rx: 3, w: h ? 2.5 : 1.4, stroke: h ? K.ink : '#7f9db8' });
      }
    }
    return s;
  };

  /* balança digital com leitura */
  const scale = (cx, y, reading) =>
    R(cx - 72, y, 144, 32, K.ink, { rx: 6, w: 2 }) +
    R(cx - 38, y + 8, 76, 17, '#c9f1d2', { rx: 3, w: 1.5 }) +
    T(cx, y + 21, reading, { s: 14, mono: true }) +
    R(cx - 58, y - 8, 116, 8, K.grey, { rx: 3, w: 2 });

  /* modelo de CO2 (O–C–O) */
  const co2 = (x, y) =>
    L(x - 13, y, x + 13, y, { w: 3 }) + C(x - 14, y, 7.5, K.red, { w: 1.6 }) + C(x + 14, y, 7.5, K.red, { w: 1.6 }) + C(x, y, 6, '#3b4a5e', { w: 1.6 });

  const I = {};

  /* ======================================================================
     1 — Proveta com pedra (volume)
     ====================================================================== */
  I.volume = () => {
    const cyl = (x, level, idn) => {
      const y = 50, w = 70, h = 200, d = `M${x} ${y}V${y + h}H${x + w}V${y}`;
      let ticks = '';
      for (let i = 1; i < 10; i++) ticks += L(x + w, y + i * 20, x + w - (i % 2 ? 12 : 22), y + i * 20, { w: 2 });
      return vessel(`q1-${idn}`, d, [{ y: y + h * (1 - level), c: K.water }]) + ticks + R(x - 10, y + h, w + 20, 10, K.grey, { rx: 3 });
    };
    return svg('q1', 'Proveta antes e depois de mergulhar uma pedra',
      'Duas provetas graduadas. Na primeira há só água. Na segunda, a mesma água com uma pedra no fundo e o nível mais alto, marcado com um ponto de interrogação.',
      cyl(50, 0.45, 'a') + cyl(250, 0.62, 'b') + E(285, 235, 24, 13, '#8d99a8') +
      E(188, 128, 22, 14, '#8d99a8') + T(188, 102, 'pedra', { s: 16 }) + arrow(138, 165, 240, 165, K.ink) +
      L(250, 160, 346, 160, { dash: '5 5', w: 2, stroke: K.grey }) + arrow(346, 160, 346, 127, K.redT, 3) + T(366, 152, '?', { s: 26, f: K.redT }) +
      T(85, 285, 'Antes') + T(285, 285, 'Depois'));
  };

  /* ======================================================================
     2 — Partículas em três recipientes (estados físicos)
     ====================================================================== */
  I.estados = () => {
    const r = rnd(11);
    const p = (x, y) => C(x, y, 7.5, K.water, { stroke: K.waterD, w: 2 });
    const box = (x) => R(x, 70, 100, 100, '#fff', { rx: 6, w: 2.5 });
    let s1 = '', s2 = '', s3 = '';
    for (let i = 0; i < 5; i++) for (let j = 0; j < 5; j++) s1 += p(44 + i * 18, 84 + j * 18);
    for (let j = 0; j < 4; j++) for (let i = 0; i < 5; i++) s2 += p((163 + i * 18 + (r() - 0.5) * 9).toFixed(1), (158 - j * 16 + (r() - 0.5) * 5).toFixed(1));
    [[288, 92, 8, 6], [335, 84, -6, 8], [312, 124, 9, -5], [352, 150, -8, -6], [292, 152, 7, -8], [338, 116, 8, 7], [320, 160, -7, 5]].forEach(([x, y, dx, dy]) => {
      s3 += L(x, y, x + dx * 1.7, y + dy * 1.7, { w: 2, stroke: K.grey, dash: '3 3' }) + p(x, y);
    });
    return svg('q2', 'Partículas em três recipientes',
      'Três caixas numeradas de 1 a 3 com partículas azuis. Na caixa 1 as partículas estão alinhadas e juntas. Na caixa 2 estão juntas, mas desordenadas, no fundo. Na caixa 3 estão bem afastadas, espalhadas por toda a caixa.',
      box(30) + box(150) + box(270) + R(152, 102, 96, 66, K.waterL, { stroke: 'none' }) +
      s1 + s2 + s3 + R(150, 70, 100, 100, 'none', { rx: 6, w: 2.5 }) +
      T(80, 200, '1', { s: 26 }) + T(200, 200, '2', { s: 26 }) + T(320, 200, '3', { s: 26 }) +
      C(122, 258, 7.5, K.water, { stroke: K.waterD, w: 2 }) + T(136, 264, '= uma partícula da substância', { a: 'start', s: 15, w: 600 }));
  };

  /* ======================================================================
     3 — Panela com água fervendo
     ====================================================================== */
  I.vaporizacao = () => {
    const pot = 'M110 130H290V200Q290 215 275 215H125Q110 215 110 200Z';
    let bub = '';
    [[150, 185, 7], [185, 196, 5], [215, 180, 8], [250, 192, 6], [168, 168, 5], [236, 163, 5]].forEach(([x, y, r]) => (bub += C(x, y, r, '#e8f6ff', { stroke: K.waterD, w: 1.8 })));
    const vap = (x) => P(`M${x} 122q-12 -14 0 -28t0 -28t0 -28`, { stroke: K.grey, w: 3.5, dash: '1 0' });
    const flame = (x) => P(`M${x} 252C${x - 14} 238 ${x - 2} 228 ${x} 218C${x + 14} 230 ${x + 16} 242 ${x} 252Z`, { fill: K.amber, stroke: K.redT, w: 2.5 });
    return svg('q3', 'Panela com água fervendo',
      'Uma panela sobre uma chama, com água borbulhando e vapor subindo em ondas acima dela.',
      vap(160) + vap(200) + vap(240) +
      R(92, 145, 18, 10, K.ink, { rx: 3 }) + R(290, 145, 18, 10, K.ink, { rx: 3 }) +
      vessel('q3-p', pot, [{ y: 150, c: K.water }], bub) +
      flame(150) + flame(200) + flame(250) + R(120, 252, 160, 12, K.grey, { rx: 4 }) +
      T(200, 288, 'Água a 100 °C', { s: 18 }));
  };

  /* ======================================================================
     4 — Tabela periódica: coluna destacada
     ====================================================================== */
  I.tabela_colunas = () => {
    const x = 11 + 15 * 21;
    let sym = '';
    [['O', 2], ['S', 3], ['Se', 4]].forEach(([s, p]) => (sym += T(x + 10, 60 + (p - 1) * 21 + 15, s, { s: 12 })));
    return svg('q4', 'Trecho da tabela periódica com uma coluna destacada',
      'Quatro primeiras linhas da tabela periódica em quadradinhos azuis. Uma coluna vertical, a 16ª, está destacada em amarelo, com os símbolos O, S e Se.',
      periodic(4, (p, g) => (g === 16 ? K.amber : null), 60) + sym +
      P(`M${x - 4} 80V152H${x + 24}V80`, { stroke: K.redT, w: 2.5, dash: '5 4' }) +
      arrow(x + 10, 215, x + 10, 165, K.redT, 3.5) + T(x + 10, 238, 'coluna', { s: 17, f: K.redT }) + T(x + 10, 258, 'destacada', { s: 17, f: K.redT }) +
      T(160, 205, 'Trecho da tabela periódica', { s: 18 }) + T(160, 230, '(1º ao 4º período)', { s: 16, w: 600 }));
  };

  /* ======================================================================
     5 — Átomo com núcleo e eletrosfera
     ====================================================================== */
  I.atomo = () => {
    let orb = '', nuc = '', el = '';
    [42, 72, 102].forEach((r) => (orb += `<circle cx="150" cy="150" r="${r}" fill="none" stroke="#7f9db8" stroke-width="2.5" stroke-dasharray="6 5"/>`));
    [[0, 0], [-9, -8], [9, -8], [-10, 7], [10, 7], [0, -14], [0, 14]].forEach(([dx, dy], i) => (nuc += C(150 + dx, 150 + dy, 9.5, i % 2 ? K.red : '#9aa7b4', { w: 1.8 })));
    [[42, [30, 210]], [72, [100, 190, 280, 10]], [102, [60, 180, 305, 50]]].forEach(([r, angs]) =>
      angs.forEach((a) => (el += C((150 + r * Math.cos((a * Math.PI) / 180)).toFixed(1), (150 + r * Math.sin((a * Math.PI) / 180)).toFixed(1), 6.5, K.water, { stroke: K.waterD, w: 2 }))));
    return svg('q5', 'Modelo de átomo com núcleo e eletrosfera',
      'Um átomo com um pequeno núcleo central, formado por bolinhas vermelhas e cinzas, e três órbitas tracejadas com elétrons azuis. Setas indicam o núcleo e a eletrosfera.',
      orb + nuc + el +
      L(268, 78, 168, 140, { w: 2.5 }) + T(274, 80, 'Núcleo', { a: 'start', s: 20 }) +
      L(268, 226, 222, 228, { w: 2.5 }) + T(274, 232, 'Eletrosfera', { a: 'start', s: 20 }) +
      C(280, 270, 5.5, K.water, { stroke: K.waterD, w: 1.8 }) + T(292, 275, 'elétron', { a: 'start', s: 15, w: 600 }));
  };

  /* ======================================================================
     6 — Átomos de sódio e cloro (camadas)
     ====================================================================== */
  I.na_cl = () => {
    const atom = (cx, sym, valence) =>
      [30, 50, 70].map((r) => `<circle cx="${cx}" cy="145" r="${r}" fill="none" stroke="#7f9db8" stroke-width="2" stroke-dasharray="5 4"/>`).join('') +
      dots(cx, 145, 30, 2, 2, 0.5, K.water) + dots(cx, 145, 50, 8, 8, 0.2, K.water) + dots(cx, 145, 70, valence, 8, 0.6, K.amber) +
      C(cx, 145, 20, '#fff', { w: 2.5 }) + T(cx, 151, sym, { s: 18 });
    return svg('q6', 'Átomos de sódio e de cloro',
      'À esquerda, um átomo de sódio com 11 elétrons: 2, 8 e 1 na última camada. À direita, um átomo de cloro com 17 elétrons: 2, 8 e 7 na última camada. Os elétrons da última camada estão em amarelo.',
      atom(100, 'Na', 1) + atom(300, 'Cl', 7) +
      T(100, 242, 'Sódio (Z = 11)', { s: 17 }) + T(300, 242, 'Cloro (Z = 17)', { s: 17 }) +
      C(110, 275, 6, K.amber, { w: 1.6 }) + T(124, 280, '= elétrons da última camada', { a: 'start', s: 15, w: 600 }));
  };

  /* ======================================================================
     7 — NaOH dissolvendo em água
     ====================================================================== */
  I.base_dissolvendo = () => {
    let pel = '';
    [[150, 232], [180, 236], [212, 233]].forEach(([x, y]) => (pel += R(x - 13, y - 8, 26, 16, '#fff', { rx: 8, w: 2, stroke: K.ink })));
    const ion = (x, y, t, c, tc) => C(x, y, 17, c, { w: 2 }) + T(x, y + 6, t, { s: 15, f: tc || K.ink });
    return svg('q7', 'Hidróxido de sódio dissolvendo em água',
      'Um béquer com água. No fundo há pastilhas brancas de NaOH se dissolvendo. Na água aparecem íons Na+ em azul e íons sem identificação, marcados com interrogação, em vermelho.',
      vessel('q7-b', bkD(110, 100, 180, 150), [{ y: 140, c: K.waterL }],
        pel + ion(245, 200, 'Na⁺', '#cfe7fa') + ion(130, 180, 'Na⁺', '#cfe7fa') + ion(205, 165, '?', '#ffd6d6', K.redT) + ion(262, 160, '?', '#ffd6d6', K.redT) + ion(170, 205, '?', '#ffd6d6', K.redT)) +
      L(100, 100, 120, 100, { w: 3 }) + L(280, 100, 300, 100, { w: 3 }) +
      arrow(40, 238, 132, 234, K.ink, 3) + T(14, 222, 'NaOH(s)', { a: 'start', s: 17 }) +
      arrow(335, 150, 295, 155, K.ink, 3) + T(345, 135, 'H₂O', { s: 17 }) + T(200, 282, 'NaOH dissolvendo em água', { s: 18 }));
  };

  /* ======================================================================
     8 — Balança: antes e depois da reação (Lavoisier)
     ====================================================================== */
  I.lavoisier = () => {
    const flask = (cx, id, layers, deco) =>
      vessel(id, flD(cx, 118, 100, 90, 15), layers, deco) + R(cx - 18, 106, 36, 13, K.brown, { rx: 3, w: 2 });
    let prec = '';
    [[0, 192], [-22, 196], [20, 196], [-10, 190], [10, 190]].forEach(([dx, y]) => (prec += C(280 + dx + 30, y, 5, '#f6df5a', { w: 1.5, stroke: '#a88a00' })));
    return svg('q8', 'Frasco fechado sobre a balança antes e depois da reação',
      'Duas balanças digitais mostram 120,0 g. À esquerda, um frasco fechado com um líquido e um tubo menor de líquido azul. À direita, o mesmo frasco fechado depois da reação, com sólido amarelo no fundo.',
      scale(90, 215, '120,0 g') + flask(90, 'q8-a', [{ y: 168, c: '#cfe7fa' }], R(94, 176, 14, 32, '#6fb7e9', { w: 2 })) +
      scale(310, 215, '120,0 g') + flask(310, 'q8-b', [{ y: 168, c: '#fff3b0' }], prec) +
      arrow(160, 160, 240, 160, K.ink, 4) +
      T(90, 280, 'Antes', { s: 19 }) + T(310, 280, 'Depois', { s: 19 }) + T(200, 140, 'reação', { s: 16, w: 600 }));
  };

  /* ======================================================================
     9 — Açúcar dissolvendo em água
     ====================================================================== */
  I.acucar = () => {
    let mol = '';
    [[150, 215], [170, 195], [205, 205], [190, 170], [230, 190], [160, 160], [245, 225], [215, 150], [135, 190]].forEach(([x, y]) => (mol += C(x, y, 4.5, '#f5a3c3', { w: 1.2, stroke: '#b5497a' })));
    const cube = (x, y) => R(x, y, 22, 22, '#fff', { rx: 3, w: 2 });
    return svg('q9', 'Açúcar se dissolvendo em água',
      'Um béquer com água. No fundo, cubinhos brancos de açúcar começam a se desfazer e pontinhos rosas de açúcar se espalham pela água. Uma haste de vidro mexe a mistura.',
      vessel('q9-b', bkD(120, 90, 160, 160), [{ y: 125, c: K.waterL }], cube(140, 222) + cube(166, 226) + cube(192, 223) + mol) +
      L(232, 55, 190, 232, { w: 6, stroke: K.ink }) + L(232, 55, 190, 232, { w: 3, stroke: '#dff0fc' }) +
      cube(25, 150) + arrow(52, 162, 138, 224, K.ink, 3) + T(38, 205, 'açúcar', { s: 17 }) +
      arrow(335, 160, 285, 160, K.ink, 3) + T(345, 148, 'água', { s: 17 }) + T(200, 285, 'Açúcar + água', { s: 18 }));
  };

  /* ======================================================================
     10 — Funil de decantação (óleo e água)
     ====================================================================== */
  I.funil = () => {
    const body = 'M188 20L212 20L212 42C250 62 262 100 250 140C242 165 222 180 210 195L210 215L190 215L190 195C178 180 158 165 150 140C138 100 150 62 188 42Z';
    return svg('q10', 'Funil de decantação com óleo e água',
      'Um funil de decantação preso a um suporte contém duas camadas: óleo amarelo em cima e água azul embaixo. Abaixo da torneira há um béquer vazio.',
      L(332, 30, 332, 285, { w: 6 }) + R(300, 285, 60, 8, K.grey, { rx: 3, w: 2 }) + L(332, 110, 252, 110, { w: 6 }) +
      vessel('q10-f', body, [{ y: 80, c: '#f9d65a' }, { y: 128, c: K.water }]) +
      R(184, 12, 32, 10, K.brown, { rx: 3, w: 2 }) + R(178, 203, 44, 9, K.amber, { rx: 3, w: 2.5 }) + R(196, 213, 8, 24, '#e8f3fc', { w: 2.5 }) +
      vessel('q10-b', bkD(160, 242, 80, 48), []) +
      arrow(100, 100, 180, 104, K.ink, 3) + T(70, 106, 'óleo', { s: 19 }) + arrow(100, 165, 165, 160, K.ink, 3) + T(70, 172, 'água', { s: 19 }) +
      T(75, 230, 'torneira', { s: 15, w: 600 }) + arrow(115, 224, 175, 208, K.ink, 2.5));
  };

  /* ======================================================================
     11 — Tabela: sódio destacado
     ====================================================================== */
  I.tabela_sodio = () =>
    svg('q11', 'Trecho da tabela periódica com o sódio destacado',
      'Três primeiras linhas da tabela periódica. O elemento sódio, símbolo Na, número atômico 11, está destacado em amarelo na terceira linha, primeira coluna, com uma ficha ampliada.',
      periodic(3, (p, g) => (p === 3 && g === 1 ? K.amber : null), 40) +
      L(140, 195, 28, 107, { w: 3, stroke: K.redT }) +
      R(140, 160, 120, 110, '#fff', { rx: 10, w: 3.5 }) + R(140, 160, 120, 110, K.amber, { rx: 10, w: 3.5 }) + R(148, 168, 104, 94, '#fff', { rx: 6, w: 0, stroke: 'none' }) +
      T(160, 192, '11', { a: 'start', s: 22 }) + T(200, 240, 'Na', { s: 52 }) + T(200, 258, 'sódio', { s: 15, w: 600 }) +
      T(200, 25, 'Trecho da tabela periódica (1º ao 3º período)', { s: 16 }));

  /* ======================================================================
     12 — Experimento de Rutherford
     ====================================================================== */
  I.rutherford = () => {
    let atoms = '';
    for (let y = 70; y <= 230; y += 20) atoms += C(195, y, 3.5, '#8a6a00', { w: 0.5, stroke: 'none' });
    return svg('q12', 'Experimento de Rutherford com lâmina de ouro',
      'Uma fonte emite partículas alfa para a esquerda de uma lâmina fina de ouro. Quase todas atravessam em linha reta até uma tela curva. Uma desvia bastante e outra volta para trás.',
      R(18, 128, 58, 44, '#9aa7b4', { rx: 4, w: 3 }) + T(47, 198, 'Fonte de', { s: 15 }) + T(47, 216, 'partículas α', { s: 15 }) +
      arrow(76, 140, 188, 140, K.waterD, 3) + arrow(76, 150, 188, 150, K.waterD, 3) + arrow(76, 160, 188, 160, K.waterD, 3) +
      R(190, 55, 10, 190, '#f1c232', { w: 2.5 }) + atoms +
      arrow(200, 140, 335, 140, K.waterD, 3) + arrow(200, 150, 335, 150, K.waterD, 3) + arrow(200, 160, 335, 160, K.waterD, 3) +
      arrow(200, 152, 300, 62, K.purple, 3) + arrow(190, 148, 132, 98, K.redT, 3) +
      P('M345 40Q392 150 345 260', { w: 9, stroke: K.green }) +
      T(195, 38, 'Lâmina de ouro', { s: 16 }) + T(330, 285, 'Tela detectora', { s: 16 }));
  };

  /* ======================================================================
     13 — Molécula de H2 (compartilhamento)
     ====================================================================== */
  I.h2 = () =>
    svg('q13', 'Molécula de hidrogênio, H2',
      'Duas nuvens eletrônicas circulares azuis se sobrepõem. Em cada uma há um núcleo marcado H. Na região de sobreposição estão dois elétrons.',
      C(148, 140, 62, K.water, { op: 0.28, w: 3, stroke: K.waterD }) + C(252, 140, 62, K.water, { op: 0.28, w: 3, stroke: K.waterD }) +
      C(148, 140, 15, K.red, { w: 2 }) + T(148, 146, 'H', { s: 17, f: '#fff' }) +
      C(252, 140, 15, K.red, { w: 2 }) + T(252, 146, 'H', { s: 17, f: '#fff' }) +
      C(200, 128, 7, K.amber, { w: 2 }) + C(200, 152, 7, K.amber, { w: 2 }) +
      T(200, 232, 'Molécula de hidrogênio (H₂)', { s: 20 }) +
      T(200, 262, 'H · H  →  H : H', { s: 20, w: 600 }));

  /* ======================================================================
     14 — CO2 borbulhando em água
     ====================================================================== */
  I.co2_agua = () => {
    let bub = '';
    [[205, 208, 6], [226, 196, 7], [212, 182, 5], [224, 168, 6], [205, 156, 4]].forEach(([x, y, r]) => (bub += C(x, y, r, '#fff', { stroke: K.waterD, w: 1.8 })));
    return svg('q14', 'Gás carbônico borbulhando em água',
      'Um cilindro de gás rotulado CO2 está ligado por uma mangueira a um béquer com água. Bolhas saem da ponta da mangueira dentro da água.',
      P('M70 84V48H215V210', { w: 9, stroke: K.ink }) + P('M70 84V48H215V210', { w: 4, stroke: '#dff0fc' }) +
      R(62, 70, 16, 20, K.grey, { rx: 3, w: 2.5 }) + R(40, 98, 60, 152, '#5fa8a0', { rx: 24, w: 3 }) + T(70, 182, 'CO₂', { s: 22, f: '#fff' }) +
      vessel('q14-b', bkD(160, 130, 110, 120), [{ y: 160, c: K.waterL }], bub) +
      arrow(300, 150, 275, 175, K.ink, 3) + T(325, 143, 'água', { s: 18 }) +
      arrow(130, 28, 90, 60, K.ink, 3) + T(160, 24, 'gás CO₂', { s: 18 }));
  };

  /* ======================================================================
     15 — Modelos para balancear N2 + H2 -> NH3
     ====================================================================== */
  I.balanceamento = () => {
    const q = (x) => R(x, 112, 26, 36, '#fff', { rx: 6, w: 2.5, stroke: K.redT }) + T(x + 13, 138, '?', { s: 24, f: K.redT });
    const N = (x, y) => C(x, y, 15, '#4a78d6', { w: 2 });
    const H = (x, y) => C(x, y, 10, '#fff', { w: 2 });
    return svg('q15', 'Modelos moleculares da síntese da amônia',
      'Equação com modelos: uma molécula de N2 (duas bolas azuis), uma de H2 (duas bolas brancas pequenas), uma seta e uma molécula de NH3 (uma bola azul com três brancas). Antes de cada molécula há uma caixa com interrogação para o coeficiente.',
      q(10) + L(58, 130, 88, 130, { w: 3 }) + N(58, 130) + N(88, 130) + T(118, 140, '+', { s: 30 }) +
      q(132) + L(178, 130, 197, 130, { w: 3 }) + H(178, 130) + H(197, 130) +
      arrow(222, 130, 258, 130, K.ink, 4) +
      q(266) + L(345, 130, 345, 98, { w: 3 }) + L(345, 130, 370, 152, { w: 3 }) + L(345, 130, 320, 152, { w: 3 }) +
      N(345, 130) + H(345, 98) + H(370, 152) + H(320, 152) +
      T(73, 195, 'N₂', { s: 22 }) + T(188, 195, 'H₂', { s: 22 }) + T(345, 195, 'NH₃', { s: 22 }) +
      T(200, 255, 'Quais são os coeficientes (?)', { s: 18 }) + T(200, 278, 'que balanceiam a equação?', { s: 18 }));
  };

  /* ======================================================================
     16 — 2 mols de CO2 (frascos)
     ====================================================================== */
  I.mol_co2 = () => {
    const f = (cx, id) =>
      vessel(id, flD(cx, 70, 96, 110, 14), [], co2(cx - 5, 132) + co2(cx - 18, 156) + co2(cx + 14, 160)) + R(cx - 17, 59, 34, 12, K.brown, { rx: 3, w: 2 });
    return svg('q16', 'Dois frascos com um mol de CO2 cada',
      'Dois frascos, cada um com moléculas de CO2 e a legenda 1 mol. Um colchete une os dois com a legenda 2 mol de CO2. À direita, uma caixa pergunta qual é a massa.',
      f(75, 'q16-a') + f(190, 'q16-b') +
      T(75, 208, '1 mol', { s: 19 }) + T(190, 208, '1 mol', { s: 19 }) +
      P('M30 222V234H235V222', { w: 3 }) + T(132, 258, '2 mol de CO₂', { s: 20 }) +
      R(268, 100, 112, 100, '#fff', { rx: 12, w: 3 }) + T(324, 143, 'massa', { s: 20 }) + T(324, 175, '= ? g', { s: 26, f: K.redT }));
  };

  /* ======================================================================
     17 — Balão volumétrico de 500 mL e balança com NaOH
     ====================================================================== */
  I.balao_naoh = () => {
    let pel = '';
    [[78, 224], [96, 227], [114, 224], [87, 216], [105, 217]].forEach(([x, y]) => (pel += E(x, y, 9, 5.5, '#fff', { w: 2 })));
    return svg('q17', 'Preparo de 500 mililitros de solução de NaOH',
      'À esquerda, uma balança com pastilhas de NaOH sobre um vidro de relógio, marcando 20 gramas. À direita, um balão volumétrico com solução azul até a marca de 500 mililitros no gargalo.',
      R(35, 236, 120, 8, K.grey, { rx: 3, w: 2 }) + R(30, 244, 130, 30, K.ink, { rx: 6, w: 2 }) + R(48, 250, 64, 17, '#c9f1d2', { rx: 3, w: 1.5 }) + T(80, 263, '20 g', { s: 14, mono: true }) +
      P('M52 222Q95 244 138 222', { w: 3 }) + pel +
      T(95, 192, 'NaOH', { s: 19 }) + arrow(95, 198, 95, 210, K.ink, 3) +
      arrow(168, 190, 226, 190, K.ink, 4) + T(197, 175, '+ água', { s: 17 }) +
      vessel('q17-v', volD(300, 38, 205, 58), [{ y: 75, c: K.waterL }]) + L(284, 75, 316, 75, { w: 3.5, stroke: K.redT }) +
      T(332, 80, '500 mL', { a: 'start', s: 17 }) + T(95, 293, 'Soluto', { s: 16 }) + T(300, 290, 'Solução', { s: 16 }));
  };

  /* ======================================================================
     18 — Dois tubos de ensaio com indicador universal + escala de pH
     ====================================================================== */
  const PHCOL = ['#d7263d', '#e8412f', '#ef6a2a', '#f58b24', '#f7aa1f', '#f5c518', '#d6d51f', '#7bc043', '#3fb36b', '#1fae9c', '#2a9fd6', '#3b7bd8', '#4f5fd0', '#6a4cc4', '#7d3aa8'];
  I.ph_tubos = () => {
    let sc = '';
    PHCOL.forEach((c, i) => (sc += R(20 + i * 24, 238, 24, 18, c, { w: 1.2 }) + T(32 + i * 24, 274, String(i), { s: 13 })));
    return svg('q18', 'Dois tubos de ensaio com indicador universal',
      'Tubo A com líquido laranja, de pH 3, e tubo B com líquido amarelo, de pH 5, ao lado de uma escala de cores de pH de 0 a 14, do vermelho ao roxo.',
      vessel('q18-a', tubeD(100, 45, 56, 150), [{ y: 100, c: PHCOL[3] }]) + vessel('q18-b', tubeD(244, 45, 56, 150), [{ y: 100, c: PHCOL[5] }]) +
      T(128, 36, 'A', { s: 24 }) + T(272, 36, 'B', { s: 24 }) + T(128, 222, 'pH 3', { s: 21 }) + T(272, 222, 'pH 5', { s: 21 }) +
      sc + T(20, 227, 'ácido', { a: 'start', s: 14, w: 600 }) + T(380, 227, 'básico', { a: 'end', s: 14, w: 600 }));
  };

  /* ======================================================================
     19 — Aparelho de destilação simples
     ====================================================================== */
  I.destilacao = () => {
    const flame = P('M80 214C66 232 72 242 80 250C88 242 94 232 80 214Z', { fill: K.amber, stroke: K.redT, w: 2.5 });
    return svg('q19', 'Aparelho de destilação simples',
      'Um balão com água salgada sobre uma chama, com termômetro na boca. Um tubo leva o vapor a um condensador com água corrente e as gotas caem em um erlenmeyer.',
      flame + R(68, 250, 24, 26, K.grey, { rx: 3, w: 2.5 }) + R(56, 276, 48, 8, K.ink, { rx: 3, w: 2 }) +
      vessel('q19-b', 'M70 70V129A42 42 0 1 0 90 129V70', [{ y: 168, c: K.waterL }], C(66, 195, 4, '#fff', { stroke: K.waterD, w: 1.5 }) + C(92, 185, 3.5, '#fff', { stroke: K.waterD, w: 1.5 })) +
      R(66, 62, 28, 12, K.brown, { rx: 3, w: 2 }) + R(76, 32, 8, 70, '#fff', { rx: 3, w: 2 }) + R(78.5, 62, 3, 38, K.red, { w: 0, stroke: 'none' }) + C(80, 102, 4, K.red, { w: 1 }) +
      L(90, 100, 140, 100, { w: 10 }) + L(90, 100, 140, 100, { w: 5, stroke: '#dff0fc' }) +
      `<g transform="translate(140 100) rotate(26.6)">` + R(10, -14, 130, 28, '#bfe3f8', { rx: 4, w: 3 }) + L(0, 0, 160, 0, { w: 11 }) + L(0, 0, 160, 0, { w: 5.5, stroke: '#eef7fd' }) + `</g>` +
      L(280, 170, 294, 192, { w: 4 }) + C(297, 200, 3.5, K.water, { w: 1, stroke: K.waterD }) +
      vessel('q19-e', flD(300, 208, 88, 76, 14), [{ y: 262, c: K.waterL }]) +
      arrow(205, 218, 238, 176, K.waterD, 3) + T(185, 240, 'entrada de água', { s: 14 }) +
      arrow(172, 92, 196, 66, K.waterD, 3) + T(212, 62, 'saída', { s: 14 }) +
      T(80, 20, 'Termômetro', { s: 15 }) + T(282, 136, 'Condensador', { s: 16 }) + T(158, 276, 'água salgada', { a: 'start', s: 15 }));
  };

  /* ======================================================================
     20 — Fórmula estrutural do etanol
     ====================================================================== */
  I.etanol = () => {
    const at = (x, y, s, c) => T(x, y + 10, s, { s: 30, f: c || K.ink });
    return svg('q20', 'Fórmula estrutural de um composto orgânico',
      'Fórmula estrutural plana com dois carbonos ligados em linha, cada um com três hidrogênios ou grupos ligados; o segundo carbono se liga a um oxigênio que se liga a um hidrogênio.',
      L(80, 140, 112, 140, { w: 3.5 }) + L(148, 140, 180, 140, { w: 3.5 }) + L(216, 140, 248, 140, { w: 3.5 }) + L(284, 140, 316, 140, { w: 3.5 }) +
      L(130, 122, 130, 92, { w: 3.5 }) + L(130, 158, 130, 188, { w: 3.5 }) + L(198, 122, 198, 92, { w: 3.5 }) + L(198, 158, 198, 188, { w: 3.5 }) +
      at(60, 140, 'H', K.grey) + at(130, 140, 'C') + at(198, 140, 'C') + at(266, 140, 'O', K.redT) + at(336, 140, 'H', K.grey) +
      at(130, 72, 'H', K.grey) + at(130, 208, 'H', K.grey) + at(198, 72, 'H', K.grey) + at(198, 208, 'H', K.grey) +
      T(200, 270, 'Fórmula estrutural: CH₃CH₂OH', { s: 18 }));
  };

  /* ======================================================================
     21 — Diagrama de entalpia (Lei de Hess)
     ====================================================================== */
  I.hess = () =>
    svg('q21', 'Diagrama de entalpia com três níveis',
      'Eixo vertical de entalpia. No alto, o nível C, 2 H2 e 2 O2. Um pouco abaixo, CH4 e 2 O2. Bem embaixo, CO2 e 2 H2O. Setas ligam os níveis; a seta entre os dois níveis de cima tem valor desconhecido.',
      arrow(30, 266, 30, 18, K.ink, 3.5) + T(12, 150, 'Entalpia (H)', { s: 15, r: -90 }) +
      L(50, 62, 230, 62, { w: 5, stroke: K.purple }) + T(140, 48, 'C(s) + 2 H₂(g) + 2 O₂(g)', { s: 14 }) +
      L(200, 112, 380, 112, { w: 5, stroke: K.waterD }) + T(300, 99, 'CH₄(g) + 2 O₂(g)', { s: 15 }) +
      L(50, 250, 380, 250, { w: 5, stroke: K.green }) + T(215, 238, 'CO₂(g) + 2 H₂O(l)', { s: 15 }) +
      arrow(110, 66, 110, 246, K.ink, 3) + T(100, 160, 'ΔH₁', { a: 'end', s: 19 }) +
      arrow(330, 116, 330, 246, K.ink, 3) + T(320, 168, 'ΔH₂', { a: 'end', s: 19 }) + T(320, 190, '(combustão)', { a: 'end', s: 13, w: 600 }) +
      arrow(214, 66, 214, 108, K.redT, 3.5) + T(204, 92, 'ΔHf = ?', { a: 'end', s: 17, f: K.redT }) +
      T(205, 282, 'Lei de Hess: o ΔH total não depende do caminho', { s: 14, w: 600 }));

  /* ======================================================================
     22 — Diagrama de energia de ativação
     ====================================================================== */
  I.energia_ativacao = () =>
    svg('q22', 'Gráfico de energia de uma reação',
      'Gráfico de energia contra caminho da reação. A curva sobe dos reagentes até um pico, o complexo ativado, e desce até os produtos, que ficam mais baixos que os reagentes. Estão marcados Ea igual a 120 kJ, delta H igual a menos 50 kJ e a energia de ativação da reação inversa, desconhecida.',
      arrow(40, 258, 40, 12, K.ink, 3.5) + arrow(40, 258, 392, 258, K.ink, 3.5) +
      T(16, 140, 'Energia', { s: 15, r: -90 }) + T(215, 284, 'Caminho da reação', { s: 15 }) +
      P('M50 170H105C150 170 155 50 200 50C245 50 250 220 295 220H350', { w: 4.5, stroke: K.purple }) +
      L(105, 170, 350, 170, { w: 2, stroke: K.grey, dash: '5 5' }) + L(200, 50, 372, 50, { w: 2, stroke: K.grey, dash: '5 5' }) + L(295, 220, 372, 220, { w: 2, stroke: K.grey, dash: '5 5' }) +
      arrow(140, 170, 140, 52, K.redT, 3) + T(132, 112, 'Ea = 120 kJ', { a: 'end', s: 14, f: K.redT }) +
      arrow(318, 172, 318, 218, K.ink, 3) + T(318, 160, 'ΔH = –50 kJ', { s: 14 }) +
      arrow(372, 218, 372, 52, K.green, 3) + T(366, 135, "Ea' = ?", { a: 'end', s: 16, f: '#157a46' }) +
      T(78, 192, 'Reagentes', { s: 14 }) + T(322, 242, 'Produtos', { s: 14 }) + T(200, 38, 'Complexo ativado', { s: 14 }));

  /* ======================================================================
     23 — Queima de metano (bico de Bunsen)
     ====================================================================== */
  I.combustao = () => {
    let drops = '';
    [[150, 62], [178, 72], [206, 60], [232, 74], [160, 92], [220, 96]].forEach(([x, y]) => (drops += P(`M${x} ${y - 7}Q${x + 5} ${y} ${x} ${y + 5}Q${x - 5} ${y} ${x} ${y - 7}Z`, { fill: K.water, stroke: K.waterD, w: 1.5 })));
    return svg('q23', 'Queima de metano em um bico de Bunsen',
      'Um cilindro de gás metano ligado por mangueira a um bico de Bunsen com chama. Sobre a chama há um béquer de cabeça para baixo com gotículas de água na parede. Setas mostram o oxigênio do ar entrando.',
      R(28, 190, 52, 84, '#5fa8a0', { rx: 14, w: 3 }) + T(54, 238, 'CH₄', { s: 19, f: '#fff' }) +
      P('M80 232C120 232 130 258 182 258', { w: 8 }) + P('M80 232C120 232 130 258 182 258', { w: 3.5, stroke: '#dff0fc' }) +
      R(182, 200, 16, 72, K.grey, { rx: 3, w: 2.5 }) + R(160, 270, 60, 10, K.ink, { rx: 3, w: 2 }) +
      P('M190 128C166 158 168 188 190 200C212 188 214 158 190 128Z', { fill: K.amber, stroke: K.redT, w: 3 }) +
      P('M190 160C180 174 182 188 190 194C198 188 200 174 190 160Z', { fill: '#fff3b0', stroke: 'none', w: 0 }) +
      vessel('q23-b', 'M126 116V52Q126 40 138 40H242Q254 40 254 52V116', [], drops) +
      arrow(334, 190, 238, 184, K.ink, 3) + T(350, 172, 'O₂ do ar', { s: 16 }) +
      arrow(262, 62, 240, 66, K.ink, 2.5) + T(268, 56, 'gotículas de', { a: 'start', s: 14 }) + T(268, 74, 'água', { a: 'start', s: 14 }));
  };

  /* ======================================================================
     24 — Diluição: béquer 200 mL -> balão 1 L
     ====================================================================== */
  I.diluicao = () =>
    svg('q24', 'Diluição de uma solução de ácido clorídrico',
      'À esquerda, um béquer com 200 mililitros de solução azul escura de concentração 0,5 mol por litro. Uma seta com mais água leva a um balão volumétrico com solução azul clara até a marca de 1 litro.',
      vessel('q24-a', bkD(30, 120, 100, 130), [{ y: 165, c: K.waterD }]) +
      T(80, 272, '200 mL', { s: 18 }) + T(80, 292, '0,5 mol/L', { s: 18 }) +
      arrow(150, 175, 232, 175, K.ink, 4) + T(190, 158, '+ H₂O', { s: 20 }) +
      vessel('q24-b', volD(318, 40, 207, 58), [{ y: 82, c: K.waterL }]) + L(302, 82, 334, 82, { w: 3.5, stroke: K.redT }) +
      T(350, 87, '1 L', { a: 'start', s: 17 }) + T(296, 290, 'Concentração final = ?', { s: 15 }));

  /* ======================================================================
     25 — pHmetro em solução de NaOH
     ====================================================================== */
  I.phmetro = () =>
    svg('q25', 'pHmetro medindo uma solução de NaOH',
      'Um béquer com solução incolor, rotulado NaOH 0,001 mol por litro, com um eletrodo mergulhado ligado por cabo a um aparelho cuja tela mostra pH igual a interrogação.',
      R(225, 40, 150, 100, '#dfe8f1', { rx: 12, w: 3 }) + R(240, 54, 120, 40, '#c9f1d2', { rx: 5, w: 2 }) + T(300, 82, 'pH = ?', { s: 26, mono: true }) +
      C(262, 118, 7, K.grey, { w: 2 }) + C(290, 118, 7, K.grey, { w: 2 }) + C(318, 118, 7, K.grey, { w: 2 }) +
      P('M260 140V160H140V225', { w: 8 }) + P('M260 140V160H140V225', { w: 3.5, stroke: '#dff0fc' }) +
      vessel('q25-b', bkD(85, 170, 110, 100), [{ y: 205, c: '#d4ebfa' }]) +
      R(132, 195, 16, 52, '#fff', { rx: 5, w: 2.5 }) + C(140, 250, 8, K.amber, { w: 2 }) +
      T(140, 292, 'NaOH 0,001 mol/L', { s: 17 }));

  /* ======================================================================
     26 — 36 g de água + molécula H2O
     ====================================================================== */
  I.agua_36g = () =>
    svg('q26', 'Béquer com 36 gramas de água e modelo da molécula de água',
      'À esquerda, um béquer com água sobre uma balança que marca 36 gramas. À direita, o modelo de uma molécula de água, com um oxigênio vermelho grande e dois hidrogênios brancos pequenos.',
      scale(105, 236, '36 g') + vessel('q26-b', bkD(62, 140, 86, 88), [{ y: 172, c: K.waterL }]) + T(105, 128, 'água', { s: 18 }) +
      L(300, 140, 272, 174, { w: 4 }) + L(300, 140, 328, 174, { w: 4 }) +
      C(300, 140, 26, K.red, { w: 3 }) + T(300, 148, 'O', { s: 22, f: '#fff' }) +
      C(272, 176, 15, '#fff', { w: 2.5 }) + T(272, 182, 'H', { s: 16 }) + C(328, 176, 15, '#fff', { w: 2.5 }) + T(328, 182, 'H', { s: 16 }) +
      T(300, 222, 'H₂O', { s: 24 }) + T(300, 268, 'átomos no total = ?', { s: 18, f: K.purple }));

  /* ======================================================================
     27 — Fórmula de bastão (2-metilbutano)
     ====================================================================== */
  I.metilbutano = () => {
    const pts = [[70, 205], [140, 165], [210, 205], [280, 165]], br = [140, 95];
    let s = P(`M${pts.map((p) => p.join(' ')).join('L')}`, { w: 5 }) + L(140, 165, br[0], br[1], { w: 5 });
    pts.concat([br]).forEach(([x, y]) => (s += C(x, y, 6, K.ink, { w: 0 })));
    return svg('q27', 'Fórmula de bastão de um hidrocarboneto ramificado',
      'Linha em zigue-zague com quatro carbonos e um ramo curto saindo do segundo carbono para cima. Cada vértice ou ponta é um átomo de carbono, com os hidrogênios omitidos.',
      s + T(200, 262, 'cada vértice ou ponta = 1 átomo de C', { s: 17 }) + T(200, 284, '(átomos de H omitidos)', { s: 15, w: 600 }));
  };

  /* ======================================================================
     28 — Lewis do CO2 + eletronegatividades
     ====================================================================== */
  I.co2_lewis = () => {
    const at = (x, s, c) => T(x, 158, s, { s: 54, f: c });
    const pair = (x, y) => C(x - 7, y, 3.5, K.ink, { w: 0 }) + C(x + 7, y, 3.5, K.ink, { w: 0 });
    return svg('q28', 'Estrutura de Lewis do gás carbônico',
      'Estrutura O=C=O com duas ligações duplas e dois pares de elétrons livres em cada oxigênio. Os oxigênios têm carga parcial negativa e o carbono, positiva. Uma caixa informa as eletronegatividades: oxigênio 3,5 e carbono 2,5.',
      at(80, 'O', K.redT) + at(200, 'C', K.ink) + at(320, 'O', K.redT) +
      L(112, 130, 168, 130, { w: 3.5 }) + L(112, 150, 168, 150, { w: 3.5 }) + L(232, 130, 288, 130, { w: 3.5 }) + L(232, 150, 288, 150, { w: 3.5 }) +
      pair(80, 98) + pair(80, 182) + pair(320, 98) + pair(320, 182) +
      T(80, 62, 'δ⁻', { s: 28, f: K.redT }) + T(200, 62, 'δ⁺', { s: 28, f: K.waterD }) + T(320, 62, 'δ⁻', { s: 28, f: K.redT }) +
      R(70, 212, 260, 70, '#fff', { rx: 10, w: 2.5 }) + T(200, 238, 'Eletronegatividade', { s: 17 }) + T(200, 266, 'O = 3,5     C = 2,5', { s: 20 }));
  };

  /* ======================================================================
     29 — Diagrama de Pauling
     ====================================================================== */
  I.pauling = () => {
    const maxL = { 1: 0, 2: 1, 3: 2, 4: 3, 5: 3, 6: 2, 7: 1 };
    const pos = (n, l) => [120 + l * 70, 34 + (n - 1) * 36];
    const sub = 'spdf';
    let lines = '', labels = '';
    for (let sum = 1; sum <= 8; sum++) {
      const it = [];
      for (let l = 3; l >= 0; l--) { const n = sum - l; if (n >= l + 1 && n <= 7 && l <= maxL[n]) it.push([n, l]); }
      if (!it.length) continue;
      const a = pos(...it[0]), b = pos(...it[it.length - 1]);
      lines += arrow(a[0] + 22, a[1] - 11, b[0] - 22, b[1] + 11, K.redT, 2.4);
    }
    for (let n = 1; n <= 7; n++) for (let l = 0; l <= maxL[n]; l++) { const [x, y] = pos(n, l); labels += T(x, y + 6, `${n}${sub[l]}`, { s: 18, halo: true }); }
    const sh = 'KLMNOPQ';
    let shells = '';
    for (let n = 1; n <= 7; n++) shells += T(44, 34 + (n - 1) * 36 + 6, sh[n - 1], { s: 18, f: K.purple });
    return svg('q29', 'Diagrama de Pauling',
      'Diagrama de Pauling com os subníveis de 1s até 7p organizados em sete linhas, de K a Q, e setas diagonais vermelhas indicando a ordem de preenchimento.',
      lines + labels + shells + T(200, 288, 'Diagrama de Pauling: ordem de preenchimento', { s: 15, w: 600 }));
  };

  /* ======================================================================
     30 — Precipitação de AgCl
     ====================================================================== */
  I.precipitado = () => {
    let prec = '';
    [[232, 238], [252, 244], [272, 238], [242, 226], [262, 228], [252, 214]].forEach(([x, y]) => (prec += E(x, y, 11, 8, '#fff', { w: 1.8, stroke: '#7f93a8' })));
    return svg('q30', 'Mistura de duas soluções formando precipitado',
      'Dois béqueres, um com nitrato de prata e outro com cloreto de sódio, ambos incolores. Setas levam a um tubo de ensaio onde se vê um sólido branco depositado no fundo.',
      vessel('q30-a', bkD(25, 45, 92, 85), [{ y: 75, c: '#e1f0fb' }]) + T(71, 150, 'AgNO₃(aq)', { s: 16 }) +
      vessel('q30-b', bkD(25, 175, 92, 85), [{ y: 205, c: '#e1f0fb' }]) + T(71, 280, 'NaCl(aq)', { s: 16 }) +
      arrow(125, 95, 205, 140, K.ink, 3.5) + arrow(125, 220, 205, 180, K.ink, 3.5) +
      vessel('q30-tubo', tubeD(215, 55, 74, 205), [{ y: 110, c: '#e1f0fb' }], prec) +
      arrow(350, 230, 296, 236, K.ink, 3) + T(350, 252, 'precipitado', { s: 16 }) + T(350, 272, 'branco', { s: 16 }));
  };

  window.ILUSTRACOES = I;
})();
