const UserRepository = require('../repositories/users');
const web_user = require('../models/user-login-web')

class UserService {

    constructor() {
        this.userRepository = new UserRepository();
    }

    async userLogin(email, password) {
        let ans = await this.userExists({email})
        let err = {
            code: 0,
            message: 'Ok',
        }
        let user = {};

        console.log(ans)
        
        if (ans.err.code == 1) {

            let ansJSON = JSON.parse(JSON.stringify(ans.ans));

            if (ansJSON[0].passwd === password) {

                user = ansJSON[0]
                user.name = user.fullname;
                delete user.fullname;
                delete user.passwd;
                
                // Check if the person is Therapist
                ans = await this.userRepository.theraphistById(ansJSON[0].id);
                if (ans.length) {
                    let ansT = JSON.parse(JSON.stringify(ans));
                    
                    user.cc = ansT[0].cc;

                    err.message = 'Therapist';
                }
                else {
                    
                    // Check if the person is Patient
                    ans = await this.userRepository.patientById(ansJSON[0].id);
                    if (ans.length) {
                        let ansP = JSON.parse(JSON.stringify(ans));
        
                        user.gender = ansP[0].gender;
                        user.leftImplant = ansP[0].leftImplant;
                        user.rightImplant = ansP[0].rightImplant;
                        user.age = ansP[0].age;
                        user.ti = ansP[0].ti;

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
                err.message = 'Las contraseñas no coinciden';
            }
        } else {

            err.code = -1;
            err.message = 'Correo invalido';

        }

        return { user, err };
    }

    async userExists(user) {
        let err = {
            code: 0,
            message: 'Ok'
        };

        let ans = await this.userRepository.userByEmail(user.email);

        if (ans.length) {
            err.code = 1;
            err.message = 'El email ya esta registrado.';
        }

        return { err, ans }
    }

    async patientExists(user) {
        let err = {
            code: 0,
            message: 'Ok'
        };

        let ans = await this.userExists(user);

        if (ans.err.code == 1) {
            err = ans.err
        }
        else {

            ans = await this.userRepository.patientByTi(user.ti);

            if (ans.length) {
                err.code = 2;
                err.message = 'Ya existe un usuario registrado con ese número de identificación.';
            }
        }

        return { err }
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

}

module.exports = new UserService();