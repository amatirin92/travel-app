var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    locationsToVisit: {
        type: [String]
    },
    locationsHaveVisited: {
        type: [String]
    },
    languagesHaveLearned: {
        type: [String]
    },
    languagesToLearn: {
        type: [String]
    },
    friends: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]
});

module.exports = mongoose.model("User", userSchema);