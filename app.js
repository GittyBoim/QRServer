require('dotenv').config();
const express = require('express');
// const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./src/routes/userRoutes');
const qrRoutes = require('./src/routes/qrRoutes');
const authRoutes = require('./src/routes/authRoutes');
const cors = require("cors");
const connectDB = require('./src/config/db');


const app = express();

app.use(cors({ origin: "http://localhost:5173" }));

app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/qrs', qrRoutes);
app.use('./auth', authRoutes)

connectDB();

app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});
