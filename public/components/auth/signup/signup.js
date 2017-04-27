var app = angular.module('TravelApp.Auth');

app.controller("SignupController", ["$scope", "$location", "UserService", function ($scope, $location, UserService){
    $scope.passwoordMessage = '';

    $scope.signup = function (user){
        if (user.password !== $scope.passwordRepeat){
            $scope.passwoordMessage = "Passwords do not match"
        } else {
            UserService.signup(user).then(function(response){
                $location.path('/login');
            }, function (response) {
                alert("There was a problem: " + response.data);
            });
        }
    }
}])