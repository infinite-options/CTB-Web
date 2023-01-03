// Note: This file is for deployment only

const express = require('express');
const path = require('path');
const http = require('http');
const https = require('https');
const fs = require('fs');
// See your keys here: https://dashboard.stripe.com/account/apikeys
const Stripe = require('stripe');

const app = express();

const PORT = process.env.PORT || 5000;
const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Make sure domain name is updated below
var key_url = '/etc/letsencrypt/live/buildsuccess.org/privkey.pem';
var cert_url = '/etc/letsencrypt/live/buildsuccess.org/fullchain.pem';


var options = {};

app.get('/stripe/payment-intent', async (req, res) => {
  console.log('in stripe intent');
  const stripe = Stripe(
    process.env.NODE_ENV === 'production' && req.type !== 'test'
      ? process.env.REACT_APP_STRIPE_PUBLIC_KEY_LIVE
      : process.env.REACT_APP_STRIPE_PUBLIC_KEY
  );
  const intent = stripe.paymentIntents.create({
    amount: req.amount,
    currency: 'usd',
  });
  res.json({ client_secret: intent.client_secret });
});



if (process.env.SUDO_USER != undefined) {
  options['key'] = fs.readFileSync(key_url);
  options['cert'] = fs.readFileSync(cert_url);
  http
    .createServer(function (req, res) {
      res.writeHead(301, {
        Location: 'https://' + req.headers['host'] + req.url,
      });
      res.end();
    })
    .listen(80);
  https.createServer(options, app).listen(443);
} else {
  options['key'] = fs.readFileSync('privkey.pem');
  options['cert'] = fs.readFileSync('cert.pem');
  app.listen(PORT);
  https.createServer(options, app).listen(process.env.PORT + 1 || 443);
}
