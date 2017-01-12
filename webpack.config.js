const validate = require('webpack-validator');

const config = {
  entry: __dirname + '/client/index.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/public'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devtool: 'eval-source-map'
}

module.exports = validate(config);