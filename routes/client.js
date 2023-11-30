const express = require('express')
const { checkSchema } = require('express-validator')
const router = express.Router()

const signUpMid = require('../middleware/signUp')
const middleAuth  = require('../middleware/authJWT')
const controllerAuth = require('../controller/auth.controller')
const controllerHome = require('../controller/home.controller')

router.post('/login', checkSchema({
    email: {  isEmail: true, errorMessage: "Email không hợp lệ!" },
    password: { isLength: { options: { min: 8 } }, errorMessage: "Mật khẩu ít nhất 8 ký tự!" }
}), controllerAuth.loginClient)
router.post('/signup', checkSchema({
    email: {  isEmail: true, 
        errorMessage: "Email không hợp lệ!" 
    },
    password: { 
        isLength: { options: { min: 8 } }, 
        errorMessage: "Mật khẩu ít nhất 8 ký tự!" 
    },
    phoneNumber: { 
        matches: { options: /^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$/ },
        errorMessage: "Số điện thoại không hợp lệ!"
    },
    firstName: { 
        isLength: { options: { min: 2 } },
        errorMessage: "Họ không hợp lệ!"
    },
    lastName: { 
        isLength: { options: { min: 2 } },
        errorMessage: "Tên không hợp lệ!"
    }
    
}),[signUpMid], controllerAuth.signUpClient)
router.get('/trending', controllerHome.getTrendingProducts)
router.get('/product/:id', controllerHome.getDetailsProductById)
router.get('/relative/product/:id', controllerHome.getRelativeProducts)
router.post('/place-order', controllerHome.placeToOrder)
router.post('/order', [middleAuth], controllerHome.historyOrders)
router.post('/detail/order/', [middleAuth], controllerHome.getDetailsOrderById)
router.get("/userprofile", controllerHome.getUserProfile)
module.exports = router