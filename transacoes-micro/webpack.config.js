const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'transacoes-micro',
  filename: 'remoteEntry.js',
  exposes: {
    // Aqui expomos o módulo/componente para o React consumir
    './TransacoesApp': './src/app/transacoes-wrapper.ts',
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
});
