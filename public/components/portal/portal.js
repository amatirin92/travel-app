var app = angular.module("TravelApp.Auth");
app.controller('PortalController', ['$scope', 'UserService', function ($scope, UserService) {
    $scope.user = UserService.currentUser;
    $scope.languagesToLearn = $scope.user.languagesToLearn;
    $scope.locationsHaveVisited = $scope.user.locationsHaveVisited;
    $scope.locationsToVisit = $scope.user.locationsToVisit;
    $scope.languagesHaveLearned = $scope.user.languagesHaveLearned;
    $scope.friends = $scope.user.friends;
    // $scope.user.friends.length = $scope.numberOfFriends;

    $scope.get = function () {
        UserService.get().then(function (response) {
            console.log(response);
            $scope.user = response.data;
            $scope.languagesToLearn = $scope.user.languagesToLearn;
            $scope.locationsHaveVisited = $scope.user.locationsHaveVisited;
            $scope.locationsToVisit = $scope.user.locationsToVisit;
            $scope.languagesHaveLearned = $scope.user.languagesHaveLearned;
            $scope.friends = $scope.user.friends;
        })
    }

    $scope.put = function (user) {
        UserService.put(user).then(function (response) {
            $scope.get();
        })
    }

}]);