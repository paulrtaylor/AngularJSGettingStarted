"use strict";
(function () {

    var app = angular.module("gitHubViewer");

    var userController = function ($scope, github, $routeParams) {

        var onUserComplete = function(data) {
            $scope.user = data;
            github.getRepos($scope.user)
                .then(onRepos, onError);
        };

        var onRepos = function(data) {
            $scope.repos = data;
        };

        var onError = function(reason) {
            $scope.error = "Unable to retrieve the data: " + reason.data.message;
        };

        $scope.username = $routeParams.username;
        $scope.repoSortOrder = "-stargazers_count";

        github.getUser($scope.username)
             .then(onUserComplete, onError)
    };

    app.controller("UserController", ["$scope", "github", "$routeParams", userController]);

}());
