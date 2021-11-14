import { FormGroup, makeStyles } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container'
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField'
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import Masonry from 'react-masonry-css';
import Typography from '@material-ui/core/Typography';
import ProductInfo from '../components/ProductInfo'
import ShoppingCart from '../components/ShoppingCart';



const useStyles = makeStyles({
    searchField: {
        marginTop: 20,
        marginBottom: 20
    },
    switch:{
        
    },
    root: {
        flexGrow: 1,
        marginTop: 20,
        marginBottom: 20
    },
    resultTitle: {
        marginTop: 10,
        marginBottom: 20,
        color:'red'
    }
})

const breakpoints = {
    default: 3,
    1100: 2,
    700: 1
  }

export default function Search() {
  const classes = useStyles();
  const [content, setContent] = useState('');
  const [search, setSearch] = useState('name');
  const [inStock, setInStock] = useState(true);
  const [products, setProducts] = useState([])
  const [results, setResults] = useState([])

//   const displayResults = () => {
//       console.log("displayResults();")
//     {results.map(result => (        
//         console.log(`result id: ${result._id}
//         name: ${result.name}`)
//     ))}
//   }
  useEffect(() => {
    fetch('http://localhost:8001/products')
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])
  
  let URL = '';
  const handleSearch = (e) => {
    setResults([]);
    // console.log(results);
    //console.log(content)
    URL = `http://localhost:8001/search/${search}s?${search=='id'? 'id' : 'chars'}=${content.toString().replace(/\s/g, '+')}&instock=${inStock}`;
    //console.log(URL);
    fetch(URL)
      .then(res => res.json())
      .then(data => setResults(data))
    ;
    //displayResults();
  }


  return (
    <Container className={classes.searchField}>
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={11}>
                <Autocomplete
                    freeSolo
                    id="tags-outlined"
                    options={products}
                    onInputChange = {(e, v) => 

                        v!=null? setContent(v) : 0
                        
                    }
                    autoSelect={false}
                    autoComplete={false}
                    getOptionLabel={search=='name'? (product) => product.name : (product) => product._id.toString()}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            label={`Search by ${search} - ${inStock? "instock" : "all list item"}`}
                            placeholder={`${search.toUpperCase()}:`}
                        />
                    )}
                />
            </Grid>
            <Grid  item xs={1}>
                <IconButton onClick= {(e) => handleSearch(e.target.value)}>
                    <SearchIcon />
                </IconButton>
            </Grid>
        </Grid>
        <FormGroup row>
            <FormControlLabel
                control={
                <Switch 
                    className={classes.switch}
                    color="primary"
                    onChange = {() => search == 'id' ? setSearch('name'): setSearch('id')}
                    name={`Use ID to search`}
                    checked={search == 'id'}
                    //disabled
                />
                }
                label={`Use ID to search`}
            />
            <FormControlLabel
                control={
                <Switch 
                    className={classes.switch}
                    color="secondary"
                    onChange = {() => inStock == true ? setInStock(false): setInStock(true)}
                    name={`Search in stock`}
                    checked={inStock == true}
                />
                }
                label={`Search In stock`}
            />
        </FormGroup>
            <Typography className={classes.resultTitle}>
                {
                   // content = ''
                        results.length > 0 ? 'RETURNED SEARCHING RESULT' : null
                        //:""
                }
            </Typography>
            <Masonry
                breakpointCols={breakpoints}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >

                {   
                    results.length > 0 ?
                    results.map(result => (
                        <div item key={result.id}>
                            <ProductInfo product={result}/>
                        </div>
                    )) : null 
                }
                
            </Masonry>
            {/* <ShoppingCart /> */}
    </Container>
    
    
  )
}
