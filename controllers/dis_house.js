const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, '../', 'houses.json');
let houses = [];

exports.getGetHome = (req, res) => {
    if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, 'utf-8');
        houses = fileData ? JSON.parse(fileData) : [];
    }
    res.render('index', { title: 'RentNow - Find Your Perfect Home', active: 'home', houses });
};

exports.getHouseDetails = (req, res) => {
    if (!houses.length && fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, 'utf-8');
        houses = fileData ? JSON.parse(fileData) : [];
    }

    const houseId = req.params.id;
    const house = houses.find(h => h.id === houseId);

    if (!house) {
        return res.status(404).send('House not found');
    }

    res.render('houseDetails', { house });
};

exports.editHouseController = (req, res) => {
    if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, 'utf-8');
        houses = fileData ? JSON.parse(fileData) : [];
    }
    res.render('edit-house', { title: 'RentNow - Find Your Perfect Home', active: 'home', houses });
};

// Render the edit form with house details
exports.getEditHouse = (req, res) => {
    const houseId = req.params.id;
    if (!houses.length && fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, 'utf-8');
        houses = fileData ? JSON.parse(fileData) : [];
    }
    const house = houses.find(h => h.id === houseId);
    if (!house) {
        return res.status(404).send('House not found');
    }
    res.render('editHouseDitails', { title: 'Edit House', house, error: null });
    console.log(house);
    
};

exports.postEditHouse = (req, res) => {
    const houseId = req.params.id; // Get the house ID from the URL parameter
    const { name, address, price } = req.body; // Destructure the updated house details from the request body

    // Check if all required fields are provided
    if (!name || !address || !price) {
        return res.status(400).send('All fields are required');
    }

    // Load the houses data if it's not already loaded
    if (!houses.length && fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, 'utf-8');
        houses = fileData ? JSON.parse(fileData) : [];
    }

    // Find the house by ID
    const houseIndex = houses.findIndex(h => h.id === houseId);

    if (houseIndex === -1) {
        return res.status(404).send('House not found');
    }

    // Update the house with new data
    houses[houseIndex] = { ...houses[houseIndex], name, address, price };

    // Save the updated houses array back to the file
    fs.writeFileSync(filePath, JSON.stringify(houses, null, 2), 'utf-8');

    // Redirect or render a confirmation page (or send a success message)
    res.redirect(`/house/${houseId}`); // Redirect to the house details page
};

// controllers/dis_house.js
exports.deleteHouse = (req, res) => {
    const houseId = req.params.id;

    if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, 'utf-8');
        let houses = fileData ? JSON.parse(fileData) : [];

        // Find index of the house to delete
        const houseIndex = houses.findIndex(house => house.id === houseId);

        if (houseIndex === -1) {
            return res.status(404).send('House not found');
        }

        // Remove house from array
        houses.splice(houseIndex, 1);

        // Write updated houses list back to file
        fs.writeFileSync(filePath, JSON.stringify(houses, null, 2));

        return res.status(200).redirect('/edit-house');
    } else {
        return res.status(404).send('Houses file not found');
    }
};
