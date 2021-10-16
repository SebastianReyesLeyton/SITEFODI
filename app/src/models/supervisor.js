const User = require('./user');

class Supervisor extends User {

    constructor() {
        super();
        this.cc = '';
    }
}

module.exports = Supervisor