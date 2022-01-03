const authRouter = require('express')
const authrouter = new authRouter()
const authcontroller = require('./authController')
const authMiddleware = require('./authMiddleware')

authrouter.post('/registration', authcontroller.registration)
authrouter.post('/login' ,authcontroller.login)
authrouter.get('/users',authMiddleware, authcontroller.getLoginedUsers)
module.exports = authrouter