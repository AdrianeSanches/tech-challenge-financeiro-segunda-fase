const {
  shareAll,
  withModuleFederationPlugin,
} = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin(
  {
    name: 'transacoes_micro',
    filename: 'remoteEntry.js',
    exposes: {
      './TransacoesApp': './src/app/transacoes-wrapper.ts',
    },
    shared: {
      ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
    },
  },
  {
    output: {
      // Usa URL relativa para evitar import.meta (pode ser sobrescrito via variável de ambiente)
      // Em produção/Docker, configure via PUBLIC_PATH
      publicPath: process.env.PUBLIC_PATH || 'http://localhost:4201/',

      // IMPORTANTE: scriptType 'text/javascript' evita que seja tratado como ES module
      scriptType: 'text/javascript',

      // Nome único para evitar conflitos
      uniqueName: 'transacoes_micro',

      // Configuração da library como 'var' para compatibilidade com Module Federation
      library: {
        type: 'var',
        name: 'transacoes_micro',
      },

      // CRÍTICO: Desabilita uso de import.meta, evitando erro no navegador
      environment: {
        // module: false impede que o webpack gere código com import.meta
        module: false,
        // dynamicImport: true mantém imports dinâmicos funcionando
        dynamicImport: true,
        // Desabilita outros recursos de ES modules que podem causar problemas
        const: true,
        arrowFunction: true,
        bigIntLiteral: true,
        destructuring: true,
        forOf: true,
      },
    },
    optimization: {
      // Desabilita runtime chunk para evitar problemas com Module Federation
      runtimeChunk: false,
    },
  }
);
