test: 
	node ./bin/test.js 	

lint:
	linter -f ./lib/build.js ./lib/deps.js ./lib/server.js ./lib/utils.js
		
.PHONY: test