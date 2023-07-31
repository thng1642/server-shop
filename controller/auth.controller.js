const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const {body, checkSchema, validationResult} = require('express-validator')

const authService = require("../service/auth.service")
const UserDto = require('../model/User')
const RoleDto = require('../model/Role')

/**
 * Login for client
 * [POST] api/v1/login
 */
exports.loginClient = async (req, res) => {
    const { email, password } = req.body
    const errors = validationResult(req)
    // console.log(errors)
    if (errors.isEmpty()) {
        const [data, error] = await authService.authenticationClient(email, password)
    
        if (data) {
            res.json(data)
        } else {
            res.status(400).json({
                message: error
            })
        }
    } else {
        res.status(400).json({
            message: errors.array()[0].msg
        })
    }
}
/**
 * Sign up for client
 * [POST] api/v1/signup
 */
exports.signUpClient = async (req, res) => {
    const codedPassword = bcrypt.hashSync(req.body.password, 12)
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        // res.send("Hello world")
        const user = new UserDto({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            password: codedPassword,
            role: new mongoose.Types.ObjectId("64be8cdbe0026036b3237904"),
        })
        try {
            await user.save()
            res.send('Đăng ký thành công')
        } catch(error) {
            console.log(error)
            res.status(501).send(error.message)
            return
        }
    } else {
        const responseError = errors.array().map(item => ({
            path: item.path,
            message: item.msg
        }))
        res.status(400).json({
            error: responseError
        })
    }
}
/**
 * Login for admin
 * [POST] admin/api/v1/login
 */
exports.loginAdmin = async (req, res) => {
    const user = req.body
    const [ data, error ] = await authService.authenticationAdmin(user)
    if ( data ) {
        req.session.User = {
            email: data.user.email,
            id: data.user._id
        }
        // console.log(data)
        res.send("Hello world")
    } else {
        res.status(403).send(error)
    }
}