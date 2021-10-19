const express = require('express');
const router = express.Router();
const testService = require('../services/test')
const testMapper = require('../mappers/test')

let web_user = require('../models/user-login-web')

router.get('/supervisor', async (req, res) => {
    try {
        console.log('therapist')
        console.log(web_user.user)
        let tests = await testService.getTests()
        console.log(tests)
        res.render('layouts/home', { user: web_user.user, avatar: web_user.avatar, title: 'Tests', search: 'Therapists-Tests', tests: tests.ans })
    } catch (err) {
        console.log(err)
    }
});

router.get('/therapist', async (req, res) => {
    try {
        console.log('therapist')
        console.log(web_user.user)
        let tests = await testService.getTests()
        console.log(tests)
        res.render('layouts/home', { user: web_user.user, avatar: web_user.avatar, title: 'Tests', search: 'Therapists-Tests', tests: tests.ans })
    } catch (err) {
        console.log(err)
    }
});

router.get('/therapist/test/:id', (req, res) => {
    let id = req.params.id
    console.log(`/therapist/test/${id}`)
});

router.get('/patient', (req, res) => {
    console.log('Patient')
    console.log(web_user.user)
    res.render('layouts/home', {  user: web_user.user, avatar: web_user.avatar, title: 'Tests', search: 'Patient-Tests'})
});

router.post('/create', async (req, res) => {
    try {
        console.log('Create Test')
        let test = testMapper.mapperTest(req.body)
        console.log(test)
        let ans = await testService.createTest(test)
        console.log(ans)
        res.redirect('/tests/therapist')
    } catch (err) {
        console.log(err)
        res.send(err)
    }
})

module.exports = router;