var mongoose = require('mongoose');


var options = {
    personModelName:            'Users',
    friendshipModelName:        'friendRelationships',
    friendshipCollectionName:   'userRelationships'
};


var friendsOfFriends = require('friends-of-friends')(mongoose, options);

module.exports = friendsOfFriends;
