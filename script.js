"use strict";
(function () {

    var app = angular.module("gitHubViewer", []);

    var mainController = function ($scope, $http) {

        // Options to search for: paulrtaylor, odetocode, angular
        var onRepos = function(response) {
            $scope.repos = response.data;
        };

        var onError = function(reason) {
            $scope.error = "Unable to retrieve the data: " + reason.data.message;
        };

        var onUserComplete = function(response) {
            $scope.user = response.data;
            $http.get($scope.user.repos_url)
                .then(onRepos, onError);
        };

        $scope.search = function(username) {

            $http.get("https://api.github.com/users/" + username)
                .then(onUserComplete, onError);
        };

        $scope.username = "angular";
        $scope.message = "Github Viewer";
        $scope.repoSortOrder = "-stargazers_count";

    };

    app.controller("MainController", ["$scope", "$http", mainController]);

}());
