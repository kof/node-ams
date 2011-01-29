## About
node-ams - asset management system for nodejs. The goal is to have a system for 
dependencies management, preprocessing and serving static files which is 
flexible, powerfull and scalable at the same time. 
It is built for massive websites where dependencies management and performance in the 
client are really important.

Auto dependencies management means you don't have to configurate each file to be loaded
in the client. You just write your commonjs modules same way like server side in nodejs.

## What is ams?

- very flexible build tool
- dependecies detector with purpose to combine files
- easy extendable preprocessing framework
- enables you to write your js code for client at the same way like for the nodejs server
- it is static file server


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
- serve (uses connect)
  - caching (server and client)
  - cache invalidation (server and client)
  - setting correct response headers
  - serving files