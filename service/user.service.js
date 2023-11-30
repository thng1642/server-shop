const userDto = require('../model/User')

exports.getUserprofileByEmail = async ( email ) => {
    console.log("Email to get profile", email)
    try {
        const user = await userDto.findOne({email: email})
        if (user !== null) {
            return [
                {
                    name: user.firstName + " " + user.lastName,
                    phone: user.phoneNumber
                },
                null
            ]
        } else {
            throw new Error("Email not existed before!")
        }
    } catch (error) {
        return [ null, error.message ]
    }
}