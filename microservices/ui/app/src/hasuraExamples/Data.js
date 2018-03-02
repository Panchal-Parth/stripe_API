import React from 'react';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';

import {getArticleList} from './api';

class Data extends React.Component {

  constructor() {
    super()
    //Init an empty state
    //articles -> has a list of all articles
    //currentArticle -> the current article being shown in detail
    this.state = {
      products: [],
      isLoading: false
    };
  }

  componentDidMount() {
    //Fetch the list of articles from the DB using the Hasura data apis
    this.setState({
      ...this.state,
      isLoading: true
    })
    getArticleList().then(productList => {
      //Update the state with the fetched articles
      this.setState((prevState) => ({
        isLoading: false,
        products: productList
      }));
    });
  }

  render() {
    return (
      <div>
        <Card>
          <CardText>
            This component utilizes the hasura data APIs. In this example, it fetches a list of articles from the articles table which has been pre created and already loaded with some dummy data. To check out how the data API is used to render this view, check out services/ui/app/src/hasuraExamples/Data.js. A good exercise would be to also show the author details for each of these articles. 
          </CardText>
        </Card>
        <h1>Products</h1>
        <Divider/>
        {this.state.products.map((product, i) =>
          <div key={i}>
            <Card style={articleCardStyle}>
              <CardTitle titleStyle='bold' title={product.name}/>
              <CardText>                
                {product.price}
              </CardText>
			  <CardText
                color='#424242'>
                {product.description}
              </CardText>
            </Card>
          </div>
        )}
      </div>
    );
  }
}

const articleCardStyle = {
  padding: '20px',
  margin: '20px'
};

export {
  Data
};
