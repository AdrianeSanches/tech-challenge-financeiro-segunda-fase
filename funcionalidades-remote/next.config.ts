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
          // O filename é relativo ao .next/static/chunks/
          // Next.js serve .next/static/ como /_next/static/ automaticamente
          // Para Docker, usamos static/chunks/ (copiado para public/ no Dockerfile)
          // Para Vercel, usamos static/chunks/ (servido como /_next/static/chunks/ pelo Next.js)
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


