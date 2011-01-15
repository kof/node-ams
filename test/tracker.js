module = QUnit.module;

module('tracker');


// don't show alerts
ams.options.verbose = false;

test('tracked dependencies 1', function() {

	function transport() {
		require('c.js');
		require('d.js');
	}
		
	// register factory
	require.def('a.js', transport);
	
	transport();
	
	same(ams.deps(), {'a.js': {'c.js':true, 'd.js':true}}, 'deps tracked');
});

test('tracked dependencies 2', function() {
	(function(){
		function transport() {
			require('c.js');
			require('d.js');
		}
			
		// register factory
		require.def('a.js', transport);
	
		transport();
	}());
	
	(function(){
		function transport() {
			require('c.js');
			require('d.js');
		}
			
		// register factory
		require.def('b.js', transport);
	
		transport();
	}());
	
	same(
		ams.deps(), 
		{
			'a.js': {'c.js':true, 'd.js':true},
			'b.js': {'c.js':true, 'd.js':true}
		}, 
		'deps tracked'
	);
});