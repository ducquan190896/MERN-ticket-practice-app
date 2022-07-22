const Users = require('../models/usermodel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const protection = async (req, res, next) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            console.log(token)
            const decode =  jwt.verify(token, process.env.private_key)
            console.log(decode)
            if(!decode) {
                return res.status(400).json({error: 'No authorization'})
            }   
            const user = await Users.findById(decode._id).select('-password')

            if(!user) {
                return res.status(400).json({error: 'user not found'})
            }
            req.user = user
            next()
        } catch (err) {
    
        }
    }

    if(!token) {
        return res.status(400).json({error: 'No authorization'})
    }
   
}

module.exports = {
    protection
}