const express= require('express')
const router = express.Router({mergeParams: true})
const {protection} = require('../middleware/authmiddleware')
const {getnotes, addnote} = require('../controller/notecontroller')
const cors = require('cors')

router.use(cors())

router.route('/').get(protection, getnotes)
router.route('/').post(protection, addnote)



module.exports = router