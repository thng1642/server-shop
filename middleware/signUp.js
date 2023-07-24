const UserDto = require('../model/User')

module.exports = checkDuplicateEmail = async (req, res, next) => {
    console.log("Middleware for sign up")
    try {
        const result = await UserDto
                .findOne( { email: req.body.email })
        if (result) {
            res.status(400).send({
                message: "Failed! Email is already in use!"
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