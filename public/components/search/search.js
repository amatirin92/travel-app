var app = angular.module('TravelApp');

app.controller('SearchController', ['$scope', 'UserService', function ($scope, UserService){

    $scope.getAll = function (key,search){
        UserService.getAll(key,search).then(function(response){
            $scope.users = response;
            console.log(response);
            return response;
        })
    }

    $scope.addFriend = function (userToAdd, $index){
        $scope.userToAdd = $scope.users[$index];
        $scope.user = UserService.currentUser;
        $scope.friends = $scope.user.friends;
        UserService.putNew(userToAdd).then(function(response){
           $scope.friends.push($scope.userToAdd);
           console.log($scope.friends);
        });
    }
}]);