const express = require('express')
const cors = require('cors')
const app = express()
const db = require('./config/db')
const route = require('./routes')
const session = require("express-session")
const storeSession = require('connect-mongo')

// const Role = require('./model/Role')

// //set view engine
// app.set('view engine', 'ejs')
app.use(express.static(__dirname, + '/template'))
// Set up to server can readd request form/json from client
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use(session({
    store: storeSession.create({mongoUrl: 'mongodb://localhost:27017/funix-shop' }),
    secret: "fx2177",
    saveUninitialized: true,
    resave: true,
    cookie: {
        path: '/admin'
    }
    // cookie: {
    //     // httpOnly: true,
    //     maxAge: 1000 * 60 * 60 * 24 ,
    //     secure: true // cookie is only accessible over HTTP, requires HTTPS
    // }
}))
// Set up Cors
const whiteList = ["http://localhost:3000", "http://localhost:3001"]
const corsOptions = {
    origin: function(origin, callback) {
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}
app.use(cors(corsOptions))
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
route(app)
app.listen(5000)