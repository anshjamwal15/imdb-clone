var mongoose = require('mongoose');
var Schema = mongoose.Schema;

actor = new Schema({
    name: String,
    gender: String,
    dob: Date,
    bio: String,
    movies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Movies'
        }
    ]
}, { versionKey: false });

Actor = mongoose.model('Actor', actor);

module.exports = Actor;
