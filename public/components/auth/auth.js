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
        .when('/search', {
            templateUrl: "components/search/search.html",
            controller: "SearchController"
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

    this.login = function (user) {
        return $http.post('/auth/login', user).then(function (response) {
            self.currentUser = response.data['user'];
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
    }

    this.put = function (user) {
        return $http.put('/api/travel', user).then(function (response) {
            return response.data;
        })
    };
    this.putNew = function (userToAdd, $index) {
        return $http.put('/api/travel/', userToAdd).then(function (response) {
            return response.data;
        })
    }

    this.logout = function () {
        TokenService.removeToken();
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




