// Main starting point of the application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');

// DB Setup
mongoose.connect('mongodb://localhost:auth/redux_auth_tutorial');

// App Setup
app.use(morgan('combined')); //for logging incoming requests
app.use(bodyParser.json({ type: '*/*' })); //any incoming requests will be parsed as json
router(app);

// Server Setup
const port = process.env.PORT || 8080;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on: ', port);
