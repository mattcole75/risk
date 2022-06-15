const config = require('../../configuration/config');
const application = config.get('application');
const version = config.get('version');
const risk = require('../controller/risk');

module.exports = (app) => {

    app.get('/', (req, res) => {
        res.status(200).send({'msg': 'Server is up!'});
    });

    app.post('/' + application + '/api/' + version + '/risk', (req, res) => {
        risk.post(req, (err, loc) => {
            res.set('Content-Type', 'application/json');
            if(err)
                res.status(err.status).send(err);
            else
                res.status(loc.status).send(loc);
        });
    });

    app.patch('/' + application + '/api/' + version + '/risk', (req, res) => {
        risk.patch(req, (err, loc) => {
            res.set('Content-Type', 'application/json');
            if(err)
                res.status(err.status).send(err);
            else
                res.status(loc.status).send(loc);
        });
    });

    app.get('/' + application + '/api/' + version + '/risk', (req, res) => {
        res.set('Content-Type', 'application/json');
        risk.get(req, (err, loc) => {
            if(err)
                res.status(err.status).send(err);
            else
                res.status(loc.status).send(loc);
        });
    });

    app.get('/' + application + '/api/' + version + '/risks', (req, res) => {
        res.set('Content-Type', 'application/json');
        risk.all(req, (err, loc) => {
            if(err)
                res.status(err.status).send(err);
            else
                res.status(loc.status).send(loc);
        });
    });
}