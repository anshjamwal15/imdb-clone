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
            ref: 'Movies'
        }
    ]
}, { versionKey: false } );

Producer = mongoose.model('Producer', producer);

module.exports = Producer;