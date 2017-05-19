var express = require('express');
var userRouter = express.Router();
var User = require('../models/user');


userRouter.route('/search')
    .get(function (req, res) {
        var query = req.query || {};
        User.find(query,  function (err, users) {
            if (err) res.status(500).send(err);
            res.send(users);
        });
    })
    .post(function (req, res){
        User.requestFriend(req.user._id, req.body._id, function (err, friends){
            console.log(friends);
            res.send(friends);
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
userRouter.route('/')
    .get(function (req, res) {
        User.findById(req.user._id, function (err, user){
            res.send(user);
        };
        //
        // User.getFriends(req.user._id, function (err, friendships) {
        //     // friendships looks like:
        //     // [{status: "accepted", added: <Date added>, friend: user2}]
        //     console.log(friendships);
        //     res.send(friendships);
        // });
    })
    .put(function (req, res) {
        User.findByIdAndUpdate({
            _id: req.user._id
        }, req.body, {new: true}, function (err, user) {
            if (err) res.status(500).send(err);
            res.send(user);
        });
    });

userRouter.route('/friendrequests')
    .post(function (req, res){
        User.requestFriend(req.body._id, req.user._id, function (err, newFriend){
            console.log(newFriend);
        })
    })
    .put(function (req, res) {
    User.removeFriend(req.user._id, req.body._id, function (err, byeFriend) {
        console.log(byeFriend);
        })
    });


// .delete(function (req, res) {
//     User.findOneAndRemove({_id: req.params.userId}, function (err, user) {
//         if (err) res.status(500).send(err);
//         res.send(user);
//     });
// });

module.exports = userRouter;
