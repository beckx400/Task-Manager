/**
 * Created by Dave on 10/2/15.
 */
var app = angular.module('myApp', []);

app.controller("MainController", ['$scope', '$http', function($scope, $http){
    $scope.newTask;
    $scope.miniShow = true;
    $scope.expandShow = false;

//Get header links JSON
    $http.get("/tech").then(function(response){
        $scope.techList = response.data;
        return response.data;
    });

//Get JSON data for stored to-do's
    $scope.getTasks = function(event){

        $(".mainMenu").children('ul').slideUp('200');
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

    $(document).ready(function(){
        $('.mainMenu').children('h3').on('click', function() {
            $(".mainMenu").children('ul').slideToggle('slow');
            $("h1").slideUp('slow');
        });

        $scope.minimizeTasks = function(){
            console.log("clicked");
            $('.toDoItems').addClass('minimize');
            $scope.miniShow = false;
            $scope.expandShow = true;
            console.log($scope.visible);
        }

        $scope.expandTasks = function (){
            console.log('clicked expand');
            $('.toDoItems').removeClass('minimize');
            $scope.miniShow = true;
            $scope.expandShow = false;
        }
    });
}]);

