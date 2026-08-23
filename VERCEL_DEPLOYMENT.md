# Implantação na Vercel

Esta configuração publica a interface Vite no domínio da Vercel e encaminha, no mesmo domínio público, as rotas que exigem servidor para a implantação permanente já validada.

| Caminho público na Vercel | Destino | Motivo |
| --- | --- | --- |
| `/:rota*` | Arquivos Vite em `dist/public` | Entrega a interface e preserva o fallback da SPA. |
| `/api/:rota*` | Servidor permanente da atividade | Mantém criação de tentativas, banco, envio único, correção e Apps Script no servidor já configurado. |
| `/manus-storage/:arquivo*` | Proxy de imagens do servidor permanente | Mantém as imagens científicas sem copiar arquivos grandes para o repositório. |

> Nenhuma credencial é incluída neste repositório. A URL do Apps Script, credenciais de banco e chaves do servidor permanecem somente na hospedagem permanente. A Vercel não recebe nem expõe esses valores nesta arquitetura.

## Variáveis de ambiente na Vercel

**Nenhuma variável de ambiente é obrigatória na Vercel para a arquitetura atual.** A Vercel apenas compila e entrega a interface estática; as requisições para `/api` e `/manus-storage` são encaminhadas para o servidor permanente, onde banco de dados, Apps Script e credenciais já estão configurados.

| Variável | Configurar na Vercel? | Onde permanece |
| --- | --- | --- |
| `GOOGLE_APPS_SCRIPT_URL` | Não | Servidor permanente. |
| `DATABASE_URL` | Não | Servidor permanente. |
| `JWT_SECRET` e chaves de infraestrutura | Não | Servidor permanente. |
| `VITE_*` de infraestrutura Manus | Não | Não são necessárias no build da interface desta implantação. |

## Atualização automática

O arquivo `vercel.json` obriga a Vercel a executar `pnpm build:vercel` e servir `dist/public`. A cada novo commit no ramo `main`, a Vercel deve criar uma nova implantação de produção.

## Limite deliberado

Esta é uma implantação de interface com proxy seguro para o servidor já existente; portanto, não cria uma função Express na Vercel. Migrar integralmente o servidor para Vercel exigiria um banco MySQL externo, a migração dos registros existentes e a configuração manual de segredos no painel da Vercel. Não faça essa migração usando valores no código ou no GitHub.
