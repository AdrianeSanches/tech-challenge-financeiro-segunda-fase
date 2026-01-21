# 🚀 Deploy na Vercel

## Visão Geral

Este documento descreve o processo completo de deploy dos microfrontends na Vercel, mantendo a comunicação via Module Federation entre `lumen-host` e `funcionalidades-remote`.

## Arquitetura de Deploy

```
┌─────────────────────┐         ┌──────────────────────┐
│   Vercel Project    │         │   Vercel Project     │
│   lumen-host        │◄───────►│ funcionalidades-     │
│   (Production)      │  HTTP   │      remote          │
│   *.vercel.app      │         │   (Production)       │
└─────────────────────┘         │   *.vercel.app       │
                                └──────────────────────┘
```

## Pré-requisitos

- Conta na [Vercel](https://vercel.com)
- Repositório Git configurado (GitHub, GitLab ou Bitbucket)
- Projeto configurado localmente e funcionando

## Passo a Passo

### 1. Preparação do Repositório

Certifique-se de que:
- ✅ Todos os arquivos estão commitados
- ✅ Arquivos `.env.local` e `.env*.local` estão no `.gitignore` (verificação de segurança)
- ✅ `vercel.json` está criado para ambos os projetos

**Nota**: Não é necessário ter um arquivo `.env.local` local para fazer deploy na Vercel. As variáveis de ambiente são configuradas diretamente no painel da Vercel (ver seções 2.3 e 3.3).

### 2. Deploy do Remote (funcionalidades-remote)

**IMPORTANTE**: Sempre fazer deploy do remote primeiro, pois o host precisa da URL do remote.

#### 2.1. Criar Projeto na Vercel

1. Acesse [Vercel Dashboard](https://vercel.com/dashboard)
2. Clique em **"Add New"** → **"Project"**
3. Conecte seu repositório Git
4. Selecione o diretório `funcionalidades-remote`

#### 2.2. Configurar Build Settings

A Vercel detecta automaticamente Next.js, mas verifique:

- **Framework Preset**: Next.js
- **Root Directory**: `funcionalidades-remote`
- **Build Command**: `npm run build` (ou deixar em branco para auto-detecção)
- **Output Directory**: `.next` (ou deixar em branco para auto-detecção)
- **Install Command**: `npm install`

#### 2.3. Configurar Variáveis de Ambiente

**IMPORTANTE**: Para o Module Federation funcionar corretamente na Vercel, é necessário adicionar a seguinte variável:

- **Key**: `NEXT_PRIVATE_LOCAL_WEBPACK`
- **Value**: `true`

Esta variável é essencial para habilitar o webpack local durante o build do Next.js, permitindo que o Module Federation gere corretamente o `remoteEntry.js`.

Outras variáveis (geralmente automáticas):
- `NODE_ENV=production` (automático)
- `NEXT_TELEMETRY_DISABLED=1` (opcional, recomendado)

#### 2.4. Deploy

1. Clique em **"Deploy"**
2. Aguarde o build completar
3. Anote a URL gerada (ex: `https://funcionalidades-remote-xyz.vercel.app`)

#### 2.5. Verificar Deploy

Após o deploy, verifique se o `remoteEntry.js` está acessível:

```bash
curl -I https://funcionalidades-remote-xyz.vercel.app/_next/static/chunks/remoteEntry.js
```

Deve retornar `200 OK`.

**Nota**: Na Vercel, o path é `/_next/static/chunks/remoteEntry.js` (padrão do Next.js), diferente do Docker que usa `/static/chunks/remoteEntry.js`.

### 3. Deploy do Host (lumen-host)

#### 3.1. Criar Projeto na Vercel

1. No dashboard da Vercel, clique em **"Add New"** → **"Project"**
2. Selecione o mesmo repositório Git
3. Selecione o diretório `lumen-host`

#### 3.2. Configurar Build Settings

- **Framework Preset**: Next.js
- **Root Directory**: `lumen-host`
- **Build Command**: `npm run build`
- **Output Directory**: `.next`

#### 3.3. Configurar Variáveis de Ambiente

**CRÍTICO**: Configure as seguintes variáveis:

1. **NEXT_PUBLIC_REMOTE_URL** (Obrigatória)
   - **Key**: `NEXT_PUBLIC_REMOTE_URL`
   - **Value**: `https://funcionalidades-remote-xyz.vercel.app` (URL completa do remote)

2. **NEXT_PRIVATE_LOCAL_WEBPACK** (Obrigatória)
   - **Key**: `NEXT_PRIVATE_LOCAL_WEBPACK`
   - **Value**: `true`
   - Necessária para o Module Federation funcionar corretamente durante o build

Outras variáveis (opcionais):
- `NODE_ENV=production` (automático)
- `NEXT_TELEMETRY_DISABLED=1` (recomendado)
- `NEXT_PUBLIC_ENCRYPTION_KEY` (se necessário para criptografia)

#### 3.4. Deploy

1. Clique em **"Deploy"**
2. Aguarde o build completar
3. O host estará disponível em uma URL como `https://lumen-host-abc.vercel.app`

### 4. Verificação Final

#### 4.1. Testar Module Federation

1. Acesse a URL do host: `https://lumen-host-abc.vercel.app`
2. Abra o DevTools → Console
3. Verifique se não há erros de carregamento do remote
4. Navegue para `/transacoes` e verifique se o componente remoto carrega

#### 4.2. Verificar Logs

No dashboard da Vercel, verifique os logs de build e runtime para garantir que não há erros.

## Configuração de Domínios Customizados

### Remote

1. No projeto do remote, vá em **Settings** → **Domains**
2. Adicione seu domínio customizado (ex: `remote.exemplo.com`)
3. Configure os DNS conforme instruções da Vercel

### Host

1. No projeto do host, vá em **Settings** → **Domains**
2. Adicione seu domínio customizado (ex: `app.exemplo.com`)
3. **IMPORTANTE**: Atualize a variável `NEXT_PUBLIC_REMOTE_URL` no host com o novo domínio do remote

## Troubleshooting

### Erro 404: remoteEntry.js não encontrado

**Sintoma**: `curl -I https://remote-url/_next/static/chunks/remoteEntry.js` retorna 404.

**Causas possíveis**:
1. O arquivo não foi gerado durante o build
2. O path está incorreto no `vercel.json`
3. Build incompleto ou com erros

**Soluções**:

1. **Verifique os logs de build na Vercel**:
   - Vá em **Deployments** → Clique no deployment do remote
   - Verifique se há erros durante o build do webpack
   - Procure por mensagens relacionadas a Module Federation

2. **Verifique se o arquivo foi gerado**:
   - O arquivo deve estar em `.next/static/chunks/remoteEntry.js` após o build
   - Na Vercel, ele é servido automaticamente como `/_next/static/chunks/remoteEntry.js`

3. **Verifique a configuração do `next.config.ts`**:
   ```typescript
   filename: 'static/chunks/remoteEntry.js'
   ```
   - **Não** use `_next/static/chunks/remoteEntry.js` no `filename`
   - O Module Federation gera em `.next/static/chunks/` quando você usa `static/chunks/`
   - O Next.js serve `.next/static/` como `/_next/static/` automaticamente

4. **Force um novo build**:
   - Vá em **Deployments** → Clique nos três pontos (...) do último deployment
   - Selecione **Redeploy**

5. **Teste localmente primeiro**:
   ```bash
   cd funcionalidades-remote
   npm run build
   # Verifique se o arquivo existe:
   ls -la .next/static/chunks/remoteEntry.js
   ```

6. **Verifique o `vercel.json`**:
   - O header CORS deve estar configurado para `/_next/static/chunks/remoteEntry.js`
   - Este é o path **servido** (não o path do arquivo no filesystem)

### Erro: "Failed to load script resources"

**Causa**: O host não consegue acessar o remote.

**Soluções**:
1. Verifique se a URL do remote está correta em `NEXT_PUBLIC_REMOTE_URL`
2. Verifique se o remote está deployado e acessível
3. Verifique se o `remoteEntry.js` está acessível:
   - **Vercel**: `https://remote-url/_next/static/chunks/remoteEntry.js`
   - **Docker**: `http://localhost:3001/static/chunks/remoteEntry.js`
4. Verifique os headers CORS no `vercel.json` do remote
5. Verifique se o path no `vercel.json` está correto: `/_next/static/chunks/remoteEntry.js`

### Erro: "404 Not Found" no remoteEntry.js

**Causa**: O build do remote não gerou o arquivo corretamente.

**Soluções**:
1. Verifique os logs de build do remote
2. **Verifique se a variável `NEXT_PRIVATE_LOCAL_WEBPACK=true` está configurada nas variáveis de ambiente da Vercel**:
   - Vá em **Settings** → **Environment Variables** no projeto do remote
   - Certifique-se de que está configurada para Production, Preview e Development
3. Verifique se o `next.config.ts` do remote está configurado corretamente
4. O script de build no `package.json` já inclui `cross-env NEXT_PRIVATE_LOCAL_WEBPACK=true`, mas a variável também deve estar nas Environment Variables da Vercel para garantir

### Erro: CORS

**Causa**: O remote não permite requisições do host.

**Soluções**:
1. Verifique o `vercel.json` do remote - deve ter header `Access-Control-Allow-Origin: *`
2. Se usar domínios customizados, ajuste o CORS para permitir apenas o domínio do host

### Build Falha no Host

**Causa**: Dependências ou configurações incorretas.

**Soluções**:
1. Verifique se a variável `NEXT_PRIVATE_LOCAL_WEBPACK=true` está configurada nas variáveis de ambiente da Vercel
2. Verifique se a variável `NEXT_PUBLIC_REMOTE_URL` está configurada corretamente com a URL completa do remote
3. Verifique se todas as dependências estão no `package.json`
4. Verifique os logs de build para erros específicos
5. Teste o build localmente: `npm run build`

## Variáveis de Ambiente por Ambiente

### Local (Desenvolvimento)
```env
NEXT_PUBLIC_REMOTE_URL=http://localhost:3001
```

### Docker
```env
NEXT_PUBLIC_REMOTE_URL=http://localhost:3001
NEXT_PUBLIC_USE_STATIC_PATH=true
NODE_ENV=production
```

### Vercel (Produção)

**Remote (funcionalidades-remote):**
```env
NEXT_PRIVATE_LOCAL_WEBPACK=true
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

**Host (lumen-host):**
```env
NEXT_PUBLIC_REMOTE_URL=https://funcionalidades-remote-xyz.vercel.app
NEXT_PRIVATE_LOCAL_WEBPACK=true
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

## Deploy Automático

A Vercel faz deploy automático quando você faz push para a branch principal. Para controlar isso:

1. **Settings** → **Git**
2. Configure quais branches fazem deploy automático
3. Configure preview deployments para pull requests

## Monitoramento

### Analytics

A Vercel oferece analytics básicos:
- **Settings** → **Analytics**
- Ative para monitorar performance

### Logs

- Acesse **Deployments** → Selecione um deployment → **Functions** ou **Build Logs**
- Use para debugar problemas em produção

## Rollback

Se algo der errado:

1. No dashboard da Vercel, vá em **Deployments**
2. Encontre o deployment anterior que funcionava
3. Clique nos três pontos (...) → **Promote to Production**

## Recursos Adicionais

- [Documentação Vercel](https://vercel.com/docs)
- [Next.js na Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Module Federation Guide](https://module-federation.io/)

