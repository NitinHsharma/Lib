var mongojs = require('mongojs');
var config = require('../config.json');
var db = mongojs('lib', ['books', 'users']);
var bodyparser = require('body-parser');

var connString = config.Con;

var select = function(query, callback) {
    console.log('request came to Wapper');
    if (query == undefined) {
        console.log(query);
        return 'undefined query';
    } else {

        console.log(query);
        db.books.find(query, function(err, data) {
            if (err) {
                console.log('error in select ' + err);
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    }
}


var insert = function(dataInsertion, callback) {
    console.log('Got request for singup');
    if (dataInsertion == undefined) {
        console.log('Data can not null');
    } else {

        console.log(dataInsertion);
        db.books.insert(dataInsertion, function(err, data) {
            if (err) {
                console.log('Error %j', err);
                callback(err, null);
            } else {
                console.log('Data is %j', data);
                callback(null, data);
            }
        });
    }
}

var update = function(query, newdata, callback) {

    if (query == undefined || data == undefined) {
        console.log('Data can not be null');
    } else {
        db.books.update(query, {
            $et: {
                newdata
            },
            function(err, data) {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, data);
                }
            }
        });
    }
}

var del = function(query, callback) {

    if (query == undefined) {
        console.log('query can not be null');
    } else {
        db.books.remove(query, function(err, data) {
            console.log(query);
            if (err) {
                console.log('error');
                callback(err, null);
            } else {
                console.log('success ' + data);
                callback(null, data);
            }
        });
    }
}


module.exports = {
    select,
    insert,
    update,
    del
};