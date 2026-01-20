# Storybook - Lumen Host

Este projeto utiliza o Storybook para documentar e testar os componentes de forma isolada.

## 📚 Estrutura de Stories

As stories estão organizadas nas seguintes categorias:

- **foundation/** - Elementos fundamentais como cores e tipografia
- **atoms/** - Componentes atômicos base (Button, Card, Input, Avatar, etc.)
- **molecules/** - Componentes compostos (Header, Sidebar)
- **transaction/** - Componentes relacionados a transações financeiras
- **utils/** - Componentes utilitários (InfosCard)

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

### Atoms (Componentes Atômicos)
- **Avatar** - Avatares de usuários com estados e variantes
- **Button** - Botões com diversas variantes e tamanhos
- **Card** - Cartões para exibição de conteúdo
- **Checkbox** - Caixas de seleção para formulários
- **Dialog** - Diálogos modais
- **Input** - Campos de entrada de dados
- **Label** - Rótulos para campos de formulário
- **Select** - Seleção de opções em dropdown

### Molecules (Componentes Compostos)
- **Header** - Cabeçalho da aplicação
- **Sidebar** - Barra lateral de navegação

### Transaction (Transações)
- **BalanceCard** - Card de exibição de saldo
- **RecentTransactionRow** - Linha individual de transação recente
- **RecentTransactions** - Lista de transações recentes

### Utils (Utilitários)
- **InfosCard** - Card informativo genérico

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

## 🏗️ Arquitetura

Este projeto utiliza a metodologia Atomic Design para organização dos componentes:

- **Atoms**: Componentes básicos indivisíveis (Button, Input, Label)
- **Molecules**: Combinação de atoms formando componentes mais complexos (Header, Sidebar)
- **Organisms**: Combinações de molecules e atoms (páginas completas, seções complexas)

## 🔗 Module Federation

O Lumen Host atua como aplicação host no padrão Module Federation, consumindo componentes remotos do `funcionalidades-remote`. O Storybook permite testar os componentes do host de forma isolada.

## 🔗 Recursos

- [Documentação do Storybook](https://storybook.js.org/docs)
- [Storybook para Next.js](https://storybook.js.org/docs/get-started/nextjs)
- [Addon A11y](https://storybook.js.org/addons/@storybook/addon-a11y)
- [Atomic Design Methodology](https://atomicdesign.bradfrost.com/)
