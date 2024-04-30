import path from 'path';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import MiniCssExtraxtPlugin from 'mini-css-extract-plugin';
import { fileURLToPath } from 'url';

const isDev = process.env.NODE_ENV === 'development';
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default {
  context: path.resolve(dirname, 'src'),
  mode: 'development',
  entry: './index.ts',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(dirname, 'src'),
    },
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(dirname, './dist'),
  },
  devServer: {
    port: 8080,
    hot: true,
    liveReload: true,
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html',
      favicon: './assets/ecommerce.svg',
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtraxtPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtraxtPlugin.loader, options: {} },
          'css-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: MiniCssExtraxtPlugin.loader,
            options: {},
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ogg|mp3|wav)$/,
        type: 'asset/resource',
        generator: {
          filename: () => {
            return isDev
              ? 'assets/[name][ext]'
              : 'assets/[name].[contenthash][ext]';
          },
        },
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
