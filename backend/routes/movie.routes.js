const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const Movies = require('../models/Movies');
const Actor = require('../models/Actor');

router.get("/welcome", auth, (req, res) => {
    res.status(200).json({ hello: "Welcome" });
});

router.post('/add', async (req, res) => {

    try {
        const { name, yearOfRelease, plot, poster } = req.body;

        const existingMovie = await Movies.findOne({ name });

        if (existingMovie) {
            return res.status(409).send('Movie already exists');
        } else {
            const movie = await Movies.create({
                name: name,
                yearOfRelease: yearOfRelease,
                plot: plot,
                poster: poster
            });

            res.json(movie);
        }
    } catch (e) {
        console.log(e);
    }
});

router.post('/add/actor', async (req, res) => {

    try {
        const { name, gender, dob, bio } = req.body;

        const existingActor = await Actor.findOne({ name });

        if (existingActor) {
            return res.status(409).send('Actor already exists');
        } else {
            const actor = await Actor.create({
                name: name,
                gender: gender,
                dob: dob,
                bio: bio
            });

            res.json(actor);
        }
    } catch (e) {
        console.log(e);
    }
});

router.post('/addActors', async (req, res) => {

    const name = 'Sholay';

    var exisitingMovie = await Movies.findOne({ name });

    req.body.forEach(async function (actor) {
        const newActor = await Actor.create({
            name: actor.name,
            gender: actor.gender,
            dob: actor.dob,
            bio: actor.bio
        });;
        exisitingMovie = await Movies.updateOne(
            { _id: exisitingMovie._id },
            { $push: { actors: newActor._id } },
        );
    })
    return res.json(exisitingMovie);

});

router.get('/getmoveies', async (req, res) => {

    const name = 'Sholay';

    var exisitingMovie = await Movies.findOne({ name }).populate('actor');

    res.json(exisitingMovie);

});

module.exports = router;