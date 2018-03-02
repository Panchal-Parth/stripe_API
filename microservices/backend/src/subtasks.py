import requests,sys
from flask import Flask,abort
from flask import render_template,request,make_response,redirect,url_for
import stripe 
from flask import jsonify
from flask import json

app = Flask(__name__)

pub_key = 'pk_test_XHk0TSUcuCtRqfWNZU3iaVYM'
secret_key = 'sk_test_OXONmNIzuWBnqmhlqtDBkJxO'

stripe.api_key = secret_key

#A simple hello-world at http://localhost:8080/ that displays a simple string 
@app.route('/')
def index():
	return "Hello World - Parth"

#Add a route, for e.g. http://localhost:8080/authors, which: fetches 2 list from different URL and display a list of authors and the count of their posts
@app.route("/authors")
def authors():
	resp = requests.get('https://jsonplaceholder.typicode.com/users/')
	response = requests.get('https://jsonplaceholder.typicode.com/posts')
	users = resp.json()
	posts = response.json()
	return render_template('authors.html',authors=users,posts=posts)

#Set a simple cookie
@app.route("/setcookie")
def settcookie():
	resp = make_response('Setting Cookie')
	resp.set_cookie('name' , 'Parth Panchal')
	resp.set_cookie('age' , '20')
	return resp 
	return '';

#Fetch the set cookie with http://localhost:8080/getcookies and display the stored key-values in it.
@app.route("/getcookie")
def getcookie():
	name = request.cookies.get('name')
	age = request.cookies.get('age')
	return 'The name is ' +name + ' and age is ' +age;

#Deny requests to your http://localhost:8080/robots.txt page.
@app.route("/robots.txt")
def deny():
	return abort(401)

#Render an HTML page at http://localhost:8080/html or an image
@app.route('/html')
def html():
    return(render_template('test.html'))

#A text box at http://localhost:8080/input which sends the data as POST to any endpoint.
@app.route('/input')
def input():
    return render_template('input.html', pub_key=pub_key)

#This endpoint should log the received the received to stdout.	
@app.route('/pay', methods = ['POST', 'GET'])
def pay():
    '''if request.method == 'POST':
       amount = request.form['amount']
       description = request.form['description']
       customer = stripe.Customer.create(email=request.form['stripeEmail'], source=request.form['stripeToken'])
       charge = stripe.Charge.create(
       		customer=customer.id,
       		amount=amount,
       		currency='usd',
       		description=description
       	)
    '''
    #method 1
    result = request.form 
    print (request.form)
    return render_template("http://localhost:3000/home",result = result)
    #method 2
    '''jsonData = request.get_json()
    print (jsonData['amount'])
    print (jsonData['id'])
    return jsonData'''
    #method 3
    '''data = (request.form)
    json_dumps = json.dumps(data)
    print (json_dumps)
    return (request.form)'''
    #method 4
    '''data = json.dumps(dict(request.form))
    inner_data = data[0][3]
    inner_data = json.loads(inner_data)
    print(inner_data)
    return inner_data'''
    #method 5
    #data = str(request.form)
    #json_dumps = json.dumps(data)
    #return json_dumps
    #data = request.form
    #dataDict = json.loads(data)
    #print (data)
    #return jsonify(resp=data.json())
    '''A=[]
    A.append(request.form['amount'])
    A.append(request.form['description'])
    A.append(request.form['id'])
    #do same for all form data
    print (jsonify(list=A))
    test = jsonify(list=A)
    return test'''

    #return redijrect(url_for('/thanks'))
    
    #dict={"id":"tok_1BymV5KliAs5iPaky9aipPnu","object":"token","card":{"id":"card_1BymV5KliAs5iPaktHHZhRRy","object":"card","address_city":null,"address_country":null,"address_line1":null,"address_line1_check":null,"address_line2":null,"address_state":null,"address_zip":null,"address_zip_check":null,"brand":"Visa","country":"US","cvc_check":"pass","dynamic_last4":null,"exp_month":1,"exp_year":2019,"funding":"credit","last4":"4242","metadata":{},"name":"sdf@gd.cop","tokenization_method":null},"client_ip":"90.192.213.219","created":1519415195,"email":"sdf@gd.cop","livemode":false,"type":"card","used":false,"amount":5000,"currency":"USD"}
    #for item in dict:
    #print item.get('id')
    #print (dict[0][2])
    #return jsondata.content
    #method6 was working on this one
    '''data = request.form.to_dict()
    print (data)
    return jsonify(data=data)'''
    #method 7 : my working method
    '''
    data = request.get_data() #OR WE CAN USE request.stream.read()
    data = (data.decode('UTF-8'))
    #data = json.JSONEncoder().encode(data)
    print (data['input'])
    return (data['input'])
    '''
    #method 8
    '''content = request.get_json()
    js = json.loads(json.dumps(content))
    print (js['toktest'])
    return (js['toktest'])'''
	

#to run the app
if __name__ == '__main__':
	app.run(debug=True)