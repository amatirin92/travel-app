var app = angular.module('TravelApp');

app.controller('SearchController', ['$scope', 'UserService', function ($scope, UserService){

    $scope.getAll = function (key,search){
        UserService.getAll(key,search).then(function(response){
            $scope.users = response;
            return response;
        })
    }
}]);