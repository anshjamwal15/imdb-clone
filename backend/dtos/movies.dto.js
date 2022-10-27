function getMovies(movies) {

    let actors = [];
    let producer = {};

    if (movies["producer"]) {
        producer = {
            name: movies.producer.name,
            gender: movies.producer.gender,
            dob: movies.producer.dob,
            bio: movies.producer.bio
        }
    }

    if (movies["actors"]) {
        movies.actors.forEach((actor) => {
            const newActor = {
                name: actor.name,
                gender: actor.gender,
                dob: actor.dob,
                bio: actor.bio
            };
            actors.push(newActor);
        });
    }

    return {
        name: movies.name,
        yearOfRelease: movies.yearOfRelease,
        plot: movies.plot,
        poster: movies.poster,
        producer: producer,
        actors: actors
    }
}

module.exports = { getMovies };