const mongoose = require('mongoose');
var Schema = mongoose.Schema;

ratingSchema = new Schema({
    count: Number,
    userId: mongoose.Schema.Types.ObjectId,
    movieId: mongoose.Schema.Types.ObjectId
}, { versionKey: false });

Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;