const Patient = require('../models/patient')
const Therapist = require('../models/therapist')
const Supervisor = require('../models/supervisor')

class UserMapper {

    constructor () {
        this.user;
    }

    mapperUser( data ) {
        
        this.user.name = data.name;
        this.user.id = data.id;
        this.user.email = data.email;
        this.user.password = data.passwd;
        this.user.userType = data.userType;
    }

    mapperPatient( data ) {

        // Create a new User type Therapist
        this.user = new Patient()

        // Map user's data by this user
        this.mapperUser( data )
        
        // Assign the other attribute values to Patient
        this.user.gender = data.gender;
        this.user.age = data.age;
        this.user.leftHearingAid = data.leftHearingAid;
        this.user.rightHearingAid = data.rightHearingAid;
        this.user.documentType = data.documentType;
        this.user.docNum = data.docNum;

        return this.user
    }

    mapperTherapist( data ) {

        // Create a new User type Therapist
        this.user = new Therapist()

        // Map user's data by this user
        this.mapperUser( data )

        // Add the Therapist's cc
        this.user.cc = data.cc

        return this.user
    }

    mapperSupervisor( data ) {

        // Create a new User type Supervisor
        this.user = new Supervisor()

        // Map user's data by this user
        this.mapperUser( data )

        // Add the Supervisor's cc
        this.user.cc = data.cc

        return this.user
    }
}

module.exports = new UserMapper()