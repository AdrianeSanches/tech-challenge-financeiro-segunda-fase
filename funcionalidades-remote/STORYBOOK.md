# Storybook - Funcionalidades Remote

Este projeto utiliza o Storybook para documentar e testar os componentes de forma isolada.

## 📚 Estrutura de Stories

As stories estão organizadas nas seguintes categorias:

- **foundation/** - Elementos fundamentais como cores e tipografia
- **ui/** - Componentes de interface base (Button, Card, Input, etc.)
- **graficos/** - Componentes de visualização de dados (gráficos)
- **transacoes/** - Componentes relacionados a transações financeiras

## 🚀 Como executar

Para iniciar o Storybook em modo de desenvolvimento:

```bash
npm run storybook
```

O Storybook será iniciado em `http://localhost:6006`

## 📦 Build do Storybook

Para gerar uma versão estática do Storybook:

```bash
npm run build-storybook
```

Os arquivos serão gerados na pasta `storybook-static/`

## 🎨 Componentes Documentados

### UI Components
- **Button** - Botões com diversas variantes e tamanhos
- **Card** - Cartões para exibição de conteúdo
- **Input** - Campos de entrada de dados
- **Label** - Rótulos para campos de formulário
- **Select** - Seleção de opções em dropdown
- **Badge** - Badges para status e categorias
- **Dialog** - Diálogos modais

### Gráficos
- **BarChartTransactions** - Gráfico de barras para transações mensais
- **PieChartExpenses** - Gráfico de pizza para despesas por categoria

### Transações
- **TransactionCard** - Card individual de transação
- **TransactionForm** - Formulário para criar/editar transações

## ⚙️ Configuração

### Addons Instalados

- **@storybook/addon-docs** - Documentação automática
- **@storybook/addon-a11y** - Testes de acessibilidade
- **@storybook/nextjs** - Integração com Next.js

### Arquivos de Configuração

- `.storybook/main.ts` - Configuração principal do Storybook
- `.storybook/preview.ts` - Configurações de preview e estilos globais
- `.storybook/vitest.setup.ts` - Setup para testes com Vitest

## 🧪 Acessibilidade

O addon de acessibilidade (a11y) está configurado em modo `'todo'`, o que significa que as violações de acessibilidade são mostradas na UI de teste mas não fazem o CI falhar.

## 🔗 Recursos

- [Documentação do Storybook](https://storybook.js.org/docs)
- [Storybook para Next.js](https://storybook.js.org/docs/get-started/nextjs)
- [Addon A11y](https://storybook.js.org/addons/@storybook/addon-a11y)
