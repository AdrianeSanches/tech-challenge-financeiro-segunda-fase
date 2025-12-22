import type { NextConfig } from 'next';

// Pega a URL do ambiente ou usa localhost como fallback para desenvolvimento
// Compatível com Docker - pode ser sobrescrita via variável de ambiente
const TRANSACOES_URL = process.env.NEXT_PUBLIC_TRANSACOES_URL || 'http://localhost:4201';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  webpack: (config, { isServer }) => {
    // Module Federation só funciona no cliente (browser)
    if (!isServer) {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const NextFederationPlugin = require('@module-federation/nextjs-mf');

      config.plugins.push(
        new NextFederationPlugin({
          name: 'host',
          filename: 'static/chunks/remoteEntry.js',
          remotes: {
            // Configura o remote do Angular
            // O nome 'transacoesMicro' será usado na importação
            // O formato é: 'nome_do_remote@URL/remoteEntry.js'
            transacoesMicro: `transacoes_micro@${TRANSACOES_URL}/remoteEntry.js`,
          },
          exposes: {
            // Se precisar expor algum componente do host para outros remotes no futuro
          },
          shared: {
            // Compartilha dependências comuns entre host e remotes para reduzir bundle size
            // React e React-DOM são compartilhados automaticamente pelo Next.js
            react: {
              singleton: true,
              requiredVersion: false,
              eager: false,
            },
            'react-dom': {
              singleton: true,
              requiredVersion: false,
              eager: false,
            },
          },
        })
      );
    } else {
      // No servidor, precisamos fazer o webpack ignorar os módulos remotos
      // para evitar erros durante o SSR/build
      config.resolve.alias = {
        ...config.resolve.alias,
        'transacoesMicro/TransacoesApp': false,
      };
    }

    // Configura o webpack para ignorar módulos remotos durante o build quando não conseguem ser resolvidos
    config.resolve.fallback = {
      ...config.resolve.fallback,
    };

    return config;
  },
};

export default nextConfig;