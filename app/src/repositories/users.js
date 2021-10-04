const db = require('../database')

class UserRepository {

    constructor () {}

    // SELECT QUERIES

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

    patientByName(name) {
        const ans = db.query('SELECT * FROM PATIENT WHERE fullname = ?', [name]);
        return ans;
    }

    patientByTi(ti) {
        const ans = db.query('SELECT * FROM PATIENT WHERE ti = ?', [ti]);
        return ans;
    }

    // INSERT QUERIES

    addNewUser(user) {
        const ans = db.query('INSERT INTO USER_TABLE (fullname, email, passwd) VALUES (?,?,?)', [user.fullname, user.email, user.passwd ] )
        return ans
    }

    addNewPatient(patient) {
        const ans = db.query('INSERT INTO PATIENT (id, gender, leftImplant, rightImplant, age, ti) VALUES (?, ?, ?, ?, ?, ?)', [
            patient.id,
            patient.gender,
            patient.leftImplant,
            patient.rightImplant,
            patient.age,
            patient.ti
        ])
        return ans
    }

    addRelation(idPatient, idTherapist) {
        const ans = db.query('INSERT INTO THERAPIST_USER (idPatient, idTherapist) VALUES (?, ?)', [idPatient, idTherapist])
        return ans
    }

    // UPLOAD QUERIES

    changePassword(id, password) {
        const ans = db.query('UPDATE USER SET passwd = ? WHERE (id = ?)', [password, id])
        return ans
    }

    // DELETE QUERIES

    removeUser(id) {
        const ans = db.query('DELETE FROM USER_TABLE WHERE id = ?', [id])
        return ans
    }

    removePatient(id) {
        const ans = db.query('DELETE FROM PATIENT WHERE id = ?', [id])
        return ans
    }

    removeTherapist(id) {
        const ans = db.query('DELETE FROM THERAPIST WHERE id = ?', [id])
        return ans
    }

    removePatientOfTherapist(idPatient, idTherapist) {
        const ans = db.query('DELETE FROM THERAPIST_USER WHERE (idPatient = ? AND idTherapist = ?)', [idPatient, idTherapist])
        return ans
    }
}

module.exports = UserRepository;