const express = require('express')
const router = express.Router()

const userService = require('../services/users')
let web_user = require('../models/user-login-web')


router.get('/', (req, res) => {
    res.render('layouts/login')
})

router.post('/login', async (req, res) => {
    try {
        const { avatar, email, password } = req.body;
        const user = await userService.userLogin(email, password)
        
        web_user = { avatar, email }
        res.send(user)
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;