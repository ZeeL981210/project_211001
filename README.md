
  

  
## Database

 - using mongoose
 - provided a function to initialize the database
	 - `$ node ./dbinitializer.js`
 - Designed Schema and model of `order` and `product`

## Server
**Now all data access and modify process is moved to database**

### functions
 - `get '/products'`
	 - old => get all product from `db.json`
	 - new => get all product from database
 - `get '/products/:id'`
	 - old => get specific product from `db.json`
	 - new => `find(id)` from database
 - `get '/products/:id/comments'`
	 - old => get specific product comment from local data
	 - new => `find(id, comments)` from database
 - `post '/posts'` => **verify required**
	 - old => push new data into `product`
	 - new => `insert` new data into database
 - `post '/posts/:id/comments'` => **verify required**
	 - old => insert value into local attribute
	 - new => update specific attribute from database
- `get '/orders'`
	 - new => get all orders from database
 - `get '/orders/:id'`
	 - new => get specific order from database
 - `post'/purchase'` => **verify required**
	 - new => insert order into database

	All **verify function** is build based on restriction, and all app request can respond with proper status and body.

## Client

 - using React
 - What's new:
	 - Moving all front-end data implement with new sever response
	 - add a `/Orders`page to display all the product
	 - add a `cart` component allow user interact data and submit purchase
