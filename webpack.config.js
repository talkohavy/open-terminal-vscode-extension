const path = require('path');

/** @type {import('webpack').Configuration} */
const config = {
  target: 'node',
  entry: './src/extension.ts',
  output: {
    path: path.resolve(__dirname, 'out'),
    filename: 'extension.js',
    libraryTarget: 'commonjs2',
    devtoolModuleFilenameTemplate: 'file:///[absolute-resource-path]',
    clean: true,
  },
  devtool: 'cheap-module-source-map',
  externals: {
    vscode: 'commonjs vscode',
  },
  resolve: {
    extensions: ['tsx', '.ts', '.jsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [{ loader: 'ts-loader' }],
      },
    ],
  },
};

module.exports = config;
