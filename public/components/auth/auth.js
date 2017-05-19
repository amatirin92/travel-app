//this will handle the JWT we get from the server, saving, getting and remove them to/from localStorage

var app = angular.module("TravelApp.Auth", []);

app.config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when('/signup', {
            templateUrl: "components/auth/signup/signup.html",
            controller: "SignupController"
        })
        .when('/login', {
            templateUrl: "components/auth/login/login.html",
            controller: "LoginController",
            css: "loginpage.css"
        })
        .when('/myportal', {
            templateUrl: "components/portal/portal.html",
            controller: "PortalController",
            css: "portal.css"
        })
        .when('/edit', {
            templateUrl: "components/edit/edit.html",
            controller: "PortalController",
            css: "edit.css"
        })
        .when('/friendrequests', {
            templateUrl: "components/friendrequests/friendrequests.html",
            controller: "FriendRequestsController"
        })
        .when('/search', {
            templateUrl: "components/search/search.html",
            controller: "PortalController",
            css: "search.css"
        })
        .when('/logout', {
            controller: "LogoutController",
            template: ""
        })
}]);

app.service('TokenService', [function () {
    var userToken = "token";
    this.setToken = function (token) {
        localStorage[userToken] = token;
    };
    this.getToken = function () {
        return localStorage[userToken];
    };
    this.removeToken = function () {
        localStorage.removeItem(userToken);
    }
}]);

app.service("UserService", ["$http", "$location", "TokenService", function ($http, $location, TokenService) {
    this.signup = function (user) {
        return $http.post('/auth/signup', user);
    };

    var self = this;
    this.currentUser = JSON.parse(localStorage.getItem('user')) || {};

    this.login = function (user) {
        return $http.post('/auth/login', user).then(function (response) {
            self.currentUser = response.data.user;
            localStorage.setItem('user', JSON.stringify(response.data.user))
            TokenService.setToken(response.data.token);
            return response;
        })
    };

    this.get = function () {
        return $http.get('/api/travel').then(function (response) {
            return response;
        })
    };
    this.getAll = function (key, value) {
        var query = '';
        if (key && value) query = "?" + key + '=' + value;
        return $http.get('/api/travel/search' + query).then(function (response) {
            return response.data;
        })
    };

    this.put = function (user) {
        return $http.put('/api/travel', user).then(function (response) {
            return response;
        })
    };
    this.putNew = function (user) {
        return $http.post('/api/travel/search', user).then(function (response) {
            return response;
        })

    };

    //post a new friend to the friends array
    // //api/user/:id/friends


    this.logout = function () {
        TokenService.removeToken();
        localStorage.removeItem('user');
        $location.path('/');
    };
    this.isAuthenticated = function () {
        return !!TokenService.getToken();
    };

}]);

//http receptors to send our token along with our request
app.service("AuthInterceptor", ['$q', "$location", "TokenService", function ($q, $location, TokenService) {
    this.request = function (config) {
        var token = TokenService.getToken();
        if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = "Bearer " + token;
        }
        return config;
    }
    this.responseError = function (response) {
        if (response.status === 401) {
            TokenService.removeToken();
            $location.path('/login');
        }
        return $q.reject(response);
    }
}]);

app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push("AuthInterceptor");
}])




