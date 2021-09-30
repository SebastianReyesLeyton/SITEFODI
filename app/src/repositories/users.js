const db = require('../database')

class UserRepository {

    constructor () {}

    userByEmail(email) {
        const ans = db.query('SELECT * FROM USER_TABLE WHERE email = ? ', [email]);
        return ans;
    }

    theraphistById(id) {
        const ans = db.query('SELECT * FROM THERAPIST WHERE id = ?', [id]);
        return ans;
    }

    patientById(id) {
        const ans = db.query('SELECT * FROM PATIENT WHERE id = ?', [id]);
        return ans;
    }
}

module.exports = UserRepository;