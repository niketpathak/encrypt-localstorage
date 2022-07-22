const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/encrypt-ls.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'encrypt-ls.js',
    library: 'encrypt_ls',
    libraryExport: 'encrypt_ls', // to export only the default fn
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'eslint-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};
