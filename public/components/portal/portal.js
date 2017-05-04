var app = angular.module("TravelApp.Auth");
app.controller('PortalController', ['$scope', 'UserService', function ($scope, UserService) {
    $scope.user = UserService.currentUser;
    $scope.languagesToLearn = $scope.user.languagesToLearn;
    $scope.locationsHaveVisited = $scope.user.locationsHaveVisited;
    $scope.locationsToVisit = $scope.user.locationsToVisit;
    $scope.languagesHaveLearned = $scope.user.languagesHaveLearned;
    $scope.friends = $scope.user.friends;
    $scope.avatar = $scope.user.avatar;

    $scope.get = function () {
        UserService.get().then(function (response) {
            $scope.user = response.data;
            $scope.languagesToLearn = $scope.user.languagesToLearn;
            $scope.locationsHaveVisited = $scope.user.locationsHaveVisited;
            $scope.locationsToVisit = $scope.user.locationsToVisit;
            $scope.languagesHaveLearned = $scope.user.languagesHaveLearned;
            $scope.friends = $scope.user.friends;
        })
    };
    $scope.get();


    $scope.getAll = function (key,search,userFriends, $index){
        UserService.getAll(key,search).then(function(response){
            userFriends = UserService.currentUser.friends;
            // for (var i = 0; i < userFriends.length; i++){
            //    if (userFriends[i] === response[i]){
            //        console.log('it Matches!')
            //    }
            // }
            $scope.users = response;
        })
    };

    $scope.addFriend = function (user, $index){
        $scope.userToAdd = $scope.users[$index];
        $scope.user = UserService.currentUser;
        $scope.friends = $scope.user.friends;
        UserService.putNew(user).then(function(response){
            $scope.friends.push($scope.userToAdd);
        });
    };


    $scope.put = function (user) {
        UserService.put(user).then(function (response) {
            $scope.get();
        })
    };

}]);