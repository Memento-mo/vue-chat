const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function resolve(dir) {
  return path.resolve(__dirname, dir)
}

module.exports = {
  entry: [
    require.resolve(`webpack-dev-server/client`),
    path.resolve(__dirname, "src/main.js")
  ].filter(Boolean),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/'
  },
  resolve: {
  extensions: ['.js', '.ts', '.vue'],
  alias: {
    vue: '@vue/runtime-dom',
    '@api': resolve('src/api'),
    '@components-ui': resolve('src/components/ui/components'),
    '@components-base': resolve('src/components'),
    '@utils': resolve('src/utils'),
    '~': resolve('src/'),
    'primevue': resolve('node_modules/primevue')
  }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.styl(us)?$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          'stylus-loader'
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/public/index.html')
    }),
  ]
}