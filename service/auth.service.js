const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const { SECRET_KEY } = require('../config/constant')
const UserDto = require('../model/User')

/**
 * Authentication for user at client to login system
 * @param {String} email email of client
 * @param {String} password password of client
 * @returns an array stores data and error
 */
exports.authenticationClient = async ( email, password ) => {
    try {
        const user = await UserDto.findOne({ email: email }).populate('role')
        if (user) {
            if (user.role.name === 'client') {
                const isCorrect = bcrypt.compareSync(password, user.password)
                if (isCorrect) {
                    // console.log("Authentication success")
                    const accessToken = jwt.sign( user._id.valueOf() , SECRET_KEY, 
                        {
                        algorithm: 'HS256'
                    })
                    // console.log("Access token: ", accessToken)
                    return [ {
                        access_token: accessToken,
                        userInfo: {
                            email: user.email,
                            firstName: user.firstName,
                            lastName: user.lastName
                        }
                    }, null]
                } else {
                    throw new Error("Authentication fail")
                }
            }
        } else {
            throw new Error("Un-authorization for resource!")
        }
    } catch (error) {
        console.log(error)
        return [null, error.message]
    }
}