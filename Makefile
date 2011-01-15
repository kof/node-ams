testall: transport tracker utils deps

transport:
	qunit -c ./lib/processors/transport.js -t ./test/transport.js
utils:
	qunit -c ./lib/utils.js -t ./test/utils.js
deps:
	qunit -d ./test/mocks/deps.js -c ./lib/deps.js -t ./test/deps.js 	
	
.PHONY: test transport tracker utils deps