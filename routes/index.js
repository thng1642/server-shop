const client = require('./client')
const admin = require('./admin')
function route(app) {

    app.use('/api/v1', client)
    app.use('/admin/api/v1', admin)
}
module.exports = route