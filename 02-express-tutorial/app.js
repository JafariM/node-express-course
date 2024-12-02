const express = require('express')
const {products,people} = require('./data')
const app = express()
const peopleRouter = require('./routes/people')
const productRouter = require('./routes/products');

//parse post request body from HTML form
app.use(express.urlencoded({ extended: false }));

//parse json from javascript 
app.use(express.json());

app.use(express.static("./methods-public"));
//People route
app.use('/api/v1/people',peopleRouter)

//products route
app.use('/api/v1/products',productRouter)

//test url
app.get('/api/v1/test',(req,res)=>{
    res.json({message: 'It worked!'})
})

//logger middlware
const logger = (req,res,next)=>{
    const{method,url} = req;
    const time= new Date().getHours();
    console.log(method,url,time);
    next();
}

//return all products
// app.get('/api/v1/products',logger, (req,res)=>{
//     res.json(products)
// })
//return a product by id
app.get('/api/v1/products/:productId',(req,res)=>{
    const idToFind = parseInt(req.params.productId); 
    const product = products.find((p) => p.id === idToFind);
    if(product){
        res.json(product)
    }
    else{
        res.json({message:'product not found'})
    }
})

//url for search query
app.get("/api/v1/query", (req, res) => {
    
    let searchedProduct = [...products]
    const{search,limit,price} = req.query;
    if(search){
        searchedProduct= products.filter((product)=>{
            return product.name.startsWith(search)
        })
    }
    if(limit){
        searchedProduct= searchedProduct.slice(0,Number(limit))
    }
    if(price){
        searchedProduct= searchedProduct.filter((product)=>{
            return product.price < price
        })
    }

    res.json(searchedProduct)
})
//===============people====================
// app.get("/api/v1/people", (req, res) => {
//     res.json(people);
// });

//add new item to people array
// app.post('/api/v1/people',(req,res)=>{
//     const {name} = req.body;
//     if(!name){
//         res.status(400).json({success: false, message:"Please provide a name"})
//     }
//     people.push({id: people.length+1,name:name})
//     res.status(201).json({success:true,name:name})
// })
app.all("*", (req, res) => {
    res.status(404).send("Page not found");
  });

  app.listen(3000, () => {
    console.log("Server is listening in port 3000");
  });

console.log('Express Tutorial')
