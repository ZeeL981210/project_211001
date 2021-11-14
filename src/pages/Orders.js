import * as React from 'react';
import OrderDetail from '../components/OrderDetail';
import Container from'@material-ui/core/Container'
import Masonry from 'react-masonry-css'
import Grid from '@mui/material/Grid';



export default function Orders() {

  const breakpoints = {
    default: 2,
    1100: 2,
    700: 1
  }

  const testOrder = [
    {
        "_id": "6152be9fb16881e717cbd5b3",
        "creator": "Zee",
        "order": [
            {
                "dimensions": {
                    "x": 2,
                    "y": 4,
                    "z": 5
                },
                "name": "Tasty Cotton Chair",
                "price": 444,
                "stock": 21,
                "count": 2,
                "comment": [],
                "_id": "6152be9fb16881e717cbd5b4"
            },
            {
                "dimensions": {
                    "x": 4,
                    "y": 7,
                    "z": 8
                },
                "name": "Small Concrete Towels",
                "price": 806,
                "stock": 47,
                "count": 4,
                "comment": [],
                "_id": "6152be9fb16881e717cbd5b5"
            },
            {
                "dimensions": {
                    "x": 7,
                    "y": 4,
                    "z": 5
                },
                "name": "Small Metal Tuna",
                "price": 897,
                "stock": 13,
                "count": 1,
                "comment": [],
                "_id": "6152be9fb16881e717cbd5b6"
            }
        ],
        "__v": 0
    },
    {
        "_id": "6152be9fb16881e717cbd5b7",
        "creator": "Mario",
        "order": [
            {
                "dimensions": {
                    "x": 2,
                    "y": 4,
                    "z": 5
                },
                "name": "Tasty Cotton Chair",
                "price": 444,
                "stock": 21,
                "count": 1,
                "comment": [],
                "_id": "6152be9fb16881e717cbd5b8"
            },
            {
                "dimensions": {
                    "x": 11,
                    "y": 10,
                    "z": 10
                },
                "name": "Awesome Wooden Bike",
                "price": 36,
                "stock": 3,
                "count": 2,
                "comment": [],
                "_id": "6152be9fb16881e717cbd5b9"
            },
            {
                "dimensions": {
                    "x": 4,
                    "y": 7,
                    "z": 4
                },
                "name": "Practical Steel Pizza",
                "price": 98,
                "stock": 12,
                "count": 1,
                "comment": [],
                "_id": "6152be9fb16881e717cbd5ba"
            },
            {
                "dimensions": {
                    "x": 8,
                    "y": 7,
                    "z": 3
                },
                "name": "Licensed Cotton Keyboard",
                "price": 990,
                "stock": 27,
                "count": 1,
                "comment": [],
                "_id": "6152be9fb16881e717cbd5bb"
            },
            {
                "dimensions": {
                    "x": 2,
                    "y": 6,
                    "z": 11
                },
                "name": "Tasty Cotton Soap",
                "price": 573,
                "stock": 31,
                "count": 1,
                "comment": [],
                "_id": "6152be9fb16881e717cbd5bc"
            }
        ],
        "__v": 0
    }
]

  const [orders, setOrders] = React.useState([])

  React.useEffect(() => {
    fetch('http://localhost:8001/orders')
    .then(res => res.json())
    .then(data => setOrders(data))
  }, [])

  return (
    <Container>
      <Grid container spacing={1} rowSpacing={5}> 
        {orders.map(order => (
          <Grid item key={order._id} xs={8}>
            <OrderDetail order={order} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}