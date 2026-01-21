# 🚀 Lumen Financeiro - Micro Frontends

> Projeto desenvolvido como parte do Tech Challenge (Fase 2). Uma aplicação financeira modular utilizando arquitetura de Micro Frontends com Next.js, Docker e Module Federation.

---

## Tech Challenge - Fase 2: Requisitos do desafio

### Estrutura e Design da Interface

#### Home Page

- [x] Atualização: incluir gráficos e análises financeiras para oferecer uma visão detalhada do desempenho financeiro.
- [x] Exibir informações sobre o saldo da conta corrente e um extrato das últimas transações.
- [x] Incluir uma seção para iniciar uma nova transação, com opções para selecionar o tipo de transação e inserir o valor.

#### Listagem de Transações

- [x] Uma página que exibe a lista de transações realizadas, com opções para visualizar detalhes, editar e deletar cada transação.
- [x] Filtro e Pesquisa: implementar filtros avançados e funcionalidade de busca para facilitar a navegação nas transações.
- [x] Paginação e Scroll Infinito: adicionar paginação ou scroll infinito para otimizar o carregamento de grandes volumes de dados.

#### Adicionar/Editar Transação

- [x] Uma página ou modal para adicionar uma nova transação ao banco de dados.
- [x] Formulário deve incluir campos como tipo de transação (depósito, transferência, etc.), valor e data.
- [x] Validação Avançada: implementar validação de entrada avançada e sugestões automáticas para categorias de despesas e receitas.
- [x] Anexos: permitir o upload de recibos ou documentos relacionados a transações.

---

### Tecnologias e Conceitos a Serem Utilizados

#### Desenvolvimento Frontend em Ambientes Cloud

- [x] Configuração para deploy em plataformas cloud como Vercel.
- [x] Implementação de práticas de segurança em ambientes de desenvolvimento.

#### React/Next.js Avançado

- [x] Microfrontends: divisão da aplicação em microfrontends independentes usando Module Federation.
- [x] Gestão de Estado: uso de Context API para gestão de estado complexa.
- [x] TypeScript: aplicação de tipagem estática para melhorar a robustez e manutenção do código.
- [x] SSR (Server-Side Rendering): implementação para otimização de performance e SEO.

#### Design System e UX

- [x] Manutenção do design system para consistência visual e reutilização de componentes.
- [x] Interface intuitiva com boa usabilidade e acessibilidade.
- [x] Use ferramentas como Storybook, Docusaurus ou GitBook para documentar os componentes.
- [x] Explore bibliotecas como Material-UI, Bootstrap ou Tailwind UI para agilizar o desenvolvimento.

#### Docker

- [x] Containerização da aplicação e seus componentes, incluindo o front-end.
- [x] Uso de Docker Compose para orquestração de múltiplos contêineres.

---

### Material para a entrega

- [x] Link do repositório Git do projeto.
- [x] README do projeto com as informações para executá-lo em ambiente de desenvolvimento.
- [x] Vídeo demonstrativo mostrando as funcionalidades implementadas, incluindo a integração de microfrontends, deploy e novas funcionalidades.

---

## 🔗 Acesso Rápido (Ambiente Produtivo)

| Aplicação | URL | Descrição |
| :--- | :--- | :--- |
| **🏠 Host App** | https://host-tech-challenge-financeiro-segu.vercel.app | Aplicação principal (Shell). |
| **🔗 Remote App** | https://remote-tech-challenge-financeiro-se.vercel.app | Micro Frontend de funcionalidades. |

---

## 🔗 Acesso Rápido (Ambiente Local)

Após iniciar os serviços (veja "Getting Started" abaixo), utilize os seguintes endereços:

| Aplicação | URL | Descrição |
| :--- | :--- | :--- |
| **🏠 Host App** | `http://localhost:3000` | Aplicação principal (Shell). |
| **🔗 Remote App** | `http://localhost:3001` | Micro Frontend de funcionalidades. |
| **📚 Storybook** | `http://localhost:6006` | Documentação do Design System. |

