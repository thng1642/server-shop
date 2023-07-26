const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

const authService = require("../service/auth.service")
const UserDto = require('../model/User')
const RoleDto = require('../model/Role')

/**
 * Login for client
 * [POST] api/v1/login
 */
exports.loginClient = async (req, res) => {
    const { email, password } = req.body
    const [data, error] = await authService.authenticationClient(email, password)

    if (data) {
        res.json(data)
    } else {
        res.status(401).send(error)
    }
}
/**
 * Sign up for client
 * [POST] api/v1/signup
 */
exports.signUpClient = async (req, res) => {
    
    const codedPassword = bcrypt.hashSync(req.body.password, 12)
    const user = new UserDto({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: codedPassword,
        role: new mongoose.Types.ObjectId("64be8cdbe0026036b3237904"),
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