const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
// const flash = require('connect-flash');
const session = require('express-session');

const MongoStore = require('connect-mongo')(session);

const app = express();

// DB Config
const db = require('./config/keys').MongoURI;

//Connect to Mongo 
// const connection = mongoose.createConnection(db, { useUnifiedTopology: true, useNewUrlParser: true })
mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log("DB connected"))
    .catch(err => console.log(err));

// const sessionStore = new MongoStore({
//     mongooseConnection: connection,
//     collection: 'sessions'
// });
// const idle_timout =
// , ttl: 60 * 60 * 24 * 2 
// maxAge: +60 * 30
//Express session 
app.use(session({
    secret: 'IshMuGia',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: {

    }
    // cookie: {
    //     maxAge: 1000 * 60 * 60 * 24
    // }
}));
// sessionStore

//path
var path = require('path').join(__dirname, '/public');
app.use(express.static(path));

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//Bodyparser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
//app.use(express.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.locals.email = req.session.email;
    next();
});
/*
//connect flash
app.use(flash());

// Global Vars
app.use((req, res, next) => {

});*/

//routes
app.use('/', require('./routes/index.js'))
app.use('/register', require('./routes/users.js'))
app.use('/product', require('./routes/product.js'))
app.use('/login', require('./routes/login.js'))
app.use('/search', require('./routes/search.js'))
app.use('/review', require('./routes/review.js'))

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server started on port ${PORT}`));