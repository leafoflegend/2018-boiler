# 2018 Boiler
Eliot Szwajkowskis boiler plate with some of the hottest foundational technologies of the front end development world in 2018.

## Introduction
This repository is home to most of whats needed to begin building an top-notch professional web application. These include:

 - [`@material-ui`](https://material-ui.com/)
 - [`React`](https://reactjs.org/) _(obviously)_
 - [`Redux`](https://redux.js.org/)
 - [`redux-saga`](https://redux-saga.js.org/)
 - [`TypeScript`](http://www.typescriptlang.org/)
 - [`Webpack 4`](https://webpack.js.org/)
 - [`Babel`](https://babeljs.io/)
 - [`Docker`](https://www.docker.com/)
 - [`react-router`](https://github.com/ReactTraining/react-router) _(and its connected too!)_
 - So many linting/testing/development tools for quality control e.g. `tslint, eslint, prettier, husky, jest, documentation generation, etc...`

 This repo was built to be able to use the most modern JS possibly accessible as well (i.e. [`stage`](https://github.com/tc39/proposals) 1+ JS)

 These tools are all put together in a small app that has no real business logic going on, but with enough examples that you can extend it to become whatever you want.

## Using this Repo

The following commands exist in this repository:
 - `start:fe`: This command runs the webpack build to generate the development build with hot reloading built in. This uses a server, so should be run in a seperate terminal from the one serving the files.
 - `prepublishOnly`: The hooks for publishing.
 - `lint`: This command runs eslint as well as prettier.
 - `test`: This command will run any tests in the repo that have `.spec.ts` after the name of the file.
 - `build:docs`: This command automatically generates docs based on typings. **(UNSTABLE)**
 - `build:fe`: This command builds a production build of the application.
 - `serve`: This command will serve files on port 6969.
 - `docker:build`: This command builds a production build in a docker instance (this is so that the files can be built in any environment, e.g. Windows/Linux/Mac - useful for deploying to AWS).
 - `docker:serve`: This command starts a server using Docker that will serve the files.

There are also some private internal commands e.g. `pre-commit` - this is used in tandem with `husky` to automatically compile the typescript and lint the repository on every commit. If a commit fails these checks, then you will not be able to commit your work.

The application comes with a file on the root level `boilerconfig.js` that will help you quickly modify some of the key parts of this repository.

All source code is in `src` and should be written in `TypeScript` - any JSX files should be labeled with a `.tsx` extension, and others with `.ts`.