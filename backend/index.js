const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user.routes');
const movieRoutes = require('./routes/movie.routes');
const port = 5000;
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dbUrl = process.env.ATLAS_URL;
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => { console.log('Database connection established successfully.') });

// Routes prefix
app.use('/auth/user', userRoutes);
app.use('/auth/movies', movieRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});