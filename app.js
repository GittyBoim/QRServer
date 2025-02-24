require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('./src/config/passport');
const userRoutes = require('./src/routes/userRoutes');
const qrRoutes = require('./src/routes/qrRoutes');
const authRoutes = require('./src/routes/authRoutes');
const authGoogleRoutes = require('./src/routes/authGoogleRoutes');
const companyRoutes = require('./src/routes/companyRoutes');
const authCompanyRoutes = require('./src/routes/authCompanyRoutes');

const cors = require("cors");
const connectDB = require('./src/config/db');

const app = express();

// Session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

// Passport setting
app.use(passport.initialize());
app.use(passport.session());

// Middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(bodyParser.json());

// Routes
app.use('/users', userRoutes);
app.use('/qrs', qrRoutes);
app.use('/auth', authRoutes);
app.use('/auth', authGoogleRoutes);
app.use('/companies', companyRoutes);
app.use('/authCompany', authCompanyRoutes);

// DB connection
connectDB();

app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});
