const {products} = require('../data')


const getProducts = (req,res)=>{
    res.json(products)
}

module.exports ={getProducts}