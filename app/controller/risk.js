const risk = require('../repository/risk');
const log = require('../../utility/logger')();
const config = require('../../configuration/config');
const version = config.get('version');
const moment = require('moment');
const axios = require('../../utility/axios');

const post = (req, next) => {

    const { idtoken } = req.headers;

    let headers;

    if(idtoken) {
        headers = {
            'Content-Type': 'application/json',
            idToken: idtoken
        };
    } else {
        return next({status: 400, msg: 'Bad request'}, null);
    }

    axios.post('/approvetransaction', { rules: { roles: ['user'] } }, { headers: headers })
        .then(response => {
            if(response.data.status === 200) {
                risk.post(
                    {   ...req.body,
                        inuse: true,
                        updated: moment().format(),
                        created: moment().format()
                    },
                    (err, res) => {
                    if(err) {
                        log.error({ type: "POST", version: version, status: err.status, message: err.msg });
                        return (next(err, null));
                    }
                    else {
                        risk.get({_id: res.res.insertedId}, (err, getres) => {
                            if (err) {
                                log.error({ type: "GET", version: version, status: err.status, message: err.msg });
                                return next(err, null);
                            } else {
                                log.info({ type: "POST", version: version, status: res.status, data: res });
                                return (next(null, {status: res.status, risk: getres.risk}));
                            }
                        });
                    }
                });
            } else {
                next(response.data, null);
            }
        })
        .catch(err => {
            log.error({ type: "POST", version: version, status: err.response.status, message: err.response.statusText });
            return(next({status: err.response.status, msg: err.response.statusText}, null));
        });
}

const patch = (req, next) => {

    let headers;

    if (req.headers.idtoken)
        headers = {
            'Content-Type': 'application/json',
            idToken: req.headers.idtoken 
        };
    else
        return next({status: 400, msg: 'Bad request'}, null);
        
        axios.post('/approvetransaction', { rules: { roles: ['user', 'administrator'] } }, { headers: headers })
        .then(response => {
            if(response.data.status === 200) {
                const params = { _id: req.headers.param, body: { ...req.body,  updated: moment().format() } };
                risk.patch(params, (err, res) => {
                    if(err) {
                        log.error({ type: "PATCH", version: version, status: err.status, message: err.msg });
                        return next(err, null);
                    } else {
                        risk.get({_id: params._id}, (err, getres) => {
                            if (err) {
                                log.error({ type: "GET", version: version, status: err.status, message: err.msg });
                                return next(err, null);
                            } else {
                                log.info({ type: "PATCH", version: version, status: res.status, data: res });
                                return (next(null, {status: res.status, risk: getres.risk}));
                            }
                        });
                    }
                });
            } else {
                next(response.data, null);
            }
        })
        .catch(err => {
            log.error({ type: "PATCH", version: version, status: err.response.status, message: err.response.statusText });
            return(next({status: err.response.status, msg: err.response.statusText}, null));
        });
}

const get = (req, next) => {

    const { idtoken } = req.headers;

    let headers;

    if (idtoken)
        headers = {
            'Content-Type': 'application/json',
            idToken: idtoken
        };
    else
        return next({status: 400, msg: 'Bad request'}, null);
    
    axios.post('/approvetransaction', { rules: { roles: ['user'] } }, { headers: headers })
    .then(response => {
        if(response.data.status === 200) {
            risk.get(req.headers, (err, res) => {
                if (err) {
                    log.error({ type: "GET", version: version, status: err.status, message: err.msg });
                    next(err, null);
                } else {
                    log.info({ type: "GET", version: version, status: res.status, message: "ok" });
                    next(null, res);
                }
            });
        } else {
            next(response.data, null);
        }
    })
    .catch(err => {
        log.error({ type: "GET", version: version, status: err.response.status, message: err.response.statusText });
        return(next({status: err.response.status, msg: err.response.statusText}, null));
    });
}

const all = (req, next) => {

    const { idtoken } = req.headers;

    let headers;

    if (idtoken)
        headers = {
            'Content-Type': 'application/json',
            idToken: idtoken
        };
    else
        return next({status: 400, msg: 'Bad request'}, null);
    
    axios.post('/approvetransaction', { rules: { roles: ['user'] } }, { headers: headers })
    .then(response => {
        if(response.data.status === 200) {
            risk.all(req, (err, res) => {
                if(err) {
                    log.error({ type: "GET ALL", version: version, status: err.status, message: err.msg });
                    next(err, null);
                } else {
                    log.info({ type: "GET ALL", version: version, status: res.status, message: "ok" });
                    next(null, res);
                }
            });
        } else {
            next(response.data, null);
        }
    })
    .catch(err => {
        log.error({ type: "GET ALL", version: version, status: err.response.status, message: err.response.statusText });
        return(next({status: err.response.status, msg: err.response.statusText}, null));
    });
}

module.exports = {
    post: post,
    patch: patch,
    get: get,
    all: all
}