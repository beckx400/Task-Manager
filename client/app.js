/**
 * Created by Dave on 10/2/15.
 */
var app = angular.module('myApp', []);

app.controller("MainController", ['$scope', '$http', function($scope, $http){
    $scope.newTask;
    $scope.miniShow = true;
    $scope.expandShow = false;
    $scope.toDoList = [];

console.log($scope.toDoList);
    var newTaskList = [];
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
            addJsonData(response.data.value);
            return response.data.value;

        })
    };

//Add JSON data to $scope.toDoList
    function addJsonData(data){
        $scope.toDoList = data.toDo;
    }
//Post new task to server and add newTask to $scope.toDoList
    $scope.add = function(newTask){
        $scope.toDoList.push(newTask);
        console.log($scope.toDoList);
        var sendData = {toDo: newTask};
        $http.post('/add', sendData);

        $scope.newTask = null;
    }

//jQuery section adding min/expand button functionality and slide animations
    $(document).ready(function(){
        $('.mainMenu').children('h3').on('click', function() {
            $(".mainMenu").children('ul').slideToggle('slow');
            $("h1").slideUp('slow');
        });

        $scope.minimizeTasks = function(){
            $('.toDoItems, label').addClass('minimize');
            $scope.miniShow = false;
            $scope.expandShow = true;
            console.log($scope.visible);
        }

        $scope.expandTasks = function (){
            $('.toDoItems, label').removeClass('minimize');
            $scope.miniShow = true;
            $scope.expandShow = false;
        }
    });
}]);

