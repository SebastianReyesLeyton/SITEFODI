const Handlebars = require('express-handlebars')
const util = require('util')

let hbs = Handlebars.create({});

hbs.handlebars.registerHelper('ifEquals', function ( arg1, arg2, options) {
    console.log(options)
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
})

module.exports = hbs;