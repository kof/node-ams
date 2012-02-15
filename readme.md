## About
ams - asset management system for nodejs. The goal is to have a flexible and powerful system for dependency management and preprocessing of static files.

## What is ams?

- very flexible build tool
- dependency detector to combine files (using @import for css and require('module') for javascript)
- easy extendable preprocessing framework
- enables you to write your js code for the client in the same way as the nodejs server (commonjs modules)

## Features
- Expressive API
- Find your files
  - static dependencies detection (looks for commonjs 'require' calls)
  - finder using regexp
- process
  - minify js (using uglifyjs)
  - minify css (using cssmin from yahoo)
  - wrap js with commonjs module definition string (requirejs compatible) for transport
  - add vendor css prefixes (-o, -ms, -moz, -webkit)
  - inline small images in css using base64 data encoding
  - combine css files using @import declaration
  - add host to background image paths and external css (@import), to load it from cdn
  - add your own preprocessor ...
- combine
- write to disk

## Installation

	npm install ams

## API

### require ams

	var ams = require('ams');

### ams.build.create(root)
Create a build instance from passed root path. Returns build Instance.
Instance properties are:

- `this.root` - passed path to the src dir.
- `this.options` - current options object, contains all options for all methods.
- `this.paths` - like require.paths.
- `this.data` - key/value hash of path/contents

Example:

	var build = ams.build.create('/path/to/src');

### Build#find(options)
Find files to be added to the build instance. Returns build Instance.

Defaults are:

	{
        detect: null, // path to the file, where static 'require' dependencies tracking should start from,
        pattern: /\.[\w]+$/, // regexp to match files, is used if detect is not defined
        filter: null, // regexp to filter files, is used if detect is not defined
        rec: true, // recursive search, is used if detect is not defined
        paths: null // like require.paths to resolve deps
    }

Example:

	build.find();

### Build#add(path, [targetDir]);
Add file or files (array) from given path, optionally define the target dir. Returns build Instance.

Example:

	build.add('/path/to/file');
	// or
	build.add(['/path/to/file1', '/path/to/file2']);

### Build#process(options)
Run processors over files previously added to the build instance. Returns build Instance.

Defaults are:

    {
        uglifyjs: true, // minify javascript using uglifyjs
        cssvendor: true, // add css vendor prefixes like -webkit, -moz etc.
        dataimage: true, // inline small images using data:image base64 encoded data for css and html
        cssimport: true, // parse @import declarations and inline css files
        cssabspath: true, // absolutize paths in css files (relative to the root)
        htmlabspath: true, // absolutize paths in html files (relative to the root)
        cssmin: true, // minify css using js port of yahoos compressor for css
        jstransport: true, // wrap javascript code in commonjs transport proposal, can be used with requirejs later
        texttransport: true // wrap any data into js transport string, f.e. to load html templates using requirejs from cdn
    }

You can turn off any processor, add your own, or set any options for every processor.

Example:

	build.process({
		uglifyjs: false,
		cssabspath: {
			host: 'http://localhost:8888',
            verbose: true
		}
	})

If options is a function, it will be called for each file and act like a custom preprocessor.

Example:

	build.process(function(path, data) {
		// `path` is path to the file
		// `data` is contents of the file
		// `this` is reference to build instance
	});

### Build#combine(options)
Combine all files of current build instance to one, of course without mixing css and js etc. Returns build Instance.

Example:

	build.combine({
		js: 'main.js',
		css: 'main.css'
	});

### Build#cleanup(dir)
Remove all files and dirs from given dir. Returns build Instance.

Example:

	build.cleanup('/path/to/dir');

### Build.write(dir)
Write proccessed files to disk in passed dir. Returns build Instance.

Example:

	build.write('/path/to/public/dir');

### Build.end([message])
Write a success message to stdout, pass a message string optionally. Returns build Instance.

### Example of complete build script:

	var ams = require('ams');

	var publ = __dirname + '/public',
	    src = __dirname + '/src',
	    host = 'http://localhost:8888';

	ams.build
		// create a build for the dir
	    .create(src)
	    // find all files in it
	    .find()
	    // change processors options
	    .process({
	        cssabspath: {
	            host: host,
                verbose: true
	        },
	        htmlabspath: {
	            host: host,
                verbose: true
	        },
	        texttransport: false,
            uglifyjs: {
                verbose: true
            }
	    })
	    // combine all js files
	    .combine({
	        js: 'main.js'
	    })
	    // write them to disk
	    .write(publ)
	    // stdout success message
	    .end();
