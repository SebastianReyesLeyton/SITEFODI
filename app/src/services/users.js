const UserRepository = require('../repositories/users');
const web_user = require('../models/user-login-web')
const userMapper = require('../mappers/user')

class UserService {

    constructor() {
        this.userRepository = new UserRepository();
    }

    /* -------------- USER FUNCTIONS --------------- */

    async userExists(user) {

        // Get the answer from the database.
        let ans = await this.userRepository.userByEmail(user.email);
        
        // Create the default response error.
        let err = {
            code: 0,
            message: 'El email no esta registrado.'
        };

        // If the database response have elements, that user exists.
        if (ans.length) {
            err.code = 1;
            err.message = 'El email ya esta registrado.';
        }

        return { err, ans }
    }

    /* -------------- PATIENT FUNCTIONS --------------- */

    async patientExists(user) {
        
        // Get if user's email exists within the system.
        let ans = await this.userExists(user);
        
        // Create the default response error.
        let err = {
            code: 0,
            message: 'Ok'
        };

        // If that user exists, return ans.err.
        if (ans.err.code == 1) {
            err = ans.err
        }
        else {

            // Get if user's document number exits within the system.
            ans = await this.userRepository.patientByDocNum(user.docNum);
            
            if ( !ans.length ) {
                ans = await this.userRepository.therapistByCC(user.docNum);
                
                if ( !ans.length ) {
                    ans = await this.userRepository.supervisorByCC(user.docNum);
                }

            }

            // If the database return elements, that user exists.
            if (ans.length) {
                err.code = 2;
                err.message = 'Ya existe un usuario registrado con ese número de identificación';
            }
        }

        return { err }
    }

    async registerPatient(newUser) {
        
        // Create the default response error.
        let err = {
            code: 0,
            message: 'Paciente registrado exitosamente'
        };
        
        // Get if patient's info exits within the system.
        let ans = await this.patientExists(newUser);

        console.log(ans)

        // If user's email is not registered
        if (ans.err.code == 0) {

            // Create a new user
            ans = await this.userRepository.addNewUser(newUser)
            
            // If there is not an error with database
            if (!ans.errno) {

                // Assign the id obtained by the user creation in database
                newUser.id = ans.insertId;
                
                // Create a new Patient
                ans = await this.userRepository.addNewPatient(newUser)

                // If web user is a Therapist create the relation the patient with him/her
                if ( web_user.user.userType == 'Terapeuta' ) {
                    ans = await this.createRelation(newUser.id, web_user.user.id)
                }

                console.log(ans)
            } else {

                // Remove the user created in database if had an error
                ans = await this.userRepository.removeUser(ans.insertId)
            }
        } else {
            err = ans.err;
        }

        return { err }

    }

    async getPatients() {
        let err = {
            code: 0,
            message: 'Ok'
        };

        let ans = await this.userRepository.patients();
        for (let i = 0; i < ans.length; i++) {
            ans[i] = JSON.parse(JSON.stringify(ans[i]));
        }
        console.log(ans)

        return { err, ans }
    }

    async uploadPatientInfo(data) {
        let err = {
            code: 0,
            message: 'Ok'
        };

        let ans = await this.userRepository.updateUser(data)
        console.log(ans)
        
        ans = await this.userRepository.updatePatient(data)
        console.log(ans)

        return { err }
    }

    async getPatientById(id) {
        let ans = await this.userRepository.userById(id)
        let user = {}
        
        console.log(ans)
        let ansJSON = JSON.parse(JSON.stringify(ans))

        user = ansJSON[0]
        user.name = user.fullname;
        delete user.fullname;

        ans = await this.userRepository.patientById(ansJSON[0].id);

        ansJSON = JSON.parse(JSON.stringify(ans))

        user.gender = ansJSON[0].gender;
        user.leftHearingAid = ansJSON[0].leftHearingAid;
        user.rightHearingAid = ansJSON[0].rightHearingAid;
        user.age = ansJSON[0].age;
        user.documentType = ansJSON[0].documentType;
        user.docNum = ansJSON[0].docNum;
        
        user = userMapper.mapperPatient(user)

        return user;

    }

    /* -------------- THERAPIST FUNCTIONS --------------- */

