/**
 * Created by Dave on 10/2/15.
 */
var app = angular.module('myApp', []);

app.controller("MainController", ['$scope', '$http', function($scope, $http){
    $scope.newTask;
    $scope.miniShow = true;
    $scope.expandShow = false;
    $scope.toDoList = [];
    $scope.techList = [];

//Get header links JSON
    function getTechnologies() {
        $scope.techList = [];
        $http.get("/todo/tech/").then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                $scope.techList.push(response.data[i].techName);
            }
        });
    }

//Get JSON data for stored to-do's
    $scope.getTasks = function(event){
        $(".mainMenu").children('ul').slideUp('200');
        $http.get("/todo/tech/" + event.target.id).then(function(response){
            $scope.technology = response.data.techName;
            addJsonData(response.data);
        })
    };
//Updates toDos depending on selected tech

//Add JSON data to $scope.toDoList
    function addJsonData(data){
        $scope.toDoList = data.toDo;
    }

//Post new tech to server
    $scope.add = function() {
        var newTech = {techName: $scope.newTech};

        $http({
            method: "POST",
            url: 'todo/addTech',
            data: newTech
        }).then(function () {
            $scope.newTech = null;
            getTechnologies();
        });
    }

//jQuery section adding min/expand button functionality and slide animations
    $(document).ready(function(){
        $('.mainMenu').children('h3').on('click', function() {
            $(".mainMenu").children('.subMenu').slideToggle('slow');
            $("h1").slideUp('slow');
            getTechnologies();
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

