const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const ForksTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = env => {
  const isProductionEnv = env.NODE_ENV === 'production';

  return {
    mode: env.NODE_ENV,
    entry: {
      main: { 
        import: './src/index.tsx',
        dependOn: ['react-vendors']
      },
      'react-vendors': ['react','react-dom']
    },
    context: path.resolve(__dirname,'..'),
    devtool: isProductionEnv ? false : 'source-map',
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: '/node_modules/',
          use: {
            loader: 'babel-loader',
            options: {
              plugins: [!isProductionEnv && require('react-refresh/babel')].filter(Boolean)
            }
          }
        },
        {
          test: /\.html?$/i,
          use: 'html-loader',
        },
        {
          test: /\.css$/,
          use: ['style-loader','css-loader']
        }
      ]
    },
    resolve: {
      extensions: ['.tsx','.ts','.js','.jsx']
    },
    output: {
      filename: 'static/js/[name].[contenthash:8].min.js',
      chunkFilename: 'static/js/[id].[chunkhash:8].chunk.js',
      path: path.resolve(__dirname, 'build'),
      clean: true,
      globalObject: 'this'
    },
    performance: {
      hints: 'warning'
    },
    externals: ['@types/react'],
    stats: 'detailed',
    devServer: {
      static: './public',
      compress: true,
      port: env.PORT || 3000,
      client: {
        logging: 'error',
        overlay: {
          errors: false,
          warnings: false
        },
        progress: true
      },
    },
    plugins: [
      new WebpackManifestPlugin(),
      new MiniCssExtractPlugin({
        filename: 'static/css/[id].[contenthash:8].css',
        chunkFilename: 'static/css/[chunkhash:8].chunk.css'
      }),
      new HtmlWebpackPlugin({
        inject: 'body',
        template: './public/index.html',
        filename: 'index.html',

      }),
      !isProductionEnv && new webpack.HotModuleReplacementPlugin(),
      !isProductionEnv && new ReactRefreshWebpackPlugin({
        exclude: /node_modules/,
      }),
      new ForksTsCheckerWebpackPlugin({
        async: false,
        eslint: {
          files: "./src/**/*"
        }
      })
    ].filter(Boolean),
    optimization: {
      chunkIds: 'size',
      moduleIds: 'size',
      minimizer: [
        new TerserWebpackPlugin({
          exclude: /node_modules/,
          terserOptions: {
            sourceMap: true
          }
        })
      ].filter(Boolean),
      splitChunks: {
        chunks: 'all'
      },
      runtimeChunk: {
        name: entrypoint => `runtime-${entrypoint.name}`
      }
    },
    stats: {
      moduleAssets: false,
      colors: true,
      excludeModules: 'node_modules'
    }
  }
}