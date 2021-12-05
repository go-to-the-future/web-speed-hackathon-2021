const path = require('path');

const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts')

const webpack = require('webpack');
const { truncate } = require('lodash');

const SRC_PATH = path.resolve(__dirname, './src');
const PUBLIC_PATH = path.resolve(__dirname, '../public');
const UPLOAD_PATH = path.resolve(__dirname, '../upload');
const DIST_PATH = path.resolve(__dirname, '../dist');

/** @type {import('webpack').Configuration} */
const config = {
  devServer: {
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 8080,
    proxy: {
      '/api': 'http://localhost:3000',
    },
    static: [PUBLIC_PATH, UPLOAD_PATH],
  },
  devtool: 'inline-source-map',
  entry: {
    bundle_core:  'core-js',
    bundle_regenerator:  'regenerator-runtime/runtime',
    bundle_jquery:  'jquery-binarytransport',
    bundle_css:  path.resolve(SRC_PATH, './index.css'),
    bundle_build_info:  path.resolve(SRC_PATH, './buildinfo.js'),
    bundle_jsx:  path.resolve(SRC_PATH, './index.jsx'),
  },
  mode: 'none',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.jsx?$/,
        use: [{ loader: 'babel-loader' }],
      },
      {
        test: /\.css$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader', options: { url: false } },
          { loader: 'postcss-loader' },
        ],
      },
    ],
  },
  output: {
    filename: 'scripts/[name].js',
    path: DIST_PATH,
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      AudioContext: ['standardized-audio-context', 'AudioContext'],
      Buffer: ['buffer', 'Buffer'],
      'window.jQuery': 'jquery',
    }),
    new webpack.EnvironmentPlugin({
      BUILD_DATE: new Date().toISOString(),
      // Heroku では SOURCE_VERSION 環境変数から commit hash を参照できます
      COMMIT_HASH: process.env.SOURCE_VERSION || '',
      NODE_ENV: 'production',
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].css',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: path.resolve(SRC_PATH, './index.html'),
    }),
    new RemoveEmptyScriptsPlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin()
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    fallback: {
      fs: false,
      path: false,
    },
  },
};

module.exports = config;
