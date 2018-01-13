'use strict';

module.exports = function (app) {
    app.use(function (req, res, next) {
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', '*');
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);
        // Pass to next layer of middleware
        if ('OPTIONS' == req.method) {
            res.sendStatus(200);
        } else {
            next();
        }
    });

    var companyList = require('../controllers/CompanyController');

    app.route('/api/admin')
        .post(companyList.is_admin);

    app.route('/api/users')
        .post(companyList.post_user);

    app.route('/api/companies')
        .get(companyList.get_companies)
        .post(companyList.create_company);

    app.route('/api/companies/:companyId')
        .post(companyList.update_company)
        .delete(companyList.delete_company);

    app.route('/api/companies/:companyId/ratings/:ratingId')
        .post(companyList.update_rating)
        .delete(companyList.delete_rating);

    app.route('/api/companies/:companyId/add_rating')
        .post(companyList.add_rating);

    app.route('/api/companies/:companyId/:ratingId')
        .post(companyList.rate_rating)
};
