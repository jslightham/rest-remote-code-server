# rest-remote-code-server
Remote code execution in isolated docker containers controlled through a REST interface. Automatically build images, and create, start, and remove containers.

## Running Application
If you would like to run the application you need to start by first installing:
1. NodeJS 16 or later - https://nodejs.org/en/download/
2. Docker - https://docs.docker.com/engine/install/ubuntu/

Clone the repository, and run the following:
```
# install dependencies
npm install

# server with hot reload (optional, requires nodemon)
nodemon

# running the server
node index.js
```
## Configuration

Configuration for the application is done in the config.js file.
