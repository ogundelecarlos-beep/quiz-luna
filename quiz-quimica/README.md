# Quiz de Química

Quiz interativo para projetar em sala de aula: 30 perguntas de múltipla escolha (10 fáceis, 10 médias, 10 difíceis), cada uma com uma ilustração SVG própria. Funciona offline, sem backend e sem dependências.

## Arquivos

| Arquivo | Para que serve |
|---|---|
| `index.html` | Estrutura das telas (início, pergunta, resultado) |
| `style.css` | Visual (modo claro/escuro, fontes grandes para telão) |
| `script.js` | Lógica: placar, cronômetro, teclado, resultado |
| `questions.js` | **As perguntas** (é o arquivo que a professora edita) |
| `ilustracoes.js` | As 30 ilustrações em SVG, uma por pergunta |

## Como abrir

Dê **duplo clique em `index.html`**. Ele abre no navegador (Chrome, Edge ou Firefox) e não precisa de internet.

Dicas para a aula: aperte **F** (ou o botão "Tela cheia") para ocupar todo o telão e use o botão "Tema" para alternar claro/escuro.

## Atalhos de teclado

| Tecla | Ação |
|---|---|
| `1`–`5` ou `A`–`E` | Escolher alternativa |
| `Enter` | Confirmar resposta; depois de confirmada, avança |
| `←` / `→` | Pergunta anterior / próxima (só avança depois de confirmar) |
| `F` | Tela cheia |

## Como editar as perguntas

Abra `questions.js` em qualquer editor de texto (Bloco de Notas serve). Cada pergunta é um bloco assim:

```js
{
  nivel: "media",                 // "facil", "media" ou "dificil"
  tema: "Concentração de soluções",
  ilustracao: "balao_naoh",       // nome de uma ilustração de ilustracoes.js
  enunciado: "Qual é a concentração ...?",   // use \n para quebrar linha
  alternativas: ["10 g/L", "20 g/L", "40 g/L", "80 g/L", "400 g/L"],  // sempre 5, na ordem A–E
  correta: "C",                   // letra da alternativa certa
  explicacao: "C = m ÷ V = 20 g ÷ 0,5 L = 40 g/L."
},
```

Regras: mantenha **5 alternativas**, cada bloco separado por vírgula e os textos entre aspas. O número de perguntas se ajusta sozinho. Se algo estiver errado (letra inválida, ilustração inexistente), o aviso aparece no console do navegador (F12).

Para trocar a ilustração de uma pergunta, mude o campo `ilustracao` para outra chave existente em `ilustracoes.js` (as chaves são os nomes `I.volume`, `I.estados`, `I.atomo` etc.).

## Como publicar na Vercel

**Opção 1: pelo site (mais simples)**
1. Crie uma conta gratuita em <https://vercel.com>.
2. Em *Add New… → Project*, escolha subir/importar a pasta (por exemplo, enviando-a para um repositório no GitHub e importando-o).
3. Em *Framework Preset* deixe **Other**, sem *Build Command* e com *Output Directory* vazio (a pasta raiz é o site).
4. Clique em **Deploy**. A Vercel entrega um endereço `https://nome-do-projeto.vercel.app`.

**Opção 2: pela linha de comando**
```bash
npm i -g vercel
cd quiz-quimica
vercel --prod
```
Responda às perguntas com os padrões (projeto novo, sem build). Para atualizar depois de editar as perguntas, rode `vercel --prod` novamente.
