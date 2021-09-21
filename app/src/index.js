const express = require('express')
const morgan = require('morgan')
const routes = require('./routes')
const exphbs = require('express-handlebars')
const path = require('path')

// Initializations
const app = express()

// Settings
app.set('port', process.env.PORT || 3000)

app.set('views', path.join(__dirname, 'views'))

app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'),  'partials'),
    helpers: require('./lib/handlebars'),
    extname: '.hbs'
}))
app.set('view engine', '.hbs')

// Middlewares
app.use(morgan('dev'))
app.use(express.json())

// Global Variables
app.use((req, res, next) => {
    next();
})

// Routes
app.use(routes)

// Public
app.use(express.static(path.join(__dirname, 'public')))

// Starting the server

app.listen(app.get('port'), () => {
    console.log(`Server running on: http://localhost:${app.get('port')}`)
})