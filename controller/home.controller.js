
const productService = require('../service/product.service')
/**
 * Show up list products
 * [GET] /api/v1/trending
 */
exports.getTrendingProducts = async (req, res) => {
    const [ products , error ] = await productService.getTrendingProduct()
    if (products) {
        res.json(products)
    } else {
        res.status(501).send(error)
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
        res.status(501).send(error)
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
        res.status(501).send(error)
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
        res.status(501).send(error)
    }
}