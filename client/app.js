/**
 * Created by Dave on 10/2/15.
 */
var app = angular.module('myApp', []);

app.controller("MainController", ['$scope', '$http', function($scope, $http){
    $scope.newTask;
//Get header links JSON
    $http.get("/tech").then(function(response){
        $scope.techList = response.data;
        return response.data;
    });

//Get JSON data for stored to-do's
    $scope.getTasks = function(event){
        console.log(event.target.id);
        $http.get("/" + event.target.id).then(function(response){
            $scope.technology = response.data.value;
            return response.data.value;
        })
    };

//Post new task to server
    $scope.add = function(newTask){
        $http.post('/add', newTask);

        $scope.newTask = null;
    }

//Remove a task function
    $scope.taskRemove = function(event){
        event.target.parentElement.parentElement.remove();
    };
}]);
