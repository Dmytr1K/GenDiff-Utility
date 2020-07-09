lint:
	npx eslint .

test:
	npm test

publish:
	npm publish --dry-run

install:
	npm install

link:
	npm link

start:
	bin/gendiff.js --help
