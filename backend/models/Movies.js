var mongoose = require('mongoose');
var Schema = mongoose.Schema;

movies = new Schema({
    name: String,
    yearOfRelease: String,
    plot: String,
    poster: String,
    producer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'producer'
    },
    actors: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'actor'
        }
    ]
}, { versionKey: false });

Movies = mongoose.model('Movies', movies);

module.exports = Movies;