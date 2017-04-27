var app = angular.module("TravelApp");
app.controller('PortalController', ['$scope', 'UserService', function($scope,UserService){
    $scope.userService = UserService;
    $scope.changePassword = function (passwords){
        if (passwords.newPassword === passwords.newPasswordRepeat){
            UserService.changePassword(passwords.newPassword).then(function(response){
                $scope.passwords = {};
            })
        } else {
            alert("The two passwords didn't match");
        }
    }
    $scope.get = function (){
        UserService.get().then(function(response){
            $scope.UserService = response.data;
        })
    }

}]);