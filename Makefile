.PHONY: start-fe pre-publish test build-docs lint build-fe serve

build-docs:
	npx ./node_modules/.bin/typedoc --options ./typedoc.js
	touch ./docs/.nojekyll

start-fe:
	if [ ! -d "./build" ]; then \
		mkdir build; \
	fi
	rm -rf ./build
	NODE_ENV=development node ./configuration/server

build-fe:
	yarn
	npx ./node_modules/.bin/tsc
	make lint
	NODE_ENV=production node ./configuration/server

pre-publish:
	git checkout master
	git pull origin master
	make test
	make build-docs

lint:
	npx ./node_modules/.bin/prettier-eslint "src/**/*.ts" "src/**/*.tsx" "js/**/*.js" --prettier-last --write
	npx ./node_modules/.bin/tslint ./src
	npx ./node_modules/.bin/eslint ./js

pre-commit:
	npx ./node_modules/.bin/tsc
	npx ./node_modules/.bin/prettier-eslint "src/**/*.ts" "src/**/*.tsx" "js/**/*.js" --prettier-last --write
	npx ./node_modules/.bin/tslint ./src
	npx ./node_modules/.bin/eslint ./js
	git add -A

test:
	yarn
	rm -rf coverage/ && NODE_ENV=test npx jest --config=test/config.json --coverage --runInBand --noStackTrace --silent

serve:
	NODE_ENV=production node ./configuration/serve
