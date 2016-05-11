var path = require('path');

var outputDir = '';

module.exports = {
  entry: './app/app.ts',
  output: {
    path: path.resolve(__dirname, outputDir),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  resolve: {
    //moduleDirectories: ['node_modules'],
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  node: {
    fs: "empty"
  },
  module: {
    loaders: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  }
}