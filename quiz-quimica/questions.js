/* ==========================================================================
   QUIZ DE QUÍMICA — BANCO DE PERGUNTAS
   --------------------------------------------------------------------------
   Para editar: altere os textos abaixo, mantendo as aspas e as vírgulas.

   Formato de cada pergunta:
   {
     nivel: "facil" | "media" | "dificil",   // define o selo de dificuldade
     tema: "Texto curto do assunto",
     ilustracao: "chave",                    // nome da ilustração em ilustracoes.js
     enunciado: "Texto da pergunta (use \n para quebrar linha).",
     alternativas: ["A", "B", "C", "D", "E"],// sempre 5, na ordem A–E
     correta: "C",                           // letra da alternativa correta
     explicacao: "1 a 2 frases mostradas depois da resposta."
   }
   ========================================================================== */

window.QUESTOES = [
  /* ============================ FÁCEIS (1–10) ============================ */
  {
    nivel: "facil",
    tema: "Matéria e propriedades",
    ilustracao: "volume",
    enunciado: "Ao mergulhar uma pedra em uma proveta com água, o nível da água sobe. Essa elevação do nível permite determinar qual propriedade da pedra?",
    alternativas: ["Massa", "Densidade", "Volume", "Temperatura de fusão", "Dureza"],
    correta: "C",
    explicacao: "O volume de água deslocado é igual ao volume da pedra (método do deslocamento). Para obter a massa seria necessária uma balança."
  },
  {
    nivel: "facil",
    tema: "Estados físicos",
    ilustracao: "estados",
    enunciado: "Qual estado físico da matéria é caracterizado por ter forma e volume próprios (definidos)?",
    alternativas: ["Sólido", "Líquido", "Gasoso", "Plasma", "Líquido e gasoso"],
    correta: "A",
    explicacao: "No sólido, as partículas ficam muito próximas e organizadas, apenas vibrando; por isso forma e volume são constantes. O líquido tem volume próprio, mas assume a forma do recipiente."
  },
  {
    nivel: "facil",
    tema: "Mudanças de estado",
    ilustracao: "vaporizacao",
    enunciado: "Quando a água de uma panela é aquecida e passa do estado líquido para o estado gasoso, essa mudança de estado é chamada de:",
    alternativas: ["Fusão", "Solidificação", "Sublimação", "Condensação", "Vaporização"],
    correta: "E",
    explicacao: "A passagem de líquido para gás é a vaporização. A condensação é o processo inverso (gás para líquido)."
  },
  {
    nivel: "facil",
    tema: "Tabela periódica",
    ilustracao: "tabela_colunas",
    enunciado: "Na tabela periódica, as colunas verticais, como a destacada na figura, recebem o nome de:",
    alternativas: ["Períodos", "Grupos (ou famílias)", "Camadas", "Séries", "Subníveis"],
    correta: "B",
    explicacao: "As colunas verticais formam os grupos (ou famílias), cujos elementos têm propriedades químicas semelhantes. As linhas horizontais são os períodos."
  },
  {
    nivel: "facil",
    tema: "Átomo",
    ilustracao: "atomo",
    enunciado: "Quais partículas subatômicas formam o núcleo de um átomo?",
    alternativas: ["Prótons e elétrons", "Elétrons e nêutrons", "Somente elétrons", "Prótons e nêutrons", "Elétrons, prótons e nêutrons"],
    correta: "D",
    explicacao: "O núcleo concentra quase toda a massa do átomo e é formado por prótons (carga positiva) e nêutrons (sem carga). Os elétrons ficam na eletrosfera."
  },
  {
    nivel: "facil",
    tema: "Ligações químicas",
    ilustracao: "na_cl",
    enunciado: "O sal de cozinha (NaCl) é formado pela união entre um metal (sódio) e um ametal (cloro). Que tipo de ligação mantém esses átomos unidos?",
    alternativas: ["Covalente", "Iônica", "Metálica", "Dipolo-dipolo", "Ligação de hidrogênio"],
    correta: "B",
    explicacao: "O sódio (1 elétron na última camada) perde esse elétron e o cloro (7 elétrons) o recebe. Os íons Na⁺ e Cl⁻ se atraem eletricamente: é a ligação iônica."
  },
  {
    nivel: "facil",
    tema: "Funções inorgânicas: bases",
    ilustracao: "base_dissolvendo",
    enunciado: "Segundo Arrhenius, o hidróxido de sódio (NaOH) é uma base porque, ao se dissolver em água, libera como único tipo de ânion o:",
    alternativas: ["OH⁻ (hidróxido)", "H⁺ (hidrogênio)", "Cl⁻ (cloreto)", "O²⁻ (óxido)", "NO₃⁻ (nitrato)"],
    correta: "A",
    explicacao: "Bases de Arrhenius liberam OH⁻ em água: NaOH → Na⁺ + OH⁻. Já os ácidos liberam H⁺ (na forma de H₃O⁺)."
  },
  {
    nivel: "facil",
    tema: "Reações químicas",
    ilustracao: "lavoisier",
    enunciado: "Em um recipiente fechado, a massa total antes e depois de uma reação química é a mesma. Essa lei da conservação das massas foi proposta por:",
    alternativas: ["Proust", "Dalton", "Avogadro", "Lavoisier", "Gay-Lussac"],
    correta: "D",
    explicacao: "Lavoisier mostrou que, em sistema fechado, a massa dos reagentes é igual à dos produtos (\"nada se cria, nada se perde, tudo se transforma\"). Proust enunciou a lei das proporções constantes."
  },
  {
    nivel: "facil",
    tema: "Soluções",
    ilustracao: "acucar",
    enunciado: "Ao dissolver açúcar em água, obtém-se uma solução. Nessa solução, o açúcar é denominado:",
    alternativas: ["Solvente", "Catalisador", "Soluto", "Precipitado", "Indicador"],
    correta: "C",
    explicacao: "O soluto é a substância que se dissolve (açúcar); o solvente é o meio que dissolve (água), geralmente em maior quantidade."
  },
  {
    nivel: "facil",
    tema: "Separação de misturas",
    ilustracao: "funil",
    enunciado: "Óleo e água formam uma mistura heterogênea de líquidos que não se misturam (imiscíveis). Qual técnica é a mais adequada para separá-los?",
    alternativas: ["Destilação simples", "Filtração", "Peneiração", "Cristalização", "Decantação"],
    correta: "E",
    explicacao: "Líquidos imiscíveis formam camadas de acordo com a densidade. No funil de decantação, abre-se a torneira e escoa-se a fase mais densa (a água), separando as duas fases."
  },

  /* ============================ MÉDIAS (11–20) =========================== */
  {
    nivel: "media",
    tema: "Tabela periódica",
    ilustracao: "tabela_sodio",
    enunciado: "O sódio (Z = 11), destacado no trecho da tabela periódica, pertence à família dos:",
    alternativas: ["Alcalinoterrosos", "Halogênios", "Gases nobres", "Metais alcalinos", "Calcogênios"],
    correta: "D",
    explicacao: "O sódio está no grupo 1 (Li, Na, K, Rb, Cs, Fr): os metais alcalinos, com 1 elétron na última camada. Alcalinoterrosos são o grupo 2; halogênios, o 17; gases nobres, o 18; calcogênios, o 16."
  },
  {
    nivel: "media",
    tema: "Modelos atômicos",
    ilustracao: "rutherford",
    enunciado: "No experimento de Rutherford, a maior parte das partículas alfa atravessou a lâmina de ouro sem desvio, mas algumas poucas foram fortemente desviadas ou refletidas. Qual foi a principal conclusão?",
    alternativas: [
      "O átomo é uma esfera maciça e indivisível.",
      "O átomo tem um núcleo pequeno, denso e positivo, cercado por grande espaço vazio.",
      "Os elétrons estão incrustados em uma massa positiva, como em um pudim.",
      "Os elétrons ocupam órbitas com energias definidas (quantizadas).",
      "Átomos de um mesmo elemento podem ter massas diferentes."
    ],
    correta: "B",
    explicacao: "Como quase tudo passava, o átomo é majoritariamente vazio; os desvios raros indicam um núcleo pequeno, denso e positivo. Modelo maciço = Dalton; pudim = Thomson; órbitas quantizadas = Bohr."
  },
  {
    nivel: "media",
    tema: "Ligações covalentes",
    ilustracao: "h2",
    enunciado: "Qual das substâncias abaixo é formada exclusivamente por ligações covalentes?",
    alternativas: ["Cloreto de sódio (NaCl)", "Brometo de potássio (KBr)", "Óxido de magnésio (MgO)", "Ferro (Fe)", "Dióxido de carbono (CO₂)"],
    correta: "E",
    explicacao: "O CO₂ é formado por ametais (C e O), que compartilham pares de elétrons. NaCl, KBr e MgO são iônicos (metal + ametal) e o ferro tem ligação metálica."
  },
  {
    nivel: "media",
    tema: "Funções inorgânicas: óxidos",
    ilustracao: "co2_agua",
    enunciado: "O gás carbônico (CO₂), ao ser borbulhado em água, reage formando ácido carbônico (H₂CO₃). Por esse comportamento, o CO₂ é classificado como um óxido:",
    alternativas: ["Ácido", "Básico", "Neutro", "Anfótero", "Peróxido"],
    correta: "A",
    explicacao: "Óxidos ácidos (de ametais) reagem com água formando ácidos. Óxidos neutros, como o CO, não reagem; os anfóteros, como Al₂O₃, reagem tanto com ácidos quanto com bases."
  },
  {
    nivel: "media",
    tema: "Balanceamento de equações",
    ilustracao: "balanceamento",
    enunciado: "A síntese da amônia é representada por N₂ + H₂ → NH₃. Depois de balanceada com os menores coeficientes inteiros, qual é a soma de todos os coeficientes da equação?",
    alternativas: ["4", "5", "6", "7", "8"],
    correta: "C",
    explicacao: "Equação balanceada: 1 N₂ + 3 H₂ → 2 NH₃. Soma dos coeficientes: 1 + 3 + 2 = 6."
  },
  {
    nivel: "media",
    tema: "Quantidade de matéria (mol)",
    ilustracao: "mol_co2",
    enunciado: "Qual é a massa de 2 mols de dióxido de carbono (CO₂)?\n(Massas atômicas: C = 12; O = 16)",
    alternativas: ["28 g", "44 g", "56 g", "64 g", "88 g"],
    correta: "E",
    explicacao: "M(CO₂) = 12 + 2 × 16 = 44 g/mol. Para 2 mols: 2 × 44 = 88 g."
  },
  {
    nivel: "media",
    tema: "Concentração de soluções",
    ilustracao: "balao_naoh",
    enunciado: "Dissolvem-se 20 g de hidróxido de sódio (NaOH) em água suficiente para completar 500 mL de solução. Qual é a concentração comum dessa solução, em g/L?",
    alternativas: ["10 g/L", "20 g/L", "40 g/L", "80 g/L", "400 g/L"],
    correta: "C",
    explicacao: "C = m ÷ V = 20 g ÷ 0,5 L = 40 g/L. É preciso converter 500 mL em 0,5 L."
  },
  {
    nivel: "media",
    tema: "pH",
    ilustracao: "ph_tubos",
    enunciado: "A solução A tem pH = 3 e a solução B tem pH = 5. Quantas vezes a concentração de íons H⁺ em A é maior que em B?",
    alternativas: ["100 vezes", "2 vezes", "10 vezes", "1 000 vezes", "5 vezes"],
    correta: "A",
    explicacao: "pH = –log[H⁺]. Em A, [H⁺] = 10⁻³ mol/L; em B, 10⁻⁵ mol/L. Razão: 10⁻³ ÷ 10⁻⁵ = 10² = 100. Cada unidade de pH muda a concentração por um fator 10."
  },
  {
    nivel: "media",
    tema: "Separação de misturas",
    ilustracao: "destilacao",
    enunciado: "Na destilação simples de água salgada, o vapor é resfriado no condensador e recolhido, enquanto o sal permanece no balão. Essa separação é possível por causa da diferença de:",
    alternativas: ["Densidade", "Ponto de ebulição", "Solubilidade", "Ponto de fusão", "Condutividade elétrica"],
    correta: "B",
    explicacao: "A água ferve a cerca de 100 °C, enquanto o sal praticamente não vaporiza. O vapor condensa e dá água pura (destilado); o sal fica no balão."
  },
  {
    nivel: "media",
    tema: "Química orgânica",
    ilustracao: "etanol",
    enunciado: "O composto representado na figura é o principal componente das bebidas alcoólicas e do álcool combustível. A qual função orgânica ele pertence?",
    alternativas: ["Aldeído", "Cetona", "Éter", "Álcool", "Ácido carboxílico"],
    correta: "D",
    explicacao: "A hidroxila (–OH) ligada a carbono saturado caracteriza o álcool; o composto é o etanol. No éter há um oxigênio entre dois carbonos (C–O–C)."
  },

  /* ============================ DIFÍCEIS (21–30) ========================= */
  {
    nivel: "dificil",
    tema: "Termoquímica (Lei de Hess)",
    ilustracao: "hess",
    enunciado: "Dados:\nC(s) + O₂(g) → CO₂(g)  ΔH = –394 kJ/mol\nH₂(g) + ½ O₂(g) → H₂O(l)  ΔH = –286 kJ/mol\nCH₄(g) + 2 O₂(g) → CO₂(g) + 2 H₂O(l)  ΔH = –890 kJ/mol\nQual é a entalpia de formação do metano, C(s) + 2 H₂(g) → CH₄(g)?",
    alternativas: ["–76 kJ/mol", "+76 kJ/mol", "–604 kJ/mol", "–1 856 kJ/mol", "–966 kJ/mol"],
    correta: "A",
    explicacao: "Lei de Hess: ΔHf(CH₄) = [ΔH(C) + 2·ΔH(H₂)] – ΔH(combustão) = (–394 – 572) – (–890) = –966 + 890 = –76 kJ/mol."
  },
  {
    nivel: "dificil",
    tema: "Cinética: energia de ativação",
    ilustracao: "energia_ativacao",
    enunciado: "O gráfico mostra uma reação cuja energia de ativação (reação direta) é 120 kJ e cuja variação de entalpia é ΔH = –50 kJ. Qual é a energia de ativação da reação inversa?",
    alternativas: ["50 kJ", "70 kJ", "120 kJ", "220 kJ", "170 kJ"],
    correta: "E",
    explicacao: "Na reação inversa, parte-se dos produtos, que estão 50 kJ abaixo dos reagentes: Ea(inversa) = Ea(direta) + |ΔH| = 120 + 50 = 170 kJ."
  },
  {
    nivel: "dificil",
    tema: "Estequiometria",
    ilustracao: "combustao",
    enunciado: "A combustão completa do metano é CH₄ + 2 O₂ → CO₂ + 2 H₂O. Qual é a massa de água produzida na queima de 16 g de metano?\n(H = 1; C = 12; O = 16)",
    alternativas: ["18 g", "32 g", "36 g", "44 g", "72 g"],
    correta: "C",
    explicacao: "M(CH₄) = 16 g/mol, logo 16 g = 1 mol. Pela proporção 1 : 2 formam-se 2 mol de H₂O (18 g/mol cada): 2 × 18 = 36 g."
  },
  {
    nivel: "dificil",
    tema: "Diluição de soluções",
    ilustracao: "diluicao",
    enunciado: "Uma amostra de 200 mL de ácido clorídrico 0,5 mol/L é diluída com água até completar 1 L. Qual é a concentração final, em mol/L?",
    alternativas: ["0,05", "0,25", "0,50", "0,10", "0,20"],
    correta: "D",
    explicacao: "A quantidade de HCl não muda: n = 0,5 × 0,2 = 0,1 mol. Em 1 L, a concentração é 0,1 mol ÷ 1 L = 0,10 mol/L (ou C₁V₁ = C₂V₂)."
  },
  {
    nivel: "dificil",
    tema: "pH e pOH",
    ilustracao: "phmetro",
    enunciado: "Qual é o pH, a 25 °C, de uma solução aquosa de NaOH (base forte, totalmente dissociada) com concentração 0,001 mol/L?",
    alternativas: ["3", "11", "10", "12", "9"],
    correta: "B",
    explicacao: "[OH⁻] = 10⁻³ mol/L, então pOH = 3. Como pH + pOH = 14 (a 25 °C), pH = 11."
  },
  {
    nivel: "dificil",
    tema: "Mol e constante de Avogadro",
    ilustracao: "agua_36g",
    enunciado: "Quantos átomos existem, no total, em 36 g de água (H₂O)?\n(H = 1; O = 16; constante de Avogadro = 6 × 10²³ mol⁻¹)",
    alternativas: ["1,2 × 10²⁴", "2,4 × 10²⁴", "3,6 × 10²⁴", "7,2 × 10²⁴", "1,08 × 10²⁵"],
    correta: "C",
    explicacao: "M(H₂O) = 18 g/mol, então 36 g = 2 mol de moléculas. Como cada molécula tem 3 átomos, há 6 mol de átomos: 6 × 6 × 10²³ = 3,6 × 10²⁴ átomos."
  },
  {
    nivel: "dificil",
    tema: "Química orgânica: nomenclatura",
    ilustracao: "metilbutano",
    enunciado: "Qual é o nome oficial (IUPAC) do hidrocarboneto de cadeia ramificada representado na figura?",
    alternativas: ["Pentano", "3-metilbutano", "2-metilpropano", "2,2-dimetilpropano", "2-metilbutano"],
    correta: "E",
    explicacao: "A cadeia principal tem 4 carbonos (butano) e há um grupo metil no carbono 2 (numerando pela ponta que dá o menor número). O nome \"3-metilbutano\" erra a numeração."
  },
  {
    nivel: "dificil",
    tema: "Geometria e polaridade",
    ilustracao: "co2_lewis",
    enunciado: "Na molécula de CO₂, cada ligação C=O é polar, pois o oxigênio é mais eletronegativo que o carbono. Mesmo assim, a molécula é apolar. Isso ocorre porque ela tem geometria:",
    alternativas: [
      "Linear, com momentos dipolares que se anulam.",
      "Angular, com momentos dipolares que se anulam.",
      "Angular, com momentos dipolares que se somam.",
      "Piramidal, com momentos dipolares que se somam.",
      "Tetraédrica, com momentos dipolares que se anulam."
    ],
    correta: "A",
    explicacao: "O carbono central não tem pares de elétrons livres, então os dois oxigênios ficam em lados opostos (180°). Os dipolos têm o mesmo módulo e sentidos contrários e se anulam. A água, ao contrário, é angular e polar."
  },
  {
    nivel: "dificil",
    tema: "Distribuição eletrônica",
    ilustracao: "pauling",
    enunciado: "Um átomo neutro tem a distribuição eletrônica 1s² 2s² 2p⁶ 3s² 3p⁴. Em que grupo e período da tabela periódica esse elemento se encontra?",
    alternativas: ["Grupo 14, 3º período", "Grupo 16, 4º período", "Grupo 13, 3º período", "Grupo 16, 3º período", "Grupo 18, 3º período"],
    correta: "D",
    explicacao: "A última camada é a 3ª (3º período) e tem 3s² 3p⁴ = 6 elétrons de valência, o que corresponde ao grupo 16. O elemento é o enxofre (Z = 16)."
  },
  {
    nivel: "dificil",
    tema: "Reações de precipitação",
    ilustracao: "precipitado",
    enunciado: "Ao misturar soluções aquosas de nitrato de prata e cloreto de sódio, forma-se um precipitado branco: AgNO₃ + NaCl → AgCl + NaNO₃. Qual é a massa de AgCl formada quando 0,1 mol de AgNO₃ reage com NaCl em excesso?\n(Ag = 108; Cl = 35,5)",
    alternativas: ["10,8 g", "14,35 g", "17,0 g", "28,7 g", "5,85 g"],
    correta: "B",
    explicacao: "A proporção é 1 : 1 : 1, então se formam 0,1 mol de AgCl. M(AgCl) = 108 + 35,5 = 143,5 g/mol; 0,1 × 143,5 = 14,35 g."
  }
];
