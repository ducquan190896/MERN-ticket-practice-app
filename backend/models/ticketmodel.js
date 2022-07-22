const mongoose = require('mongoose')

const ticketschema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    }, 
    product: {
        type: String,
        required: [true, 'please add your product'],
        default: 'IPad',
        enum: ['IPad', 'IPhone', 'IMac', 'Macbook']
    },
    description: {
        type: String,
        required: [true, 'please add your description'],
    },
    status: {
        type: String,
        required: true,
        default: 'new',
        enum: ['new', 'closed', 'open']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Tickets', ticketschema)