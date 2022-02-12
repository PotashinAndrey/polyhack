import Application from './src/server/Application.js';

const config = {
  "host": "localhost",
  "port": 7777,
  "https": 7443,
  "serve": "./src/client/",
  "ssl": "./ssl/",
  "cert": "localhost.crt",
  "key": "localhost.key"
};

const application = new Application(config);
application.launch();
