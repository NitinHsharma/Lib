var express = require('express');
var router = express.Router();
var mongoUtil = require('../utils/mongo.js');




/* GET home page. */
router.post('/', function(req, res, next) {

    mongoUtil.select({

    }, function(err, data) {
        if (err) {
            console.log(err);
            res.send('something went wrong');
        } else {
            res.send(data);
        }
    });

});

router.post('/search', function(req, res, next) {

    var query = {};
    if (req.body.srcName != undefined) {
        query = {
            name: req.body.srcName
        };
    }
    if (req.body.srcAuthor != undefined) {
        query = {
            author: req.body.srcAuthor
        };
    }
    if (req.body.srcAva != undefined) {
        query = {
            avaiable: req.body.srcAva
        };
    }
    console.log(query);
    mongoUtil.select(query, function(err, data) {
        if (err) {
            console.log(err);
            res.send('something went wrong');
        } else {
            res.send(data);
        }
    });

});



router.post('/add', function(req, res) {

    if (req.body.name == undefined || req.body.author == undefined) {
        res.send('please add name and author of book');
        return;
    } else {

        var data = {
            name: req.body.name,
            author: req.body.author,
            avaiable: req.body.avaiable ? req.body.avaiable : 'false',
            Date: Date.now
        };
        mongoUtil.insert(data, function(err, data) {
            console.log('return');
            if (err) {
                console.log('Error is ' + err);
                res.send('something went wrong');
            } else {
                res.send(data);
            }
        });
    }
});

router.post('/remove', function(req, res, next) {

    var rmName = req.body.rmName;

    mongoUtil.del({
        name: rmName
    }, function(err, data) {
        if (err) {
            console.log(err);
            res.send('something went wrong');
        } else {
            res.send(data);
        }
    });

});


router.post('/update', function(req, res, next) {
    var upName = req.body.upName;
    var newdata = JSON.parse(req.body.newData);


    console.log(newdata.name);
    mongoUtil.update({
        name: upName
    }, newdata, function(err, data) {
        if (err) {
            console.log(err);
            res.send('something went wrong');
        } else {
            res.send(data);
        }
    });


});


module.exports = router;