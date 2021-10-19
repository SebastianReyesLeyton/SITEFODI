const TestRepository = require('../repositories/tests')
const testMapper = require('../mappers/test')

class TestService {

    constructor() {
        this.testRespository = new TestRepository()
    }

    async getTests() {

        let ans = await this.testRespository.getTests();
        let err = {
            code: 0,
            message: 'Ok'
        };

        for (let i = 0; i < ans.length; i++) {
            ans[i] = testMapper.mapperTest(ans[i])
        }

        return { err, ans }
    }

    async getTestById(id) {
        let ans = await this.testRespository.getTestById(id)
        let err = {
            code: 0,
            message: 'Ok'
        };

        if ( !ans.length ) {
            err.code = 1;
            err.message = 'La prueba con ese código no existe.'
        } else {
            ans = ans[0]
        }

        return { err, ans }
    }

    async createTest( test ) {
        let ans = await this.testRespository.createTest( test )
        let err = {
            code: 0,
            message: 'Ok'
        };

        if (ans.errno) {
            err.code = ans.errno;
            err.message = 'Ese nombre ya existe.'
        }

        console.log(ans)
        
        return { err, ans }
    }
}

module.exports = new TestService()