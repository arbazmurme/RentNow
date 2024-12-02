const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

router.get('/', (req, res) => {
   const filePath = path.join(__dirname, '../', 'houses.json');
   let houses = [];

   // Read the JSON file and parse it
   if (fs.existsSync(filePath)) {
       const fileData = fs.readFileSync(filePath, 'utf-8');
       houses = fileData ? JSON.parse(fileData) : [];
   }
   
   // Render the index page with the houses
   res.render('index', { title: 'RentNow - Find Your Perfect Home', active: 'home', houses });
});

module.exports = router;
