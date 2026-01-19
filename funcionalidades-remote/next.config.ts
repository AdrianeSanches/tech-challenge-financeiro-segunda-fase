import type { NextConfig } from 'next';
import { NextFederationPlugin } from '@module-federation/nextjs-mf';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  ...(process.env.NODE_ENV === 'production' && { output: 'standalone' }),
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: 'funcionalidadesRemote',
          filename: 'static/chunks/remoteEntry.js',
          exposes: {
            './TransacoesApp': './src/components/transacoes/index.ts',
            './GraficosApp': './src/components/graficos/index.tsx',
          },
          shared: {
            react: {
              singleton: true,
              eager: true,
            },
            'react-dom': {
              singleton: true,
              eager: true,
            },
          },
          extraOptions: {},
        })
      );
    }
    return config;
  },
};

export default nextConfig;


