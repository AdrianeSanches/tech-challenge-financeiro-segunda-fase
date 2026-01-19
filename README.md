## Tech Challenge - Fase 2: Requisitos do desafio

### Estrutura e Design da Interface

#### Home Page

- [x] Atualização: incluir gráficos e análises financeiras para oferecer uma visão detalhada do desempenho financeiro.
- [x] Exibir informações sobre o saldo da conta corrente e um extrato das últimas transações.
- [x] Incluir uma seção para iniciar uma nova transação, com opções para selecionar o tipo de transação e inserir o valor.
- [ ] *Plus = Personalização: permitir que o usuário personalize o dashboard com widgets de interesse, como metas de economia e alertas de gastos.

#### Listagem de Transações

- [x] Uma página que exibe a lista de transações realizadas, com opções para visualizar detalhes, editar e deletar cada transação.
- [x] Filtro e Pesquisa: implementar filtros avançados e funcionalidade de busca para facilitar a navegação nas transações.
- [x] Paginação e Scroll Infinito: adicionar paginação ou scroll infinito para otimizar o carregamento de grandes volumes de dados.

#### Adicionar/Editar Transação

- [x] Uma página ou modal para adicionar uma nova transação ao banco de dados.
- [x] Formulário deve incluir campos como tipo de transação (depósito, transferência, etc.), valor e data.
- [ ] Validação Avançada: implementar validação de entrada avançada e sugestões automáticas para categorias de despesas e receitas.
- [ ] Anexos: permitir o upload de recibos ou documentos relacionados a transações.

---

### Tecnologias e Conceitos a Serem Utilizados

#### Desenvolvimento Frontend em Ambientes Cloud

- [ ] Configuração para deploy em plataformas cloud como Vercel.
- [ ] Implementação de práticas de segurança em ambientes de desenvolvimento.

#### React/Next.js Avançado

- [x] Microfrontends: divisão da aplicação em microfrontends independentes usando Module Federation.
- [x] Gestão de Estado: uso de Context API para gestão de estado complexa.
- [x] TypeScript: aplicação de tipagem estática para melhorar a robustez e manutenção do código.
- [x] SSR (Server-Side Rendering): implementação para otimização de performance e SEO.

#### Design System e UX

- [x] Manutenção do design system para consistência visual e reutilização de componentes.
- [x] Interface intuitiva e fácil de navegar, com uma boa organização das informações.
- [ ] Implementação de práticas de acessibilidade, como navegação por teclado e contrastes adequados.
- [x] Use ferramentas como Storybook, Docusaurus ou GitBook para documentar os componentes.
- [x] Explore bibliotecas como Material-UI, Bootstrap ou Tailwind UI para agilizar o desenvolvimento.

#### Docker

- [ ] Containerização da aplicação e seus componentes, incluindo o front-end.
- [ ] Uso de Docker Compose para orquestração de múltiplos contêineres.

---

### Material para a entrega

- [ ] Link do repositório Git do projeto.
- [x] README do projeto com as informações para executá-lo em ambiente de desenvolvimento.
- [ ] Vídeo demonstrativo mostrando as funcionalidades implementadas, incluindo a integração de microfrontends, deploy e novas funcionalidades.


## Getting Started - Passo a passo de como executar o Projeto no ambiente de desenvolvimento

### Pré-requisitos
```bash
Node.js >= 18
npm >= 8
Docker >= 20.10 (opcional, para execução containerizada)
```

### Execução Local (Desenvolvimento)

#### Método 1: Execução Manual
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

#### Método 2: Execução com Docker (Recomendado)
```bash
# Construir e executar em modo desenvolvimento
docker-compose -f docker-compose.dev.yml up --build

# Ou em background
docker-compose -f docker-compose.dev.yml up -d --build
```

### Acessar a Aplicação

Após iniciar os serviços, acesse:

- **Host Application**: http://localhost:3000
- **Página Inicial**: http://localhost:3000
- **Transações**: http://localhost:3000/transacoes
- **Investimentos**: http://localhost:3000/investimentos

---

### Funcionalidades Implementadas

#### 🏠 Home Page
- Dashboard financeiro com saldo da conta
- Gráficos e análises básicas de transações
- Seção para iniciar novas transações
- Interface responsiva e acessível

