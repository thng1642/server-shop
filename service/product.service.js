const { default: mongoose } = require('mongoose')
const EmailTemplate = require('email-templates')
const nodemailer = require('nodemailer')
const path = require('path')
const ejs = require('ejs')

const ItemDto = require('../model/Item')
const StockDto = require('../model/Stock')
const UserDto = require('../model/User')
const OrderDto = require('../model/Order')
const ProductDto = require('../model/Product')
const CategoryDto = require('../model/Category')

// const { ItemDto, StockDto, UserDto, ProductDto, OrderDto} = require('../model')
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
function formatPrice(price) {

    let result = ''
        let n = price.length
        let _i = 1;
        for(let _x = n - 1; _x >= 0;) {
            
            if (_i <= 3) {
                result = result.concat(price[_x])
                _i++
                _x--
                continue
            }
            result = result.concat('.')
            _i = 1
        }
        let n1 = result.length
        let strPrice = ''
        for(let _x = n1 - 1; _x >= 0; _x--) {
            strPrice = strPrice.concat(result[_x])
        }
        return strPrice
}
/**
 * 
 * @param {String} email 
 */
async function sendingEmailConfirmOrder(email, items, name, phoneNumber, address, totalPrice) {

    const transport = nodemailer.createTransport({
        service: "gmail",
        // port: 587,
        auth: {
            user: "thng1642@gmail.com",
            pass: "ljpauwibvwtczqva"
        }
    })
    const requiredPath = path.join(__dirname, '../template/order.ejs')
    const data = await ejs.renderFile(requiredPath, {
        items: items.map(value => {
            return {
                ...value,
                price: formatPrice(value.price),
                total: formatPrice(value.total)
            }
        }),
        totalPrice: formatPrice(totalPrice),
        name: name,
        phoneNumber: phoneNumber,
        address: address
    })
    const message = {
        from: "thng1642@gmail.com",
        to: email,
        subject: "XÁC NHẬN ĐƠN ĐẶT HÀNG",
        html: data
    }

    transport.sendMail(message)
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

/**
 * Place to Order products
 * @param {any[]} items
 * @param {String} email
 * @param {String} phoneNumber
 * @param {String} address
 * @param {String} name
 * @param {String} totalPrice
 */
exports.placeToOrderProducts = async (items, email, phoneNumber, 
        address, name, totalPrice) => {
    
    const nItem = items.length
    const listItemsId = []
    try {
        for (let i = 0; i < nItem; i++) {
            // ... update count of product in stock
            const stock = await StockDto.findOne({ product: items[i].id })
            if (stock.count - items[i].quantity < 0) {
                throw Error("Hết hàng!")
            }
            // ...Saving items of order
            const tmpItem = new ItemDto({
                name: items[i].name,
                quantity: items[i].quantity,
                price: items[i].price,
                image: items[i].img,
                product: new mongoose.Types.ObjectId(items[i].id)
            })
            // console.log(tmpItem)
            const result = await tmpItem.save()
            listItemsId.push(result._id)
            await stock.updateOne({ count: stock.count - items[i].quantity })
        }
        // ... Finding user
        const user = await UserDto.findOne({ email: email})
        // ... Saving items into Order
        const order = new OrderDto({
            totalPrice: totalPrice,
            phoneNumber: phoneNumber,
            name: name,
            status: "Pending",
            address: address,
            user: new mongoose.Types.ObjectId(user._id),
            items: listItemsId.map(value => new mongoose.Types.ObjectId(value)),
        })
        const resultOrder = await order.save()
        // ... sending email confirm order success
        sendingEmailConfirmOrder(email, items, name, phoneNumber, address, totalPrice)
        return [ resultOrder, null ]
    } catch (error) {
        console.log(error)
        return [ null, error.message ]
    }
}
/**
 * Get history order by email
 * @param {String} userId 
 */
exports.getOrdersHistory = async (userId) => {
    try {
        // gets all order by userId
        const orders = await OrderDto.find({ user: userId }) 
        return [ orders, null ]
    } catch(error) {
        return  [ null, error.message ]
    }
}
/**
 * Get details order
 */
exports.getDetailsOrder = async (orderId) => {
    try {
        const order = await OrderDto.findById(orderId)
            .populate('items')
            .populate('user')
        const response = {
            items: order.items,
            email:order.user.email,
            name: order.name,
            phoneNumber: order.phoneNumber,
            address: order.address,
            totalPrice: order.totalPrice
        }
        return [ response, null ]
    } catch(error) {
        console.log("Error when get details order", error)
        return [ null, error.message ]
    }
}