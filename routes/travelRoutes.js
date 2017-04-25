var express = require('express');
var userRouter = express.Router();
var User = require('../models/user');

// userRouter.route('/')
// // .get(function (req, res){
// //     User.find({user: req.user._id}, function(err, users){
// //         if (err) res.status(500).send(err);
// //         res.send(users);
// //     });
// // })
//
// .post(function(req,res){
//     var user = new User(req.body);
//     user.user = req.user;
//     user.save(function(err,newUser){
//         if (err) res.status(500).send(err);
//         res.status(201).send(newUser);
//     });
// })
//     .put(function(req, res){
//         User.findOneAndUpdate({_id: req.params.userId, user: req.user._id}, req.body, {new: true}, function (err, user){
//             if (err) res.status(500).send(err);
//             res.send(user);
//         });
//     })

userRouter.route('/myportal')
    .get(function (req, res) {
        User.findOne({_id: req.params.userId}, function (err, user) {
            if (err) res.status(500).send(err);
            if (!user) res.status(404).send('Was not found');
            else res.send(user);
        });
    })

    .put(function (req, res) {
        console.log(req.user._id);
        User.findOneAndUpdate({
            _id: req.user._id
        }, req.body, {new: true}, function (err, user) {
            if (err) res.status(500).send(err);
            console.log(user)
            res.send(user);
        });
    })
    .delete(function (req, res) {
        User.findOneAndRemove({_id: req.params.userId}, function (err, user) {
            if (err) res.status(500).send(err);
            res.send(user);
        });
    })

module.exports = userRouter;