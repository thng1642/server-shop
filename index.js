const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()
const storeSession = require('connect-mongo')
const session = require("express-session")

const db = require('./config/db')
const route = require('./routes')
// //set view engine
// app.set('view engine', 'ejs')
app.use(express.static(__dirname, + '/template'))
// Set up to server can readd request form/json from client
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use(session({
    store: storeSession.create({mongoUrl: 'mongodb+srv://thuanfx:O2sZeFdRrvFOXp80@cluster0.gu5iyvv.mongodb.net/funix_shop?retryWrites=true&w=majority'}),
    secret: "fx2177",
    saveUninitialized: false,
    resave: false,
    // cookie: {
    //     // httpOnly: true,
    //     maxAge: 1000 * 60 * 60 * 24 ,
    //     secure: true // cookie is only accessible over HTTP, requires HTTPS
    // }
}))
// Set up Cors
const whiteList = ["http://localhost:3000", "http://localhost:3001", "https://shop-ten-theta.vercel.app"]
const corsOptions = {
    origin: function(origin, callback) {
        // bypassing for postman req with no cors
        if (!origin) {
            return callback(null, true)
        }
        if (whiteList.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccessStatus: 200,
    credentials: true,
}
app.use(cors(corsOptions))
// app.use(express.static(path.join(__dirname, 'images')))
// // simple route
// app.get("/", (req, res) => {

//     const role = new Role({
//         name: 'supporter'
//     })
//     role.save()
//         .then( result => console.log(result))
//         .catch()
//     res.json({ message: "Welcome to your application." })

// })
// app.use("/", (req, res) => {
//     res.json({
//         message: "Deploy success",
//         title: "Your welcome"
//     })
// })
route(app)
app.listen(5000)