const express = require('express');
const router = express.Router();
const db = require('../database');

const userService = require('../services/users')
let web_user = require('../models/user-login-web')

router.post('/login', async (req, res) => {
    try {
        const { avatar, email, password } = req.body;
        const ans = await userService.userLogin(email, password)
        
        console.log(ans);
        web_user.user = { avatar, email };
        web_user.user.name = ans.user.name;
        web_user.user.id = ans.user.id;
        console.log(web_user)
        if (ans.err.code == 0) {
            if (ans.err.message === 'Therapist') {
                res.redirect('/home/therapist')
            }
            else {
                res.redirect('/home/patient')
            }
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

module.exports = router;