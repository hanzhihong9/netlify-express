'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

const router = express.Router();
router.get('/', (req, res) => {
  res.writeHead(200, 
    { 
      'Content-Type': 'text/html' ,
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Headers': "Origin, X-Requested-With, Content-Type",
      'Access-Control-Allow-Origin': '*',
      'Content-Security-Policy':  "child-src 'self' *;"
  
  });

  res.write(`<h1>Hello from Express.js!</h1>'
  <iframe id="cashierid" src="https://rc.cashier-qa.pyr/cashier/?hermesappkey=3f85e4c7-6d13-4d37-9f53-00f01da87bff&amp;u=SDRZQN&amp;ram=1&amp;token=kMLrQDIDaA6a-2w9WuejanWo&amp;signature=Y7unt2O5f9foICzCDlwLbTo25fCB7UYZcvRx5jMhK75TjyoQngwsMVPoQgA4jNft%2FfhM2afOgJk4HVZ7al18C%2F0Nihs5hrAUxfGRbI%2FOqoFGct2n3%2FF98q0%2BNjil2y8HyvYCAy%2BR98J3fIrdKmeWLm5VmgxJ25xU&amp;userId=rkes30&amp;TimeZoneId=2&amp;platform=Web&amp;language=en&amp;product=poker&amp;country=ES&amp;hostname=ram.qa-es.pyr&amp;clientid=1182823145.1590775622&amp;acid=1182823145.1590775622&amp;visitid=2c0fa2c1-6a0e-e574-9760-873c367a9a82&amp;interactionid=&amp;psga=%7B%22g1%22%3A1591367188547%2C%22g2%22%3A1591367188746%7D&amp;applePaySupported=false" allow="camera" style="position: fixed; left: 0px; top: 0px; width: 100%; height: 100%; z-index: 5002; border: 0px;"></iframe>
  `);
  res.end();
});
router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

// app.get('/headertest', (request, response) => {
//   response.header('1222ETag', '12345')
//   response.header('Access-Control-Allow-Credentials', true)
//   response.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type")
//   response.header('Access-Control-Allow-Origin', '*')
//   response.header('Content-Security-Policy',  "child-src 'self' *;")
//   response.header('Content-Type', 'text/html')
//     // res.sendFile('index.html');
//   response.sendFile(path.join(__dirname+'/index.html'));

//   //Accept-Ranges: bytes

// })

module.exports = app;
module.exports.handler = serverless(app);
