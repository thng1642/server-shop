const express = require('express')
const router = express.Router()
const { checkSchema } = require('express-validator')
const multer = require('multer')

const controllerAuth = require('../controller/auth.controller')
const controllerHome = require('../controller/home.controller')
const controllerProduct = require('../controller/product.controller')
const adminMiddle = require('../middleware/admin')

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, 'images');
//     },
//     filename: function(req, file, cb) {
//         cb(null, file.originalname)
//     },
// })
const storage = multer.memoryStorage()
// Filter file images
const imageFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(JPG|jpg|jpeg|png)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(undefined, true)
}
const upload = multer({
    fileFilter: imageFilter,
    storage: storage
})
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
router.post("/product", adminMiddle.checkJwtAdmin,
    controllerProduct.updateProduct)
router.get('/list-product', adminMiddle.checkJwtAdmin, 
    controllerHome.getAllProduct)
router.get('/list-order', adminMiddle.checkJwtAdmin,
    controllerHome.getAllOrder)
router.get('/overview', adminMiddle.checkJwtAdmin,
    controllerHome.getStatistics)
router.get("/list-category", controllerHome.getAllCategory)
// Add new product
router.post('/add-product', adminMiddle.checkJwtAdmin,
    upload.array("img"), 
controllerProduct.createProduct)
// Gets product to update
router.get("/product", controllerProduct.getProduct)
// Logout user
router.post('/logout', (req, res, next) => {
    req.session.destroy()
    next()
})
module.exports = router