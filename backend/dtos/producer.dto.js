function getProducers(producers) {

    let producerArr = [];

    if (producers.length > 0) {
        producers.forEach((producer) => {
            let allMovies = [];
            producer.movies.forEach((movie) => {
                const newMovie = {
                    name: movie.name,
                    yearOfRelease: movie.yearOfRelease,
                    plot: movie.plot,
                    poster: movie.poster
                };
                allMovies.push(newMovie);
            });
            const newProducer = {
                id: producer._id,
                name: producer.name,
                gender: producer.gender,
                dob: producer.dob,
                bio: producer.bio,
                movies: allMovies
            };
            producerArr.push(newProducer);
        });
    }

    return producerArr;
}

module.exports = { getProducers };