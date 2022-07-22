const express = require('express')
const router = express.Router()
const {protection} = require('../middleware/authmiddleware')
const {Createticket, gettickets, singleticket, deleteticket, updateticket} = require('../controller/ticketController')
const noteRoute = require('./noteRoute')

router.use('/:ticketid/notes', noteRoute)

router.route('/').post(protection, Createticket)
router.route('/').get(protection, gettickets)
router.route('/:ticketid').get(protection, singleticket)
router.route('/:ticketid').delete(protection, deleteticket)
router.route('/:ticketid').put(protection, updateticket)

module.exports = router