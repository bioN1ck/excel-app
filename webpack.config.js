const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Определить режим сборки (dev | prod)
const isProd = process.env.NODE_ENV == 'production';

const filename = (ext) => isProd ? `bundle.[hash].${ext}` : `bundle.${ext}`;
const jsLoaders = () => {
  const loaders = [
    {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-proposal-class-properties'],
      },
    },
  ];

  if (!isProd) {
    loaders.push('eslint-loader');
  }

  return loaders;
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: ['@babel/polyfill', './index.js'],
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@core': path.resolve(__dirname, 'src/core'),
    },
  },
  devtool: isProd ? false : 'source-map', // Добавляем сорс-мапы для дева
  devServer: {
    port: 4200,
    hot: !isProd,
  },
  plugins: [
    // Очищает папку dist
    new CleanWebpackPlugin(),
    // Копирует вновь созданные бандлы в html
    new HtmlWebpackPlugin({
      template: 'index.html',
      // minify: {                          // Работает из коробки без этого
      //   removeComments: isProd,
      //   collapseInlineTagWhitespace: isProd,
      // }
    }),
    new CopyPlugin({
      // Копирует файлы во время билда
      patterns: [
        {
          from: path.resolve(__dirname, 'src/favicon.ico'),
          to: path.resolve(__dirname, 'dist'),
        },
      ],
    }),
    // Выносит стили в отдельный файл
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
  ],
  module: {
    // Лоадеры. Транспилируют cscc в css, минифицируют код
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: !isProd,
              reloadAll: true,
            },
          },
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoaders(),
      },
    ],
  },
};
