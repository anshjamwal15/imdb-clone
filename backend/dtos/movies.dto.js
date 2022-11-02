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

function getAllMovies(movies) {

    let moviesArr = [];

    if (movies.length > 0) {
        movies.forEach((movie) => {
            let producer = {};
            let allActors = [];
            movie.actors.forEach((actor) => {
                const newActor = {
                    id: actor._id,
                    name: actor.name,
                    gender: actor.gender,
                    dob: actor.dob,
                    bio: actor.bio
                };
                allActors.push(newActor);
            });
            producer = {
                id: movie.producer._id,
                name: movie.producer.name,
                gender: movie.producer.gender,
                dob: movie.producer.dob,
                bio: movie.producer.bio
            };
            const newMovie = {
                id: movie._id,
                name: movie.name,
                yearOfRelease: movie.yearOfRelease,
                plot: movie.plot,
                poster: movie.poster,
                producer: producer,
                actors: allActors
            };
            moviesArr.push(newMovie);
        });
    }
    return moviesArr;
}

module.exports = { getMovies, getAllMovies };