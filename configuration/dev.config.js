const webpack = require('webpack');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = () => {
	const entry = {
		application: [
			'react-hot-loader/patch',
			'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
			'@babel/polyfill',
			'./index.js',
		],
		vendor: [
			'react',
			'react-dom',
		],
	};

	const template = {
		alwaysWriteToDisk: true,
		production: false,
		title: 'Application',
		filename: 'index.html',
		template: '!!ejs-loader!./configuration/template.ejs',
		chunksSortMode: 'none',
	};

	const loaders = [
		{
			loader: 'babel-loader',
			options: {
				presets: [
					'@babel/preset-react',
					[
						'@babel/preset-env',
						{
							shippedProposals: true,
						},
					],
					[
						'@babel/preset-stage-2',
						{
							decoratorsLegacy: true,
						},
					],
				],
				plugins: ['react-hot-loader/babel'],
			},
		},
	];

	const plugins = [
		new HtmlWebpackPlugin({
			...template,
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"development"',
			},
		}),
		new WebpackBuildNotifierPlugin({
			title: 'Payments Dev Build Done',
			logo: './assets/money.jpg',
			suppressSuccess: false,
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
	];

	return {
		name: 'index',
		entry,
		mode: 'development',
		output: {
			publicPath: 'http://localhost:6969/',
			path: `${process.cwd()}/build`,
			filename: '[name].js',
		},
		watchOptions: {
			ignored: /node_modules|configs|server/,
		},
		optimization: {
			splitChunks: {
				cacheGroups: {
					vendor: {
						name: 'vendor',
						filename: 'react.js',
						minChunks: Infinity,
					},
				},
			},
		},
		devtool: 'source-map',
		context: path.join(process.cwd(), './src'),
		plugins,
		resolve: {
			extensions: ['.ts', '.tsx', '.js', '.jsx', '.eot', '.svg', '.ttf', '.woff', '.woff2', '.png', '.css', '.ejs'],
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
							presets: [
								'@babel/preset-react',
								[
									'@babel/preset-env',
									{
										shippedProposals: true,
									},
								],
								[
									'@babel/preset-stage-2',
									{
										decoratorsLegacy: true,
									},
								],
							],
							plugins: ['react-hot-loader/babel'],
						},
						babelCore: '@babel/core',
						useCache: true,
						forceIsolatedModules: true,
						errorsAsWarnings: true,
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
					use: [
						{ loader: 'style-loader!css-loader' },
					],
				},
				{
					test: /\.(eot|svg|ttf|woff|woff2|png)$/,
					use: [
						{ loader: 'url-loader?limit=100000' },
					],
				},
			],
		},
	};
};
