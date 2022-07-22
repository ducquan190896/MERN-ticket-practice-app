const Users = require('../models/usermodel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const Register =  async (req, res) => {
    try {
        let {name, email, password} = req.body
        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(password, salt)

        const user = await (await Users.create({name, email, password: hashpassword}))
        if(!user) {
            return res.status(401).json({error: 'registration is not successful'})
        }
         const token = jwt.sign({_id: user._id.toString()}, process.env.private_key, {expiresIn: '1h'})

         

         res.status(200).json({
            name: user.name,
            email: user.email,
            _id: user._id,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            token
         })

    } catch (err) {
        res.status(400).json({error: err.message})
    }
}

const SignIn = async (req, res) => {
    try {
        const {email, password} = req.body
        let user = await Users.findOne({email})
        if(!user) {
            return res.status(401).json({error: 'user not found'})
        }
        const isCorrect = await bcrypt.compare(password, user.password)
        if(!isCorrect) {
            return res.status(402).json({error: 'not authorized'})
        }
        const token = jwt.sign({_id: user._id.toString()}, process.env.private_key, {expiresIn: '1h'})
        res.status(200).json({
            name: user.name,
            email: user.email,
            _id: user._id,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            token
        })
    } catch (err) {
        res.status(400).json({error: err.message})
    }
}

module.exports = {
    Register, 
    SignIn
}