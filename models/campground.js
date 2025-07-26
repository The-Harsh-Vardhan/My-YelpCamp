const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// mongoose.connect('mongodb://localhost:27017/yelp-camp', {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true
//     })
//     .then( () => {
//         console.log('MONGO IS CONNECTED');
//     })
//     .catch( (err) => {
//         console.log('OH NO MONGO ERROR!!!!');
//         console.log(err)
//     }); 

const CampgroundSchema = new Schema({
    title: String,
    image: String,
    price: Number,
    description: String,
    location: String
});

module.exports = mongoose.model('Campground', CampgroundSchema);