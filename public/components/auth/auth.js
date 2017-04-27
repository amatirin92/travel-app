//this will handle the JWT we get from the server, saving, getting and remove them to/from localStorage

var app = angular.module("TravelApp.Auth", []);

app.config(["$routeProvider", function($routeProvider){
    $routeProvider
        .when('/signup', {
            templateUrl: "components/auth/signup/signup.html",
            controller: "SignupController"
        })
        .when('/login', {
            templateUrl: "components/auth/login/login.html",
            controller: "LoginController",
            css:"loginpage.css"
        })
        .when('/myportal', {
            templateUrl: "components/portal/portal.html",
            controller:"PortalController"
        })
        .when('/edit', {
            templateUrl: "components/edit/edit.html",
            controller: "PortalController"
        })
        .when('/logout', {
            controller: "LogoutController",
            template: ""
        })
}]);

app.service('TokenService', [function (){
    var userToken = "token";
    this.setToken = function(token){
        localStorage[userToken] = token;
    };
    this.getToken = function (){
        return localStorage[userToken];
    };
    this.removeToken = function (){
        localStorage.removeItem(userToken);
    }
}]);

app.service("UserService", ["$http", "$location", "TokenService", function ($http,$location, TokenService){
    this.signup = function (user) {
        return $http.post('/auth/signup', user);
    };

    var self = this;

    this.login = function (user) {
        return $http.post('/auth/login', user).then(function(response){
            self.currentUser = response.data;
            TokenService.setToken(response.data.token);
            return response;
        })
    };

    this.get = function(){
        return $http.get('/').then(function(response){
            self.currentUser = response.data;
            return response;
        })
    };
    // this.edit = function (user){
    //     return $http.put('/myportal', user).then(function(response){
    //  slice out property from the user object
    //     })
    // }
    this.put = function (item) {
        return $http.put('/edit/', userService.currentUser.user).then(function (response) {
            return response.data;
        })
    }

    this.logout = function (){
        TokenService.removeToken();
        $location.path('/');
    };
    this.isAuthenticated = function (){
        return !!TokenService.getToken();
    };

}]);

//http receptors to send our token along with our request
app.service("AuthInterceptor", ['$q', "$location", "TokenService", function($q, $location, TokenService){
    this.request = function(config){
        var token = TokenService.getToken();
        if(token){
            config.headers = config.headers || {};
            config.headers.Authorization = "Bearer " + token;
        }
        return config;
    }
    this.responseError = function(response){
        if (response.status === 401){
            TokenService.removeToken();
            $location.path('/login');
        }
        return $q.reject(response);
    }
}]);

app.config(['$httpProvider', function($httpProvider){
    $httpProvider.interceptors.push("AuthInterceptor");
}])




