run: 
	node main.js

test:
	node ./test/parser.spec.js
	node ./test/solver.spec.js

.PHONY: all test clean