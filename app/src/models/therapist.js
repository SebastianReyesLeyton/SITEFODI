const User = require('./user');

class Therapist extends User {

    constructor() {
        super();
        this.cc = '';
    }
}

module.exports = Therapist