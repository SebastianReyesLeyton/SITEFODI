const User = require('./user');

class Patient extends User {

    constructor() {
        super();
        this.gender = '';
        this.leftHearingAid = '';
        this.rightHearingAid = '';
        this.age = 0;
        this.docNum = '';
        this.documentType = '';
    }
}

module.exports = Patient