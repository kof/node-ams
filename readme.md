## About
node-ams - assert management system for nodejs. The goal is to have a system for auto dependencies management, 
preprocessing, serving and loading static files which is flexible, powerfull and scalable at the same time. 
It is built for massive websites where dependencies management 
and performance in the client are really important.


## Features
- depenencies autodetection  (learning mode)
- custom preprocessing
  - minify js
  - minify css
  - wrap for transport
  - auto merge using detected dependencies
  - add your own preprocessor ...
- static file server 
  - caching (server and client)
  - cache invalidation (server and client)
  - setting response headers
  - serving files