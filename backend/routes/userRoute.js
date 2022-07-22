const {Register, SignIn} = require('../controller/userController')
const express = require('express')
const router = express.Router()

router.route('/register').post(Register)
router.route('/signin').post(SignIn)


module.exports = router
