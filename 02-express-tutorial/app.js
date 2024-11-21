const express = require('express')
const {products} = require('./data')
const app = express()

app.use(express.static("./public"));

//test url
app.get('/api/v1/test',(req,res)=>{
    res.json({message: 'It worked!'})
})

//return all products
app.get('/api/v1/products', (req,res)=>{
    res.json(products)
})
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
app.all("*", (req, res) => {
    res.status(404).send("Page not found");
  });

  app.listen(3000, () => {
    console.log("Server is listening in port 3000");
  });

console.log('Express Tutorial')
