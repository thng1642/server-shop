
const productDto = require('../model/Product')
const orderDto = require('../model/Order')
const roleDto = require('../model/Role')
const userDto = require('../model/User')
const { getMonth, getYear, format } = require('date-fns')
const { default: mongoose } = require('mongoose')
const Stock = require('../model/Stock')

exports.getListProduct = async () => {
    try {

        const listProd = await productDto.find()
            .populate('category')
        const result = listProd.map(value => {
            return {
                _id: value._id,
                name: value.name,
                img: value.img1,
                price: value.price,
                category: value.category.name
            }
        })
        return [ result, null ]

    } catch(error) {
        console.log(error)
        return [ null, error.message ]
    }
}
exports.getListOrder = async (limit) => {
    try {
        let orders = []
        if ( limit ) {
            orders = await orderDto.find()
                .populate('user')
                .sort({ timestamps: -1}).limit(limit)
        } else {
            orders = await orderDto.find()
        }
        // console.log("Orders: ", orders)
        const result = orders.map(value => {
            return {
                _id: value._id,
                userId: value.user._id,
                name: value.name,
                phoneNumber: value.phoneNumber,
                address: value.address,
                totalPrice: value.totalPrice,
                status: value.status,
            }
        })
        return [ result, null ]
    } catch(error) {
        console.log(error)
        return [ null, error.message ]
    }
}
/**
 * gets number of clients, earnings of month and count of new order
 */
exports.getStatistic = async () => {
    try {
        // => get clients
        // get id of role client
        const role = await roleDto.findOne({ name: 'client'})
        // get all clients
        const users = await userDto.find( { role: role._id })
        // console.log("A mount of clients: ", users.length)
        // => end
        // => get earnings of month
        // get now month
        const nowMonth = getMonth(new Date())
        const nowYear = getYear(new Date())
        const tmp = format(new Date(nowYear, nowMonth, 1),
            'dd/MM/yyyy')
        // console.log(tmp)
        const orders = await orderDto.find( { createdAt: {$gte: tmp } } )
        // calculates total price
        let total = 0
        for (let i = 0; i < orders.length; i++) {
            total += Number(orders[i].totalPrice)
        }
        // console.log(total)
        const result = {
            client: users.length,
            total: total,
            newOrder: orders.length
        }
        return [ result, null ]
        // => end
        // get newest orders
    } catch(error) {
        console.log(error)
        return [ null, error.message ]
    }
}
/**
 * Create new product
 * @param {String} name product name
 * @param {String} price product price
 * @param {String} category category id
 * @param {String} short description shortly
 * @param {String} long description longly
 * @param {String[]} images list images was saved at firebase
 * @param {String} quantity
 */
exports.createProduct = async (name, price, category, short, long, images, quantity) => {
    try {
        const product = new productDto({
            name: name,
            price: price,
            long_desc: long,
            short_desc: short,
            img1: images[0],
            img2: images[1],
            img3: images[2],
            img4: images[3],
            category: new mongoose.Types.ObjectId(category)
        })
        await product.save()
        // saving quantity into stock
        const stock = new Stock({
            count: quantity,
            product: new mongoose.Types.ObjectId(product._id)
        })
        stock.save()
        return [ "Success", null ]
    } catch (error) {
        console.log("Error when creating product\n", error)
        return [ null, error.message ]
    }
}