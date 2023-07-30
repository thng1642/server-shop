
/**
 * Authorization for role admin when login
 */
module.exports = function verifyAdmin(req, res, next) {
    console.log("Run middleware")
    // Get user by id
    // Check role, have admin ?
    next()
}