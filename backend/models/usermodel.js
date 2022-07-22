const mongoose = require('mongoose')

const userschema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please add your name']
    },
    email: {
        type: String,
        required: [true, 'please add your email']
    },
    password: {
        type: String, 
        required: [true, 'please add your password']
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Users', userschema)