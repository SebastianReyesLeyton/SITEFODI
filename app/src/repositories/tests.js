const db = require('../database')

class TestRepository {
    
    constructor() {}

    getTests() {
        const ans = db.query('SELECT id, name FROM TEST')
        return ans
    }

    getTestById(id) {
        const ans = db.query('SELECT * FROM TEST WHERE (id = ?)', [id])
        return ans
    }

    createTest( test ) {
        const ans = db.query('INSERT INTO TEST(name) VALUES (?)', [test.name])
        return ans
    }
}

module.exports = TestRepository