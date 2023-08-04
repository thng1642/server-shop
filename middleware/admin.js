const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const UserDto = require('../model/User')
const jwt = require('jsonwebtoken')
const { default: mongoose } = require('mongoose')
const { SECRET_KEY } = require('../config/constant')
/**
 * Authorization for role admin when login
 */
async function validateData(req, res, next) {
    const user = req.body
    const errors = validationResult(req)
    if ( errors.isEmpty() ) {
        // // Get user by email
        // try {
        //     await UserDto.findOne({ email: user.email})
        // } catch( error ) {
        //     return res.status(400).send(error.message)
        // }
        // Check role, have admin ?
        next()
    } else {
        res.status(400).send(errors.array()[0].msg)
        return
    }
}
/**
 * Check JWT for admin
 */
async function checkJwtAdmin(req, res, next) {
    const jwtStr = req.get('Authorization')?.split(" ")[1]
    if (!jwtStr) {
        res.status(403).json({
            message: "Token not provided!"
        })
        return
    }
    try {
        // Decode jwt
        const decoded = await jwt.verify(jwtStr, SECRET_KEY)
        console.log(req.session)
        if (decoded.role !== "admin" || decoded.role !== 'supporter') {
            if (decoded.id !== req.session.User?.id) {
                throw new Error("Từ chối truy cập!")
            }
            
        }
        next()
    } catch(error) {
        console.log(error)
        res.status(400).send(error.message)
    }
}
const adminMiddle = {
    validateData: validateData,
    checkJwtAdmin: checkJwtAdmin,
}
module.exports = adminMiddle