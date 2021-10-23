const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const ForksTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = env => {
  const isProductionEnv = env.NODE_ENV === 'production';
  
  return {
    mode: env.NODE_ENV,
    entry: './src/index.tsx',
    context: path.resolve(__dirname, '..'),
    devtool: isProductionEnv ? false : 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: '/node_modules/',
          use: {
            loader: 'babel-loader',
            options: {
              plugins: [!isProductionEnv && require.resolve('react-refresh/babel')].filter(Boolean)
            }
          }
        },
        {
          test: /\.html$/i,
          exclude: /node_modules/,
          use: 'html-loader',
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            isProductionEnv ? {
              loader: MiniCssExtractPlugin.loader,
              options: {
                esModule: true,
                // emit: true
              }
            } : {
              loader: 'style-loader',
              options: {
                injectType: 'singletonStyleTag'
              }
            },
            {
              loader: 'css-loader',
              options: {
                modules: false,
                importLoaders: 1
              }
            }, {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  sourceMap: true,
                  config: path.resolve(__dirname, 'postcss.config.js')
                }
              }
            }]
        },
        {
          test: /\.(png|jpg|svg)$/i,
          type: 'asset/resource'
        }
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx']
    },
    output: {
      filename: 'static/js/[name].[contenthash:8].js',
      chunkFilename: 'static/js/[id].[chunkhash:8].chunk.js',
      assetModuleFilename: 'static/media/[hash:8][ext][query]',
      path: isProductionEnv ? path.resolve(__dirname, '..', 'build') : path.resolve(__dirname, '..', 'dist'),
      clean: true,
      publicPath: '/'
    },
    performance: {
      hints: 'warning'
    },
    devServer: {
      static: './public',
      compress: true,
      port: env.PORT || 3000,
      hot: true,
      client: {
        logging: 'error',
        overlay: {
          errors: false,
          warnings: false
        },
        progress: true,
      },
      historyApiFallback: true
    },
    plugins: [
      new WebpackManifestPlugin(),
      isProductionEnv && new MiniCssExtractPlugin({
        filename: 'static/css/[id].[contenthash:8].css',
        chunkFilename: 'static/css/[chunkhash:8].chunk.css'
      }),
      new HtmlWebpackPlugin({
        inject: 'body',
        template: './public/index.html',
        filename: 'index.html',
      }),
      !isProductionEnv && new ReactRefreshWebpackPlugin({
        exclude: /node_modules/,
      }),
      new ForksTsCheckerWebpackPlugin({
        async: false,
        eslint: {
          files: "./src/**/*.{ts,tsx,js,jsx}"
        }
      }),
      new CssMinimizerPlugin(),
    ].filter(Boolean),
    optimization: {
      chunkIds: isProductionEnv ? 'size' : 'named',
      moduleIds: isProductionEnv ? 'size' : 'named',
      minimize: isProductionEnv,
      minimizer: [
        new TerserWebpackPlugin({
          exclude: /node_modules/,
          terserOptions: {
            sourceMap: true
          }
        })
      ].filter(Boolean),
      splitChunks: {
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            name: 'vendors.chunk'
          }
        }
      },
      runtimeChunk: 'single',
      mangleWasmImports: isProductionEnv,
      sideEffects: true
    },
    stats: {
      moduleAssets: false,
      colors: true,
      excludeModules: 'node_modules'
    }
  }
}