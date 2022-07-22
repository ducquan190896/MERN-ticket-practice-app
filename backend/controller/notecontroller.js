const Users = require('../models/usermodel')
const Tickets = require('../models/ticketmodel')
const Notes = require('../models/notemodel')

const getnotes = async (req, res) => {
     try {
        const {ticketid} = req.params
        if(!req.user) {
            return res.status(400).json({error: 'no authorization'})
        }
        let notes = await Notes.find({user: req.user._id, ticket: ticketid})
        if(!notes) {
            return res.status(400).json({error: 'no notes'})
        }
        res.status(200).json(notes)
     } catch (err) {
        res.status(400).json({error: err.message})
     }
}

const addnote = async (req, res) => {
    try {
        const {ticketid} = req.params
        if(!req.user) {
            return res.status(400).json({error: 'no authorization'})
        }
        let note = await Notes.create({
            user: req.user._id,
            ticket: ticketid,
            ...req.body
        })
        if(!note) {
            return res.status(400).json({error: 'note cannot created'})
        }
        res.status(200).json(note)
    } catch (err) {
        res.status(400).json({err: err.message})
    }
}

module.exports = {
    getnotes,
    addnote
}