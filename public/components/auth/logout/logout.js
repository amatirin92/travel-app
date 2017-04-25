var app = angular.module('TravelApp.Auth');

app.controller("LogoutController", ['UserService', function (UserService){
    UserService.logout();
}]);