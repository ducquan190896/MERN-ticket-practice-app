const mongoose = require('mongoose')

const noteschema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    },
    ticket: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Tickets'
    },
    text: {
        required: true,
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Notes', noteschema)