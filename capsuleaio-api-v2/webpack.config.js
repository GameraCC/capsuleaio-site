const path = require('path')
const slsw = require('serverless-webpack')

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  stats: 'minimal',
  devtool: 'source-map',
  externals: [{ 'aws-sdk': 'commonjs aws-sdk' }],
  resolve: {
    extensions: ['.js', '.json'],
  },
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
    sourceMapFilename: '[file].map',
  }
}
