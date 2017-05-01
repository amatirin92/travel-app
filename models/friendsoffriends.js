var mongoose = require('mongoose');
var FriendsOfFriends = require('friends-of-friends')(mongoose, options);


var options = {
    personModelName:            'Users',
    friendshipModelName:        'Friend_Relationships',
    friendshipCollectionName:   'userRelationships'
};

module.exports = FriendsOfFriends;
