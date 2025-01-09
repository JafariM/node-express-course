const {BadRequestError} = require("../errors")
const jwt = require('jsonwebtoken')

const userLogon = (req,res)=>{
    const {username,password}= req.body
    if(!username || !password){
        throw new BadRequestError('Please provide the username and password')
    }
    //for having a user id
    const id = new Date().getDate()
    //add username and id to token
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
        expiresIn: '30d', //good for 30 days
    })
    res.status(200).json({msg:'user created',token})
}

// this is a protected route, users with token can access it
const sayHello = async (req,res)=>{

    res.status(200).json({msg: `Hello ${req.user.username}`}) // we added user obj to request in authentication middleware
    
}

module.exports ={userLogon,sayHello}