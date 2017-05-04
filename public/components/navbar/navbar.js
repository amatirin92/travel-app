var app = angular.module('TravelApp');

app.directive('navbar', ['UserService', function (UserService) {
    return {
        templateUrl: "components/navbar/navbar.html",
        css: "style.css",
        link: function (scope) {
            scope.userService = UserService;
        }
    }
}])