const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('layouts/login')
})

router.post('/login', (req, res) => {
    res.send('Succesful!!')
    console.log(req.body)
})

module.exports = router;