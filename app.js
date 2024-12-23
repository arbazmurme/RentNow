const express = require('express');
const app = express();
const { readFile } = require('fs');
const { join } = require('path');
const path = require('path'); 
const port = process.env.PORT || 3000;
// Import routers
const hostRouter = require('./routes/host');
const userRouter = require('./routes/user');
const aboutRouter = require('./routes/about');
const contactRouter = require('./routes/contact');
const Swal = require('sweetalert2');

// For JSON payloads
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// Mount routers at specific base paths
app.use(hostRouter);
app.use(userRouter);
app.use(aboutRouter);
app.use(contactRouter);

// Serve static files
app.use(express.static(join(__dirname, 'views')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Set 'views' directory for EJS
app.set('views', join(__dirname, 'views'));

// Set 'view engine' to tell Express that we're using EJS
app.set('view engine', 'ejs');

// 404 Middleware
app.use((req, res) => {
    readFile(join(__dirname, 'views', '404.ejs'), (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.status(404).send(data.toString());
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })