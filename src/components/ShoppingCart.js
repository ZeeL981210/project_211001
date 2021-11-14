import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { makeStyles } from '@material-ui/core';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { DeleteOutlined } from '@material-ui/icons';
import ProductInfo from './ProductInfo';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Pubsub from 'pubsub-js';
import Typography from '@material-ui/core/Typography'
import { useHistory } from "react-router-dom";
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';




const useStyles = makeStyles({
  drawer: {
    width: 400
  },
  primaryText: {
      paddingRight:50
  },
  checkOutButton: {
      textAlign: 'center',
      padding: 100
  }
})


export default function ShoppingCart( ) {
  const [state, setState] = React.useState(false);
  const [cart, setCart] = React.useState([]);
  const [badge, setBadge] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const history = useHistory();
  const classes = useStyles();

  const generateOrder = (creator) => {
    let finalOrder = {};
    finalOrder.creator = creator;
    finalOrder.order = cart;
    return finalOrder;
  }

  const postToServer = (order) => {
    URL = `http://localhost:8001/purchase/`;
        console.log(URL)
        fetch(URL,{
            method: 'POST',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(order)
    })
  }

  const handleDelete = (itemIndex) => {
    const newCart = cart.filter( (item, index) => index != itemIndex);
    setCart(newCart);
    setBadge(newCart.length);
    Pubsub.publish("newCart", newCart);
}

  const handleClick = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState(open);
  };

  Pubsub.subscribe('cart', (msg, data) => {
    setCart(data);
    setBadge(data.length)
  })

  const handleSubmit = () => {
    console.log(generateOrder("ZEE"));
    postToServer(generateOrder("ZEE"));
    setLoading(true);
    setTimeout(() => {
      history.push("/orders");
    }, 3000);
  }

  const list = (anchor) => (
    <Box
      role="presentation"
    >
      <List>
        {cart.map((item, index) => (
          <ListItem>
            <ListItemText className = {classes.primaryText} primary={`${item.name}       `} />
            {/* <ListItemText secondary={`count:${item.count}`} /> */}
            <ListItemText secondary={`count:${item.count == null ? `Nah` : item.count}`} />
            <IconButton 
                onClick= {() => handleDelete(index)}
            >
                <DeleteOutlined />
            </IconButton>
            <Divider />
          </ListItem>
          
        ))}
        <Divider />
        <ListItem>
            
            <LoadingButton 
            onClick = {handleSubmit}
            fullWidth
            loading={loading}
            variant="outlined" 
            loadingIndicator="Purchasing..."
            color={'secondary'}  >
                Proceed to check out
            </LoadingButton>

            

        </ListItem>
        <ListItem>
        <TextField id="textField" label="Purchaser's name:"/> 
        </ListItem>


      </List>
      

    </Box>
  );

  return (
    <div>
        <React.Fragment key={'right'}>
          <IconButton onClick={handleClick(true)}>
              <Badge badgeContent={badge} color="primary"><ShoppingCartIcon /></Badge>
          </IconButton>
          {/* <Button onClick={toggleDrawer(true)}>{'right'}</Button> */}
          <Drawer 
            width={500}
            anchor={'right'}
            open={state}
            onClose={handleClick(false)}
          >
            {list('right')}
          </Drawer>
        </React.Fragment>

    </div>
  );
}