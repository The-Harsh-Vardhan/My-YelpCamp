const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
const path = require('path');
const Campground = require('./models/campground');
const { campgroundSchema } = require('./schemas.js')

mongoose.connect('mongodb://localhost:27017/yelp-camp')
    .then( () => {
        console.log('MONGO CONNECTION OPEN');
    })
    .catch( err => {
        console.log('OH NO MONGO ERROR!!!');
        console.log(err);
    });

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.urlencoded({ extended: true }));
//needed to parse req.body
app.use(methodOverride('_method'));

const validateCampground = (req, res, next) => {
    //Instead of separate if else statements we would be using joi for data validation
    
    const { error } = campgroundSchema.validate(req.body);
    //result.error.details is an array so we need to map over that and turn it into a single string and join it together
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next(); //In order to proceed to the next route handler
    }
}

app.get('/', (req, res) => {
    res.render('homepage');
});

app.get('/campgrounds', catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds} );
}));

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
});

//Order does matter here, hence we can't put :id route before new route,
//It will result in treating "new" as an id

app.get('/campgrounds/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    res.render('campgrounds/show', {campground} );
}));

app.post('/campgrounds', validateCampground, catchAsync(async (req, res) => {
    // if(!req.body.campground) throw new ExpressError('Invalid Campground Data', 400);  
    const campground = new Campground(req.body.campground);
    await campground.save();
    // res.send(req.body);
    //res.body is empty by default, we need to tell express to parse it
    res.redirect(`/campgrounds/${campground._id}`);
}));

app.get('/campgrounds/:id/edit', catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', { campground } );
}));

app.put('/campgrounds/:id', validateCampground, catchAsync(async (req, res) => {
    const { id } = req.params; 
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground } );
    //spreading 
    res.redirect(`/campgrounds/${campground._id}`);
}));

app.delete('/campgrounds/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
}));

//For every single request, (*) ->  for every path
app.all(/(.*)/, (req, res, next) => {
    //This will only run if nothing else is matched first and we didn't respond from any of them
    next(new ExpressError('Page Not Found', 404));
});

//Generic Error Handler
app.use( (err, req, res, next) => {
    const { statusCode = 500 } = err;
    //Destructuring from err object
    if (!err.message) err.message = 'Oh No, Something went Wrong!';
    res.status(statusCode).render('error', { err }); //passing the entire error
});

app.listen(3000, () => {
    console.log('Listening on Port 3000!');
});