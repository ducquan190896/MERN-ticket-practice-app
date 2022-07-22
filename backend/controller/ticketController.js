const Users = require('../models/usermodel')
const Tickets = require('../models/ticketmodel')


const Createticket = async (req, res) => {
   try {
    const {product, description} = req.body
    if(!req.user) {
        return res.status(400).json({error: 'user not Found'})
    }
    const ticket = await Tickets.create({
        product,
        description,
        user: req.user._id.toString(),
    })
    if(!ticket) {
        return res.status(400).json({error: 'ticket not created'})
    }
    res.status(200).json(ticket)
   } catch (err) {
    res.status(401).json({err: err.message})
   }
}

const gettickets = async (req, res) => {
    try {
        if(!req.user) {
            return res.status(400).json({error: 'user not authorized'})
        }
        const tickets = await Tickets.find({user: req.user._id}).select('-password')
        if(!tickets) {
            return res.status(400).json({error: 'no tickets'})
        }
        res.status(200).json(tickets)
    } catch (err) {
        res.status(400).json({error: err.message})
    }
}

const singleticket = async (req, res) => {
    try {
        if(!req.user) {
            return res.status(400).json({error: 'user not authorized'})
        }
        const {ticketid} = req.params
        const ticket = await Tickets.findById(ticketid)
        if(ticket.user.toString() !== req.user._id.toString()) {
            return res.status(400).json({err: 'no authorization'})
        }
        res.status(200).json(ticket)

    } catch (err) {
        res.status(400).json({error: err.message})
    }
}

const deleteticket = async (req, res) => {
    try {
        if(!req.user) {
            return res.status(400).json({error: 'user not authorized'})
        }
        const {ticketid} = req.params
        const ticket = await Tickets.findById(ticketid)
        if(!ticket) {
            return res.status(400).json({error: err.message})
        }
        if(ticket.user.toString() !== req.user._id.toString()) {
            return res.status(400).json({error: 'user not authorized to delete'})
        }
        await ticket.remove()
        res.status(200).json({message: 'ticket is already deleted'})


    } catch (err) {
        res.status(400).json({error: err.message})
    }
}

const updateticket = async (req, res) => {
    try {
        if(!req.user) {
            return res.status(400).json({error: 'user not authorized'})
        } 
        const {ticketid} = req.params
        let ticket = await Tickets.findById(ticketid)
        if(!ticket) {
            return res.status(400).json({error: 'no ticket found'})
        }
       if(ticket.user.toString() !== req.user._id.toString()) {
            return res.status(400).json({error: 'not authorized'})
       }
       ticket = await Tickets.findByIdAndUpdate(ticketid, {...req.body}, {new: true})
       res.status(200).json(ticket)


    } catch (err) {
        res.status(400).json({error: err.message})
    }
}

module.exports = {
    Createticket,
    gettickets,
    singleticket,
    deleteticket,
    updateticket
}