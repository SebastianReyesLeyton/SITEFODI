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
            ans = await this.userRepository.patientByDocNum(user.numDoc);

            // If the database return elements, that user exists.
            if (ans.length) {
                err.code = 2;
                err.message = 'Ya existe un usuario registrado con ese número de identificación.';
            }
        }

        return { err }
    }

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
        
        // If user's email exists
        if (ans.err.code == 1) {

            // Transform to JSON object
            let ansJSON = JSON.parse(JSON.stringify(ans.ans));

            // Check if the user's login password is the same as the user's database password
            if (ansJSON[0].passwd === password) {

                // Get JSON user
                user = ansJSON[0]
                user.name = user.fullname;
                delete user.fullname;
                
                // Check if the person is Therapist
                ans = await this.userRepository.theraphistById(ansJSON[0].id);
                if (ans.length) {
                    let ansT = JSON.parse(JSON.stringify(ans));
                    
                    user.cc = ansT[0].cc;
                    if ( user.userType == 'Terapeuta') {
                        user = userMapper.mapperTherapist(user)
                        err.message = 'Therapist';
                    }
                    else {
                        user = userMapper.mapperSupervisor(user)
                        err.message = 'Supervisor';
                    }
                    
                }
                else {
                    
                    // Check if the user is Patient
                    ans = await this.userRepository.patientById(ansJSON[0].id);
                    if (ans.length) {
                        let ansP = JSON.parse(JSON.stringify(ans));
        
                        user.gender = ansP[0].gender;
                        user.leftHearingAid = ansP[0].leftHearingAid;
                        user.rightHearingAid = ansP[0].rightHearingAid;
                        user.age = ansP[0].age;
                        user.documentType = ansP[0].documentType;
                        user.docNum = ansP[0].docNum;
                        
                        user = userMapper.mapperPatient(user)

                        err.message = 'Patient';
                    }
                    else {
                        err.code = 2;
                        err.message = 'Error en la base de datos, no existe el usuario';
                        user = {};
                    }
                }
            }
            else {
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


    async createRelation(idPatient, idTherapist) {
        let ans = await this.userRepository.addRelation(idPatient, idTherapist)
        return ans
    }
    
    async registerUser(newUser) {
        
        let err = {
            code: 0,
            message: 'Ok'
        };
        
        let ans = await this.patientExists(newUser);

        console.log(ans)

        if (ans.err.code == 0) {

            ans = await this.userRepository.addNewUser(newUser)
            
            if (!ans.errno) {
                newUser.id = ans.insertId;
    
                ans = await this.userRepository.addNewPatient(newUser)
                console.log(web_user.user.id)
                ans = await this.createRelation(newUser.id, web_user.user.id)

                if (ans.errno) {
                    console.log(ans.errno)
                }
                console.log(ans)
            } else {
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

    async getPatientsByTherapist(id) {
        let err = {
            code: 0,
            message: 'Ok'
        };

        let ans = await this.userRepository.patientsByTherapist(id);
        for (let i = 0; i < ans.length; i++) {
            ans[i] = JSON.parse(JSON.stringify(ans[i]));
        }
        console.log(ans)

        return { err, ans }
    }
}

module.exports = new UserService();