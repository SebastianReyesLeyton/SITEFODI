const express = require('express');
const router = express.Router();
const db = require('../database');

const userService = require('../services/users')
let web_user = require('../models/user-login-web')

router.post('/login', async (req, res) => {
    try {
        const { avatar, email, password } = req.body;
        const ans = await userService.userLogin(email, password)
        
        web_user.avatar = avatar;
        console.log(ans);

        if (ans.err.code == 0) {
            if (ans.err.message !== 'Patient') {

                web_user.user = ans.user

                console.log(web_user)
                
                if (ans.err.message === 'Therapist') {
                    res.redirect('/home/therapist')
                } else {
                    res.redirect('/home/supervisor')
                }
            } else {
                web_user.user = ans.user

                console.log(web_user)

                res.redirect('/home/patient')
            }
        }
        else {
            res.render('layouts/login', { err: ans.err.message })
        }

    } catch (err) {
        console.log(err);
    }
})

router.post('/register-patient', async (req, res) => {
    try {
        console.log(req.body)
        req.body.userType = 'Paciente'
        const ans = await userService.registerPatient(req.body);

        console.log(ans)

        res.render('layouts/home', { user: web_user.user, avatar: web_user.avatar, title: 'Registrar Paciente', err: ans.err.message })
        
    } catch (err) {
        console.log(err)
    }
})

router.post('/register-therapist', async (req, res) => {
    try {
        console.log('/register-therapist')
        console.log(req.body)
        const ans = await userService.registerTherapist(req.body)
        console.log(ans.err)
        res.render('layouts/home', { user: web_user.user, avatar: web_user.avatar, title: 'Registrar Terapeuta', err: ans.err.message })  
    } catch (err) {
        console.log(err)
    }
})

router.get('/patients', async (req, res) => {
    try {
        let ans = await userService.getPatients()
        console.log(ans)
        res.statusCode = 200
        res.send(ans.ans)
        
    } catch (err) {
        console.log('Error')
        console.log(err)
    }
})

router.post('/upload-patient-info/:id', async (req, res) => {
    
    let user = req.body
    console.log(req.body)
    user.id = req.params.id
    let ans = await userService.uploadPatientInfo(user)
    console.log(user.id)
    console.log(web_user.user.id)
    if (user.id == web_user.user.id) {
        ans = await userService.getPatientById(user.id);
    }
    console.log(ans)
    web_user.user = ans
    if (web_user.user.userType == 'Paciente') {
        res.redirect('/profile/patient')
    }
})

module.exports = router;