---

## ✨ Funcionalidades Implementadas

### 🏠 Home Page
- Dashboard financeiro com saldo da conta.
- Gráficos e análises básicas de transações.
- Seção para iniciar novas transações.
- Interface responsiva e acessível.

### 💳 Gerenciamento de Transações
- Listagem completa de transações com paginação.
- Filtros avançados por tipo, data e valor.
- Funcionalidades CRUD (Criar, Ler, Atualizar, Deletar).
- Formulários com validação avançada (React Hook Form + Zod).
- Interface modal para edição/criação.

### 🏗️ Arquitetura de Microfrontends
- **Host Application** (`lumen-host`): Gerencia roteamento, autenticação e layout global.
- **Remote Application** (`funcionalidades-remote`): Contém a lógica de negócio financeira.
- **Tecnologia:** Module Federation para orquestração e compartilhamento de dependências.
- **Renderização:** SSR (Server-Side Rendering) implementado corretamente.

---

## 🛠 Tecnologias Utilizadas

* **Core:** Next.js 15.5.9, React 18.3.1
* **Linguagem:** TypeScript 5
* **Estilo:** Tailwind CSS 3.4.17, Shadcn/UI
* **Arquitetura:** Module Federation
* **Estado & Forms:** Context API, React Hook Form, Zod
* **Infra:** Docker, Docker Compose
* **Docs:** Storybook 10.1.11

---

## 🚀 Getting Started - Como executar o Projeto

### Pré-requisitos
* Node.js >= 18
* npm >= 8
* Docker >= 20.10 (opcional, mas recomendado)

### Opção 1: Execução Manual

Caso prefira rodar os terminais separadamente:

```bash
# Terminal 1 - Remote Application (porta 3001)
cd funcionalidades-remote
npm install
npm run dev

# Terminal 2 - Host Application (porta 3000)
cd lumen-host
npm install
NEXT_PUBLIC_REMOTE_URL=http://localhost:3001 npm run dev
```

### Opção 2: Execução com Docker

Esta opção sobe todo o ecossistema (Host + Remote) automaticamente.

```bash
# Construir e executar em modo desenvolvimento com logs em tempo real
docker-compose -f docker-compose.dev.yml up --build

# Ou rodar em background (modo detached)
docker-compose -f docker-compose.dev.yml up -d --build
```

---

## 📂 Estrutura do Projeto

O projeto é um Monorepo contendo duas aplicações distintas:

```text
tech-challenge-financeiro-segunda-fase/
├── lumen-host/                     # 🏠 HOST APPLICATION (Shell)
│   ├── src/
│   │   ├── components/             # Componentes locais e importação do Remote
│   │   ├── contexts/               # Estado Global (Transactions, Account)
│   │   ├── hooks/                  # Custom hooks
│   │   ├── lib/                    # Utilitários e tipos
│   │   ├── pages/                  # Rotas Next.js (Pages Router)
│   │   ├── stories/                # Stories do Storybook
│   │   └── styles/                 # Estilos globais
│   ├── next.config.ts              # Configuração do Module Federation (Host)
│   ├── vercel.json                 # Configuração Vercel
│   └── Dockerfile
├── funcionalidades-remote/         # 🔗 REMOTE APPLICATION (Features)
│   ├── src/
│   │   ├── components/
│   │   │   ├── transacoes/         # Lista e CRUD de transações
│   │   │   ├── graficos/           # Visualizações de dados
│   │   │   └── ui/                 # Componentes UI compartilhados
│   │   ├── lib/                    # Utilitários e tipos
│   │   ├── pages/                  # Rotas Next.js (Pages Router)
│   │   └── styles/                 # Estilos globais
│   ├── next.config.ts              # Configuração do Module Federation (Exposes)
│   ├── vercel.json                 # Configuração Vercel
│   └── Dockerfile
├── docs/                           # Documentação detalhada
├── docker-compose.yml              # Orquestração de Produção
├── docker-compose.dev.yml          # Orquestração de Desenvolvimento
└── README.md
```

