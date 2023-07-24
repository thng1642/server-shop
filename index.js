const express = require('express')
const cors = require('cors')
const app = express()
const db = require('./config/db')
const route = require('./routes')
// const Role = require('./model/Role')
// Set up to server can readd request form/json from client
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
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