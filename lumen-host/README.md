# 🏠 Lumen - Host (Application Shell)

> Aplicação principal (Container) construída em Next.js. Ela atua como a "Shell" do sistema, gerenciando o layout global, autenticação e consumindo microfrontends via Module Federation.

## 🔗 Status e Acesso

| Ambiente | URL | Status |
| :--- | :--- | :--- |
| **Produção** | https://host-tech-challenge-financeiro-segu.vercel.app | 🟢 Online |
| **Local** | `http://localhost:3000` | 🟡 Dev |
| **Storybook** | `http://localhost:6006` | 📚 Docs |

---

## 🛠 Tecnologias Utilizadas

* **Core:** Next.js 15+ (Pages Router), React 18
* **Arquitetura:** Module Federation (`@module-federation/nextjs-mf`)
* **Design System:** Storybook 8+ (Documentação)
* **Estilização:** Tailwind CSS
* **Linguagem:** TypeScript
* **Infra:** Docker

---

## 🧩 Arquitetura: Consumo de Remotes

**Configuração de Consumo:**
```typescript
// Importação dinâmica dos microfrontends
const TransacoesApp = dynamic(() => import('funcionalidadesRemote/TransacoesApp'), { ssr: false });
const GraficosApp = dynamic(() => import('funcionalidadesRemote/GraficosApp'), { ssr: false });
```
---

## 🚀 Guia de Desenvolvimento

### Pré-requisitos
* Node.js (v18+)
* Aplicação Remote rodando na porta `3001` (para funcionamento completo)

### Instalação e Execução

1. Instale as dependências:
```bash
npm install
```

2. Inicie o servidor de desenvolvimento apontando para o Remote:
```bash
# Aponta para o remote local por padrão
NEXT_PUBLIC_REMOTE_URL=http://localhost:3001 npm run dev
```
O servidor será iniciado em **http://localhost:3000**.

---

## 📦 Build e Produção

Para gerar a versão de produção (Standalone):

```bash
# 1. Gerar o build
npm run build

# 2. Iniciar servidor
npm start
```

---

## 📚 Storybook (Design System)

Este projeto utiliza o Storybook para documentar os componentes visuais isolados.

### Rodando a Documentação
```bash
npm run storybook
# Acessar em: http://localhost:6006
```

### Estrutura de Componentes
A biblioteca segue o padrão Atomic Design:
* **Atoms:** Avatar, Button, Card, Checkbox, Dialog, Input, Label, Select.
* **Molecules:** Header, Sidebar.
* **Organisms:** Transaction Components (BalanceCard, RecentTransactionRow).
* **Design Tokens:** Paleta de cores e tipografia.

Para gerar o build estático da documentação:
```bash
npm run build-storybook
# Gera a pasta /storybook-static
```

---

## 🐳 Docker

O projeto inclui um `Dockerfile` otimizado. É crucial passar a URL do Remote como variável de ambiente durante a execução do container.

### 1. Build da Imagem
```bash
docker build -t lumen-host .
```

### 2. Executar Container
```bash
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_REMOTE_URL=[http://host.docker.internal:3001](http://host.docker.internal:3001) \
  -e NEXT_PUBLIC_USE_STATIC_PATH=true \
  lumen-host
```
> **Nota:** Se estiver rodando o Remote também no Docker, certifique-se de que ambos estão na mesma network ou use o IP correto.

---

## 📂 Estrutura do Projeto

```text
lumen-host/
├── src/
│   ├── components/        # Componentes UI locais
│   ├── contexts/          # Estado Global (Account, Transactions)
│   ├── pages/             # Rotas da Aplicação
│   ├── stories/           # Arquivos do Storybook (*.stories.tsx)
│   └── styles/            # Configurações do Tailwind
├── next.config.ts         # Configuração dos Remotes
└── package.json
```

---

## ⚙️ Variáveis de Ambiente

| Variável | Valor Exemplo | Descrição |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_REMOTE_URL` | `http://localhost:3001` | URL onde o Host buscará o `remoteEntry.js`. |
| `NEXT_PUBLIC_USE_STATIC_PATH` | `true` | Otimização para caminhos estáticos em produção. |
| `PORT` | `3000` | Porta do servidor Next.js. |