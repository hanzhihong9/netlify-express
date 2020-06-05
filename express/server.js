'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

const router = express.Router();
router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});
router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

app.get('/headertest', (request, response) => {
  response.header('1222ETag', '12345')
  response.header('Access-Control-Allow-Credentials', true)
  response.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type")
  response.header('Access-Control-Allow-Origin', '*')
  response.header('Content-Security-Policy',  "child-src 'self' *;")
  response.header('Content-Type', 'text/html')
    // res.sendFile('index.html');
  response.sendFile(path.join(__dirname+'/index.html'));

  //Accept-Ranges: bytes

})

module.exports = app;
module.exports.handler = serverless(app);
