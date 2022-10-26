var mongoose = require('mongoose');
var Schema = mongoose.Schema;

producer = new Schema({
    name: String,
    gender: String,
    dob: Date,
    bio: String,
    movies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'movies'
        }
    ]
}, { versionKey: false } );

Producer = mongoose.model('producer', producer);

module.exports = Producer;