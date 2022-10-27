function getMovies(movies) {

    let actors = [];

    movies.actors.forEach((actor) => {
        const newActor = {
            name: actor.name,
            gender: actor.gender,
            dob: actor.dob,
            bio: actor.bio
        };
        actors.push(newActor);
    });

    return {
        name: movies.name,
        yearOfRelease: movies.yearOfRelease,
        plot: movies.plot,
        poster: movies.poster,
        actors: actors
    }
}

module.exports = { getMovies };