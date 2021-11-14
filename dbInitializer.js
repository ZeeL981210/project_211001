const mongoose = require("mongoose");
const data = require('./data/products.json');

const initialize = function() {



  mongoose.connect("mongodb://localhost/Lab2"); // db 'lab2'
  const db = mongoose.connection;
  const Schema = mongoose.Schema;

  let productSchema = Schema({
      name:{ type: String},
      price:{ type: Number},
      dimensions:{x:{type:Number},
                  y:{type:Number},
                  z:{type:Number}},
      stock:{type:Number},
      count:{type:Number},
      comment:{type:Array}
  })

  // let Product = mongoose.model('Product', productSchema );
  Product = mongoose.model("Product", productSchema);

  let orderSchema = Schema({
    //orderNumber:{type: Number},
    creator:{type: String},
    order:[{type:productSchema}]
  })

  let Order = mongoose.model('Order', orderSchema )
  const tempOrder1 = [
    {
        "name": "Tasty Cotton Chair",
        "price": 444,
        "dimensions": {
            "x": 2,
            "y": 4,
            "z": 5
        },
        "stock": 21,
        "id": 0,
        "count": 2
    },
    {
        "name": "Small Concrete Towels",
        "price": 806,
        "dimensions": {
            "x": 4,
            "y": 7,
            "z": 8
        },
        "stock": 47,
        "id": 1,
        "count": 4
    },
    {
        "name": "Small Metal Tuna",
        "price": 897,
        "dimensions": {
            "x": 7,
            "y": 4,
            "z": 5
        },
        "stock": 13,
        "id": 2,
        "count": 1
    }
  ] 
  const tempOrder2 = [
    {
        "name": "Tasty Cotton Chair",
        "price": 444,
        "dimensions": {
            "x": 2,
            "y": 4,
            "z": 5
        },
        "stock": 21,
        "id": 0,
        "count": 1
    },
    {
        "name": "Awesome Wooden Bike",
        "price": 36,
        "dimensions": {
            "x": 11,
            "y": 10,
            "z": 10
        },
        "stock": 3,
        "id": 7,
        "count": 2
    },
    {
        "name": "Practical Steel Pizza",
        "price": 98,
        "dimensions": {
            "x": 4,
            "y": 7,
            "z": 4
        },
        "stock": 12,
        "id": 6,
        "count": 1
    },
    {
        "name": "Licensed Cotton Keyboard",
        "price": 990,
        "dimensions": {
            "x": 8,
            "y": 7,
            "z": 3
        },
        "stock": 27,
        "id": 8,
        "count": 1
    },
    {
        "name": "Tasty Cotton Soap",
        "price": 573,
        "dimensions": {
            "x": 2,
            "y": 6,
            "z": 11
        },
        "stock": 31,
        "id": 10,
        "count": 1
    }
  ]
  // Check if there was an error connecting to the database
  db.on("error", console.error.bind(console, "connection error:"));

  // Open the database
  db.once("open", () => {
    // Delete the previous database
    db.dropDatabase((err, result) => {
      if (err) {
        console.log("Could not drop database.");
        throw err;
      }
      else{
          console.log("product collection is dropped")
      };
      Order.insertMany(
        [
          {order: tempOrder1, creator:"Zee"}, 
          {order: tempOrder2, creator:"Mario"}
        ], 
        (err, result) => {
        if(err){
          console.log(err);
          return;
        }
        Order.find({},function(err,result){
          if(err){
              console.log(err);
              return;
          }
          console.log(result)
        });
      });
      Product.insertMany(data,function(err,result){
          if(err){
              console.log(err);
              return;
          }
          // console.log(result);

          Product.find({},function(err,result){
              if(err){
                  console.log(err);
                  return;
              }
              console.log(result)
          

          mongoose.connection.close();
          process.exit(0);
        })
      })
      
    })
  });
};

module.exports = initialize();