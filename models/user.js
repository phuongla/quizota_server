let mongoose = require('mongoose')
let crypto = require('crypto')

let userSchema = mongoose.Schema( {
    id: String,
    displayName: String,
    userName: String,
    password: String,
    avatar: String,
    gameUnlocked: [
        { 
            gameId: Number,
            win: Number,
            lose: Number
        }
    ],
    level: Number,
    elo: Number,
    achievements: [Number],

})

module.exports = mongoose.model('User', userSchema)