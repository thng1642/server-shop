const express = require('express')
const { checkSchema } = require('express-validator')
const controllerAuth = require('../controller/auth.controller')
const router = express.Router()

const  verifyAdmin  = require('../middleware/admin')
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
}) ,verifyAdmin, controllerAuth.loginAdmin)

module.exports = router