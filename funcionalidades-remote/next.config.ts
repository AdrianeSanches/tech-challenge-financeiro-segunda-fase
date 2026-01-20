import type { NextConfig } from 'next';
import { NextFederationPlugin } from '@module-federation/nextjs-mf';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  // Na Vercel, não usar standalone (ela já otimiza automaticamente)
  // No Docker, usar standalone para produção
  ...(process.env.VERCEL !== '1' && process.env.NODE_ENV === 'production' && { 
    output: 'standalone' 
  }),
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: 'funcionalidadesRemote',
          // Na Vercel, usar path padrão do Next.js. No Docker, usar /static/
          filename: process.env.VERCEL === '1'
            ? '_next/static/chunks/remoteEntry.js'
            : 'static/chunks/remoteEntry.js',
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


