function getActors(actors) {

    let actorArr = [];

    if (actors.length > 0) {
        actors.forEach((actor) => {
            let allMovies = [];
            actor.movies.forEach((movie) => {
                const newMovie = {
                    name: movie.name,
                    yearOfRelease: movie.yearOfRelease,
                    plot: movie.plot,
                    poster: movie.poster
                };
                allMovies.push(newMovie);
            });
            const newActor = {
                id: actor._id,
                name: actor.name,
                gender: actor.gender,
                dob: actor.dob,
                bio: actor.bio,
                movies: allMovies
            };
            actorArr.push(newActor);
        });
    }

    return actorArr;
}

module.exports = { getActors };