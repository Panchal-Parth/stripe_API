import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import SocialNotificationsNone from 'material-ui/svg-icons/social/notifications-none';
import CommunicationEmail from 'material-ui/svg-icons/communication/email';
import ImageFlashOn from 'material-ui/svg-icons/image/flash-on';
import ActionFlightTakeoff from 'material-ui/svg-icons/action/flight-takeoff';
import ActionSearch from 'material-ui/svg-icons/action/search';
import AddCart from 'material-ui/svg-icons/action/add-shopping-cart';
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import {pink500,grey100,cyan500,red500,lime100,
        grey500,grey800,grey50,grey600,
        green500,blue500,brown500} from 'material-ui/styles/colors';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

const muiTheme = getMuiTheme({

    toolbar: {
            backgroundColor: grey100,
		//	width : '100%',
        //    margin: 0,
            height: 70,
        //    padding:'100px 100px 100px 100px',
    },
    flatButton : {
          primaryTextColor: grey600,
          fontWeight: 'bold',
          fontSize: '12px',
          textTransform: 'capitalize',
        },
    /*raisedButton : {
          primaryTextColor: grey50,
          borderRadius: '100px',
          fontSize: '12px',
          fontWeight: 'bold',
          textTransform: 'capitalize',
          padding: '3px 3px',
          textAlign: 'center',
          width: '30%',
          height: 25,
          lineHeight: '25px',
          primaryColor: blue500,
        },*/
    button : {
        borderRadius: '70px',
        padding: '3px 3px',
        width: '50%',
        height: 25,
        lineHeight: '25px',
        },
   textField: {
     underlineShow: false,
   },
  });

                      /*const styleTweet = {
                        border: '5px solid #2196F3',
                        borderRadius: '70px',
                      };
                       const styleSearchDiv = {
                         border: '1px solid #BDBDBD',
                         width: '180px',
                         borderRadius: '50px',
                         padding:'1px 1px 1px 1px',
                         margin: '0px 10px 0px 10px',

                       };
                      const styleSearchInput = {
                        border: '0px',
                        width: '140px',
                        margin: 5,
                        backgroundColor: grey50,
                      };
                      */
export default class GetToolbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 3,
    };
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
      <Toolbar >
        <ToolbarGroup >
        <FlatButton style={{ margin: 50 }}
          label="Home"
          primary={true}
          icon={<ActionHome />}
        />
        <FlatButton style={{ margin: 50 }}
          label="Products"
          primary={true}
          icon={<ImageFlashOn />}
        />
        <FlatButton style={{ margin: 50}}
          label="About Us"
          primary={true}
          icon={<SocialNotificationsNone />}
        />
        <FlatButton style={{ margin: 50 }}
          label="Contact"
          primary={true}
          icon={<CommunicationEmail />}
        />
        <div style={{ margin: 10 }}>
          <RaisedButton backgroundColor="#a4c639"
                        icon={<AddCart />}
                        label="Shopping Cart" />
        </div>
        </ToolbarGroup>
      </Toolbar>
      </MuiThemeProvider>
    );
  }
}
