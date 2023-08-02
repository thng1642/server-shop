const { initializeApp } = require('firebase/app')
const { getStorage, ref, uploadBytesResumable, getDownloadURL } = require('firebase/storage')

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

    try {
        // const files = Object.values(req.files)
        
        // const n = files.length
        // for (let i = 0; i < n; i++) {
        //     let tmp = files[i]
        //     // Change name to unique
        //     const imagesRef = ref(store, `test/${tmp.originalname}`)
        //     const metadata = {
        //         contentType: tmp.mimetype,
        //     }
        //     const uploadImg = await uploadBytesResumable(imagesRef, tmp.buffer, metadata)
        //     const downloadUrl = await getDownloadURL(uploadImg.ref)
        //     console.log(downloadUrl)
        // }
        
        res.send("hello world")
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message)
    }
}