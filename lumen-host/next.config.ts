import type { NextConfig } from 'next';
import { NextFederationPlugin } from '@module-federation/nextjs-mf';

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
            funcionalidadesRemote: `funcionalidadesRemote@${process.env.NEXT_PUBLIC_REMOTE_URL || 'http://localhost:3001'}${
              // Em Docker ou produção, usa /static/. Em desenvolvimento local, usa /_next/static/
              process.env.NEXT_PUBLIC_USE_STATIC_PATH === 'true' || process.env.NODE_ENV === 'production'
                ? '/static/chunks/remoteEntry.js'
                : '/_next/static/chunks/remoteEntry.js'
            }`,
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
        'funcionalidadesRemote/InvestimentosApp': false,
        'funcionalidadesRemote/GraficosApp': false,
      };
    }
    return config;
  },
};

export default nextConfig;