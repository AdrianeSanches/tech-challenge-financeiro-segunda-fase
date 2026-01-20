# Lumen Host

Aplicação host Next.js que serve como container principal para microfrontends via Module Federation.

## Tecnologias

- **Next.js 15+** (Pages Router)
- **Module Federation** (`@module-federation/nextjs-mf`)
- **React 18**
- **TypeScript**
- **Tailwind CSS**

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/pages/index.tsx`. The page auto-updates as you edit the file.

## Estrutura do Projeto

Este é o projeto host que consome o microfrontend `funcionalidades-remote` através do Module Federation, permitindo a integração de componentes React remotos de forma dinâmica.

### Estrutura de Diretórios

- `src/pages/` - Páginas Next.js
- `src/components/` - Componentes React do host
- `src/contexts/` - Contextos React (Account, Transactions)
- `src/styles/` - Estilos globais Tailwind

## Integração com Remote

O host consome o remote através do Module Federation:

```typescript
import('funcionalidadesRemote/TransacoesApp')
import('funcionalidadesRemote/GraficosApp')
```

## Build e Deploy

Para build de produção:

```bash
npm run build
npm start
```

Para deploy no Docker, veja o `Dockerfile` incluído no projeto.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.
