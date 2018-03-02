Project Name	: Stripe Checkout (frontend) & Charge Payments (backend)
Description   	: 
HPDF Group Task (Submission 1) for team T52 is to design a web app and mobile app (combinely referred as App in further sections) for skeletal integration of the App to handle online checkout (1) and charge customer (2) using Stripe Checkout functionality (1) and Stripe Charge APIs (2) with tasks as below.

1.	Create React App (/Native App) is used with Material UI (/Nativebase) components to design a Single Page App (SPA) which can handle below design.
	a.	Custom backend service that integrates with the Stripe Create Charge API https://stripe.com/docs/api#charge. 
	b.	Supports the frontend use-cases documented below

2.	Frontend features/tasks
	a.	Integrate the Stripe checkout UI
	b.	Use the backend API developed by your teammate to charge the card a token amount.
	c.	Handle any obvious errors.

Author        	: Team 52 
						Achuthan Unni
						Parth Panchal
						Rajesh Ramadoss
						Rohit Surya

Base release  	: 28th Jan 2018.

Generic note	:	Frontend - http://localhost:3000/home 
					Backend - http://localhost:8080/charge (used by post method from frontend so don't try to use backend separately)

Important Notes before usage: 
1. This is a demo version only and not a full stripe implementation. 
2. There are few other components in this repo for future purpose and Hasura hub deployment later, please ignore them. 
3. Due to resource availability, only web version is designed and nopt react native one, which will be added later.
					
how to execute:
1.	Download python from https://www.python.org/downloads/ and select the most appropriate version (I have used python 3.5 for this project) and install it.  
2.	Open the command prompt and change directory to your folder.
3.	Activate the virtual environment 
4.	To run the file just type python and the filename.extension eg: python pay.py
5.	After cloning successfully, 
	a. Go to folder hello-react\microservices\api\src and do npm install and then npm start.
	b. Go to folder hello-react\microservices\ui\app and do npm install and then npm start
6. Now backend server runs in http://localhost:8080 and frontend runs in http://localhost:3000/home
7.  You are ready now to go to http://localhost:3000/home to chose product and place order (we got only sample products for this demo). When prompted for card detail, pls use test card# 4242 4242 4242 4242 with any end date in future and CVC. We don't recommend to click remember me in the payment form.
8.  Backend Server does log some messages.

Support:
Please contact mr.rajeshr@gmail.com or parthpanchal222@gmail.com for any support.

Reference:
	1. https://stripe.com/docs/charges 
	2. https://stripe.com/docs/checkout/tutorial
	3. NPM packages for stripe: stripe, react-stripe-checkout
	
