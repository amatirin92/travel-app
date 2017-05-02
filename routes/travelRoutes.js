var express = require('express');
var userRouter = express.Router();
var User = require('../models/user');

userRouter.route('/search')
.get(function (req, res){
    var query = req.query || {};
    User.find(query, function(err, users){
        if (err) res.status(500).send(err);
        res.send(users);
    });
})



userRouter.route('/')
    .get(function (req, res) {
        User.findOne({_id: req.user._id}).populate('friends').exec(function (err, user) {
            if (err) res.status(500).send(err);
            if (!user) res.status(404).send('Was not found');
            else res.send(user);
        });
    })
    .put(function (req, res) {
        User.findOneAndUpdate({
            _id: req.user._id
        }, req.body, {new: true}, function (err, user) {
            if (err) res.status(500).send(err);
            res.send(user);
        });
    });
    // .delete(function (req, res) {
    //     User.findOneAndRemove({_id: req.params.userId}, function (err, user) {
    //         if (err) res.status(500).send(err);
    //         res.send(user);
    //     });
    // });

module.exports = userRouter;