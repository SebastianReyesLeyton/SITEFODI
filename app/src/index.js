const express = require('express')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const formData = require('express-form-data')
const os = require("os");
const path = require('path')

const routes = require('./routes')
const user_routers = require('./routes/users')
const test_routers = require('./routes/tests')

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

const options = {
    uploadDir: os.tmpdir(),
    autoClean: true
  };

// Middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended: true}))
// parse data with connect-multiparty. 
app.use(formData.parse(options));
// delete from the request all empty files (size == 0)
app.use(formData.format());
// change the file objects to fs.ReadStream 
app.use(formData.stream());
// union the body and the files
app.use(formData.union());
  

// Global Variables
app.use((req, res, next) => {
    next();
})

// Routes
app.use(routes)
app.use('/users', user_routers)
app.use('/tests', test_routers)

// Public
app.use(express.static(path.join(__dirname, 'public')))

// Starting the server

app.listen(app.get('port'), '0.0.0.0', () => {
    console.log(`Server running on: http://localhost:${app.get('port')}`)
})