    async therapistExists( user ) {

        // Get if user's email exists within the system.
        let ans = await this.userExists(user);

        // Create the default response error.
        let err = {
            code: 0,
            message: 'Ok'
        };

        // If that user exists, return ans.err.
        if (ans.err.code == 1) {
            err = ans.err
        }
        else {

            // Get if user's document number exits within the system.
            ans = await this.userRepository.therapistByCC(user.cc);
            
            if (!ans.length) {
                ans = await this.userRepository.supervisorByCC(user.cc);

                if ( !ans.length ) {
                    ans = await this.userRepository.patientByDocNum(user.cc);
                }
            }
            
            // If the database return elements, that user exists.
            if (ans.length) {
                err.code = 2;
                err.message = 'Ya existe un usuario registrado con ese número de identificación';
            }
        }

        return { err }
    }

    async registerTherapist(newUser) {

        // Create the default response error.
        let err = {
            code: 0,
            message: 'Usuario creado exitosamente'
        };

        // Get if therapist exis
        let ans = await this.therapistExists(newUser)
        
        if ( !ans.err.code ) {

            ans = await this.userRepository.addNewUser(newUser);
            newUser.id = ans.insertId;
            ans = await this.userRepository.addNewTherapist(newUser);
            console.log(ans)
        } else {
            err = ans.err
        }

        return { err }
    }


    async getTherapists() {
        let err = {
            code: 0,
            message: 'Ok'
        };

        let ans = await this.userRepository.therapists();
        for (let i = 0; i < ans.length; i++) {
            ans[i] = JSON.parse(JSON.stringify(ans[i]));
        }
        console.log(ans)

        return { err, ans }
    }

    /* -------------- LOGIN FUNCTIONS --------------- */
    
    async userLogin(email, password) {

        // Get if user's email exits within the system.
        let ans = await this.userExists({email})

        // Create the default response error.
        let err = {
            code: 0,
            message: 'Ok',
        }

        // Create the user to be returned.
        let user = {};
        
        // If user's email exists.
        if (ans.err.code == 1) {

            // Transform to JSON object.
            let ansJSON = JSON.parse(JSON.stringify(ans.ans));

            // Check if the user's login password is the same as the user's database password.
            if (ansJSON[0].passwd === password) {

                // Get JSON user.
                user = ansJSON[0]
                user.name = user.fullname;
                delete user.fullname;
                
                // Check if the person is Therapist.
                ans = await this.userRepository.theraphistById(ansJSON[0].id);

                // If the user is a Therapist or Supervisor.
                if (ans.length) {

                    // Transform data to JSON.
                    let ansT = JSON.parse(JSON.stringify(ans));
                    
                    // Create and assign the cc feature to user's variable.
                    user.cc = ansT[0].cc;

                    if ( user.userType == 'Terapeuta') {

                        // If user is a therapist, mapper as Therapist.
                        user = userMapper.mapperTherapist(user)
                        err.message = 'Therapist';
                    }
                    else {

                        // If user is a supervisor, mapper as Supervisor.
                        user = userMapper.mapperSupervisor(user)
                        err.message = 'Supervisor';
                    }
                    
                }
                else {
                    
                    // Check if the user is Patient.
                    ans = await this.userRepository.patientById(ansJSON[0].id);

                    // If the user is a Patient.
                    if (ans.length) {

                        // Transform data to JSON.
                        let ansP = JSON.parse(JSON.stringify(ans));
                        
                        // Create and assign the fault features to user's variable.
                        user.gender = ansP[0].gender;
                        user.leftHearingAid = ansP[0].leftHearingAid;
                        user.rightHearingAid = ansP[0].rightHearingAid;
                        user.age = ansP[0].age;
                        user.documentType = ansP[0].documentType;
                        user.docNum = ansP[0].docNum;
                        
                        // Mapper user to Patient
                        user = userMapper.mapperPatient(user)

                        err.message = 'Patient';
                    }
                    else {
                        // This case does not occur.
                        err.code = 2;
                        err.message = 'Error en la base de datos, no existe el usuario';
                        user = {};
                    }
                }
            }
            else {
                // If user's password is wrong.
                err.code = 1;
                err.message = 'Contraseña Inválida';
            }
        } else {
            // If user's email does not exist.
            err.code = -1;
            err.message = 'Correo inválido';

        }

        return { user, err };
    }

    /* -------------- RELATION BETWEEN THERAPIST AND PATIENT FUNCTIONS --------------- */

    async createRelation(idPatient, idTherapist) {
        let ans = await this.userRepository.addRelation(idPatient, idTherapist)
        return ans
    }

    async getPatientsByTherapist(id) {
        let err = {
            code: 0,
            message: 'Ok'
        };
        console.log(typeof(id))

        let ans = await this.userRepository.patientsByTherapist(id);
        for (let i = 0; i < ans.length; i++) {
            ans[i] = JSON.parse(JSON.stringify(ans[i]));
        }
        console.log(ans)

        return { err, ans }
    }

}

module.exports = new UserService();