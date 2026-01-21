# 📦 Funcionalidades - Remote (Micro Frontend)

> Microfrontend Next.js que atua como fornecedor (Remote) para a aplicação Host (`lumen-host`), expondo funcionalidades financeiras via Module Federation.

## 🔗 Status e Acesso

| Ambiente | URL | Status |
| :--- | :--- | :--- |
| **Produção (Vercel)** | https://remote-tech-challenge-financeiro-se.vercel.app | 🟢 Online |
| **Local** | `http://localhost:3001` | 🟡 Dev |

---

## 🛠 Tecnologias Utilizadas

* **Core:** Next.js 15+ (Pages Router), React 18
* **Arquitetura:** Module Federation (`@module-federation/nextjs-mf`)
* **Linguagem:** TypeScript
* **Estilização:** Tailwind CSS
* **UI Components:** Radix UI, Sonner (toasts)
* **Infra:** Docker

---

## 🧩 Módulos Expostos (API)

Este projeto expõe os seguintes componentes para serem consumidos pelo Host.

### Como Integrar no Host

```typescript
// Exemplo de importação no lumen-host
import('funcionalidadesRemote/TransacoesApp')
import('funcionalidadesRemote/GraficosApp')
```

### 1. TransacoesApp

Componente React responsável pelo gerenciamento completo de transações (Listagem, Criação, Edição e Exclusão).

**Props:**

| Propriedade | Tipo | Descrição |
| :--- | :--- | :--- |
| `transactions` | `Transaction[]` | Lista inicial de transações. |
| `onAddTransaction` | `(transaction) => void` | Callback executado ao adicionar uma transação. |
| `onUpdateTransaction` | `(id, data) => void` | Callback executado ao atualizar uma transação. |
| `onDeleteTransaction` | `(id) => void` | Callback executado ao deletar uma transação. |
| `getCurrentBalance` | `() => number` | (Opcional) Função para obter o saldo atual. |

### 2. GraficosApp

Componente React para visualização de dados financeiros.

**Props:**

| Propriedade | Tipo | Descrição |
| :--- | :--- | :--- |
| `transactions` | `Transaction[]` | Lista de transações para análise. |
| `typeGrafico` | `'Bar' | 'Pie'` | Define o tipo de gráfico a ser renderizado. |

---

## 🚀 Guia de Desenvolvimento

### Pré-requisitos
* Node.js (v18+)
* NPM

### Instalação e Execução

1. Instale as dependências:
```bash
npm install
```

2. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```
O servidor será iniciado em **http://localhost:3001**.

---

## 📦 Build e Produção

Para gerar a versão de produção (Standalone):

```bash
# 1. Gerar o build
npm run build

# 2. Iniciar servidor de produção
npm start
```
O servidor rodará na porta **3001**.

### Servir Apenas Estáticos
Para testes ou desenvolvimento específico, é possível servir apenas os arquivos estáticos do build:
```bash
npm run serve:remote
```

---

## 🐳 Docker

O projeto inclui um `Dockerfile` otimizado com multi-stage build.

### 1. Build da Imagem
```bash
docker build -t funcionalidades-remote .
```

### 2. Executar Container
```bash
docker run -p 3001:3001 funcionalidades-remote
```
Acesse em: `http://localhost:3001`

---

## 📂 Estrutura do Projeto

```text
funcionalidades-remote/
├── src/
│   ├── components/
│   │   ├── transacoes/        # Componentes de transações
│   │   ├── graficos/          # Componentes de gráficos
│   │   └── ui/                # Componentes UI compartilhados
│   ├── lib/                   # Utilitários e tipos
│   ├── pages/                 # Páginas Next.js
│   └── styles/                # Estilos globais
├── next.config.ts             # Configuração Module Federation
└── package.json
```

---

## ⚙️ Variáveis de Ambiente

| Variável | Valor Padrão | Descrição |
| :--- | :--- | :--- |
| `PORT` | `3001` | Porta do servidor Next.js. |
| `NEXT_PUBLIC_REMOTE_URL` | `http://localhost:3001` | URL completa do remote (usada para carregar assets). |
| `NEXT_TELEMETRY_DISABLED`| `1` | Desabilita a telemetria do Next.js. |

---

## ⚠️ Notas Importantes

1. **Client-Side Only:** O Module Federation funciona apenas no lado do cliente (browser). O Host deve carregar estes módulos dinamicamente.
2. **Dependências Compartilhadas:** O React e o React-DOM são compartilhados entre Host e Remote para evitar conflitos de versão e duplicidade.
3. **Estilos:** Os estilos Tailwind são compatíveis com o host para manter consistência visual.