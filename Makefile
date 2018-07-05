.PHONY: start-fe pre-publish test build-docs lint

build-docs:
	./node_modules/.bin/typedoc --out docs --readme README.md --target ES5 --name Payments --includeDeclarations --excludeExternals
	touch ./docs/.nojekyll

start-fe:
	if [ ! -d "./build" ]; then \
		mkdir build; \
	fi
	rm -rf ./build
	NODE_ENV=development node ./configuration/server

pre-publish:
	git checkout master
	git pull origin master
	make test-release
	make build-docs

lint:
	yarn
	npx eslint ./src

test:
	yarn
	rm -rf coverage/ && NODE_ENV=test npx jest --config=test/config.json --coverage --runInBand --noStackTrace --silent
