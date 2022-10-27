const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const Movies = require('../models/Movies');
const Actor = require('../models/Actor');
const Producer = require('../models/Producer');
const movieDto = require('../dtos/movies.dto');

router.get("/welcome", auth, (req, res) => {
    res.status(200).json({ hello: "Welcome" });
});

router.post('/addmovie', async (req, res) => {

    const movieName = req.body.movie.name;

    const existingMovie = await Movies.find({ name: movieName });

    if (existingMovie.length > 0) {
        return res.status(409).send('Movie already exists');
    }

    const { newMovieName, yearOfRelease, plot, poster } = req.body.movie;

    var movie = await Movies.create({
        name: newMovieName,
        yearOfRelease: yearOfRelease,
        plot: plot,
        poster: poster
    });

    const { name, gender, dob, bio } = req.body.producer;

    const producer = await Producer.create({
        name: name,
        gender: gender,
        dob: dob,
        bio: bio
    });

    await Movies.updateOne(
        { _id: movie._id },
        { $push: { producer: producer._id } },
    );

    req.body.actors.forEach(async function (actor) {
        const newActor = await Actor.create({
            name: actor.name,
            gender: actor.gender,
            dob: actor.dob,
            bio: actor.bio
        });
        await Movies.updateOne(
            { _id: movie._id },
            { $push: { actors: newActor._id } },
        );
    })
    return res.send("Movie Added Successfully");

});

router.get('/getmoveies', async (req, res) => {

    const movieName = req.query.movie;

    const exisitingMovie = await Movies.findOne({ name: movieName }).populate('actors').populate('producer');

    console.log(exisitingMovie);

    if(exisitingMovie.length === 0) {
        return res.status(409).send(`No Movie found with name : ${movieName}`);
    }

    const dto = movieDto.getMovies(exisitingMovie);

    res.json(dto);

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

module.exports = router;