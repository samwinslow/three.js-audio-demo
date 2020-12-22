const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = [
  {
    name: 'server',
    devtool: 'inline-source-map',
    entry: './src/server/index.ts',
    module: {
      rules: [
        {
          test: /\.ts?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        }
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    target: 'node',
    output: {
      path: __dirname + '/dist/server',
      filename: 'bundle.js',
    },
  },
  {
    name: 'client',
    devtool: 'inline-source-map',
    entry: './src/client/index.ts',
    module: {
      rules: [
        {
          test: /\.ts?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.html$/,
          use: [{loader: "html-loader"}]
        }
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    // target: 'web', // by default
    output: {
      path: __dirname + '/dist/client',
      filename: 'bundle.js',
    },
    plugins: [new HtmlWebpackPlugin()]
  },
]
