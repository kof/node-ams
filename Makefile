test: 
	node ./bin/test.js 	

lint:
	linter -f ./lib -r
		
.PHONY: test lint