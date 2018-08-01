.PHONY: start-fe pre-publish test build-docs lint build-fe serve lint docker-serve docker-build docker-build-fe clean-ts

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
	make clean-ts
	npx ./node_modules/.bin/tsc
	make lint
	NODE_ENV=production node ./configuration/server

pre-publish:
	git checkout master
	git pull origin master
	make lint
	make test

lint:
	npx ./node_modules/.bin/prettier-eslint "src/**/*.ts" "src/**/*.tsx" "js/**/*.js" "@types/**/*.ts" --write
	npx ./node_modules/.bin/tslint --project tsconfig.json --config tslint.json -t stylish src/**/*.ts
	npx ./node_modules/.bin/tslint --project tsconfig.json --config tslint.json -t stylish src/**/*.tsx
	npx ./node_modules/.bin/eslint ./js

pre-commit:
	npx ./node_modules/.bin/tsc
	make lint
	git add -A

test:
	yarn
	rm -rf coverage/ && NODE_ENV=test npx jest --config=test/config.json --coverage --runInBand --noStackTrace --silent

serve:
	NODE_ENV=production node ./configuration/serve

docker-serve:
	NODE_ENV=production node ./configuration/docker-serve

clean-ts:
	if [ -d "./js" ]; then \
		rm -rf ./js; \
	else \
		echo "No outputted JS files to clean!"; \
	fi

docker-build:
	docker -v
	if [ $? -ne 0 ]; then \
		echo "Please install Docker to use this command"; \
		exit 1; \
	else \
		echo "Docker installation found"; \
	fi
	if [ -d "./dockerdist" ]; then \
		rm -rf ./dockerdist; \
	fi
	if [ ! -d "./dockerdist" ]; then \
		mkdir dockerdist; \
	fi
	docker build -t 2018-boiler .
	docker run -v `pwd`/dockerdist:/dockerdist 2018-boiler

docker-build-fe:
	npx ./node_modules/.bin/tsc
	make lint
	NODE_ENV=production node ./configuration/server

