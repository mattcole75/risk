const { ObjectId } = require('mongodb');
const database = require('../../configuration/database');

const post = (req, next) => {

    const dbConnect = database.getDb();

    dbConnect
        .collection('risk')
        .insertOne(req, (err, res) => {
        if (err)
            next({ status: 500, msg: err }, null);
        else
            next(null, { status: 201, data: res });
    });
}

const patch = (req, next) => {

    const dbConnect = database.getDb();
    const id = new ObjectId(req.id);

    dbConnect
        .collection('risk')
        .updateOne(
            { _id: id },
            { $set: req.body},
            { upsert: true }, 
            function (err, res) {
            if (err)
                next({status: 500, msg: err}, null);
            else if (res.acknowledged === true && res.modifiedCount === 1 && res.upsertedId === null && res.upsertedCount === 0)
                next(null, {status: 200, data: res});
            else
                next({status: 400, msg: "Invalid request"}, null);
    });
}

const get = (req, next) => {

    const dbConnect = database.getDb();
    const id = new ObjectId(req.id);

    dbConnect
        .collection('risk')
        .findOne({ _id: id }, ((err, res) => {
            if(err)
                next({ status: 500, msg: err }, null);
            else if(!res)
                next({status: 404, msg: "Not found"}, null);
            else
                next(null, {status: 200, data: res});
        }));
}

const all = (req, next) => {

    const { filter } = req.body;

    const dbConnect = database.getDb();

    let query;
    
    if (filter)
        query = {$text: { $search: filter, $caseSensitive: false }}
    else
        query = {};
        // query = { parentRef: { $exists: false }};

    dbConnect
        .collection('risk')
        .find(query)
        // .limit(200)
        .toArray(function (err, result) {
        if (err) 
            next({status: 400, msg: err}, null);
        else 
            next(null, {status: 200, data: result});
        
        });
}

module.exports = {
    post: post,
    patch: patch,
    get: get,
    all: all
}