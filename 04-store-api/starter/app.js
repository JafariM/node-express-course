require('dotenv').config()
require('express-async-errors')


const express = require('express');
const app= express()

//connect to the database
const connectDB = require('./db/connect')
const productsRouter = require('./routes/products')

//error handler middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler');
const { connect } = require('mongoose');

//parsing json middleware
app.use(express.json())

//routes
app.get('/',(req,res)=>{
    res.send('<h1>Store API</h1>')
})

app.use('/api/v1/products',productsRouter)

app.use(notFoundMiddleware)
app.use(errorMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
    try {
      // connectDB
      await connectDB(process.env.MONGO_URI);
      app.listen(port, () => console.log(`Server is listening port ${port}...`));
    } catch (error) {
      console.log(error);
    }
  };

start()