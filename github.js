// Simple github service
"use strict";
(function(){

    var github = function($http){

        var getUser = function(username){
            return $http.get("https://api.github.com/users/" + username)
                .then(function(response){
                    return response.data;
                })
        };

        var getRepos = function(user){
            return $http.get(user.repos_url)
                .then(function(response){
                    return response.data;
                })
        };

        var getRepoDetails = function(username, reponame){
            var repo;
            var repoUrl = "https://api.github.com/repos/" + username + "/" + reponame;

            return $http.get(repoUrl)
                .then(function(reponse){
                    repo = reponse.data;
                    return $http.get(repoUrl + "/contributors");
                })
                .then(function(response){
                    repo.contributors = response.data;
                    return repo;
                })
        };

        return {
            getUser : getUser,
            getRepos : getRepos,
            getRepoDetails : getRepoDetails
        };
    };


    var app = angular.module("gitHubViewer");
    app.factory("github", github);

})();
