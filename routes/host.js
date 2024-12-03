const express = require('express');
const router = express.Router();
const { getAddHome } = require('../controllers/homes');
const { postAddHome } = require('../controllers/homes');

router.get('/host/add-house', getAddHome);
router.post('/host/add-house', postAddHome);


module.exports = router;
