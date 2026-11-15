# Maria Luísa Beltran — landing page

Landing page em português, implementada em Angular standalone e SCSS. Entrega local; sem publicação, backend, coleta de dados ou serviços externos de analytics. Fotos e ilustração foram extraídas do documento fornecido em `reference/`; apenas os assets usados estão em `public/assets/`.

## Executar

Requer Node.js `^22.22.3`, `^24.15.0` ou `^26.0.0`, conforme [compatibilidade oficial do Angular 22](https://angular.dev/reference/versions). No Windows, use `npm.cmd` se a política do PowerShell bloquear `npm.ps1`.

```powershell
npm.cmd install
npm.cmd start
```

Acesse `http://127.0.0.1:4200`. O cache npm fica em `.npm-cache/` para respeitar a raiz de escrita do projeto. Após a primeira instalação, preserve o `package-lock.json` gerado.

## Build

```powershell
npm.cmd run build
```

Saída estática em `dist/landing/browser/`. Sirva essa pasta com um servidor HTTP; não abra `index.html` por `file://`. A aplicação é client-side; publicação e prerenderização não estão configuradas nesta entrega local.

## Conteúdo e manutenção

- `src/app/app.ts`: contato, objetivos, planos e perguntas frequentes.
- `src/app/app.html`: estrutura semântica e textos da página.
- `src/app/app.scss` e `src/styles.scss`: identidade visual, responsividade e acessibilidade.
- Os planos não exibem preços. Durações do material: Silver 30 dias, Gold 90 dias e Platinum 180 dias. Valores e condições são tratados no contato.
- Não foram inventados depoimentos, resultados, CRN, endereços ou promessas clínicas. Confirme os dados profissionais e as condições comerciais antes de qualquer publicação futura.

## Verificação

Validar desktop e celular (360 px ou maior), menu móvel, navegação por teclado, âncoras, detalhes expansíveis das perguntas frequentes e destinos do WhatsApp/Instagram. O menu informa seu estado por `aria-expanded`; há link para pular ao conteúdo, foco visível e respeito a movimento reduzido.

A tentativa inicial de instalação no ambiente restrito foi bloqueada com `EACCES` na conexão a `registry.npmjs.org`. Assim, o build e a verificação em navegador dependem da instalação bem-sucedida das dependências; não são apresentados como aprovados sem execução.
