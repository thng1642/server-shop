const ProductDto = require('../model/Product')
const CategoryDto = require('../model/Category')

/**
 * gets all products being trending
 * @returns List products trending
 */
exports.getTrendingProduct = async () => {
    try {
        const products = await ProductDto.find()
        return [ products, null ]
    } catch (error) {
        console.log("Error when gets trending products\n", error)
        return [ null, error ]
    }
}
/**
 * gets details product
 * @param {String} id product id
 * @returns data or error
 */
exports.getDetailProduct = async (id) => {
    try {
        const product = await ProductDto.findById(id).populate("category")
        if (product) {
            return [ product, null ]
        } else {
            throw new Error("Invalid product Id!")
        }
    } catch(error) {
        console.log("Error when get product detail \n", error)
        return [ null, error.message ]
    }
}
/**
 * Gets relative product by category
 * @param {String} id category id
 * @returns list product relative
 */
exports.getRelativeProducts = async (id) => {
    try {
        const products = await ProductDto.find({ category: id })
        const result = products.map(value => {
            return {
                _id: value._id,
                name: value.name,
                price: value.price,
                img: value.img1
            }
        })
        return [ result, null ]
    } catch (error) {
        console.log("Error when gets relative products\n", Error)
        return [ null, error.message ]
    }
}