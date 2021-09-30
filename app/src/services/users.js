const UserRepository = require('../repositories/users');

class UserService {

    constructor() {
        this.userRepository = new UserRepository();
    }

    async userLogin(email, password) {
        let ans = await this.userRepository.userByEmail(email);
        let err = {
            code: 0,
            message: 'Ok',
        }
        let user = {};

        console.log(ans)
        
        if (ans.length == 1) {

            let ansJSON = JSON.parse(JSON.stringify(ans));
            console.log(ansJSON[0].fullname)

            if (ansJSON[0].passwd === password) {

                user = ansJSON[0]
                user.name = user.fullname;
                delete user.fullname;
                delete user.passwd;
                
                // Check if the person is Therapist
                ans = await this.userRepository.theraphistById(ansJSON[0].id);
                if (ans.length) {
                    let ansT = JSON.parse(JSON.stringify(ans));
                    console.log(ansT)
                    user.cc = ansT[0].cc;
                }
                else {
                    
                    // Check if the person is Patient
                    ans = await this.userRepository.patientById(ansJSON[0].id);
                    if (ans.length) {
                        let ansP = JSON.parse(JSON.stringify(ans));
                        console.log(ansP)
                        user.gender = ansP[0].gender;
                        user.leftImplant = ansP[0].leftImplant;
                        user.rightImplant = ansP[0].rightImplant;
                        user.age = ansP[0].age;
                        user.ti = ansP[0].ti;
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

}

module.exports = new UserService();