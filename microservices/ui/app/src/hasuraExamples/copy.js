
//This routine populates the /home with grid of products fetched from product table.
import React from 'react';
import ReactDOM from 'react-dom';
import fetch from 'isomorphic-fetch';

//Use hasura data api to retrieve products list
import {getArticleList} from './api';

//Use react stripe checkout library from npm
import StripeCheckout from 'react-stripe-checkout';
import math from 'mathjs';

//Use required material-ui libraries
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import {cyan700, grey50} from 'material-ui/styles/colors';

const styles =  
  {
  root:     {           
        display: 'flex',
        flexWrap: 'wrap', 
        marginTop: 2,
        marginLeft:2,
        //width: '70%'
        },  
  grid:     {           
        display: 'flex',
        flexWrap: 'wrap',   
        width: '70%'
        },          
  gridList: {
        width: '100%',
        //height: 550,
        //padding: 20,
        overflowY: 'auto',
        },
  subhead:  {
        color: grey50,
        backgroundColor: cyan700,
        fontSize: 20,
        fontWeight: 'bold',
        height: 50,
        textAlign:'center',
        },  
  };

//Convert currency to its lowest denomination. For example 1 Rupee to 100 paise
var   fromRupeeToPaise = amount => (amount) * 100;              
//currency used is USD 
const   localCurrency = 'USD'
const tilesData = [
  {
    id: 1,
  price: 10.00,
    name: 'Blue Formal Shirt',
    imagename: '1.jpg',
  },
  {
  id: 2,
  price: 50.00,
    name: 'Winter Jacket',
    imagename: '2.jpg',
  },
  
  
];
export class ProductGrid extends React.Component
{
  constructor() {
    super()
    this.state = {
      products: [],
      selectedPrice: 0,
      isLoading: false,
      /* define cart array */
      cartProducts : [],
      cartTotal: 0,
    };
    this.addToCart = this.addToCart.bind(this);
    //this.testCart = this.testCart.bind(this);
  }
  addToCart(itemName, amount){
     
    var newArray = this.state.cartProducts.slice();    
    var tempCartTotal = this.state.cartTotal;
    var itemFound = false;
    var k = 0;
    for (k = 0; k < newArray.length;k++)
    {
      if (newArray[k].name == itemName)
      {
        newArray[k].qty++;
        newArray[k].price += amount ; 
        newArray[k].price = math.round(newArray[k].price, 2)        
        itemFound = true;
      }   
    }
    if (itemFound == false) {     
      newArray.push({'name':itemName, 'qty': 1, 'price': math.round(amount, 2)});         
    }
    tempCartTotal+= amount; 
    tempCartTotal = math.round(tempCartTotal, 2)    
    this.setState({cartTotal: tempCartTotal});
    this.setState({cartProducts:newArray})
  }
  
  componentDidMount() {
    //Fetch the list of products from the Product DB using the Hasura data apis
  //  console.log('stripe key is ====>',process.env.REACT_APP_STRIPE_PKEY)
  //  console.log('stripe key is ====>',process.env.REACT_APP_CLUSTER_NAME)
    this.setState({
      ...this.state,
      isLoading: true
    })
  //Update the state with the fetched products
  /*  getArticleList().then(productList => {  
      this.setState((prevState) => ({
      isLoading: false,
      products: productList
      }));
    });*/
    this.setState({products : tilesData})
  }
  
//Tokenize the params to pass to backend to create charge and post to backend route
//Using localhost for local testing. Once code is checked in hasura cli, we can //remove this use the URL for api with route/charge which is 
//'https://api.beseeching73.hasura-app.io/charge'
//"pk_test_XNB5Gkou7mwEa8K9c9c2XFYL"

  onToken = (amount) => token => {
  	var toktest =  { 
        "amount": 1000,
        "description": "test product",
        "id":"token.id"
    }

    
	var formBody = [];
	for (var property in toktest) {
	    var encodedKey = encodeURIComponent(property);
	    var encodedValue = encodeURIComponent(toktest[property]);
	    formBody.push(encodedKey + "=" + encodedValue);
	}
	formBody = formBody.join("&"); 
    
    token.amount = fromRupeeToPaise(amount);
    token.currency = localCurrency;   
    
    var requestOptions = {
      method: "POST",
      headers: {
        "Accept": "application/json",
        //"Content-Type": "application/json ; charset=utf-8"
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
      },
      body: formBody
    };
    


    

    requestOptions["body"] = JSON.stringify(toktest);
    //requestOptions["body"] = JSON.stringify(token); http://localhost:5000/pay
    fetch('http://localhost:5000/pay', { 
    method: 'POST',
    body: formBody
    })
    .then(r =>  r.json().then(data => ({status: r.status, body: data})))
    .then(obj =>{
            console.log('MESSAGE : ',obj.status, obj.body.message)
            if (obj.status == 200)
            {
            alert('Your order is successfully placed. You will receive an email shortly. Please click Ok to go to home page');  
            this.setState({cartProducts:[]});
            this.setState({cartTotal:0});   
            }
            else {
              alert('Error from payment : ' + obj.body.param + ' : ' +obj.body.message);  
            }
            
          }
       )
    .catch( function(error) {
      alert('Some problem with server, try later or contact administrator');
      console.log('There is problem with server, pls try later')}); 
  }
  
    
  render() 
  
  { var name = 'rajesh' 
    var j = 0
    let stripeButton = null;
    if (this.state.cartTotal > 0)
    {     
      stripeButton = <StripeCheckout
        token={this.onToken (this.state.cartTotal)}
        currency="USD"
        stripeKey="pk_test_XNB5Gkou7mwEa8K9c9c2XFYL"
      />  
      
    }
    return(
    <div style={styles.root}>
      <div style={styles.grid}>       
      <GridList
        cellHeight={300}
        style={styles.gridList}
        cols = {2}
      >
        <Subheader style={styles.subhead}>Items on Sale </Subheader>
        {this.state.products.map((product,i) => (         
          <a href="#">
          <GridTile
            key={i}
            title={product.name}
            padding={0}
            subtitle={<span> <b>{product.price}</b></span>}
            actionIcon={<button onClick={() => this.addToCart(product.name,product.price)}> Add to Cart </button>}
          >
            
              <img src={'images/' + product.imagename}  />
                      
          </GridTile>
          </a>  
        ))}
      </GridList>             
      </div>        
      <div>           
      <h1> Shopping Cart </h1>      
      {this.state.cartProducts.map((cartItem) => (          
        <h3> 
          {cartItem.name} {cartItem.qty} {localCurrency} {cartItem.price} 
        </h3> 
        ))}   
      <h1> Total : {localCurrency} {this.state.cartTotal} </h1>
      <button onClick={() => {this.setState({cartProducts:[]});
                  this.setState({cartTotal:0});
                   }}> 
          Clear Shopping Cart</button>        
      <br/>
      {stripeButton}      
            
      </div>
    </div>); 
  }   
}

export default ProductGrid;   