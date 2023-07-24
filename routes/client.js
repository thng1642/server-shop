const express = require('express')
const router = express.Router()
const controller = require('../controller/auth.controller')
const signUpMid = require('../middleware/signUp')

router.post('/login', controller.loginClient)
router.post('/signup', [signUpMid], controller.signUpClient)

module.exports = router