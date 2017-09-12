import { resolve } from 'path'
import CleanWebpackPlungin from 'clean-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import OfflinePlugin from 'offline-plugin'
import CopyPlugin from 'copy-webpack-plugin'

export default {
  entry: {
    app: './src/'
  },
  output: {
    filename: 'bundle.[chunkhash:6].js',
    path: resolve(__dirname, 'dist')
  },
  devtool: 'source-maps',
  module: {
    rules: [
      {
        test: /\.js$/,
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
  plugins: [
    new CleanWebpackPlungin('dist'),
    new CopyPlugin([{from: 'public', to: './'}]),
    new HtmlWebpackPlugin({
      template: '!pug-loader!src/index.pug'
    }),
    new ExtractTextPlugin('styles.[chunkhash:6].css')
    /*
    new OfflinePlugin({
      publicPath: '/game-of-life/'
    })
    */
  ]
}
