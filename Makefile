install: install-deps

install-deps:
	npm ci

lint:
	npx eslint .

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

publish:
	npm publish

link:
	npm link

unlink:
	npm unlink

help:
	bin/gendiff.js --help
