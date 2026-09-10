# Site institucional — Santos & Suzuki Advocacia

Site em Next.js (App Router) + TypeScript + Tailwind CSS. Conteúdo em português,
artigos em MDX, sem CMS e sem banco de dados.

- **Domínio de produção:** santosesuzuki.com
- **Antes de publicar:** ler [`SUBSTITUIR.md`](./SUBSTITUIR.md) — há dados obrigatórios
  (inscrição na OAB, nomes dos sócios, encarregado de LGPD) ainda por preencher.

---

## Rodar localmente

Requer Node.js 20 ou superior.

```bash
npm install
npm run dev
```

Abre em <http://localhost:3000>.

Outros comandos:

```bash
npm run build     # build de produção
npm start         # roda o build de produção
npm run lint      # ESLint
npx tsc --noEmit  # checagem de tipos
```

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha o que for usar.

| Variável | Obrigatória | Para quê |
|---|---|---|
| `RESEND_API_KEY` | não | Chave da API do [Resend](https://resend.com), usada para enviar o formulário de contato por e-mail |
| `CONTATO_REMETENTE` | não | Remetente verificado no Resend, ex.: `Site Santos & Suzuki <site@santosesuzuki.com>` |
| `CONTATO_DESTINATARIO` | não | Para onde as mensagens vão. Se vazio, usa `contato@santosesuzuki.com` |

**Sem essas variáveis o site funciona normalmente.** O formulário valida, aceita o envio e
mostra a confirmação ao visitante, mas a mensagem fica registrada apenas no log do servidor,
com o prefixo `[contato]`. Isso é proposital: permite publicar o site antes de resolver o
e-mail, sem página quebrada. **Só não esqueça de configurar depois** — enquanto isso, ninguém
recebe as mensagens.

## Onde mexer no conteúdo

Quase nada exige mexer em JSX:

| O que | Arquivo |
|---|---|
| Endereço, telefone, e-mail, OAB, CNPJ, sócios | `src/config/escritorio.ts` |
| Textos da home ("quando atuamos", metodologia) | `src/content/home.ts` |
| As quatro páginas de atuação | `src/content/atuacao.ts` |
| Itens do menu | `src/config/navegacao.ts` |
| Política de Privacidade | `src/app/politica-de-privacidade/page.tsx` |
| Cores e tipografia | `src/app/globals.css` (bloco `@theme`) |

## Publicar um artigo novo

1. Crie um arquivo `.mdx` em `content/insights/`. O nome do arquivo vira a URL:
   `meu-artigo.mdx` → `/insights/meu-artigo`. Use só minúsculas, sem acento, com hífen.

2. Comece pelo frontmatter:

   ```mdx
   ---
   titulo: "Título do artigo"
   descricao: "Uma ou duas frases. Aparece na listagem, no Google e no compartilhamento."
   data: "2026-09-15"
   autor: "Santos & Suzuki Advocacia"
   tags: ["Recuperação judicial"]
   rascunho: false
   ---

   Primeiro parágrafo do texto.

   ## Um subtítulo

   Mais texto. **Negrito** e *itálico* funcionam normalmente.
   ```

3. `titulo` e `data` são obrigatórios — sem eles o build falha de propósito, com o nome do
   arquivo no erro. `data` no formato `AAAA-MM-DD`. A ordem da listagem é pela data,
   da mais nova para a mais antiga.

4. `rascunho: true` deixa o artigo visível em `npm run dev` e **invisível em produção**. Use
   para escrever com calma. Quando estiver pronto, troque para `false`.

5. O tempo de leitura é calculado sozinho. Não precisa preencher.

6. Salve e faça o deploy (ver abaixo). O artigo entra automaticamente na home, na listagem e
   no sitemap.

## Deploy na Vercel

O projeto não precisa de configuração especial — a Vercel detecta Next.js sozinha.

**Primeira vez:**

1. Suba o repositório para o GitHub.
2. Em <https://vercel.com/new>, importe o repositório.
3. Em *Environment Variables*, adicione `RESEND_API_KEY`, `CONTATO_REMETENTE` e
   `CONTATO_DESTINATARIO` se já tiver o e-mail configurado. Pode deixar para depois.
4. *Deploy*.

**Apontar o domínio santosesuzuki.com:**

1. No projeto na Vercel: *Settings → Domains → Add*, digite `santosesuzuki.com`.
2. A Vercel mostra os registros de DNS a criar. Normalmente:
   - registro `A` de `@` apontando para `76.76.21.21`
   - registro `CNAME` de `www` apontando para `cname.vercel-dns.com`
3. Crie esses registros no painel de onde o domínio foi comprado (Registro.br, GoDaddy etc.).
4. A propagação leva de alguns minutos a algumas horas. O certificado HTTPS é emitido
   sozinho depois disso.

**Depois:** cada `git push` na branch principal publica automaticamente.

## Decisões técnicas que valem conhecer

- **Paleta e logo vêm do timbrado real** das petições do escritório: petróleo `#002B33`,
  limão `#C0CF13`. O limão tem contraste ≈1.7:1 sobre fundo claro, o que reprova em WCAG AA
  — por isso ele só aparece como elemento gráfico (filetes, marcadores) ou como texto sobre
  o petróleo. Em fundo claro o logo usado é a versão monocromática `logo-petroleo.png`.
  **Não use `text-limao` sobre fundo claro.**
- **Sem dark mode**, por decisão de projeto. `color-scheme: light` fixo.
- **Sem cookies, sem analytics, sem scripts de terceiros.** É o que permite o site não ter
  banner de consentimento. Se um dia adicionar Google Analytics ou Meta Pixel, será preciso
  incluir banner e revisar a Política de Privacidade.
- **Antispam sem CAPTCHA:** campo honeypot invisível, tempo mínimo de preenchimento (3s) e
  limite de 5 envios por IP por hora. O limite é em memória — zera a cada deploy e não é
  compartilhado entre regiões. Para um site institucional, é suficiente.
- **MDX** é lido do disco com `next-mdx-remote/rsc`. Não usamos Contentlayer, que está sem
  manutenção e quebra em versões recentes do Next.

## Conformidade

O conteúdo foi escrito respeitando o Código de Ética e Disciplina da OAB e o Provimento
CFOAB nº 205/2021: sem promessa de resultado, sem expressão de superioridade, sem valores de
honorários, sem caso com resultado identificável e sem chamada de captação de clientela.

**Ao editar textos, mantenha esse critério.** Evite superlativo, "especialista" (é título com
requisito formal), "melhor", "líder", contagem de casos ganhos e depoimento de cliente.
