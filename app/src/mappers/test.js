const Test = require('../models/test')

class TestMapper {

    constructor() {
        this.test
    }

    mapperTest( data ) {
        this.test = new Test()
        this.test.id = data.id;
        this.test.name = data.name;
        return this.test
    }
}

module.exports = new TestMapper()