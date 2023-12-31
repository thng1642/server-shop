const productService = require('../service/product.service')
const adminService = require('../service/admin.service')
const categoryDto = require("../model/Category")
/**
 * Show up list products
 * [GET] /api/v1/trending
 */
exports.getTrendingProducts = async (req, res) => {
    const [ products , error ] = await productService.getTrendingProduct()
    if (products) {
        res.json(products)
    } else {
        res.status(501).json(error)
    }
}

/**
 * gets details product
 * [GET] /api/v1/product/:id
 */
exports.getDetailsProductById = async (req, res) => {
    const idProd = req.params.id
    // console.log("Product detail: ", idProd)
    const [ data, error ] = await productService.getDetailProduct(idProd)
    if (data) {
        res.json(data)
    } else {
        res.status(501).json(error)
    }
}
/**
 * Gets relative product by category
 * [GET] /api/v1/relative/product/:id
 */
exports.getRelativeProducts = async (req, res) => {
    const idCategory = req.params.id
    const [ data, error ] = await productService.getRelativeProducts(idCategory)
    if (data) {
        res.json(data)
    } else {
        res.status(501).json(error)
    }
}
/**
 * Place to order for user
 * [POST] /api/v1/place-order
 */
exports.placeToOrder = async (req, res) => {
    const { items, totalPrice, userInfo } = req.body
    // console.log(items, totalPrice, userInfo)
    const [ data, error ] = await productService.placeToOrderProducts(items,
        userInfo.email, userInfo.phoneNumber,
        userInfo.address, userInfo.name, totalPrice)
    
    if (data) {
        res.json(data)
    } else {
        res.status(400).json(error)
    }
}
/**
 * Get list history order
 * [GET] /api/v1/order
 */
exports.historyOrders = async (req, res) => {
    const [result, error] = await productService
            .getOrdersHistory(req.userId)
    if (result) {
        res.json(result)
    } else {
        res.status(400).json(error)
    }
}
/**
 * Gets details order
 * [GET] /api/v1/detail/order
 */
exports.getDetailsOrderById = async (req, res) => {
    const userId = req.userId
    const orderId = req.body.orderId
    const [ data, error ] = await productService.getDetailsOrder(orderId)
    if (data) {
        res.json(data)
    } else {
        res.status(501).json(error)
    }
}
/**
 * Gets all products from admin
 * [GET] /admin/api/v1/list-product
 */
exports.getAllProduct = async (req, res) => {
    const [ data, error ] = await adminService.getListProduct()
    if ( data ) {
        res.json(data)
    } else {
        res.status(501).json(error)
    }
}
/**
 * get all history orders for administrator
 * [GET] /admin/api/v1/list-order
 */
exports.getAllOrder = async (req, res) => {
    const limit = parseInt(req.query.limit)
    const [ data, error ] = await adminService.getListOrder(limit)
    if ( data ) {
        res.json(data)
    } else {
        res.status(501).json(error)
    }
}
/**
 * Statistics data business
 * [GET] /admin/api/v1/overview
 */
exports.getStatistics = async (req, res) => {
    const [data, error] = await adminService.getStatistic()
    if ( data ) {
        res.json(data)
    } else {
        res.status(501).json(error)
    }
}
/**
 * Get all category
 * [GET] /admin/api/v1/list-category
 */
exports.getAllCategory = async (req, res) => {
    const categories = await categoryDto.find()
    const data = categories.map(value => (
        {
            name: value.name,
            _id: value._id
        }
    ))
    res.json(data)
}