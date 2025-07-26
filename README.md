# YelpCamp 🏕️

A full-stack web application for campground reviews and listings. This project is part of "The Web Developer Bootcamp" by Colt Steele.

## 📋 Description

YelpCamp is a comprehensive campground review platform where users can browse, add, edit, and delete campgrounds. Each campground includes details such as title, location, price, description, and images. The application provides a clean, responsive interface for managing campground listings.

## ✨ Features

- **Browse Campgrounds**: View all available campgrounds with images and basic information
- **Detailed View**: Click on any campground to see full details including description and pricing
- **Add New Campgrounds**: Create new campground listings with title, location, image URL, price, and description
- **Edit Campgrounds**: Update existing campground information
- **Delete Campgrounds**: Remove campground listings
- **Responsive Design**: Bootstrap-styled interface that works on all devices
- **Database Persistence**: All data is stored in MongoDB

## 🛠️ Technologies Used

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### Frontend

- **EJS** - Template engine
- **EJS-Mate** - Layout support for EJS
- **Bootstrap** - CSS framework for responsive design
- **HTML5 & CSS3**

### Additional Tools

- **Method-Override** - HTTP verb support (PUT, DELETE) in forms

## 📁 Project Structure

```
YelpCamp/
├── app.js                 # Main application file
├── package.json           # Dependencies and scripts
├── models/
│   └── campground.js      # Mongoose schema for campgrounds
├── seeds/
│   ├── index.js          # Database seeding script
│   ├── cities.js         # City data for seeding
│   └── seedHelpers.js    # Helper arrays for generating data
└── views/
    ├── homepage.ejs      # Landing page
    ├── campgrounds/
    │   ├── index.ejs     # All campgrounds listing
    │   ├── show.ejs      # Individual campground details
    │   ├── new.ejs       # Add new campground form
    │   └── edit.ejs      # Edit campground form
    ├── layouts/
    │   └── boilerplate.ejs # Main layout template
    └── partials/
        ├── navbar.ejs    # Navigation component
        └── footer.ejs    # Footer component
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm (comes with Node.js)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd YelpCamp
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start MongoDB**

   - For local MongoDB: `mongod`
   - Or ensure your MongoDB Atlas connection is configured

4. **Seed the database (optional)**

   ```bash
   node seeds/index.js
   ```

   This will populate your database with 50 sample campgrounds.

5. **Start the application**

   ```bash
   node app.js
   ```

6. **Visit the application**
   Open your browser and navigate to `http://localhost:3000`

## 🗃️ Database Schema

### Campground Model

```javascript
{
  title: String,        // Campground name
  image: String,        // URL to campground image
  price: Number,        // Price per night
  description: String,  // Detailed description
  location: String      // Campground location
}
```

## 🛣️ API Routes

| Method | Route                   | Description                        |
| ------ | ----------------------- | ---------------------------------- |
| GET    | `/`                     | Homepage                           |
| GET    | `/campgrounds`          | Display all campgrounds            |
| GET    | `/campgrounds/new`      | Show form to create new campground |
| POST   | `/campgrounds`          | Create a new campground            |
| GET    | `/campgrounds/:id`      | Show specific campground           |
| GET    | `/campgrounds/:id/edit` | Show form to edit campground       |
| PUT    | `/campgrounds/:id`      | Update specific campground         |
| DELETE | `/campgrounds/:id`      | Delete specific campground         |

## 🌱 Seeding Data

The project includes a seeding script that generates sample campgrounds using:

- Random city and state combinations from `cities.js`
- Random campground names from descriptors and places in `seedHelpers.js`
- Random pricing between ₹10-30
- Sample images from Unsplash

Run the seeder with:

```bash
node seeds/index.js
```

## 🎨 UI Features

- **Bootstrap Integration**: Responsive grid system and components
- **Card Layout**: Clean campground display cards
- **Form Styling**: Well-styled forms with proper validation display
- **Navigation**: Consistent navbar across all pages
- **Currency Display**: Indian Rupee (₹) formatting for prices

## 🔧 Development Notes

- **Route Order**: The `/campgrounds/new` route must come before `/campgrounds/:id` to prevent "new" being treated as an ID
- **Method Override**: Used to enable PUT and DELETE requests from HTML forms
- **EJS Layouts**: Utilizes ejs-mate for consistent page layouts
- **Error Handling**: Basic error logging for MongoDB connection issues

## 📚 Learning Objectives

This project demonstrates:

- RESTful routing patterns
- CRUD operations with MongoDB
- Express.js middleware usage
- Template rendering with EJS
- Form handling and data validation
- Database modeling with Mongoose
- Responsive web design principles

## 🤝 Contributing

This is a learning project from "The Web Developer Bootcamp". Feel free to fork and experiment with additional features!

## 📄 License

This project is part of educational content from "The Web Developer Bootcamp" by Colt Steele.

## 🙏 Acknowledgments

- **Colt Steele** - Course instructor and project creator
- **The Web Developer Bootcamp** - Educational resource
- **Unsplash** - Sample campground images
