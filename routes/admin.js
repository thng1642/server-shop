const express = require('express')
const router = express.Router()
const { checkSchema } = require('express-validator')

const controllerAuth = require('../controller/auth.controller')
const controllerHome = require('../controller/home.controller')
const adminMiddle = require('../middleware/admin')
/**
 * Login for admin
 */
router.post('/login', checkSchema({
    email: { 
        isEmail: true,
        errorMessage: " Email không hợp lệ!"
    },
    password: {
        isLength: { options: { min: 8 }}, 
        errorMessage: "Mật khẩu ít nhất 8 ký tự!"
    }
}) ,adminMiddle.validateData, controllerAuth.loginAdmin)

router.get('/list-product', adminMiddle.checkJwtAdmin,  
    controllerHome.getAllProduct)
router.get('/list-order', adminMiddle.checkJwtAdmin,
    controllerHome.getAllOrder)
router.get('/overview', adminMiddle.checkJwtAdmin,
    controllerHome.getStatistics)
    
module.exports = router