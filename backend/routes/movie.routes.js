const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const Movies = require('../models/Movies');
const Actor = require('../models/Actor');
const Producer = require('../models/Producer');
const User = require('../models/User');
const Rating = require('../models/Rating');
const movieDto = require('../dtos/movies.dto');
const actorDto = require('../dtos/actor.dto');
const producerDto = require('../dtos/producer.dto');

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
        bio: bio,
        movies: movie._id
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
            bio: actor.bio,
            movies: movie._id
        });
        await Movies.updateOne(
            { _id: movie._id },
            { $push: { actors: newActor._id } },
        );
    })
    return res.send("Movie Added Successfully");

});

router.get('/getmovies', async (req, res) => {

    const { movieId } = req.query;
    try {
        const exisitingMovie = await Movies.findOne({ _id: movieId }).populate('actors').populate('producer');

        const dto = movieDto.getMovies(exisitingMovie);

        return res.json(dto);

    } catch (e) {
        console.log(e);
    }

    return res.sendStatus(500);

});

router.get('/getallactors', async (req, res) => {

    const allActors = await Actor.find({}).populate('movies');

    if (allActors.length === 0) {
        return res.status(409).send('No actors found');
    }

    const dto = actorDto.getActors(allActors);

    return res.json(dto);

});

router.get('/getallproducers', async (req, res) => {

    const allProducers = await Producer.find({}).populate('movies');

    if (allProducers.length === 0) {
        return res.status(409).send('No producers found');
    }

    const dto = producerDto.getProducers(allProducers);

    return res.json(dto);
});

router.get('/getallmovies', async (req, res) => {

    const allMovies = await Movies.find().populate('producer actors');

    if (allMovies.length === 0) {
        return res.status(409).send('No movies found');
    }

    const dto = movieDto.getAllMovies(allMovies);

    return res.json(dto);
});

router.post('/editmovie', async (req, res) => {

    const movie = req.body;

    const id = req.body.index;

    try {
        if (movie.data.movieName !== undefined && movie.data.movieName !== '') {
            await Movies.updateOne(
                { _id: id },
                { name: movie.data.movieName }
            );
        }
        if (movie.data.yearOfRelease !== undefined && movie.data.yearOfRelease !== '') {
            await Movies.updateOne(
                { _id: id },
                { yearOfRelease: movie.data.yearOfRelease }
            );
        }
        if (movie.data.plot !== '' && movie.data.plot !== undefined) {
            await Movies.updateOne(
                { _id: id },
                { plot: movie.data.plot }
            );
        }
        if (movie.data.producer !== '' && movie.data.producer !== undefined) {
            await Producer.updateOne(
                { _id: id },
                { name: movie.data.producer }
            );
        }

    } catch (e) {
        console.log(e);
    }

    return res.json(movie);
});

router.post('/ratemovie', async (req, res) => {

    const { movieId, userId, count } = req.body;

    const rating = await Rating.find({ $and: [{ userId: userId }, { movieId: movieId }] });

    const movie = await Movies.findOne({ _id: movieId });

    const user = await User.findOne({ _id: userId });

    if (rating.length > 0) {
        try {
            await Rating.updateOne(
                { _id: rating[0]._id.valueOf() },
                { count: count }
            );
        } catch (e) {
            console.log(e);
            return res.sendStatus(500);
        }
        return res.sendStatus(200);
    }
    try {
        const rating = await Rating.create({
            count: count,
            userId: user._id,
            movieId: movie._id
        });
        return res.sendStatus(201);
    } catch (e) {
        return res.sendStatus(500);
    }
});

module.exports = router;