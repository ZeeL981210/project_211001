const mongoose = require("mongoose");
const http = require('http');
const fs = require('fs');
const express = require('express');
const app = express();
let product = {};
let orders = {};

//read file and pipe through server -- v1
// fs.readFile('./data/products.json', 'utf8', function(err, data) {
//     if(err){
//         console.log("Couldnt read /product.json file");
//         console.log(process.cwd());
//         return;
//     }
//     // if do not use JSON.parse, it will return with lots of slashes
//     product = JSON.parse(data);
//     console.log("FILE READ!")

// });
//read file from database --v2
//Hook to the database
mongoose.connect("mongodb://localhost/Lab2");

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

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  var tempProduct = {};
  Product.find({},function(err,result){
    if(err){
        console.log(err);
        return;
    }
    // console.log("getProduct()")
    // console.log(result)
    product = result;
    // return result;
  })
  //console.log(product);
  app.use(express.json());
  app.get('/test', function(req, res){
    //console.log(tempProduct);
    updateProduct();
    res.status(200).json(tempProduct);
  })
  //return all the products objects
  app.get("/products", function(req, res){

      Product.find({},function(err,result){
        if(err){
            console.log(err);
            return;
        }
        // console.log("getProduct()")
        // console.log(result)
        product = result;
        // return result;
      })
      
      if(product){
          res.status(200).json(product);
          //console.log(`GET/ products status(200)`);
      }
      else{
          res.status(404).send("empaty json file");
          //console.log(`GET/ products status(404)`);
      }
  })
  //finding the specify object contains :id
  app.param("id", function(req, res, next){
      if(product){
          req.post = req.params.id;
          next();
      }
      else{
          res.status(404).send("id not found");
      }
  })
  //reterieve particular post by specific ID
  app.get("/products/:id", function(req, res){
      let returnVal = {}
      Product.find({ _id: req.post },function(err,result){
        if(err){
            console.log(err);
            return;
        }
        // console.log("getProduct()")
        // console.log(result)
        returnVal = result;
        // return result;
        res.status(200).json(returnVal);
      })
  })
  //reterieve comment from specific objects
  //whats the point? you get data anyway, why cannot do the calculation local(in client)
  app.get("/products/:id/comments", function(req, res){
      let returnVal = [];
      Product.find({ _id: req.post }, "comment" ,function(err,result){
        if(err){
            console.log(err);
            return;
        }
        
        returnVal = result;
        res.status(200).json(returnVal);
      })
  })
  //create a post
  app.post("/posts", [verifyPost, addPost]);
  //Express validator can be used for better validation
  //Provides lots of nice validation rules
  //https://express-validator.github.io/docs/
  function verifyPost(req, res, next){
    //Check the body exists
    if(!req.body){
      res.status(400).send("JSON body required containing id, name, price, dimensions, stock.");
    }
    //Check that each required property exists
    //Better validation would be advisable
    const requiredContents = ["name", "price", "dimensions", "stock"];
    for(let i = 0; i < requiredContents.length; i++){
      if(!req.body.hasOwnProperty(requiredContents[i])){
        res.status(400).send("JSON body required containing id, name, price, dimensions, stock.");
        return;
      }
    }
    next();
  }

  function addPost(req, res, next){
    //console.log(typeof(req.body.price));
    var newProduct = {
      name: req.body.name,
      price : req.body.price,
      dimensions : req.body.dimensions,
      stock : req.body.stock,
      comment : [],
      //{id : product.length}
    };

    Product.create(newProduct, function (err, result) {
      if (err) return console.error(err);
    });

    res.status(200).json("POST SUCCEED!");
  }
  //Add a comment to the post with ID=:postID
  app.post("/posts/:id/comments", verifyComment, addComment);


  function verifyComment(req, res, next){
    var id = req.params.id;
    //Check if there is comment in object
    Product.find({ _id: id},function(err,result){
      if(err){
          console.log(err);
          return;
      }
      //console.log(result)
      if(result.comment == null){
        return;
      }
      
    });
    
    //Check the body exists
    if(!req.body){
      res.status(400).send("JSON body required containing commenter name and comment text.");
    }

    //Check that each required property exists
    //Better validation would be advisable
    const requiredContents = ["text", "creator"];
    for(let i = 0; i < requiredContents.length; i++){
      if(!req.body.hasOwnProperty(requiredContents[i])){
        res.status(400).send("JSON body required containing commenter name and comment text.");
        return;
      }
    }

    next();
  }

  function addComment(req, res, next){
    var id = req.post;
    let commentBody = {
      //id : nextCommentID,
      creator : req.body.creator,
      text : req.body.text
    };
    Product.findOneAndUpdate(
      {
      　　_id : id
      },
      {
      　　'$push':
      　　{
      　　　　comment: commentBody
      　　}
      },
      {
      　　upsert:true,
      　　'new':true
      } ,
      (err,data)=>{
      　　//return
    });
    
    Product.find({ _id: id},function(err,result){
      if(err){
          console.log(err);
          return;
      }
      //console.log(result)
    
    });
    res.status(200).json(commentBody);
  }

  //extract commands from url
  function extractCharacters(url){
    //console.log("Splitting URL: " + url);
    let query = url.split("?")[1];

    //console.log("Query: " + query);

    let parts = query.split("&");

    let result = {"": true};
    //console.log(parts);
    for(let i = 0; i < parts.length; i++){
      result.value=(parts.includes('instock=true'));
      if(parts[i].startsWith("chars=")){
        //console.log( parts[i].split("=")[1].replace(/[+]/g," "));
        //console.log("Returning characters: " + parts[i].split("=")[1].replace(/[+]/g," "));
        result.key=parts[i].split("=")[1].replace(/[+]/g," ");
        //return parts[i].split("=")[1].replace(/[+]/g," ");
        return result;
      }
      if(parts[i].startsWith("id=")){
        //console.log("Returning IDS: " + parts[i].split("=")[1]);
        result.key=parts[i].split("=")[1];
        //return parts[i].split("=")[1];
        return result; 
      }

    }

    return "";
  }

  function getById(id){
    let results = [];
    let length = results.length;
    for(let i=0; i< product.length; i++){
        if(product[i].id.toString().toLowerCase().includes(id.key.toString().toLowerCase())){
            if(id.value){
              if(product[i].stock>0){
                results.push(product[i]);
                length++;
              }
            }else{
              results.push(product[i]);
              length++;
            }      
        }
    }
    return results
  }
  function getByName(char){
      let results = [];
      let length = results.length;
      for(let i=0; i< product.length; i++){
          if(product[i].name.toString().toLowerCase().includes(char.key.toString().toLowerCase())){
              if(char.value){
                if(product[i].stock>0){
                  results.push(product[i]);
                  length++;
                }
              }else{
                results.push(product[i]);
                length++;
              }      
          }
      }
      console.log(results)

      return results
  }
  //search patterns
  app.get("/search/ids", function(req, res){
    res.status(200).json(getById(extractCharacters(req.url)));
  })
  app.get("/search/names", function(req, res){
      console.log(req.post);
      res.status(200).json(getByName(extractCharacters(req.url)));
  })
  //get orders from Server
  app.get("/orders", function(req, res){
    Order.find({},function(err,result){
      if(err){
          console.log(err);
          return;
      }
      
      orders = result;
      
      if(orders){
        res.status(200).json(orders);
      }
      else{
        res.status(404).send("no orders yet");
      }

    })
  })
  app.get("/orders/:id", function(req, res){
    let returnVal = {}
      Order.find({ _id: req.post },function(err,result){
        if(err){
            console.log(err);
            return;
        }
        // console.log("getProduct()")
        // console.log(result)
        returnVal = result;
        // return result;
        res.status(200).json(returnVal);
      })
  })
  //Add a comment to the post with ID=:postID
  app.post("/purchase/", verifyPurchase, addPurchase);

  console.log("Order Receieved!");

  function verifyPurchase(req, res, next){
    var outOfStock = false;
    if(req.body.creator==null){
      return res.status(409).json("No Creator");
    }
    let count = 0;
    req.body.order.map((item) => {
      product.map((p) => {
        if(p.name==item.name){
          // console.log(`p name: ${p.name}`)
          // console.log(`item name: ${item.name}`)
          count++;
          if(p.stock < item.count){
            outOfStock = true;
          }
        }
        
      })
      
    })
    if(count != req.body.order.length){
      return res.status(409).json("Product does not exsist");
    }
    if(outOfStock){
      return res.status(409).json("Out of Stock!");
    }
    next();
  }

  function addPurchase(req, res, next){
    //TODO: add order to database
    let purchase = req.body;
    //console.log(req.body);
    Order.insertMany(
      [
        {order: purchase.order, creator: purchase.creator}
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
    res.status(200).json(purchase);

  }


  app.listen(8001);
  console.log("Server listening at http://localhost:8001");
});