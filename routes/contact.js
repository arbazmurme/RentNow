const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/contact', (req, res) => {
    res.render('contact-us', { title: 'Contact us', active: 'contact' });
});

module.exports = router;
