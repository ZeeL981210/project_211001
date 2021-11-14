import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { makeStyles } from '@material-ui/core';
import Textfield from '@material-ui/core/Textfield'
import { useHistory } from'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import LoadingButton from '@mui/lab/LoadingButton';


const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
  }
})
  


export default function Create() {

  const classes = useStyles()
  const history = useHistory()
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
  const [dimensions, setDimensions] = useState({"x": 0, "y": 0, "z": 0})
  const [nameError, setNameError] = useState(false)
  const [priceError, setPriceError] = useState(false)
  const [stockError, setStockError] = useState(false)
  const [dimensionsError, setDimensionsError] = useState(false)


  const handleSubmit = (e) => {
    e.preventDefault()
    setNameError(false)
    setPriceError(false)
    setStockError(false)
    setDimensionsError(false)

    if (name == ''){
      setNameError(true)
    }
    if (price == ''){
      setPriceError(true)
    }
    if (stock == ''){
      setStockError(true)
    }
    if (dimensions.x == 0 || dimensions.y == 0 || dimensions.z == 0) {
      setDimensionsError(true)
    }
    if(name && price && dimensions && stock) {
      fetch('http://localhost:8001/posts',{
        method: 'POST',
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({name, price, dimensions, stock})
      })
      .then(() => {
        setLoading(true)
        setTimeout(() => {
          history.push("/");
        }, 3000)
      })
    }
  }


  return (
    <Container>
      <Typography
        variant="h6"
        color="textSecondary"
        component="h2"
        gutterBottom
      >
        {/* {loading? null : <CircularProgress />} */}
        New Post
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Textfield 
          onChange = { (e) => setName(e.target.value)}
          className = {classes.field}
          label="Name"
          variant= "outlined"
          color="secondary"
          fullWidth
          required
          error = {nameError}
        />

        <Textfield 
          onChange = { (e) => setPrice(e.target.value)}
          className = {classes.field}
          label="Price"
          variant= "outlined"
          color="secondary"
          fullWidth
          required
          error = {priceError}
        />

        <Textfield 
          onChange = { (e) => 
            {
              dimensions.x = e.target.value;
              setDimensions(dimensions);
            }
          }
          className = {classes.field}
          label="Dimensions-X"
          variant= "outlined"
          color="secondary"
          required
          defaultValue={"X"}
          error = {dimensionsError}
        />

        <Textfield 
          onChange = { (e) => 
            {
              dimensions.y = e.target.value;
              setDimensions(dimensions);
            }
          }
          className = {classes.field}
          label="Dimensions-Y"
          variant= "outlined"
          color="secondary"
          required
          defaultValue={"Y"}
          error = {dimensionsError}
        />

        <Textfield 
          onChange = { (e) => 
            {
              dimensions.z = e.target.value;
              setDimensions(dimensions);
            }
          }
          className = {classes.field}
          label="Dimensions-Z"
          variant= "outlined"
          color="secondary"
          required
          defaultValue={"Z"}
          error = {dimensionsError}
        />

        <Textfield 
          onChange = { (e) => setStock(e.target.value)}
          className = {classes.field}
          label="Stock"
          variant= "outlined"
          color="secondary"
          fullWidth
          required
          error = {stockError}
        />  


        {/* <Button
          type = "submit"
          color = "secondary" 
          variant ="contained"
          endIcon={<KeyboardArrowRightIcon />}

        >
          Submit
        </Button> */}
        <LoadingButton 
            type = "submit"
            color = "secondary" 
            variant ="contained"
            endIcon={<KeyboardArrowRightIcon />}
            loading={loading}
            loadingPosition="end"

            //loadingIndicator="Submitting..."
        >
            Submit
        </LoadingButton>
      </form>

      


    </Container>
  )
}
