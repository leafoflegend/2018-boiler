const chalk = require('chalk');
const express = require('express');
const http = require('http');
const path = require('path');
const notifier = require('node-notifier');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpack = require('webpack');
const devConfigGenerator = require('./dev.config');

const app = express();
const server = http.createServer(app);
const rootPath = process.cwd();

const PORT = 6969;

console.log(chalk.yellow('App Server Initializing.'));
const devConfig = devConfigGenerator();

const compiler = webpack(devConfig);
compiler.attachedPublicPath = devConfig.output.publicPath;

const devOptions = {
	publicPath: compiler.attachedPublicPath,
	stats: { colors: true },
};

app.use(webpackDevMiddleware(compiler, devOptions));
app.use(webpackHotMiddleware(compiler));

const indexPath = path.join(rootPath, './build/index.html.gz');
const publicPath = path.join(rootPath, './build');

app.get('/*', (req, res, next) => {
	if (req.originalUrl) {
		console.log(chalk.green('Client Request: '), chalk.cyan(`http://localhost:${PORT}${req.originalUrl}`));
	}

	next();
});

app.get('/', (req, res) => {
	res.status(200).sendFile(indexPath);
});

app.use(express.static(publicPath));

app.use((err, req, res, next) => {
	console.log(chalk.yellow(err, typeof next));
	console.log(chalk.red((err.stack)));
	res.status(err.status || 500).send(err.message || 'Internal server error.');
});

server.listen(PORT, () => {
	console.log(chalk.green(`App Server (${process.env.NODE_ENV.toUpperCase()}) has begun listening on PORT ${PORT}.`));
	notifier.notify({
		title: 'App Server',
		message: `App has begun on Port: ${PORT}.`,
		sound: true,
	});
});

console.log(chalk.green('Reached end of Server Setup!'));
