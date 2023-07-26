const express = require('express')
const router = express.Router()

const signUpMid = require('../middleware/signUp')
const controllerAuth = require('../controller/auth.controller')
const controllerHome = require('../controller/home.controller')

router.post('/login', controllerAuth.loginClient)
router.post('/signup', [signUpMid], controllerAuth.signUpClient)

router.get('/trending', controllerHome.getTrendingProducts)
router.get('/product/:id', controllerHome.getDetailsProductById)
router.get('/relative/product/:id', controllerHome.getRelativeProducts)

module.exports = router