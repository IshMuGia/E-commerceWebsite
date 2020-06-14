const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');

//User Model
const User = require('./models/Users');


const app = express();

// DB Config
const db = require('./config/keys').MongoURI;

//Connect to Mongo 
mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log("DB connected"))
    .catch(err => console.log(err));

//path
var path = require('path').join(__dirname, '/public');
app.use(express.static(path));

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//Bodyparser
app.use(express.urlencoded({ extended: false }));

/*
//Express session 
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//connect flash
app.use(flash());

// Global Vars
app.use((req, res, next) => {

});*/

//routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))
app.use('/product', require('./routes/product'))

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server started on port ${PORT}`));