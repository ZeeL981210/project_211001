import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@material-ui/core/Typography'
import Divider from '@mui/material/Divider';
import { Reorder } from '@mui/icons-material';




export default function OrderDetail(order, orderNumber) {
   
    
  return (
    <Box sx={{ minWidth: 275, boxShadow: 1, width: '150%' }}>
      <Card variant="outlined">
            <CardHeader 
                title={`Order #${order.order._id}`}
                subheader={`Creator: ${order.order.creator}`}
                
            />
            
            <CardContent>
                {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                
                </Typography> */}
                <Typography variant="h5" component="div">
                    {`Detail:`}
                </Typography>
                
                {order.order.order.map((product, index) => {
                    return (
                    <React.Fragment>
                          <Divider />

                        <Typography variant="body">
                            {`Name: ${product.name}`}
                        </Typography>  <Divider />

                        <Typography variant="body2">
                            {`id: ${product._id}`}
                        </Typography>  <Divider />

                        <Typography variant="body2">
                            {`count: ${product.count}`} 
                        </Typography>  <Divider />

                    </React.Fragment>
                    
                    );
                })}
                
            </CardContent>
            {/* <CardActions>
                <Button size="small" onClick={reOrder()}>Make Order Again</Button>
            </CardActions> */}
    
      </Card>
    </Box>
  );
}