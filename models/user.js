var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
var FriendsOfFriends = require('friends-of-friends');

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
    avatar: {
        type: String
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
    }],
    relationships: [{
        type: Schema.Types.ObjectId,
        ref: 'userRelationships'
    }]
});

var options = {
    personModelName:            'User',
    friendshipModelName:        'friendRelationships',
    friendshipCollectionName:   'userRelationships'
};

var fof = new FriendsOfFriends(mongoose, options);

userSchema.pre("save", function (next) {
    var user = this;
    if (!user.isModified("password")) return next();

    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) return next(err);

        user.password = hash;
        next();
    });
});

userSchema.methods.checkPassword = function (passwordAttempt, callback) {
    bcrypt.compare(passwordAttempt, this.password, function (err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

userSchema.methods.withoutPassword = function () {
    var user = this.toObject();
    delete user.password;
    return user;
};
userSchema.plugin(fof.plugin, options);

var User = mongoose.model(options.personModelName, userSchema);

module.exports = mongoose.model("User", userSchema);