---

## 📚 Documentação de Componentes (Storybook)

O projeto `lumen-host` inclui o Storybook configurado para documentar o Design System.

**Funcionalidades:**
- Documentação de Atoms (Botões, Inputs) e Molecules.
- Stories interativos para componentes de transações.
- Testes de acessibilidade (addon-a11y).

**Como rodar:**
```bash
cd lumen-host
npm run storybook
# Acesse em http://localhost:6006
```

---

## ☁️ Deploy

### Vercel

Para deploy completo na Vercel, siga a [documentação detalhada](./docs/deploy-vercel.md).

#### Passos Rápidos:

1. **Deploy do Remote primeiro**:
   - Crie um projeto na Vercel apontando para o diretório `funcionalidades-remote`
   - Aguarde o deploy completar e anote a URL gerada

2. **Deploy do Host**:
   - Crie um projeto na Vercel apontando para o diretório `lumen-host`
   - Configure a variável de ambiente:
     - `NEXT_PUBLIC_REMOTE_URL`: URL completa do remote (ex: `https://funcionalidades-remote-xyz.vercel.app`)
   - Faça o deploy

3. **Verificação**:
   - Acesse a URL do host
   - Verifique se os microfrontends carregam corretamente

#### Configuração de Variáveis de Ambiente na Vercel:

**Remote (funcionalidades-remote):**
| Variável | Valor | Onde Configurar |
|----------|-------|-----------------|
| `NEXT_PRIVATE_LOCAL_WEBPACK` | `true` | **Obrigatória** - Ambos os projetos |
| `NODE_ENV` | `production` | Automático |

**Host (lumen-host):**
| Variável | Valor | Onde Configurar |
|----------|-------|-----------------|
| `NEXT_PUBLIC_REMOTE_URL` | URL completa do remote | **Obrigatória** - Projeto lumen-host |
| `NEXT_PRIVATE_LOCAL_WEBPACK` | `true` | **Obrigatória** - Ambos os projetos |
| `NODE_ENV` | `production` | Automático |
| `NEXT_PUBLIC_ENCRYPTION_KEY` | Chave de criptografia (opcional) | Ambos os projetos |

⚠️ **Importante**: 
- O remote deve ser deployado primeiro, pois o host precisa da sua URL.
- `NEXT_PRIVATE_LOCAL_WEBPACK=true` é **obrigatória** para ambos os projetos na Vercel para o Module Federation funcionar corretamente.

### Docker em Produção

Para informações detalhadas do funcionamento do docker no projeto, acesse as [instruções](./docs/docker.md).

```bash
# Build das imagens
docker-compose build

# Deploy
docker-compose up -d

# Verificar status
docker-compose ps
```

---

## 🔍 Monitoramento e Debug

Comandos úteis para verificar a saúde da aplicação:

**Verificar conexão (Health Check):**
```bash
# Host
curl -I http://localhost:3000

# Remote - Desenvolvimento Local (Next.js padrão)
curl -I http://localhost:3001/_next/static/chunks/remoteEntry.js

# Remote - Docker (path diferente)
curl -I http://localhost:3001/static/chunks/remoteEntry.js
```

**Logs dos Containers:**
```bash
docker-compose logs -f
```

## 📜 Scripts Disponíveis

### Host Application (lumen-host)
```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Build para produção
npm run start        # Inicia servidor de produção
npm run lint         # Executa linting
npm run storybook    # Inicia Storybook na porta 6006
npm run build-storybook  # Gera build estático do Storybook
```

### Remote Application (funcionalidades-remote)
```bash
npm run dev         # Inicia servidor de desenvolvimento (porta 3001)
npm run build       # Build para produção
npm run start       # Inicia servidor de produção (porta 3001)
npm run serve:remote # Serve arquivos estáticos (porta 3001)
npm run lint        # Executa linting
```