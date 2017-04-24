var express = require('express');
var travelRouter = express.Router();
var Travel = require('../models/travelprop');

travelRouter.route('/')
.get(function (req, res){
    Travel.find(function(err, travels){
        if (err) res.status(500).send(err);
        res.send(travels);
    });
})

.post(function(req,res){
    var travel = new Travel(req.body);
    travel.save(function(err,newTravel){
        if (err) res.status(500).send(err);
        res.status(201).send(newTravel);
    });
})

travelRouter.route('/:travelId')
    .get(function(req,res){
    Travel.findById(req.params.travelId, function (err, travel){
        if (err) res.status(500).send(err);
        if (!travel) res.status(404).send('No travel item found');
        else res.send(travel);
    });
})

.put(function(req, res){
    Travel.findbyIdAndUpdate(req.params.travelId, req.body, {new: true}, function (err, travel){
        if (err) res.status(500).send(err);
        res.send(travel);
    });
})
.delete(function(req, res){
    Travel.findByIdAndRemove(req.params.travelId, function (err, travel){
        if (err) res.status(500).send(err);
        res.send(travel);
    });
})

module.exports = travelRouter;