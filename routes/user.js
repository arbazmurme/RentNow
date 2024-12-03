const express = require('express');
const router = express.Router();
const { getGetHome, getHouseDetails, editHouseController, editHouse, getEditHouse, postEditHouse, deleteHouse } = require('../controllers/dis_house');

router.get('/', getGetHome);
router.get('/house/:id', getHouseDetails);
router.get('/edit-house', editHouseController);
router.get('/edit-house/:id', getEditHouse);
router.post('/edit-house/:id', postEditHouse);
router.get('/delete-house/:id', deleteHouse);

module.exports = router;