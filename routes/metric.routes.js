const controller = require('../controllers/metric.controller')

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        )
        next()
    })

    app.get('/api/metrics/', controller.getAll)
    app.post('/api/metrics/registerClick/:id', controller.registerClick)
    app.post('/api/metrics/resetClicks/:id', controller.resetClicks)
}
