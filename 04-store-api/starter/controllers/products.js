const Product = require('../models/product')


const getAllProductsStatic = async(req,res)=>{
    const products = await Product.find({})
   res.status(200).json({products})
}

const getAllProducts = async(req,res)=>{

    const {featured,company,name,sort,fields,numericFilters} = req.query

    const queryObject = {}

    if(featured){
        queryObject.featured = featured === 'true'?'true': 'false'
    }
    if(company){ 
        queryObject.company = company
    }
    if(name){
        //search for any name contain even a charecter 
        queryObject.name = {$regex : name, $options: 'i'}
    }
    if (numericFilters) {
        //replace numeric filter from query to mongoose format
    const operatorMap = {
        '>': '$gt', // greater than
        '>=': '$gte', //greater and equal
        '=': '$eq',
        '<': '$lt', //less than
        '<=': '$lte',
      };
        const regEx = /\b(<|>|>=|=|<|<=)\b/g;
        let filters = numericFilters.replace(
          regEx,
          (match) => `-${operatorMap[match]}-`
        );
        const options = ['price', 'rating'];
        filters = filters.split(',').forEach((item) => {
          const [field, operator, value] = item.split('-');
          if (options.includes(field)) {
            queryObject[field] = { [operator]: Number(value) };
          }
        });
      }
    
    //to be able to chain sort after find query we remove await and add to to the end result
    let result =  Product.find(queryObject)
    //sort
    if(sort){
        //if there is more than one parameter for sort we should replace , with space to mongoose do the sort
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    }
    //fields
    if(fields){
        //only select the fields that user asked for
        const fieldsList = fields.split(',').join(' ')
        result = result.select(fieldsList)
    }
    //pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10
    const skip = (page -1)* limit 
    result = result.skip(skip).limit(limit)
    //final query send to database 
    const products = await result;
    res.status(200).json({products,nbHits:products.length})
}

module.exports ={
    getAllProducts,
    getAllProductsStatic}