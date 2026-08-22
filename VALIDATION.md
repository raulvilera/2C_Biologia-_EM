# Registro de validação pública

Em 22 de agosto de 2026, a versão publicada em `https://bio2dsactv-kdvb4ut4.manus.space/` foi verificada com carregamento novo. A página mostrou o selo **Conectado** e as duas imagens efetivamente usadas nos enunciados foram carregadas com dimensões naturais válidas: a micrografia HeLa (`1200 × 900`) e o modelo de DNA/RNA (`1920 × 1080`).

Não há `service worker` registrado pelo site, e as meta tags do projeto declaram `mobile-web-app-capable=no` e `apple-mobile-web-app-capable=no`. A plataforma de publicação, porém, substitui o manifesto declarado pelo projeto por `/__manus/pwa/manifest.webmanifest`; esse comportamento não é controlado pelo código React, HTML ou CSS da atividade.

Da mesma forma, o aviso visual **Made with Manus** é inserido pela camada de publicação fora da árvore DOM controlada pelo aplicativo. Ele não aparece no código-fonte do projeto nem pode ser removido com uma alteração segura da aplicação. A remoção depende de uma opção oficial de branding, domínio ou plano oferecida pela hospedagem.

Também foi realizada uma captura da URL publicada com largura de **375 px** e agente de navegador móvel. O layout mostrou o selo **Conectado**, o formulário e os elementos de leitura sem transbordamento; não houve sugestão visível de baixar ou instalar aplicativo. A captura confirmou, entretanto, que o selo externo **Made with Manus** continua sobreposto pela plataforma.

## Validação da implantação Vercel

Em 22 de agosto de 2026, o domínio `https://2-c-biologia-em.vercel.app/` foi validado após a configuração de interface Vite com rewrites para o servidor permanente. A página entregou HTML, bundle JavaScript, lista pública de estudantes e as duas imagens científicas usadas pela atividade. A consulta de estudantes respondeu com HTTP 200 através de `/api/trpc` sem criar tentativas nem enviar respostas.

No domínio Vercel, a página não contém **Made with Manus**, utiliza somente `/no-install.webmanifest`, não possui `service worker` registrado e declara `mobile-web-app-capable=no` e `apple-mobile-web-app-capable=no`. Dessa forma, a marca e o manifesto injetados no domínio `manus.space` não acompanham a implantação Vercel.

## Recursos visuais e alternativas em relevo

Foram preparados dez recursos científicos reais e distintos, um para cada identificador de enunciado. A prévia visual confirmou o carregamento da micrografia de células HeLa e da estrutura experimental DNA-RNA, ambas com crédito na interface. As alternativas objetivas agora usam fundo azul-escuro, tipografia branca em negrito, contorno luminoso e relevo. Na verificação de interação, uma alternativa marcada permaneceu selecionada com deslocamento vertical de `5px`, sombra reduzida de botão pressionado e texto calculado em branco.

A implantação Vercel associada ao commit `e56a2a3` foi aberta diretamente com uma prévia local que não criou tentativa nem enviou respostas. As duas primeiras questões exibiram suas imagens reais distintas e carregadas. Depois da seleção de uma alternativa, a verificação no navegador confirmou o valor marcado, texto branco, deslocamento vertical de `5px`, sombra de botão pressionado e brilho de contorno. A mesma verificação confirmou que as duas imagens visíveis possuíam dimensões naturais válidas.

Uma segunda verificação no domínio público da Vercel em viewport móvel emulada de **375 × 1600 px** confirmou a primeira questão com micrografia real carregada, texto legível e botões azul-escuros. A alternativa marcada apresentou o indicador dourado, contorno luminoso e relevo afundado. A verificação do navegador no mesmo viewport confirmou a alternativa `A` selecionada, texto branco, `transform` vertical de `5px` e duas imagens de enunciado carregadas com dimensões naturais `1090 × 818` e `500 × 500`.

Após o commit `11d423c`, a Vercel passou a entregar o novo stylesheet com o estado claro `#b8d0dc` e `object-fit: contain` para os cartões de imagem. A validação visual do domínio público permanece em andamento para registrar os novos estados de alternativa e os recursos substituídos.

No domínio público da Vercel, uma prévia local sem dados de alunos confirmou três recursos reais e distintos carregados: micrografia de células HeLa (`1090 × 818`), laboratório de RNA (`1260 × 840`) e gel de agarose com DNA (`3840 × 2550`). A alternativa não selecionada apresentou fundo claro e texto azul-petróleo; a alternativa selecionada apresentou gradiente azul-escuro e texto branco.

