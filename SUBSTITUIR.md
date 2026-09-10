# O que precisa virar dado real antes de publicar

Nada aqui impede o site de rodar — os campos aparecem como `{{PLACEHOLDER}}` ou são
omitidos automaticamente enquanto não forem preenchidos. Mas **o site não deve ir ao ar
sem os itens da seção 1**, porque são exigência de publicidade da advocacia e de LGPD.

Quase tudo está em **um arquivo só**: `src/config/escritorio.ts`.

---

## 1. Bloqueadores para publicar

| Campo | Onde | Por que é bloqueador |
|---|---|---|
| `{{REGISTRO_SOCIEDADE_OAB_PR}}` | `src/config/escritorio.ts` → `escritorio.registroOAB` | Identificação obrigatória do responsável; hoje o rodapé simplesmente não mostra a linha |
| `{{SOCIO_1_NOME}}`, `{{SOCIO_1_OAB}}` | `escritorio.ts` → `profissionais[0]` | A página `/profissionais` está literalmente exibindo o placeholder |
| `{{SOCIO_2_NOME}}`, `{{SOCIO_2_OAB}}` | `escritorio.ts` → `profissionais[1]` | idem |
| `{{ENCARREGADO_LGPD_NOME}}` e `{{ENCARREGADO_LGPD_EMAIL}}` | `escritorio.ts` → `encarregadoLGPD` | A Política de Privacidade precisa indicar o encarregado (art. 41 da LGPD). Enquanto vazio, cai no e-mail geral |
| `{{CNPJ}}` | `escritorio.ts` → `escritorio.cnpj` | Aparece no rodapé e na Política; hoje a linha é omitida |

Se um sócio não quiser bio publicada, apague o texto — o campo aceita string vazia sem
quebrar o layout. Se houver mais de dois profissionais, é só acrescentar itens ao array.

## 2. Recomendados (o site funciona sem, mas fica melhor com)

| Campo | Onde | Observação |
|---|---|---|
| `{{CEP}}` | `escritorio.ts` → `endereco.cep` | Entra no endereço e no dado estruturado do Google |
| `{{HORARIO_ATENDIMENTO}}` | `escritorio.ts` | Ex.: "Atendimento de segunda a sexta, das 9h às 18h" |
| `{{SOCIO_N_BIO}}` | `escritorio.ts` → `profissionais[].bio` | 60 a 90 palavras. Sem prêmio, ranking ou número de casos |
| `{{SOCIO_N_FORMACAO}}` | `escritorio.ts` → `profissionais[].formacao` | Array — aceita várias linhas |

## 3. Imagens

O site **não depende de nenhuma fotografia** e não referencia nenhum arquivo de imagem
externo. Tudo que é visual foi feito com o logo real, SVG autoral ou tipografia.

| Slot | Onde | Proporção | Hoje |
|---|---|---|---|
| Retrato dos profissionais | `src/app/profissionais/page.tsx` | **4:5 vertical** | Bloco petróleo com as iniciais do sócio |
| Textura do hero | `src/app/page.tsx` → `MarcaDaguaArquitetonica` | — | Malha arquitetônica em SVG, gerada em código |
| Imagem de compartilhamento (OG) | `src/app/opengraph-image.tsx` | 1200×630 | Gerada automaticamente com a paleta do escritório |

Se um dia houver fotografia dos sócios, substituir só o bloco marcado com o comentário
`Retrato tipográfico` em `profissionais/page.tsx`. Use 4:5 para não quebrar o grid.

## 4. Textos que dependem de decisão do escritório

- **Bios dos sócios** — único conteúdo textual que não pude escrever, porque depende de
  trajetória real. Não invente número de anos de experiência nem "atuação destacada".
- **Horário de atendimento** — se o escritório não atende sem agendamento, vale dizer isso.
- Todo o restante do conteúdo (home, quatro páginas de atuação, o escritório, política de
  privacidade e os dois artigos) já está escrito e revisado.

## 5. Antes de publicar, conferir

- [ ] Preencheu tudo da seção 1
- [ ] Leu os dois artigos de Insights e concorda com o conteúdo técnico
- [ ] Definiu o encarregado de LGPD e ele sabe que vai receber solicitações do art. 18
- [ ] Configurou `RESEND_API_KEY` **ou** aceita que a mensagem fique só no log (ver README)
- [ ] Apontou o domínio `santosesuzuki.com` na Vercel
