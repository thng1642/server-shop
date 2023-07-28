const UserDto = require('../model/User')

/**
 * Set up middleware for sign-up user
 */
module.exports = checkDuplicateEmail = async (req, res, next) => {
    // console.log("Middleware for sign up")
    try {
        const result = await UserDto
                .findOne( { email: req.body.email })
        if (result) {
            res.status(400).json({
                error: [
                    {
                        path: "email",
                        message: "Email đã tồn tại trước đó!"
                    }
                ]
            })
            return
        }
        next()
    } catch(error) {
        console.log(error)
        res.status(501).send({
            message: "Failed! Error server!"
        })
        return
    }
}