#### 💳 Gerenciamento de Transações
- Listagem completa de transações com paginação
- Filtros avançados por tipo, data e valor
- Funcionalidades CRUD (Criar, Ler, Atualizar, Deletar)
- Formulários com validação avançada
- Interface modal para edição/criação

#### 🏗️ Arquitetura de Microfrontends
- **Host Application** (lumen-host): Gerencia roteamento e layout
- **Remote Application** (funcionalidades-remote): Contém lógica de negócio
- Module Federation para comunicação entre aplicações
- SSR (Server-Side Rendering) implementado
- TypeScript em toda a aplicação

#### 🐳 Containerização
- Dockerfiles otimizados para produção
- Docker Compose para orquestração
- Configurações separadas para desenvolvimento e produção
- Health checks implementados

## Estrutura do Projeto

```
tech-challenge-financeiro-segunda-fase/
├── lumen-host/                    # 🏠 HOST APPLICATION
│   ├── src/
│   │   ├── components/
│   │   │   ├── TransacoesMicroFrontend.tsx
│   │   │   └── InvestimentosMicroFrontend.tsx
│   │   ├── contexts/
│   │   │   ├── transactions-context.tsx
│   │   │   └── account-context.tsx
│   │   └── pages/
│   │       ├── index.tsx
│   │       ├── transacoes.tsx
│   │       └── investimentos.tsx
│   ├── next.config.ts
│   ├── Dockerfile
│   └── package.json
├── funcionalidades-remote/         # 🔗 REMOTE APPLICATION
│   ├── src/
│   │   └── components/
│   │       ├── transacoes/
│   │       │   ├── TransacoesApp.tsx
│   │       │   └── TransactionList.tsx
│   │       └── investimentos/
│   │           └── InvestimentosApp.tsx
│   ├── next.config.ts
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
├── docker-compose.dev.yml
├── README.md
└── README-DOCKER.md
```

## Tecnologias Utilizadas

- **Next.js 15.5.9**: Framework React com SSR/SSG
- **React 18.3.1**: Biblioteca UI
- **TypeScript 5**: Tipagem estática
- **Tailwind CSS 3.4.17**: Estilização utilitária
- **Module Federation**: Arquitetura de microfrontends
- **Docker**: Containerização
- **Context API**: Gestão de estado
- **React Hook Form + Zod**: Validação de formulários
- **Shadcn/UI**: Componentes de UI acessíveis

## Scripts Disponíveis

### Host Application (lumen-host)
```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Build para produção
npm run start    # Inicia servidor de produção
npm run lint     # Executa linting
```

### Remote Application (funcionalidades-remote)
```bash
npm run dev         # Inicia servidor de desenvolvimento (porta 3001)
npm run build       # Build para produção
npm run start       # Inicia servidor de produção (porta 3001)
npm run serve:remote # Serve arquivos estáticos (porta 3001)
npm run lint        # Executa linting
```

### Docker
```bash
# Desenvolvimento
docker-compose -f docker-compose.dev.yml up --build
docker-compose -f docker-compose.dev.yml down

# Produção
docker-compose up --build
docker-compose down

# Limpeza
docker system prune -a
```

## Deploy

### Vercel (Recomendado)
1. Conecte o repositório no Vercel
2. Configure as variáveis de ambiente:
   - `NEXT_PUBLIC_REMOTE_URL`: URL do remote deployado
3. Deploy automático será executado

### Docker em Produção
```bash
# Build das imagens
docker-compose build

# Deploy
docker-compose up -d

# Verificar status
docker-compose ps
```

## Monitoramento e Debug

### Verificar se aplicações estão ativas
```bash
# Host
curl -I http://localhost:3000

# Remote
curl -I http://localhost:3001/static/chunks/remoteEntry.js
```

### Logs das aplicações
```bash
# Docker logs
docker-compose logs -f

# Ver logs específicos
docker-compose logs -f lumen-host
docker-compose logs -f funcionalidades-remote
```

### Health Checks
```bash
# Verificar containers
docker-compose ps

# Health check manual
docker-compose exec lumen-host wget -q --spider http://localhost:3000
docker-compose exec funcionalidades-remote wget -q --spider http://localhost:3001
```
