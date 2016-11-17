/**
 * Created by phuongla on 11/17/2016.
 */
let express = require('express')
let morgan = require('morgan')
let cookieParser = require('cookie-parser')
let bodyParser = require('body-parser')
let session = require('express-session')
let path = require('path')

let browserify = require('browserify-middleware')

require('../bootstrap')

let routes = require('./routes')
const NODE_ENV = process.env.NODE_ENV || 'development'

let Server = require('http').Server
let io = require('socket.io')



class App {

    constructor(config, rootDir) {
        let app = this.app = express()
        // connect to the database
        // mongoose.connect(app.config.database.url)

        // set up our express middleware
        app.use(morgan('dev')) // log every request to the console
        app.use(cookieParser('ilovethenodejs')) // read cookies (needed for auth)
        app.use(bodyParser.json()) // get information from html forms
        app.use(bodyParser.urlencoded({ extended: true }))


        let viewDir = path.join(rootDir, 'views');
        app.set('views', viewDir)
        app.set('view engine', 'ejs') // set up ejs for templating

        app.config = {
            database: config.database[NODE_ENV]
        }

        // required for passport
        app.use(session({
            secret: 'ilovethenodejs',
            // store: new MongoStore({db: 'social-feeder'}),
            resave: true,
            saveUninitialized: true
        }))

        // configure routes
        routes(app)


        //app.use(express.static('public'))
        browserify.settings({transform: ['babelify']})
        app.use('/js/index.js', browserify( path.join(rootDir, 'public/js/index.js')))


        this.server = Server(app)
        this.io = io(this.server)

        this.io.on('connection', socket => {
            console.log('user connected: ' + socket.id)

            socket.on('disconnect', () => {
                console.log('user disconnected: ' + socket.id)
            })

            socket.on('im', msg => {
                // im received
                console.log(msg)
                // echo im back
                this.io.emit('im', msg)
            })
        })
    }

    async initialize(port) {
        await this.server.promise.listen(port)
        return this
    }
}

module.exports =  App