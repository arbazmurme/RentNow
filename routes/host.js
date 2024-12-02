const express = require('express');
const router = express.Router();
const path = require('path');
const BodyParser = require('body-parser');
const fs = require('fs');

router.use(BodyParser.urlencoded({ extended: true }));

// Render the "Add House" form
router.get('/host/add-house', (req, res) => {
    res.render('add-home', { title: 'Add House', active: 'add' });
});

// Handle form submission to add a house
router.post('/host/add-house', (req, res) => {
    const { name, address, price } = req.body;

    // File path for houses.json
    const filePath = path.join(__dirname, '../', 'houses.json');

    // Step 1: Read existing data and ensure it's an array
    let houses = [];
    try {
        if (fs.existsSync(filePath)) {
            const fileData = fs.readFileSync(filePath, 'utf-8');
            houses = fileData ? JSON.parse(fileData) : [];
        }
        if (!Array.isArray(houses)) {
            throw new Error('Data is not an array');
        }
    } catch (error) {
        console.error('Error reading or parsing houses.json:', error);
        houses = []; // Initialize as an empty array on error
    }

    // Step 2: Add the new house to the array
    const newHouse = { name, address, price };
    houses.push(newHouse);

    // Step 3: Write the updated array back to the file
    try {
        fs.writeFileSync(filePath, JSON.stringify(houses, null, 2));
    } catch (error) {
        console.error('Error writing to houses.json:', error);
        return res.status(500).send('An error occurred while saving the house.');
    }

    // Redirect to the homepage or a success page
    res.redirect('/');
});

module.exports = router;
