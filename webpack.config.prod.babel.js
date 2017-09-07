import { resolve } from 'path'
import CleanWebpackPlungin from 'clean-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import OfflinePlugin from 'offline-plugin'
import webpack from 'webpack'

export default {
  entry: {
    app: './src/',
    vendor: ['react', 'react-dom', 'babel-polyfill']
  },
  output: {
    filename: '[name][chunkhash:6].js',
    path: resolve(__dirname, 'dist')
  },
  devtool: 'source-maps',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader!stylus-loader'
        })
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  performance: {
    hints: 'error'
  },
  plugins: [
    new CleanWebpackPlungin('dist'),
    new HtmlWebpackPlugin({
      template: '!pug-loader!src/index.pug'
    }),
    new ExtractTextPlugin('styles[chunkhash:6].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new OfflinePlugin()
  ]
}
