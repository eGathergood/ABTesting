const db = require('../models')

const Metric = db.metric

// GET /metrics/
exports.getAll = (req, res) => {
    Metric.find()
        .then((metrics) => res.json(metrics))
        .catch((err) => res.status(400).json('Error: ' + err))
}

//resets clicks to 0
exports.resetClicks = (req, res) => {
    Metric.findById(req.params.id)
        .then((metric) => {
            metric.clicks = 0

            metric
                .save()
                .then(() => res.json('Task updated!'))
                .catch((err) => res.status(400).json('Error: ' + err))
        })
        .catch((err) => res.status(400).json('Error: ' + err))
}

// adds a "click"
exports.registerClick = (req, res) => {
    Metric.findById(req.params.id)
        .then((metric) => {
            metric.clicks = metric.clicks + 1

            metric
                .save()
                .then(() => res.json('Task updated!'))
                .catch((err) => res.status(400).json('Error: ' + err))
        })
        .catch((err) => res.status(400).json('Error: ' + err))
}
