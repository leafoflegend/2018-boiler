.PHONY: start-fe pre-publish test build-docs lint build-fe serve

build-docs:
	./node_modules/.bin/typedoc --out docs --readme README.md --target ES5 --name Application --includeDeclarations --excludeExternals
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
	make build-docs
	NODE_ENV=production node ./configuration/server

pre-publish:
	git checkout master
	git pull origin master
	make test
	make build-docs

lint:
	yarn
	npx ./node_modules/.bin/tslint ./src

test:
	yarn
	rm -rf coverage/ && NODE_ENV=test npx jest --config=test/config.json --coverage --runInBand --noStackTrace --silent

serve:
	NODE_ENV=production node ./configuration/serve
