var app = angular.module('TravelApp');

app.controller('SearchController', ['$scope', 'UserService', function ($scope, UserService){

    $scope.getAll = function (key,search){
        UserService.getAll(key,search).then(function(response){
            $scope.users = response;
        })
    }

    $scope.addFriend = function (user, $index){
        $scope.userToAdd = $scope.users[$index];
        $scope.user = UserService.currentUser;
        $scope.friends = $scope.user.friends;
        UserService.putNew(userToAdd,user).then(function(response){
            console.log(response);
            $scope.request = response;
            user.friends.push(userToAdd);
           $scope.friends.push($scope.userToAdd);
        });
    }
}]);