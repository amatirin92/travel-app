var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var travelSchema = new Schema({
   languages: {
       type: [String]
   },
    places: {
       type: [String]
    }
});

module.exports = mongoose.model('Travel', travelSchema);