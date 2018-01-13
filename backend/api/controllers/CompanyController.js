'use strict';

var mongoose = require('mongoose'),
    Company = mongoose.model('Companies'),
    User = mongoose.model('Users'),
    Rating = mongoose.model('Ratings');

setInterval(function () {
    var d = new Date();
    d.setMinutes(d.getMinutes() - 1);
    User.remove({'date': {'$lt': d}}, function (err) {
        if (err) {
            console.log('couldnt remove user');
        } else {
            console.log('removing users!')
        }
    });
}, 60000);

var deleteDates = function () {
    console.log('deleting dates');
    Company.find({}, function (err, companies) {
        for (var i = 0; i < companies.length; i++) {
            console.log(companies[i].ratings.length);
            for (var j = 0; companies[i].ratings && j < companies[i].ratings.length; j++) {
                companies[i].ratings[j].date = new Date(new Date().getTime() - Math.random() * 1000 * 60 * 60 * 24*10);
            }
            companies[i].markModified('ratings');
            companies[i].save(function (save_error) {
                if (save_error)
                    console.log('Cant save company: ' + save_error);
            });
        }
    });
};

exports.get_companies = function (req, res) {
    Company.find({}, function (err, companies) {
        if (err)
            res.send(err);
        res.json(companies);
    });
};

exports.is_admin = function(req, res) {
    res.json(req.body.hash === '^TZ6LHdS@tAl*ai4ITk*gI1St10A4O');
};

exports.post_user = function (req, res) {
    User.findOne({userId: req.body.userId}, function (err, user) {
        if (user) {
            user.date = new Date();
            user.save(function (err) {
                if (err) {
                    console.log('cant save user');
                }
                User.count({}, function (err, count) {
                    res.json(count);
                });
            });
        } else {
            var newUser = new User({userId: req.body.userId, date: new Date()});
            newUser.save(function (err) {
                if (err) {
                    console.log('cant save user');
                }
                User.count({}, function (err, count) {
                    res.json(count);
                });
            });
        }
    });
};

exports.delete_company = function (req, res) {
    Company.remove({_id: req.params.companyId}, function (err) {
        if (err) {
            console.log('Couldnt remove company: ' + err);
        }
        res.json("OK");
    })
};

exports.update_company = function (req, res) {
    Company.findById(req.params.companyId, function (err, company) {
        if (err)
            res.send(err);
        if (!req.body.ratings) {
            req.body.ratings = [];
        }
        company.set(req.body);

        company.save(function (save_error) {
            if (save_error)
                console.log('Cant save company: ' + save_error);
        });
        res.json(company);
    });
};

exports.delete_rating = function (req, res) {
    Company.findById(req.params.companyId, function (err, company) {
        if (err)
            res.send(err);

        var ratingIdx = company.ratings.findIndex(function (rating) {
            return rating._id == req.params.ratingId;
        });

        company.ratings.splice(ratingIdx, 1);
        company.markModified('ratings');
        company.save(function (save_error) {
            if (save_error)
                console.log('Cant save company: ' + save_error);
        });
        res.json(company);
    });
};

exports.update_rating = function (req, res) {
    Company.findById(req.params.companyId, function (err, company) {
        if (err)
            res.send(err);

        var ratingIdx = company.ratings.findIndex(function (rating) {
            return rating._id == req.params.ratingId;
        });
        company.ratings[ratingIdx] = req.body;
        company.markModified('ratings');
        company.save(function (save_error) {
            if (save_error)
                console.log('Cant save company: ' + save_error);
        });
        res.json(company);
    });
};

exports.create_company = function (req, res) {
    var new_company = new Company(req.body);
    new_company.save(function (err, company) {
        if (err)
            res.send(err);
        res.json(company);
    });
};

exports.add_rating = function (req, res) {
    Company.findById(req.params.companyId, function (err, company) {
        if (err)
            res.send(err);
        company.ratings.push(new Rating(req.body));
        company.save(function (save_error) {
            if (save_error)
                console.log('Cant save company: ' + save_error);
        });
        res.json(company);
    });
};

exports.rate_rating = function (req, res) {
    Company.findById(req.params.companyId, function (err, company) {
        if (err)
            res.send(err);

        var rating = company.ratings.find(function (rating) {
            return rating._id == req.params.ratingId;
        });

        if (req.body.status === 'upvote') {
            rating.upvote = Number(rating.upvote) + 1;
            Company.update({
                '_id': req.params.companyId
            }, {$set: {'ratings': company.ratings}}, function (err) {

            });
        } else if (req.body.status === 'downvote') {
            rating.downvote = Number(rating.downvote) + 1;
            Company.update({
                '_id': req.params.companyId
            }, {$set: {'ratings': company.ratings}}, function (err) {
            });
        }
        res.json(company);
    });
};