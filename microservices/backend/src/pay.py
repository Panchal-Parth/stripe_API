import requests,sys
from flask import Flask,abort
from flask import render_template,request,make_response,redirect
import stripe 

app = Flask(__name__)

pub_key = 'pk_test_XHk0TSUcuCtRqfWNZU3iaVYM'
secret_key = 'sk_test_OXONmNIzuWBnqmhlqtDBkJxO'
dataUrl = 'http://localhost:3000/home'
stripe.api_key = secret_key

#This endpoint should log the received the received to stdout.  
@app.route('/pay', methods = ['POST', 'GET'])
def pay():
    #print(request.form['id'])
    #print(request.form['amount'])
    #print(request.form['email'])
   
    if request.method == 'POST':
        amount = request.form['amount']
        description = 'test product'
        customer = stripe.Customer.create(email=request.form['email'], source=request.form['id'])
        charge = stripe.Charge.create(
            customer=customer.id,
            amount=request.form['amount'],
            currency='USD',
            description=description
        ) 
    
    return render_template('message.html')

#to run the app
if __name__ == '__main__':
    app.run(debug=True)