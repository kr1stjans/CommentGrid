'use strict';


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CompanySchema = new Schema({
    name: String,
    address: String,
    ratings: []
});

var RatingSchema = new Schema({
    comment: String,
    rating: {type: Number, default: 0},
    date: Date,
    upvote: {type: Number, default: 0},
    downvote: {type: Number, default: 0}
});

var UserSchema = new Schema({
    userId: String,
    date: Date
});


module.exports = mongoose.model('Companies', CompanySchema);
module.exports = mongoose.model('Ratings', RatingSchema);
module.exports = mongoose.model('Users', UserSchema);