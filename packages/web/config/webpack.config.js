const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const ForksTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

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
    devtool: isProductionEnv ? false : 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: '/node_modules/',
          use: {
            loader: 'babel-loader',
          }
        },
        {
          test: /\.html?$/i,
          use: 'html-loader',
          // sources: false,
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
      hot: true,
      port: env.PORT || 3000,
      client: {
        logging: 'error',
        overlay: {
          errors: false,
          warnings: false
        },
        progress: true
      },
      watchFiles: ["./src/**/*","./public/**/*","./config/*"]
    },
    plugins: [
      // new ForksTsCheckerWebpackPlugin({
      //   async: false,
      //   eslint: {
      //     files: "./src/**/*"
      //   }
      // }),
      new WebpackManifestPlugin(),
      new HtmlWebpackPlugin({
        inject: 'body',
        title: 'Tic-Tac-Toe',
        template: './public/index.html',
        chunks: 'all',
        filename: 'index.html'
      })
    ],
    optimization: {
      chunkIds: 'size',
      moduleIds: 'size',
      minimizer: [
        new TerserWebpackPlugin({

        })
      ],
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