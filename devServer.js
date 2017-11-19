var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var webpack = require('webpack');
var config = require('./webpack.config.dev');
var info = require('./client/common/info');

var mailgun = require("mailgun-js");
var sgMail = require('@sendgrid/mail');

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.post('/sendMail', jsonParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)
  // create user in req.body
  console.log(req.body)
  var api_key = info.token.mailgunToken;
  var domain = info.token.mailgunDomain;
  var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
  var name = JSON.stringify(req.body.name);
  var phone = JSON.stringify(req.body.phone);
  var address = JSON.stringify(req.body.address);

  var data = {
  from: 'Excited User <nick@sandbox5ea1be15e7a543cfbc6e9299686e2cc4.mailgun.org>',
  to: info.sendToMailAddr,
  subject: 'Sending with Mailgun',
  html:'name:' + name +'<br>' +
        'phone:' + phone +'<br>' +
        'address:' + address,
  };

  mailgun.messages().send(data, function (error, body) {
  console.log(body);
  if(error){
    console.log(error);
    sgMail.setApiKey(info.token.sgMailToken);
  const msg = {
    to: info.sendToMailAddr,
    from: 'test@example.com',
    subject: 'Sending with SendGrid',
    html: 'name:' + name +'<br>' +
          'phone:' + phone +'<br>' +
          'address:' + address,
  };
  sgMail.send(msg);
  }
  });
});

app.listen(7771, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:7771');
});
