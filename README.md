###1. Create package.json with empty dependencies
````
{
  "name": "api",
  "main": "server.js",
  "dependencies": {
  }
}
````
###2. Add express dependency locally 
````
npm install express --save

{
  "name": "api",
  "main": "server.js",
  "dependencies": {
    "express": "^4.1.1"
  }
}
````
###3. Create server.json
````
	-- Require packages (express)
	-- Create router
	-- Create routes
	-- Register routes
	-- Start server on port
````
###4. Use nodemon to auto restart on changes
````
npm install -g nodemon
nodemon server.js
````
