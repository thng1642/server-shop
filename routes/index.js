const client = require('./client')
function route(app) {

    app.use('/api/v1', client)
}
module.exports = route