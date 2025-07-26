const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const path = require('path');
const Campground = require('./models/campground');

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

app.get('/', (req, res) => {
    res.render('homepage');
});

app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds} );
});

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
});

//Order does matter here, hence we can't put :id route before new route,
//It will result in treating "new" as an id

app.get('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    res.render('campgrounds/show', {campground} );
});

app.post('/campgrounds', async (req, res) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    // res.send(req.body);
    //res.body is empty by default, we need to tell express to parse it
    res.redirect(`/campgrounds/${campground._id}`);
});

app.get('/campgrounds/:id/edit', async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', { campground } );
});

app.put('/campgrounds/:id', async (req, res) => {
    const { id } = req.params; 
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground } );
    //spreading 
    res.redirect(`/campgrounds/${campground._id}`);
});

app.delete('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
});

app.listen(3000, () => {
    console.log('Listening on Port 3000!');
});