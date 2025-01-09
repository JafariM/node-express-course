const express = require('express')
const { userLogon, sayHello } = require('../controller/main')
const router = express.Router()
const authenticationMiddleware = require('../middleware/auth')

router.route('/logon').post(userLogon)
router.route('/hello').get(authenticationMiddleware,sayHello)

module.exports = router