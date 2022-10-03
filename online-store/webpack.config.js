const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

const baseConfig = {
  entry: path.resolve(__dirname, './src/index.ts'),
  mode: 'development',
  resolve: {
    extensions: ['.js', '.ts'],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/[name][ext]',
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        use: 'html-loader'
      },
      {
        test: /\.[tj]s$/i,
        use: ['ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(?:ico|gif|png|jpeg|jpg|svg)$/i,
        type: 'assets/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'url-loader'
      },
      {
        test: /\.(scss|css)$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].css' }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
    }),
    new CopyPlugin({
      patterns: [
          {
            from: path.resolve(__dirname, 'src/assets/img'),
            to:   path.resolve(__dirname, 'dist/assets/img')
          }
        ]
      }),
    new FaviconsWebpackPlugin({
      logo: path.resolve(__dirname, 'src/assets/img/favicon.png'),
      mode: 'webapp',
      devMode: 'webapp',
            favicons: {
                appName: 'template',
                appDescription: 'template',
                developerName: 'Name',
                developerURL: null,
                background: '#ddd',
                theme_color: '#333',
                icons: {
                    coast: false,
                    yandex: false
                }
              }
            }),
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
  ],
};

module.exports = ({ mode }) => {
  const isProductionMode = mode === 'prod';
  const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

  return merge(baseConfig, envConfig);
};