Na versão com imagens redimensionadas, o domínio Vercel confirmou que a alternativa marcada preserva texto branco e deslocamento de `5px`, enquanto as não marcadas mantêm fundo claro e texto azul-petróleo. A imagem de laboratório de RNA otimizada e a imagem de gel de DNA otimizada foram carregadas com êxito; a segunda apresentou dimensões naturais de `1506 × 1000`. As quatro imagens novas foram reduzidas para arquivos entre aproximadamente `155 KB` e `229 KB` antes da publicação.

## Envio único por aluno

Foi criada a tabela `biology_student_submissions`, cuja chave primária é o identificador do estudante. No envio, o servidor reserva esse identificador antes de registrar as respostas; uma nova tentativa do mesmo aluno, inclusive com outro `activityId`, é recusada pelo banco. A migração também registrou os envios já existentes: a conferência retornou **4** reservas para **4** atividades submetidas. Os testes do roteador cobrem tanto a segunda submissão quanto a tentativa de iniciar uma nova atividade após o envio.

Após a publicação do backend, a rota pública de criação da atividade foi consultada pelo domínio da Vercel para um identificador já reservado. O servidor respondeu com a mensagem de bloqueio **“Cada aluno pode enviar apenas uma vez”**, sem criar nova atividade. A validação usou somente o identificador numérico interno de uma submissão de teste já existente e não enviou respostas.

## DNA 3D animado

A abertura foi verificada na prévia em desktop e em largura móvel de **375 px**. A nova visualização apresenta as duas fitas de DNA, grupos fosfato, açúcares, pares A–T e C–G e as ligações internas entre as bases. O modelo ocupa o cartão da abertura sem encobrir o conteúdo de identificação e inclui suporte a `prefers-reduced-motion` para interromper a rotação contínua quando solicitado pelo dispositivo.

No domínio Vercel, o cartão atualizado carregou com **14** pares de bases e com a animação `hero-dna-spin` de **14 segundos** em rotação contínua. A mesma composição foi verificada na prévia móvel de 375 px, mantendo a hélice legível, centralizada e sem deslocar o formulário de identificação.

A validação pública móvel foi concluída no domínio da Vercel com viewport de **375 × 812 px**. A captura confirmou o cartão de **320 px** de altura, a hélice centralizada e o texto de estrutura visível; a inspeção retornou **14** pares de bases e a animação `hero-dna-spin` de 14 segundos ativa.

## Questões permanentes

Na prévia sem atividade salva nem estudante selecionado, as dez questões foram carregadas diretamente pela consulta pública de prévia. A página exibiu os números **01 a 10** em sequência, com ordem e alternativas embaralhadas pela chave do acesso. A seleção de estudante permaneceu disponível somente para criar o registro que permite o envio único das respostas.

O deployment Vercel do commit `52d30e6` foi validado sem selecionar estudante nem enviar respostas. Após a conclusão das consultas públicas, exibiu as dez questões numeradas de **01 a 10**, alternativas embaralhadas e o aviso de que a identificação é necessária apenas antes do envio final.

## Identificação automática

Na prévia local, a seleção de um estudante preencheu imediatamente os campos somente para leitura de **número de chamada**, **RA**, **dígito** e **e-mail institucional**. Não há botão “Iniciar atividade”; a seleção por si só não criou tentativa nem enviou respostas. O teste do roteador também confirma que os dados exibidos correspondem ao registro escolar selecionado.

No domínio Vercel, a seleção atualizada preencheu os quatro campos solicitados e a inspeção confirmou que não existe botão “Iniciar atividade”. Durante essa seleção, não houve requisição para criar atividade nem para enviar respostas; a criação continua reservada exclusivamente ao envio final.

O caminho de criação sob demanda também foi validado no domínio Vercel com um identificador técnico já reservado: a rota recusou o pedido com a mensagem **“Este estudante já enviou a atividade. Cada aluno pode enviar apenas uma vez.”** Nenhuma atividade ou resposta adicional foi registrada.

## Divisória temática

A prévia móvel em 375 px confirmou a nova divisória entre a identificação e as questões. Ela apresenta o título **“ATIVIDADE DE BIOLOGIA (3º BIMESTRE)”**, os temas **DNA, RNA, Tradução e Replicação** e uma sombra inferior aplicada ao título, preservando a hierarquia visual sem interferir nos cartões de questões.

Após a publicação, o domínio Vercel confirmou a presença da divisória no estado inicial público, antes da primeira questão. A verificação em 375 px preservou a leitura do título, dos temas e a sombra tipográfica; as questões continuaram disponíveis sem seleção prévia de estudante.

A captura explícita do endereço `https://2-c-biologia-em.vercel.app/` em viewport móvel de **375 × 812 px** confirmou a divisória no próprio domínio publicado. O título ficou legível em três linhas — **“ATIVIDADE DE BIOLOGIA (3º BIMESTRE)”** —, mantendo a sombra inferior discreta; a linha **“Temas: DNA, RNA, Tradução, Replicação.”** também permaneceu visível antes das questões.
