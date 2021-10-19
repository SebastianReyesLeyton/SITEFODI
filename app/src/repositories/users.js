const db = require('../database')

class UserRepository {

    constructor () {}

    /* --------------- SELECT QUERIES --------------- */

    /* USER QUERIES */

    userByEmail(email) {
        const ans = db.query('SELECT * FROM USER_TABLE WHERE email = ? ', [email]);
        return ans;
    }

    userByName(fullname) {
        const ans = db.query('SELECT * FROM USER_TABLE WHERE fullname REGEXP ?', [fullname]);
        return ans;
    }

    userById(id) {
        const ans = db.query('SELECT * FROM USER_TABLE WHERE id = ? ', [id]);
        return ans;
    }

    /* PATIENT QUERIES */

    patientById(id) {
        const ans = db.query('SELECT * FROM PATIENT WHERE id = ?', [id]);
        return ans;
    }

    patientByName(fullname) {
        const ans = db.query('SELECT USER_TABLE.id AS id, fullname FROM USER_TABLE INNER JOIN PATIENT USING(id) WHERE fullname REGEXP ?', [fullname]);
        return ans;
    }

    patientByDocNum(docNum) {
        const ans = db.query('SELECT USER_TABLE.id AS id, fullname, docNum FROM PATIENT INNER JOIN USER_TABLE WHERE docNum = ?', [docNum]);
        return ans;
    }

    patientByDocumentType(documentType) {
        const ans = db.query('SELECT USER_TABLE.id AS id, fullname, docNum, documentType FROM PATIENT WHERE documentType = ?', [documentType])
        return ans;
    }

    patients() {
        const ans = db.query('SELECT USER_TABLE.id, fullname, age, email, docNum FROM PATIENT INNER JOIN USER_TABLE USING(id) ')
        return ans;
    }

    /* THERAPIST QUERIES */

    theraphistById(id) {
        const ans = db.query('SELECT * FROM THERAPIST WHERE id = ?', [id]);
        return ans;
    }

    theraphistByName(fullname) {
        const ans = db.query('SELECT USER_TABLE.id AS id, fullname FROM USER_TABLE INNER JOIN THERAPIST USING(id) WHERE (fullname REGEXP ? AND userType = ?)', [fullname, 'Terapeuta']);
        return ans;
    }

    therapistByCC(cc) {
        const ans = db.query('SELECT USER_TABLE.id AS id, fullname, cc FROM USER_TABLE INNER JOIN THERAPIST USING(id) WHERE (cc = ? AND userType = ?)', [cc, 'Terapeuta']);
        return ans;
    }

    therapists() {
        const ans = db.query('SELECT USER_TABLE.id AS id, cc, fullname, email, passwd FROM THERAPIST INNER JOIN USER_TABLE USING(id) WHERE userType = ?',['Terapeuta']);
        return ans;
    }

    /* SUPERVISOR QUERIES */
    
    supervisorById(id) {
        const ans = db.query('SELECT * FROM THERAPIST WHERE (id = ?)', [id]);
        return ans;
    }

    supervisorByName(fullname) {
        const ans = db.query('SELECT USER_TABLE.id AS id, fullname FROM USER_TABLE INNER JOIN THERAPIST USING(id) WHERE (fullname REGEXP ? AND userType = ?)', [fullname, 'Supervisor']);
        return ans;
    }

    supervisorByCC(cc) {
        const ans = db.query('SELECT USER_TABLE.id AS id, fullname, cc FROM USER_TABLE INNER JOIN THERAPIST USING(id) WHERE (cc = ? AND userType = ?)', [cc, 'Supervisor']);
        return ans;
    }

    supervisors() {
        const ans = db.query('SELECT USER_TABLE.id AS id, fullname FROM THERAPIST INNER JOIN USER_TABLE USING(id) WHERE userType =',['Supervisor']);
        return ans;
    }

    /* CONECTIONS BETWEEN THERAPIST AND PATIENT QUERIES */

    patientsByTherapist(id) {
        const ans = db.query('SELECT idPatient, fullname, age, email, docNum FROM (SELECT idPatient, idTherapist, docNum, age FROM THERAPIST_USER INNER JOIN PATIENT ON THERAPIST_USER.idPatient = PATIENT.id) t1 INNER JOIN USER_TABLE ON USER_TABLE.id = t1.idPatient WHERE idTherapist = ?;', [id])
        return ans;
    }

    patientsAndTherapist(id) {
        const ans = db.query('SELECT idPatient, idTherapist FROM THERAPIST_USER')
        return ans;
    }

    /* --------------- INSERT QUERIES --------------- */

    /* USER QUERIES */

    addNewUser(user) {
        const ans = db.query('INSERT INTO USER_TABLE (fullname, email, passwd, userType) VALUES (?,?,?,?)', [
            user.fullname, 
            user.email, 
            user.passwd,
            user.userType
        ]);
        return ans
    }

    /* PATIENT QUERIES */

    addNewPatient(patient) {
        const ans = db.query('INSERT INTO PATIENT (id, gender, leftHearingAid, rightHearingAid, age, documentType, docNum) VALUES (?,?,?,?,?,?,?)', [
            patient.id,
            patient.gender,
            patient.leftHearingAid,
            patient.rightHearingAid,
            patient.age,
            patient.documentType,
            patient.docNum
        ]);
        return ans;
    }

    /* THERAPIST QUERIES */

    addNewTherapist(therapist) {
        const ans = db.query('INSERT INTO THERAPIST (id, cc) VALUES (?, ?)', [
            therapist.id,
            therapist.cc
        ]);
        return ans;
    }

    /* CONECTIONS BETWEEN THERAPIST AND PATIENT QUERIES */

    addRelation(idPatient, idTherapist) {
        const ans = db.query('INSERT INTO THERAPIST_USER (idPatient, idTherapist) VALUES (?, ?)', [
            idPatient, 
            idTherapist
        ]);
        return ans;
    }

    /* --------------- update QUERIES --------------- */

    /* USER QUERIES */

    updateUser(user) {
        const ans = db.query('UPDATE USER_TABLE SET fullname = ?, email = ?, passwd = ? WHERE id = ?', [
            user.fullname,
            user.email,
            user.passwd,
            user.id
        ]);
        return ans;
    }

    updatePassword(id, password) {
        const ans = db.query('UPDATE USER_TABLE SET passwd = ? WHERE (id = ?)', [
            password, 
            id]);
        return ans;
    }

    /* PATIENT QUERIES */

    updatePatient(patient) {
        const ans = db.query('UPDATE PATIENT SET gender = ?, leftHearingAid = ?, rightHearingAid = ?, age = ?, documentType = ?, docNum = ? WHERE (id = ?)', [
            patient.gender,
            patient.leftHearingAid,
            patient.rightHearingAid,
            patient.age,
            patient.documentType,
            patient.docNum,
            patient.id
        ]);
        return ans;
    }

    /* THERAPIST QUERIES */

    updateTherapist(therapist) {
        const ans = db.query('UPDATE THERAPIST SET (cc = ?) WHERE (id = ?)', [
            therapist.cc,
            therapist.id
        ]);
        return ans;
    }

    /* CONECTIONS BETWEEN THERAPIST AND PATIENT QUERIES */

    updatePatientRelacion(id,idTherapist) {
        const ans = db.query('UPDATE THERAPIST_USER SET (idTherapist = ?) WHERE id = ?', [
            idTherapist,
            id
        ])
    }

    updateTherapistRelacion(id,idTherapist) {
        const ans = db.query('UPDATE THERAPIST_USER SET (idTherapist = ?) WHERE id = ?', [
            idTherapist,
            id
        ])
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