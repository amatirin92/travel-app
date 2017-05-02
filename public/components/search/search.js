var app = angular.module('TravelApp');

app.controller('SearchController', ['$scope', 'UserService', function ($scope, UserService){

    $scope.getAll = function (key,search){
        UserService.getAll(key,search).then(function(response){
            $scope.users = response;
            console.log(response);
            return response;
        })
    }

    $scope.addFriend = function (user){
        $scope.user = UserService.currentUser;
        $scope.friends = $scope.user.friends;
        UserService.putNew(user).then(function(response){
           $scope.friends.push(user);
           console.log($scope.friends);
        });
    }
}]);