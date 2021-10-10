var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Post = require('../models/post');
var ObjectId = require('mongodb').ObjectId;

/* GET users listing. */
router.get('/:username', function (req, res, next) {
    var username = req.params.username;
    if (username) {
        let post = new Post(req.session.user, null, {user: username});
        post.get('reviews', function (data) {
            console.log(data);
            var right;
            if (username == req.session.user.name) {
                right = true;
            } else {
                right = false;
            }
            res.render('page/users', {
                right: right
                , username: username
                , reviews: data
            });
        });
    } else {
        return res.redirect('/');
    }
});

module.exports = router;
