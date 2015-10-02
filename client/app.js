/**
 * Created by Dave on 10/2/15.
 */
var app = angular.module('myApp', []);

app.controller("MainController", ['$scope', '$http', function($scope, $http){
    $scope.newTask;

    $http.get("/tech").then(function(response){
        $scope.techList = response.data;
        return response.data;
    });

    $scope.getTasks = function(e){
        console.log(e.target.id);
        $http.get("/" + e.target.id).then(function(response){
            $scope.technology = response;
        })

    };

}]);
