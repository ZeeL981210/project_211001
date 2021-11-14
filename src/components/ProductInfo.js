import React from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { DeleteOutlined } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import { Typography, makeStyles, Avatar } from '@material-ui/core';
import { yellow, green, blue, pink } from '@material-ui/core/colors'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CommentProvider from '../components/CommentProvider';
import StarIcon from '@material-ui/icons/Star';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import DialogContentText from '@material-ui/core/DialogContentText';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Tooltip from '@mui/material/Tooltip';

const useStyles = makeStyles({
    avatar: {
        backgroundColor: (product) => {
            if (product.price < 100) return yellow[700];
            if (product.price < 200 && product.price >100) return green[500];
            if (product.price < 500 && product.price >200) return pink[500];
            return blue[500];
        }
    },
    content: {
        paddingLeft: 5
    },
    button:{
        flexGrow: 1,
    },
    idButton:{
        marginRight: 20
    },
    contentText:{
        color: 'black',
        height: 300
    },
    cardBottom: {
        marginTop:25,
        textAlign: 'right'
    },
    postComment: {
        marginTop:5,
        color: 'black'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    stock: {
        border: (product) => {
            if(product.stock == 0){
                return '1px solid red'
            }
        }
    },
    addToCart: {
        //textAlign: 'right'
    }
});

export default function ProductInfo({ product, handleSubmit, handleAddtoCart }) {
    const classes = useStyles(product)
    const [open, setOpen] = React.useState(false);
    const [rate, setRate] = React.useState(5);
    const [comment, setComment] = React.useState([]);
    const [value, setValue] = React.useState(5);
    const bull = <span className={classes.bullet}>•</span>;
    const handleClickOpen = () => {
        setOpen(true);
        // console.log(product);
        // console.log(product.comment)
        
        fetch(`http://localhost:8001/products/${product._id}/comments`)
            .then(res => res.json())
            //.then(data => console.log(data[0].comment))
            .then(data => setComment(data[0].comment));

        console.log(comment);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
        setRate(newValue);
    };

    const handleInputChange = (event) => {
        setValue(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleBlur = () => {
        if (value < 0) {
        setValue(0);
        } else if (value > 10) {
        setValue(10);
        }
    };
    
    const handlePost = () => {

        console.log(rate);
        setOpen(false);
        URL = `http://localhost:8001/posts/${product._id}/comments`;
        console.log(URL)
        fetch(URL,{
            method: 'POST',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({"creator" : "Zee", "text" : rate})
        })

        var newComment = comment;
        newComment.push({"creator" : "Zee", "text" : rate});
        setComment(newComment);
        
    };


    const handleAddToCart = (id) => {
        console.log(`product:${id} has been added to cart!`)
        //TODO: store in to a array
        handleAddtoCart(product);
    }
    if (product == null) return null;

    return(
        <div>
            <Card elevation={1} className={classes.stock}>
                <CardHeader 
                    avatar={

                        <Avatar className={classes.avatar}>
                             {product.name[0].toUpperCase()}
                        </Avatar>
                    }
                    action={
                        <IconButton 
                            className={classes.addToCart} 
                            onClick={() => handleAddToCart(product._id)} 
                            disabled={product.stock == 0}
                        
                        >
                            <AddShoppingCartIcon />
                        </IconButton>
                    }
                    title={`${product.name}`}
                    subheader={`Price: $${product.price}`}
                />

                <CardContent>
                    <Typography variant='body2' color='textSecondary' className={classes.content}>
                        
                        Size: {product.dimensions.x} {bull} {product.dimensions.y} {bull} {product.dimensions.z}
                    </Typography>
                    <Typography variant='body2' color='textSecondary' className={classes.content}>
                        {`
                            stock: ${product.stock}
                        `}
                    </Typography>
                    <Typography variant='body2' color='secondary' className={classes.cardBottom}>
                        <Tooltip title={product._id}>
                            <Button variant="contained" color="primary" size="small" className={classes.idButton}>
                                Check id
                            </Button>
                        </Tooltip>

                        <Button className = {classes.button}
                            variant="contained" color="secondary" size="small"
                            // onClick= { product.comments==null ? handleClickOpen : console.log(product.comments)}
                            onClick= { handleClickOpen }

                        >
                            Comment
                        </Button>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                            fullWidth
                            maxWidth={'sm'}
                        >
                            <DialogTitle id="alert-dialog-title">
                                {comment == null ? "Alert" : "Comments"}
                            </DialogTitle>
                            <DialogContent dividers
                                id="alert-dialog-description" 
                                className={classes.contentText}
                            >
                                {comment==null
                                    ?"No comment found"
                                    :comment.map(item => (
                                    <div item key={product._id}>
                                        <CommentProvider comment={item} handleSubmit={handleSubmit}/>
                                    </div>
                                    ))
                                }
                                
                            </DialogContent>
                            <DialogContent>
                                <DialogContentText children="POST COMMENT"/>
                                <Grid container spacing={2} alignItems="center">
                                    
                                    <Grid item>
                                        <StarIcon />
                                    </Grid>
                                    <Grid item xs>
                                        <Slider
                                            max={10}
                                            value={typeof value === 'number' ? value : 0}
                                            onChange={handleSliderChange}
                                            aria-labelledby="input-slider"
                                        />
                                    </Grid>
                                        <Grid item>
                                    <Input
                                        className={classes.input}
                                        value={value}
                                        margin="dense"
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                        inputProps={{
                                        step: 10,
                                        min: 0,
                                        max: 10,
                                        type: 'number',
                                        'aria-labelledby': 'input-slider',
                                        }}
                                    />
                                    </Grid>
                                </Grid>
                            </DialogContent>  
                        
                            <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    Okay
                                </Button>
                                <Button onClick={handlePost} color="primary">
                                    Post
                                </Button>
                            </DialogActions>
                        </Dialog>
                        
                        
                    </Typography>
                    
                    
                </CardContent>

            </Card>

            

        </div>
    )
} 