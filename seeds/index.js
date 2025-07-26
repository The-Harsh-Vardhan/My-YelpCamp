const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected!");    
});

const sample = (array) => array[Math.floor(Math.random() * array.length )];
//Pass in an array and return a random element from that array

const seedDB = async () => {

    console.log('Starting seed process...');
        
    // Delete existing data
    await Campground.deleteMany({});
    console.log('Deleted existing campgrounds');

    // Debug: Check data availability
    console.log(`Cities available: ${cities.length}`);
    console.log(`Places available: ${places.length}`);
    console.log(`Descriptors available: ${descriptors.length}`);

    for(let i=0; i<50; i++) {
        const random1000 = Math.floor(Math.random() * cities.length);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60',
            description: 'Lorem ipsum',
            price: price
        });
        await camp.save();
    }
}

//seedDB returns a promise since it's an async function
// FIXED: Properly call the function and handle cleanup
seedDB().then(() => {
    console.log('Seeding completed. Closing database connection...');
    mongoose.connection.close();
}).catch(err => {
    console.error('Seed process failed:', err);
    mongoose.connection.close();
});