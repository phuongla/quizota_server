let mongoose = require('mongoose')

let eloSchema = mongoose.Schema( {
    value: [Number]
})

module.exports = mongoose.model('Elo', eloSchema)