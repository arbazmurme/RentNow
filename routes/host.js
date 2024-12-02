const express = require('express');
const router = express.Router();
const path = require('path');
const BodyParser = require('body-parser');
const fs = require('fs');
const multer = require('multer');

router.use(BodyParser.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../uploads');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueSuffix);
    },
});

const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed'));
    }
};

const upload = multer({ storage, fileFilter });

router.get('/host/add-house', (req, res) => {
    res.render('add-home', { title: 'Add House', active: 'add', error: null });
});

router.post('/host/add-house', (req, res) => {
    upload.single('image')(req, res, (err) => {
        if (err) {
            return res.render('add-home', {
                title: 'Add House',
                active: 'add',
                error: err.message,
            });
        }

        const { name, address, price } = req.body;
        const filePath = path.join(__dirname, '../houses.json');
        const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

        if (!name || !address || !price) {
            return res.render('add-home', {
                title: 'Add House',
                active: 'add',
                error: 'Please provide all required fields: name, address, and price.',
            });
        }

        let houses = [];
        try {
            if (fs.existsSync(filePath)) {
                const fileData = fs.readFileSync(filePath, 'utf-8');
                houses = fileData ? JSON.parse(fileData) : [];
            }
            if (!Array.isArray(houses)) {
                throw new Error('Data in houses.json is not an array');
            }
        } catch (error) {
            console.error('Error reading or parsing houses.json:', error);
            houses = [];
        }

        // Generate a unique ID for the new house (using timestamp)
        const newHouseId = `house-${Date.now()}`;

        // Create the new house object with the generated ID
        const newHouse = { id: newHouseId, name, address, price, image: imagePath };

        // Add the new house to the houses array
        houses.push(newHouse);

        try {
            // Save the updated houses array back to the JSON file
            fs.writeFileSync(filePath, JSON.stringify(houses, null, 2));
        } catch (error) {
            console.error('Error writing to houses.json:', error);
            return res.status(500).send('An error occurred while saving the house.');
        }

        // Redirect to the home page or display a success message
        res.redirect('/');
    });
});

module.exports = router;
