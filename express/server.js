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
  <iframe id="cashierid" src="https://rc.cashier-qa.pyr/cashier/?hermesappkey=3f85e4c7-6d13-4d37-9f53-00f01da87bff&amp;u=SDRZQN&amp;ram=1&amp;token=vDhsvv%2BO0KxFu%2B2wLn0HkK2U&amp;signature=do3%2BtKixy0rFIzUqDOsWK8OKg0U4E4EffJ2tEmZNOJA38j9BVbOvjxy7r9QVDM9%2B0V%2F%2FS49QRcJT3Hq6cS7MJ0KBQGyhhUulz4VNGXEl%2F9FG1yq0yP46io8Ue7wSpLLVL3Fl3ma6zUFofEN2qv7xlbCYr9itpeZm&amp;userId=rkes30&amp;TimeZoneId=2&amp;platform=Web&amp;language=en&amp;product=poker&amp;country=ES&amp;hostname=ram.qa-es.pyr&amp;clientid=1182823145.1590775622&amp;acid=1182823145.1590775622&amp;visitid=d8954ffb-d8ad-af41-40b3-3483cb803dae&amp;interactionid=&amp;psga=%7B%22g1%22%3A1591363808566%2C%22g2%22%3A1591363808843%7D&amp;applePaySupported=false" allow="camera" style="position: fixed; left: 0px; top: 0px; width: 100%; height: 100%; z-index: 5002; border: 0px;"></iframe>
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
