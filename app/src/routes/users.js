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

router.post('/register', async (req, res) => {
    try {
        console.log(req.body)
        const ans = await userService.registerUser(req.body);

        console.log(ans)
        if (ans.err.code == 0) {
            res.send(ans.err.message)
        }
        else {
            res.send(ans.err)
        }
        
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

module.exports = router;