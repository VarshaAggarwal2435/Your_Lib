const express = require('express');
const app = express();
const flash = require('connect-flash');
const session = require('express-session');
const PORT = process.env.PORT || 3000;
require('dotenv').config();
const homeRoute = require('./routes/home.route');
const adminRoute = require('./routes/admin.route');
const { connectDB } = require('./config/db');

// Set view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(session({
    secret: 'Your_Lib',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 365 * 24 * 60 * 60 * 1000 
    }
}));

connectDB();

// Use routes
app.use('/', homeRoute);
app.use('/', adminRoute);

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});