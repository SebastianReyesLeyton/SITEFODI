const express = require('express')
const http = require('http')
const router = express.Router()

const userService = require('../services/users')
let web_user = require('../models/user-login-web')

router.get('/', (req, res) => {
    res.render('layouts/login')
})

// Supervisor home routes

router.get('/home/supervisor', (req, res) => {
    res.render('layouts/home', { user: web_user.user, avatar: web_user.avatar, title: 'Inicio', search: 'Home' })
});

router.get('/show-therapists/supervisor', async (req, res) => {
    
    let ans = await userService.getTherapists()
    console.log(ans)
    res.render('layouts/home', { user: web_user.user, avatar: web_user.avatar, title: 'Ver Terapeutas', search: 'Therapists', users: ans.ans})
});

router.get('/show-patients/supervisor', async (req, res) => {
    
    let ans = await userService.getPatients()
    console.log(ans)
    res.render('layouts/home', { user: web_user.user, avatar: web_user.avatar, title: 'Ver Pacientes', search: 'Patients', users: ans.ans})
});

router.get('/register-patient/supervisor', (req, res) => {
    console.log('therapist')
    console.log(web_user.user)
    res.render('layouts/home', { user: web_user.user, avatar: web_user.avatar, title: 'Registrar Paciente'})
});

router.get('/register-therapist/supervisor', (req, res) => {
    res.render('layouts/home', { user: web_user.user, avatar: web_user.avatar, title: 'Registrar Terapeuta'})
})

router.get('/profile/supervisor', (req, res) => {
    console.log('therapist')
    console.log(web_user.user)
    res.render('layouts/home', { user: web_user.user, avatar: web_user.avatar, title: 'Perfil'})
});


// Therapist home routes

router.get('/home/therapist', (req, res) => {
    res.render('layouts/home', { user: web_user.user, avatar: web_user.avatar, title: 'Inicio', search: 'Home' })
});

router.get('/show-patients/therapist', async (req, res) => {
    let ans = await userService.getPatientsByTherapist(web_user.user.id)
    res.render('layouts/home', { user: web_user.user, avatar: web_user.avatar, title: 'Ver Pacientes', search: 'Patients', users: ans.ans})
});

router.get('/register-patient/therapist', (req, res) => {
    console.log('therapist')
    console.log(web_user.user)
    res.render('layouts/home', { user: web_user.user, avatar: web_user.avatar, title: 'Registrar Paciente'})
});

router.get('/profile/therapist', (req, res) => {
    console.log('therapist')
    console.log(web_user.user)
    res.render('layouts/home', { user: web_user.user, avatar: web_user.avatar, title: 'Perfil'})
});

// Patient home routes

router.get('/home/patient', (req, res) => {
    console.log('Patient')
    console.log(web_user.user)
    res.render('layouts/home', { user: web_user.user, avatar: web_user.avatar, title: 'Inicio'})
});

router.get('/profile/patient', (req, res) => {
    console.log('Patient')
    console.log(web_user.user)
    res.render('layouts/home', { user: web_user.user, avatar: web_user.avatar, title: 'Perfil'})
});

// Sing-out

router.get('/signout', (req, res) => {
    res.redirect('/');
})

module.exports = router;