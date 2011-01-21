## About
node-ams - asset management system for nodejs. The goal is to have a system for auto 
dependencies management, preprocessing, serving and loading static files which is 
flexible, powerfull and scalable at the same time. 
It is built for massive websites where dependencies management and performance in the 
client are really important.

Auto dependencies management means you don't have to configurate each file to be loaded
in the client. You just write your code like server side in nodejs.


## Features
- 
- static dependencies detection (looks for commonjs require calls)
- depenencies autodetection (experimental - in learning mode)
- custom preprocessing
  - minify js
  - minify css
  - wrap for transport
  - add vendor css prefixes
  - add your own preprocessor ...
- static file server 
  - caching (server and client)
  - cache invalidation (server and client)
  - setting correct response headers
  - serving files