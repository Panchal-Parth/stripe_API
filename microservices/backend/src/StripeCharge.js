//changes for stripe charge task

//express modules required
var express = require('express');
var router = express.Router();
var request = require('request');
var dateFormat = require('dateformat');
var fetch = require('node-fetch');
fetch.Promise = require('bluebird');
var bodyParser = require('body-parser');

//stripe module required
var stripe = require("stripe")(process.env.STRIPE_PKEY);

var config = require('./config');

var datestamp;
var now;

//to log method executed and timestamp
function methodTime(link)
  {
    now = new Date();
    datestamp = dateFormat(now, "dd-mm-yyyy h:MM:ss TT")
    console.log('Get/Post method executed for ' + link + ' page at : '+ datestamp)
  }
//

//dummy home page running
router.route("/").get(function (req, res) {
  res.send("Hello, this is Stripe Charge backend server running")
})

//changes for stripe charge task
router.use(bodyParser.text({ type: 'urlencoded' }))
router.route("/charge").post(function (req, res)
{
//	res.setHeader( "Access-Control-Allow-Origin", req.headers.origin );
	methodTime('/charge');
//parse the body from frontend
  var obj = JSON.parse(req.body);

//below code is to log the key elements of the body passed	for test purpose

//create customer
	stripe.customers.create({
    	email: obj.email,
    	source: obj.id
    	}).then(customer =>
//charge the card
        	 stripe.charges.create({
							  amount: obj.amount,
                description: obj.description,
							  currency: obj.currency,
							  customer: customer.id
					  })).then((charge) => {						 
						  console.log('main charge : ',JSON.stringify(charge))
						  //console.log('res detail : ',JSON.stringify(res))
						  res.status(200).send({message: charge.status})
              
            })
            .catch(err => {
					console.log('catch status code : ',err.statusCode, err.type, err.message)
					//console.log('fulle error body is: ',err);
					res.status(err.statusCode).send({message : err.message, param: err.param})					
				 });
}
)
//End of stripe charge

module.exports = router;
