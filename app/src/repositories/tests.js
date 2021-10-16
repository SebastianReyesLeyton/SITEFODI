const db = require('../database')

class TestRepository {
    
    constructor() {}

    getTests() {
        const ans = db.query('SELECT id, name FROM TEST')
        return ans
    }

    createTest( test ) {
        const ans = db.query('INSERT INTO TEST(name) VALUES (?)', [test.name])
        return ans
    }
}

module.exports = TestRepository