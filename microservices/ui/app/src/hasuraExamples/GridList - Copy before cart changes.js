//This routine populates the /home with grid of products fetched from product table.
import React from 'react';
import ReactDOM from 'react-dom';

//Use hasura data api to retrieve products list
import {getArticleList} from './api';

//Use react stripe checkout library from npm
import StripeCheckout from 'react-stripe-checkout';

//Use required material-ui libraries
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import {cyan700, grey50} from 'material-ui/styles/colors';

const styles =	
  {
	root: 	  {						
				display: 'flex',
				flexWrap: 'wrap',						
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
var 	fromRupeeToPaise = amount => (amount) * 100;							
//currency used is USD 
const 	localCurrency = 'USD'

export class ProductGrid extends React.Component
{
	constructor() {
		super()
		this.state = {
		  products: [],
		  selectedPrice: 0,
		  isLoading: false
		};
	}
  
	componentDidMount() {
		//Fetch the list of products from the Product DB using the Hasura data apis
		console.log('stripe key is ====>',process.env.REACT_APP_STRIPE_PKEY)
		console.log('stripe key is ====>',process.env.REACT_APP_CLUSTER_NAME)
		this.setState({
		  ...this.state,
		  isLoading: true
		})
		getArticleList().then(productList => {
		  //Update the state with the fetched products
		  this.setState((prevState) => ({
			isLoading: false,
			products: productList
		  }));
		});
	}
	
//Tokenize the params to pass to backend to create charge and post to backend route
//Using localhost for local testing. Once code is checked in hasura cli, we can //remove this use the URL for api with route/charge which is 
//'https://api.beseeching73.hasura-app.io/charge'

	onToken = (amount,description) => token => {
		
		token.amount = fromRupeeToPaise(amount);
		token.currency = localCurrency;
		token.description = description;
	//'https://api.beseeching73.hasura-app.io/charge'	
		fetch('http://localhost:8080/charge', {
			  method: 'POST',
			  body: JSON.stringify(token),			  
			  headers: {				
				'Accept': 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
			  },
			  mode: 'no-cors'
		}).then((res) => { 					
					alert('Your order is successfully placed. You will receive an email shortly. Please click Ok to go to home page');					
			})
		  .catch(function(err) {
			// handle network error here
			console.log('Backend response: ',err)
			alert('Some problem with server, try later or contact administrator')
		   });
		
	}
			
	render() 
	{return(
		<div style={styles.root}>				
			<GridList
			  cellHeight={300}
			  style={styles.gridList}
			  cols = {3}
			>
				<Subheader style={styles.subhead}>Items on Sale </Subheader>
				{this.state.products.map((product,i) => (					
					<GridTile
					  key={i}
					  title={product.name}
					  padding={0}
					  subtitle={<span> <b>{product.price}</b></span>}
					  actionIcon={<StripeCheckout
									token={this.onToken (product.price, product.name)}
									amount={fromRupeeToPaise(product.price)}
									currency="USD"
									stripeKey={process.env.REACT_APP_STRIPE_PKEY}
								  />    
								 }
					>
						<img src={'images/' + product.imagename}  />
					</GridTile>
				))}
			</GridList>							
		</div>); 
	} 	
}

export default ProductGrid;		