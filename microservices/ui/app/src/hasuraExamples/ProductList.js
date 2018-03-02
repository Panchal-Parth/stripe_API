import React from 'react';

//import toolbar
import GetToolbar from './GetToolbar';
import ProductGrid from './GridList'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {lime100,green500,blue500,brown500} from 'material-ui/styles/colors';

class ProductList extends React.Component {
  render() {
    return (
		<MuiThemeProvider>
			<div>
				<GetToolbar />
				<ProductGrid />
			</div>
		</MuiThemeProvider>
    );
  }
}
export {ProductList};
