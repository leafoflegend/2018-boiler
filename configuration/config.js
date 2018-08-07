const webpack = require('webpack');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { CheckerPlugin } = require('awesome-typescript-loader');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ManifestPlugin = require('webpack-manifest-plugin');
const OfflinePlugin = require('offline-plugin');
const NameAllModulesPlugin = require('name-all-modules-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const {
  applicationName,
  applicationDescription,
  applicationBackgroundColor,
  applicationThemeColor,
  applicationThemeSecondaryColor,
  applicationThemeType,
  applicationThemeFonts,
} = require('../boilerconfig');

// TODO: Take a look at https://github.com/wmonk/create-react-app-typescript/blob/master/packages/react-scripts/config/webpack.config.dev.js#L279
// TODO: https://github.com/wmonk/create-react-app-typescript/blob/master/packages/react-scripts/config/webpack.config.dev.js#L271

module.exports = () => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const isProduction = process.env.NODE_ENV === 'production';

  const entry = {
    application: isDevelopment
      ? [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
        '@babel/polyfill',
        './index.tsx',
      ]
      : ['@babel/polyfill', './index.js'],
  };

  const template = {
    alwaysWriteToDisk: true,
    production: false,
    title: applicationName,
    bgColor: applicationBackgroundColor,
    filename: 'index.html',
    template: '!!ejs-loader!./configuration/template.ejs',
    chunksSortMode: 'none',
  };

  const loaderPresets = [
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        shippedProposals: true,
        targets: {
          browsers: '> 1%',
        },
      },
    ],
  ];

  const babelPlugins = [
    'react-hot-loader/babel',
    // Stage 2
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    '@babel/plugin-proposal-function-sent',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-numeric-separator',
    '@babel/plugin-proposal-throw-expressions',
    // Stage 3
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-syntax-import-meta',
    ['@babel/plugin-proposal-class-properties', { loose: false }],
    '@babel/plugin-proposal-json-strings',
  ];

  if (isProduction) loaderPresets.push('minify');

  const loaders = [
    {
      loader: 'babel-loader',
      options: {
        presets: loaderPresets,
        plugins: babelPlugins,
      },
    },
  ];

  let plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        APPLICATION_NAME: `"${applicationName}"`,
        APPLICATION_BG_COLOR: `"${applicationBackgroundColor}"`,
        APPLICATION_THEME_COLOR: `"${applicationThemeColor}"`,
        APPLICATION_THEME_SECONDARY_COLOR: `"${applicationThemeSecondaryColor}"`,
        APPLICATION_THEME_TYPE: `"${applicationThemeType}"`,
        APPLICATION_THEME_FONTS: `"${applicationThemeFonts}"`,
      },
    }),
    new HtmlWebpackPlugin({
      ...template,
    }),
    new CircularDependencyPlugin({
      exclude: /node_modules|configs|server/,
      failOnError: true,
      cwd: process.cwd(),
    }),
    new FriendlyErrorsWebpackPlugin(),
    new WebpackBuildNotifierPlugin({
      title: `${applicationName} Built/Rebuilt`,
      logo: './assets/money.jpg',
      suppressSuccess: false,
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HardSourceWebpackPlugin(),
    new CheckerPlugin(),
  ];

  const developmentPlugins = [new webpack.HotModuleReplacementPlugin()];

  const productionPlugins = [
    new WebpackPwaManifest({
      name: applicationName,
      short_name: applicationName
        .split(' ')
        .reduce((shortName, nextWord) => `${shortName}${nextWord[0].toUpperCase()}`, ''),
      description: applicationDescription,
      background_color: applicationBackgroundColor,
      theme_color: applicationThemeColor,
    }),
    new webpack.NamedModulesPlugin(),
    new NameAllModulesPlugin(),
    new ManifestPlugin({
      fileName: 'appmanifest.json',
    }),
    new OfflinePlugin({
      caches: {
        main: ['index.html'],
        additional: [':rest:'],
      },
      ServiceWorker: {
        events: true,
        navigateFallbackURL: '/',
      },
      safeToUseOptionalCaches: true,
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css|html|map|svg|png|woff2|ttf|woff)$/,
      threshold: 0,
      minRatio: 0.8,
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
    }),
    new WebpackBuildNotifierPlugin({
      title: `${applicationName} Production Build Complete`,
      suppressSuccess: false,
    }),
  ];

  if (isDevelopment) plugins = plugins.concat(developmentPlugins);
  if (isProduction) plugins = plugins.concat(productionPlugins);

  const configObject = {
    name: applicationName,
    entry,
    mode: process.env.NODE_ENV,
    output: {
      publicPath: isDevelopment ? 'http://localhost:6969/' : '/',
      path: isDevelopment ? `${process.cwd()}/build` : `${process.cwd()}/dist`,
      filename: '[name].[hash].js',
      chunkFilename: '[name].[chunkhash].js',
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'initial',
            enforce: true,
          },
        },
      },
    },
    devtool: 'source-map',
    context: isDevelopment ? path.join(process.cwd(), './src') : path.join(process.cwd(), './js'),
    plugins,
    resolve: {
      extensions: [
        '.ts',
        '.tsx',
        '.js',
        '.jsx',
        '.eot',
        '.svg',
        '.ttf',
        '.woff',
        '.woff2',
        '.png',
        '.ejs',
        '.d.ts',
        '.css',
      ],
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          loader: 'awesome-typescript-loader',
          options: {
            silent: true,
            useBabel: true,
            babelOptions: {
              highlightCode: true,
              babelrc: false,
              presets: loaderPresets,
              plugins: babelPlugins,
            },
            babelCore: '@babel/core',
            useCache: true,
            errorsAsWarnings: false,
          },
        },
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map-loader',
        },
        {
          test: /\.jsx?$/,
          use: loaders,
          exclude: /node_modules|configs|server/,
        },
        {
          test: /\.css$/,
          use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2|png)$/,
          use: [{ loader: 'url-loader?limit=100000' }],
        },
      ],
    },
  };

  if (isProduction) {
    configObject.optimization.minimizer = [
      new UglifyJsPlugin({
        parallel: true,
        sourceMap: true,
      }),
    ];
  }

  if (isDevelopment) {
    configObject.watchOptions = {
      ignored: /node_modules|configs|server/,
    };
  }

  return configObject;
};
