import type { NextConfig } from 'next';
import { NextFederationPlugin } from '@module-federation/nextjs-mf';

// Funções auxiliares para detectar ambiente e configurar URL
const isVercel = process.env.VERCEL === '1';
const isDocker = process.env.NEXT_PUBLIC_USE_STATIC_PATH === 'true';
const isProduction = process.env.NODE_ENV === 'production';

// Determinar URL do remote mantendo compatibilidade com todos os ambientes
const getRemoteUrl = (): string => {
  // Prioridade 1: Se URL explícita, usar ela (permite override)
  if (process.env.NEXT_PUBLIC_REMOTE_URL) {
    return process.env.NEXT_PUBLIC_REMOTE_URL;
  }
  
  // Prioridade 2: Vercel - usar URL de produção configurada
  if (isVercel) {
    // Será configurada via variável de ambiente na Vercel
    return process.env.NEXT_PUBLIC_REMOTE_URL || 'https://funcionalidades-remote.vercel.app';
  }
  
  // Prioridade 3: Docker ou produção local - usar localhost interno
  if (isDocker || isProduction) {
    return 'http://localhost:3001';
  }
  
  // Prioridade 4: Desenvolvimento local padrão
  return 'http://localhost:3001';
};

// Determinar path do remoteEntry mantendo compatibilidade
const getRemoteEntryPath = (): string => {
  // Vercel usa path padrão do Next.js (/_next/static/)
  if (isVercel) {
    return '/_next/static/chunks/remoteEntry.js';
  }
  // Docker usa /static/ (arquivos copiados para public/static/ no Dockerfile)
  if (isDocker || isProduction) {
    return '/static/chunks/remoteEntry.js';
  }
  // Desenvolvimento local usa path padrão do Next.js
  return '/_next/static/chunks/remoteEntry.js';
};

const nextConfig: NextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: 'lumen_host',
          filename: 'static/runtime/remoteEntry.js',
          remotes: {
            funcionalidadesRemote: `funcionalidadesRemote@${getRemoteUrl()}${getRemoteEntryPath()}`,
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
    } else {
      config.resolve.alias = {
        ...config.resolve.alias,
        'funcionalidadesRemote/TransacoesApp': false,
        'funcionalidadesRemote/GraficosApp': false,
      };
    }
    return config;
  },
};

export default nextConfig;