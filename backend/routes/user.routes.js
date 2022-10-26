const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

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

module.exports = router;