const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')


const UserDto = require('../model/User')
const RoleDto = require('../model/Role')
/**
 * [POST] api/v1/login
 */
exports.loginClient = (req, res) => {
    console.log("Login: ", req.body)
    res.send('hello world')
}
/**
 * [POST] api/v1/signup
 */
exports.signUpClient = async (req, res) => {
    console.log("Register: ", req.body)
    const codedPassword = bcrypt.hashSync(req.body.password, 12)
    console.log("Coded password: ", codedPassword)

    const user = new UserDto({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: codedPassword,
        role_id: new mongoose.Types.ObjectId("64be8cdbe0026036b3237904"),
    })
    try {
        await user.save()

        res.send('hello world')
    } catch(error) {
        console.log(error)
        res.status(501).send(error.message)
        return
    }
}