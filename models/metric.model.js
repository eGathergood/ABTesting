const mongoose = require('mongoose')

const Metric = new mongoose.model(
    'Metrics',
    new mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        clicks: {
            type: Number,
        },
    })
)

module.exports = Metric
