const express = require('express')
const router = express.Router()

let web_user = require('../models/user-login-web')

router.get('/', (req, res) => {
    res.render('layouts/login')
})

// Therapist home routes

router.get('/home/therapist', (req, res) => {
    console.log('therapist')
    console.log(web_user.user)
    res.render('layouts/home', {therapist: 1, user: web_user.user, title: 'Inicio', search: 1})
});

router.get('/show-patients/therapist', (req, res) => {
    console.log('therapist')
    console.log(web_user.user)
    res.render('layouts/home', {therapist: 1, user: web_user.user, title: 'Ver Pacientes', search: 1})
});

router.get('/register-patient/therapist', (req, res) => {
    console.log('therapist')
    console.log(web_user.user)
    res.render('layouts/home', {therapist: 1, user: web_user.user, title: 'Registrar Paciente', search: 1})
});

router.get('/tests/therapist', (req, res) => {
    console.log('therapist')
    console.log(web_user.user)
    res.render('layouts/home', {therapist: 1, user: web_user.user, title: 'Tests', search: 1})
});

router.get('/profile/therapist', (req, res) => {
    console.log('therapist')
    console.log(web_user.user)
    res.render('layouts/home', {therapist: 1, user: web_user.user, title: 'Perfil', search: 0})
});

// Patient home routes

router.get('/home/patient', (req, res) => {
    console.log('Patient')
    console.log(web_user.user)
    res.render('layouts/home', {therapist: 0, user: web_user.user, title: 'Inicio', search: 0})
});

router.get('/tests/patient', (req, res) => {
    console.log('Patient')
    console.log(web_user.user)
    res.render('layouts/home', {therapist: 0, user: web_user.user, title: 'Tests', search: 1})
});

router.get('/profile/patient', (req, res) => {
    console.log('Patient')
    console.log(web_user.user)
    res.render('layouts/home', {therapist: 0, user: web_user.user, title: 'Perfil', search: 0})
});

// Sing-out

router.get('/signout', (req, res) => {
    res.redirect('/');
})

module.exports = router;