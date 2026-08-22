# Registro de validação pública

Em 22 de agosto de 2026, a versão publicada em `https://bio2dsactv-kdvb4ut4.manus.space/` foi verificada com carregamento novo. A página mostrou o selo **Conectado** e as duas imagens efetivamente usadas nos enunciados foram carregadas com dimensões naturais válidas: a micrografia HeLa (`1200 × 900`) e o modelo de DNA/RNA (`1920 × 1080`).

Não há `service worker` registrado pelo site, e as meta tags do projeto declaram `mobile-web-app-capable=no` e `apple-mobile-web-app-capable=no`. A plataforma de publicação, porém, substitui o manifesto declarado pelo projeto por `/__manus/pwa/manifest.webmanifest`; esse comportamento não é controlado pelo código React, HTML ou CSS da atividade.

Da mesma forma, o aviso visual **Made with Manus** é inserido pela camada de publicação fora da árvore DOM controlada pelo aplicativo. Ele não aparece no código-fonte do projeto nem pode ser removido com uma alteração segura da aplicação. A remoção depende de uma opção oficial de branding, domínio ou plano oferecida pela hospedagem.

Também foi realizada uma captura da URL publicada com largura de **375 px** e agente de navegador móvel. O layout mostrou o selo **Conectado**, o formulário e os elementos de leitura sem transbordamento; não houve sugestão visível de baixar ou instalar aplicativo. A captura confirmou, entretanto, que o selo externo **Made with Manus** continua sobreposto pela plataforma.

## Validação da implantação Vercel

Em 22 de agosto de 2026, o domínio `https://2-c-biologia-em.vercel.app/` foi validado após a configuração de interface Vite com rewrites para o servidor permanente. A página entregou HTML, bundle JavaScript, lista pública de estudantes e as duas imagens científicas usadas pela atividade. A consulta de estudantes respondeu com HTTP 200 através de `/api/trpc` sem criar tentativas nem enviar respostas.

No domínio Vercel, a página não contém **Made with Manus**, utiliza somente `/no-install.webmanifest`, não possui `service worker` registrado e declara `mobile-web-app-capable=no` e `apple-mobile-web-app-capable=no`. Dessa forma, a marca e o manifesto injetados no domínio `manus.space` não acompanham a implantação Vercel.
