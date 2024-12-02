const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/about', (req, res) => {
    res.render('about-us', { title: 'About us', active: 'about' });
});

module.exports = router;
