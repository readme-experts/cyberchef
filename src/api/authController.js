const db = require('../database/db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {secret} = require('./authconfig')



const generateAccessToken = (id) => {
    const payload = {
        id
    }
    return jwt.sign(payload, secret, {expiresIn : "24h"}) 
}

class authController {
    async registration(req,res) {
        try {
            const {username, email, password} = req.body
            // const candidate = db.getUserData(username)
            // if (candidate) {
            //     return res.status(400).json({message: "User already exists"})
            // }
            const hashPassword = bcrypt.hashSync(password, 6)
            db.addUserToDb(username,email,hashPassword)
            return res.json({message:"user added succcesfully"})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Registration error'});
        }
    }

    async login(req,res) {
        try {
            const {username,password} = req.body
            const user =  await db.getUserData(username)
            if(!user){
                return res.status(400).json({message: `user ${username} was not found`})
            }
            // const validPassword = bcrypt.compareSync(password,user.password)
            let compare = (str1,str2) => str1 === str2
            let result = compare(password,user.password)
            if(!result) {
                return res.status(400).json({message: `pass is not correct`})
            }
            // if(!validPassword){
            //     return res.status(400).json({message: `пароль неверный`})
            // }
            const token = generateAccessToken(user.id)
            return res.json({token})

        }

        catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error'});
        }
    }


    async getLoginedUsers(req,res) {
        try {
            const users =  await db.getAllUsers()
            res.json(users)

        } catch (e) {
            res.status(400).json({message: 'User get error'});
        }
    }
}

module.exports = new authController()