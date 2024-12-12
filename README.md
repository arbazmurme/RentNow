# RentNow

**Find Your Perfect Home with RentNow**  
Explore houses for rent, connect with homeowners, and easily book your next stay with RentNow. Your dream home is just a click away.

---

## Features
- **Browse Homes**: Explore a wide range of rental houses.
- **Detailed Listings**: View detailed descriptions and images of each home.
- **Connect with Hosts**: Contact homeowners for inquiries or bookings.
- **User-Friendly Design**: Seamless navigation and intuitive interface.

---

## Project Structure

```
.
├── app.js                   # Main server file
├── controllers              # Business logic
│   ├── dis_house.js         # Controller for house display functionality
│   └── homes.js             # Controller for home-related operations
├── houses.json              # Sample data for houses
├── package.json             # Project dependencies
├── package-lock.json        # Lockfile for dependencies
├── routes                   # Route definitions
│   ├── about.js             # About page routes
│   ├── contact.js           # Contact page routes
│   ├── host.js              # Host-specific routes
│   └── user.js              # User-specific routes
├── tailwind.config.js       # Tailwind CSS configuration
├── uploads                  # Uploaded house images
│   ├── 1733208516098-tree-house.jpg
│   └── 1733212920652-Most-Beautiful-House-in-the-World_0_1200.jpg
└── views                    # EJS templates for front-end views
    ├── 404.ejs              # 404 error page
    ├── about-us.ejs         # About us page
    ├── add-home.ejs         # Add a new home page
    ├── contact-us.ejs       # Contact us page
    ├── editHouseDitails.ejs # Edit house details page
    ├── edit-house.ejs       # Edit house page
    ├── footer.ejs           # Footer partial
    ├── houseDetails.ejs     # Detailed house view page
    ├── index.ejs            # Home page
    ├── input.css            # Input CSS file for Tailwind
    ├── navbar.ejs           # Navbar partial
    ├── output.css           # Output CSS file for Tailwind
    └── thankyou.ejs         # Thank you page
```

---

## Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: EJS templates, Tailwind CSS
- **Database**: JSON file (as a placeholder; replaceable with MongoDB or SQL)
- **File Uploads**: Supports image uploads via the `uploads/` directory

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/rentnow.git
   cd rentnow
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node app.js
   ```
4. Visit the application at `http://localhost:3000`.

---

## Usage

1. **Homepage**: Browse all available rental houses.
2. **Add New Listing**: Navigate to the add home page to post a new rental property.
3. **Edit Listings**: Modify or update property details through the edit page.
4. **Contact Us**: Use the contact page for any inquiries or assistance.

---

## Folder Descriptions

- **controllers/**: Contains logic for displaying and managing homes.
- **routes/**: Defines the application’s routing structure.
- **views/**: EJS templates for rendering frontend pages.
- **uploads/**: Stores uploaded house images.

---

## Future Enhancements

- Integration with a database (MongoDB or SQL) for better data management.
- Authentication and user roles (e.g., admin, host, renter).
- Advanced search filters for listings.

---

## License

This project is licensed under the MIT License. Feel free to use and modify it for your own needs.

---

## Acknowledgements

Special thanks to all contributors and open-source projects that made this possible.

