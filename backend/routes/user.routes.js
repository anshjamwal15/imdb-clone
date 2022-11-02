const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Rating = require('../models/Rating');

router.post("/add", async (req, res) => {

    try {
        const { email, password, name } = req.body;

        if (!email && !password) {
            res.status(400).send("All input are required.");
        }

        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).send("User already exist. Please Login");
        }

        encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name: name,
            email: email.toLowerCase(),
            password: encryptedPassword
        });

        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            { expiresIn: "20h" }
        );

        user.token = token;

        res.json(user);
    } catch (e) {
        console.log(e);
    }
});

router.post("/login", async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!(email && password)) {
            res.status(400).send("All input are required.");
        }

        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {

            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                { expiresIn: "20h" }
            );

            user.token = token;

            res.status(200).json(user);
        } else {
            res.status(400).send("Invalid Credentials");
        }

    } catch (e) {
        res.send(e);
        console.log(e);
    }
});

router.get('/getuser', async (req, res) => {

    const { userId } = req.query;

    const user = await User.findOne({ _id: userId });

    if (user) {
        return res.json(user);
    }
    return res.sendStatus(400);
});

router.post('/edituser', async (req, res) => {

    const { userId } = req.body;

    const { userName, email } = req.body.data;

    try {
        if (userName !== undefined && userName !== '') {
            await User.updateOne(
                { _id: userId },
                { name: userName }
            );
        }
        if (email !== undefined && email !== '') {
            await User.updateOne(
                { _id: userId },
                { email: email }
            );
        }
    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
    return res.send('User updated successfully');
});

router.get('/userrating', async (req, res) => {

    const { userId, movieId } = req.query;

    try {
        const rating = await Rating.find({ $and: [{ userId: userId }, { movieId: movieId }] });

        if (rating) {
            return res.json(rating);
        }
    } catch (e) {
        console.log(e);
    }
    return res.sendStatus(500);
});

module.exports = router;