const express = require('express');
const app = express();
const { readFile } = require('fs');
const { join } = require('path');
const port = process.env.PORT || 4000;

// Import routers
const hostRouter = require('./routes/host');
const userRouter = require('./routes/user');
const aboutRouter = require('./routes/about');
const contactRouter = require('./routes/contact');

// Mount routers at specific base paths
app.use(hostRouter);
app.use(userRouter);
app.use(aboutRouter);
app.use(contactRouter);

// Serve static files
app.use(express.static(join(__dirname, 'views')));

// Set 'views' directory for EJS
app.set('views', join(__dirname, 'views'));

// Set 'view engine' to tell Express that we're using EJS
app.set('view engine', 'ejs');

// 404 Middleware
app.use((req, res) => {
    readFile(join(__dirname, 'views', '404.html'), (err, data) => {
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