import React, { useEffect, useState } from 'react'
import Container from'@material-ui/core/Container'
import ProductInfo from '../components/ProductInfo'
import Masonry from 'react-masonry-css'
import { useHistory } from "react-router-dom";
import PubSub from 'pubsub-js';

export default function Products() {

  const [products, setProducts] = useState([])
  const history = useHistory();
  let cart = []

  useEffect(() => {
    fetch('http://localhost:8001/products')
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])





  const handleSubmit = async (id) => {
    console.log("Submit!",cart)

  }
  const handleAddtoCart = (product) => {
    if(product.count== null){
      console.log(`first item!`);
      console.log(product);
      product.count = 1;
      cart.push(product);
    } else {
      console.log(`Already exist!`);
      console.log(product);


      product.count++;
    }
    //cart.push(product);
    console.log(cart);
    PubSub.publish('cart', cart);
  }

  PubSub.subscribe('newCart', (msg, data) => {
    cart = data;
  })

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1
  }

  return (
    <Container>
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {products.map(product => (
          <div item key={product._id}>
            <ProductInfo product={product} handleSubmit={handleSubmit} handleAddtoCart={handleAddtoCart}/>
          </div>
        ))}
      </Masonry>
    </Container>
  )
}
