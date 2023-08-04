const { initializeApp } = require('firebase/app')
const { getStorage, ref, uploadBytesResumable, getDownloadURL } = require('firebase/storage')
const { v4: uuidv4 } = require('uuid')

const adminService = require('../service/admin.service')

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBWaNjdru17aRLMspmYEodiBjCHH9dCe1g",
    authDomain: "dotted-hulling-326801.firebaseapp.com",
    databaseURL: "https://dotted-hulling-326801-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "dotted-hulling-326801",
    storageBucket: "dotted-hulling-326801.appspot.com",
    messagingSenderId: "477166353969",
    appId: "1:477166353969:web:11ab86133a57bfe6415f10"
}
// Initialize Firebase
const app = initializeApp(firebaseConfig)
const store = getStorage(app)
/**
 * API create new product
 * [POST] /admin/api/v1/add-product
 */
exports.createProduct = async (req, res) => {
    // console.log(req.files, req.body)
    try {
        const files = Object.values(req.files)
        
        const n = files.length
        const images = []
        for (let i = 0; i < n; i++) {
            let tmp = files[i]
            // Change name to unique
            const imagesRef = ref(store, `test/${uuidv4()}`)
            const metadata = {
                contentType: tmp.mimetype,
            }
            const uploadImg = await uploadBytesResumable(imagesRef, tmp.buffer, metadata)
            const downloadUrl = await getDownloadURL(uploadImg.ref)
            console.log(downloadUrl)
            images.push(downloadUrl)
        }
        const [ result, err ] = await adminService.createProduct(req.body.name,
            req.body.price, req.body.category, req.body.short_desc, req.body.long_desc,
            images, req.body.quantity)
        if ( result ) {
            res.json(result)
        } else {
            throw new Error(err)
        }
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message)
    }
}
/**
 * get details product to update
 * [GET] admin/api/v1/product
 */
exports.getProduct = async (req, res) => {
    const prodId = req.query.id
    console.log("ID: ", prodId)
    const [ data, error ] = await adminService.getProduct(prodId)
    res.json(data)
}
/**
 * Updating product
 * [POST] admin/api/v1/product
 */
exports.updateProduct = async (req, res) => {
    const { _id, name, category, price, short_desc, long_desc } = req.body
    const [ result, error ] = await adminService.updateProduct(_id, name, category, 
        price, short_desc, long_desc)
    if (result) {
        res.json(result)
    } else {
        res.status(500).json(error)
    }
}