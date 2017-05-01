var app = angular.module('TravelApp');

app.controller('SearchController', ['$scope', 'UserService', function ($scope, UserService){

    $scope.getAll = function (){
        UserService.getAll().then(function(response){
            $scope.users = response;
            return response;
        })
    }
}]);