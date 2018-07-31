const chalk = require('chalk');
const express = require('express');
const http = require('http');
const path = require('path');
const notifier = require('node-notifier');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpack = require('webpack');
const configGenerator = require('./config');
const { applicationName } = require('../boilerconfig');

const config = configGenerator();

if (process.env.NODE_ENV === 'development') {
  const app = express();
  const server = http.createServer(app);
  const rootPath = process.cwd();

  const PORT = 6969;

  console.log(chalk.yellow('App Server Initializing.'));

  const compiler = webpack(config);
  compiler.attachedPublicPath = config.output.publicPath;

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
      console.log(
        chalk.green('Client Request: '),
        chalk.cyan(`http://localhost:${PORT}${req.originalUrl}`),
      );
    }

    next();
  });

  app.get('/', (req, res) => {
    res.status(200).sendFile(indexPath);
  });

  app.use(express.static(publicPath));

  app.use((err, req, res, next) => {
    console.log(chalk.yellow(err, typeof next));
    console.log(chalk.red(err.stack));
    res.status(err.status || 500).send(err.message || 'Internal server error.');
  });

  server.listen(PORT, () => {
    console.log(
      chalk.green(
        `App Server (${process.env.NODE_ENV.toUpperCase()}) has begun listening on PORT ${PORT}.`,
      ),
    );
    notifier.notify({
      title: `${applicationName} Server`,
      message: `${applicationName} has begun on Port: ${PORT}.`,
      sound: true,
    });
  });

  console.log(chalk.green('Reached end of Server Setup!'));
} else if (process.env.NODE_ENV === 'production') {
  console.log(chalk.yellow(`Production Build of ${applicationName} Beginning.`));

  const compilePromise = () =>
    new Promise((resolve, reject) => {
      const compiler = webpack(config, (err, stats) => {
        compiler.attachedPublicPath = config.output.publicPath;
        if (err || stats.hasErrors()) {
          console.log(
            chalk.red(`Webpack failed to build a production build of ${applicationName}.`),
          );
          if (
            stats &&
            stats.compilation &&
            stats.compilation.errors &&
            typeof stats.compilation.errors === 'object'
          ) {
            stats.compilation.errors.forEach(error => {
              console.log(chalk.red(error));
            });
            reject(new Error(stats.compilation.errors));
          } else {
            console.log(chalk.red(err));
            reject(new Error(err));
          }
        } else {
          console.log(
            chalk.green(`Webpack successfully built production build of ${applicationName}.`),
          );
          resolve(`Webpack successfully built production build of ${applicationName}.`);
        }
      });
    });

  compilePromise()
    .then(() => {
      console.log('🤠: Yeehaw!');
    })
    .catch(e => {
      console.log(chalk.red(e));
      console.log('🤠: Nawhaw!');
    });
}
