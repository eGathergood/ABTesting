const controller = require('../controllers/task.controller')

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        )
        next()
    })

    app.post('/api/tasks/add', controller.add)
    app.post('/api/tasks/update/:id', controller.update)
    app.get('/api/tasks/', controller.getAll)
    app.delete('/api/tasks/delete/:id', controller.delete)
}
