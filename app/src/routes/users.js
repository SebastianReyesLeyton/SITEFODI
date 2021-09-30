const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/theraphist', (req, res) => {
    res.render('therapists/profile.hbs')
});

module.exports = router;