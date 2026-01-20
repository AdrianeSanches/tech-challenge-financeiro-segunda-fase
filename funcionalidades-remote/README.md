# Funcionalidades Remote

Microfrontend Next.js que serve como remote para o host (`lumen-host`), expondo funcionalidades via Module Federation:

1. **Transações**: Gerenciamento completo de transações financeiras
2. **Gráficos**: Visualizações de dados financeiros (gráficos de barras e pizza)

## Estrutura

```
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

## Tecnologias

- **Next.js 15+** (Pages Router)
- **Module Federation** (`@module-federation/nextjs-mf`)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Radix UI**
- **Sonner** (toasts)

## Instalação

```bash
npm install
```

## Desenvolvimento

```bash
npm run dev
```

O servidor será iniciado na porta **4202**.

## Build

```bash
npm run build
```

## Produção

Para servir o build em produção:

```bash
npm run serve:remote
```

Isso iniciará um servidor HTTP na porta 4202 servindo os arquivos estáticos do build.

## Variáveis de Ambiente

- `NEXT_PUBLIC_REMOTE_PORT`: Porta do remote (padrão: 4202)
- `NEXT_PUBLIC_REMOTE_URL`: URL completa do remote (padrão: http://localhost:4202)

## Módulos Expostos

### TransacoesApp

Componente React que gerencia transações financeiras.

**Props:**
- `transactions: Transaction[]` - Lista de transações
- `onAddTransaction: (transaction) => void` - Callback para adicionar transação
- `onUpdateTransaction: (id, data) => void` - Callback para atualizar transação
- `onDeleteTransaction: (id) => void` - Callback para deletar transação
- `getCurrentBalance?: () => number` - Função para obter saldo atual

### GraficosApp

Componente React para visualização de gráficos financeiros.

**Props:**
- `transactions: Transaction[]` - Lista de transações para análise
- `typeGrafico: 'Bar' | 'Pie'` - Tipo de gráfico a ser renderizado

## Integração com o Host

O host (`lumen-host`) consome este remote através do Module Federation:

```typescript
import('funcionalidadesRemote/TransacoesApp')
import('funcionalidadesRemote/GraficosApp')
```

## Notas

- Module Federation funciona apenas no cliente (browser)
- React e React-DOM são compartilhados entre host e remote
- Os estilos Tailwind são compatíveis com o host para manter consistência visual

