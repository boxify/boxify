
build:
	browserify index.js -t reactify -o build/bundle.js -d -s boxify

dev:
	browserify -t reactify -t fusion index.js -o dev/bundle.js -d

css:
	lessterify index.js build/bundle.css

lint:
	jsxhint -e .jsx components

.PHONY: build css lint dev
