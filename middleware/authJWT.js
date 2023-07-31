const jwt = require('jsonwebtoken')
const UserDto = require('../model/User')

const { SECRET_KEY } = require('../config/constant')

/**
 * Valid/authorization for client
 */
module.exports = checkValidToken = async (req, res, next) => {
    // JWT auth
    const jwtStr = req.get('Authorization')?.split(" ")[1]
    if (!jwtStr) {
        res.status(403).json({
            message: "Token not provided!"
        })
        return
    }
    try {
        // Decode to get user id
        const decoded = await jwt.verify(jwtStr, SECRET_KEY)
        const user = await UserDto.findById(decoded).populate('role')
        if (!user) {
            throw Error("Yêu cầu chưa xác thực")
        }
        if ( user.email !== req.body.userInfo.email ) {
            throw Error("Lỗi xác thực")
        }
        if (user.role.name !== 'client') {
            throw Error("Bạn không được cấp phép truy cập!")
        }
        // set user ID into req to next middle
        req.userId = user._id
        next()
    } catch(error) {
        res.status(403).json({
            message: error.message
        })
        return
    }
}
