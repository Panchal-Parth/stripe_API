var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors())
var request = require('request');
var router = express.Router();
var morgan = require('morgan');
var bodyParser = require('body-parser');
require('request-debug')(request);
var StripeChargeRouter = require('./StripeCharge');

var server = require('http').Server(app);

router.use(morgan('dev'));
app.use('/', StripeChargeRouter);

app.listen(8080, function () {
  console.log('Stripe backend App listening on port 8080!');
});
