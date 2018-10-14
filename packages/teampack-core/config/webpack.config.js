const fs = require('fs');
const path = require('path');

const webpack = require('webpack');

const config = require('./paths');
const babelPreset = require('../../babel-preset-teampack');

module.exports = (options) => {
  const babelRcPath = path.resolve('.babelrc');
  const hasBabelRc = fs.existsSync(babelRcPath);
  const mainBabelOptions = {
    babelrc: true,
    cacheDirectory: true,
    presets: [],
  };

  if (hasBabelRc) {
    console.log('> Using .babelrc defined in your app root');
  } else {
    mainBabelOptions.presets.push(require.resolve('../../babel-preset-teampack'));
  }

  return {
    mode: options.env === 'development' ? 'development' : 'production',
    target: 'browser',
    devtool: 'source-map',
    resolve: {
      extensions: ['.js', '.json'],
    },
    entry: {
      main: [`${config.serverSrcPath}/index.js`],
    },
    output: {
      path: config.serverBuildPath,
      filename: '[name].js',
      sourceMapFilename: '[name].map',
      publicPath: config.publicPath,
      libraryTarget: 'commonjs2',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          loader: require.resolve('babel-loader'),
          exclude: [/node_modules/, config.buildPath],
          options: mainBabelOptions,
        },
      ],
    },
    plugins: [
      // In order to provide sourcemaps, we automagically insert this at the
      // top of each file using the BannerPlugin.
      new webpack.BannerPlugin({
        raw: true,
        entryOnly: false,
        banner: `require('${
          // Is source-map-support installed as project dependency, or linked?
          require.resolve('source-map-support').indexOf(process.cwd()) === 0
            ? // If it's resolvable from the project root, it's a project dependency.
              'source-map-support/register'
            : // It's not under the project, it's linked via lerna.
              require.resolve('source-map-support/register')
        }')`,
      }),
    ],
  };
};
