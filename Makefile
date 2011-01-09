test: transport tracker

transport:
	qunit -c ./lib/processors/transport.js -t ./test/transport.js
tracker:	
	qunit -c ./lib/tracker.js -t ./test/tracker.js -d ./test/tracker-mock.js --cov false
	
.PHONY: test