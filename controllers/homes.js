const path = require('path');
const fs = require('fs');
const BodyParser = require('body-parser');
const multer = require('multer');
const express = require('express');
const router = express.Router();

router.use(BodyParser.urlencoded({ extended: true }));

// This function is a filter that determines whether a file can be uploaded
// or not. It's passed as an option to the multer middleware.
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
    // Define an array of allowed MIME types (e.g. image/jpeg, image/png)
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

    // Check if the uploaded file's MIME type is in the allowed array
    if (allowedMimeTypes.includes(file.mimetype)) {
        // If it is, call the callback function with a null error and true
        // as the second argument. This tells multer that the file is valid
        // and can be uploaded.
        cb(null, true);
    } else {
        // If the MIME type is not in the allowed array, call the callback
        // function with an error and false as the second argument. This
        // tells multer that the file is invalid and should not be uploaded.
        // The error message is "Only image files are allowed".
        cb(new Error('Only image files are allowed'));
    }
};

const upload = multer({ storage, fileFilter });

/**
 * GET /host/add-house
 * Add house page.
 */
exports.getAddHome = (req, res) => {
    // Render the add-home template with the title 'Add House',
    // 'active' set to 'add' (highlights the 'Add House' link in the navbar),
    // and an empty 'error' property.
    res.render('add-home', { 
        title: 'Add House', 
        active: 'add', 
        error: null 
    });
}

/**
 * POST /host/add-house
 * Add house page.
 * 
 * This route handles the form submission of the add-house form.
 */
exports.postAddHome = (req, res) => {
    upload.single('image')(req, res, (err) => {
        if (err) {
            return res.render('add-home', {
                title: 'Add House',
                active: 'add',
                error: err.message,
            });
        }

        const filePath = path.join(__dirname, '../houses.json');
        const { name, address, price } = req.body;
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
        const newHouseId = `house-${Date.now()}`;
        const newHouse = { id: newHouseId, name, address, price, image: imagePath };

        houses.push(newHouse);

        try {
            fs.writeFileSync(filePath, JSON.stringify(houses, null, 2));
        } catch (error) {
            console.error('Error writing to houses.json:', error);
            return res.status(500).send('An error occurred while saving the house.');
        }
        res.render('thankyou', { active: 'add' })
    });
};

