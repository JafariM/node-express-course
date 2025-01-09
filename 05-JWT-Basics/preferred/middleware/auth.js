const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')

const authenticationMiddleware = async (req, res, next) => {

    const authHeader = req.headers.authorization
    
    //check if the request containt the token
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
   return next(new UnauthenticatedError('No token provided'))
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const { id, username } = decoded // get username and id from decoded token
    req.user = { id, username } // add this to request, so can access it in controller
    next() // next go to sayHello function 
  } catch (error) {
    next(new UnauthenticatedError('Not authorized to access this route')) 
  }
}

module.exports = authenticationMiddleware
