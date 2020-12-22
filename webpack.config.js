const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = [
  {
    name: 'server',
    entry: './src/server/index.ts',
    module: {
      rules: [
        {
          test: /\.ts?$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /.node$/,
          loader: 'node-loader',
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
    plugins: []
  },
  {
    name: 'client',
    devServer: {
      contentBase: '/dist/client',
      host: `localhost`,
      hot: true,
      port: 3030,
      publicPath: '/dist/client'
    },
    entry: './src/client/index.ts',
    module: {
      rules: [
        {
          test: /\.ts?$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.html$/,
          use: [{loader: "html-loader"}]
        },
        {
          test: /.node$/,
          loader: 'node-loader',
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
    plugins: [new HtmlWebpackPlugin()],
  },
]
