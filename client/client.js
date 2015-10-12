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

//Get header links from Database and load on page load
    function getTechnologies() {
        $scope.techList = [];
        $http.get("/todo/tech/").then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                $scope.techList.push(response.data[i].techName);
            }
            $scope.techList.sort();
        });
    }
    getTechnologies();

//Add a new technology to the Database
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
    };

//Get specific database object based on techName
    $scope.getTasks = function(event){
        $http.get("/todo/tech/" + event.target.id).then(function(response){
            $scope.technology = response.data.techName;
            $scope.toDoList = response.data.toDoItem;
        });
        $(".taskContainer").slideDown("slow");
        $(".mainMenu").children('ul').slideUp('200');
        $scope.technology = "";
    };

//Add or delete a task on Database
    function updateToDoList(){
        var toDoItem = {toDoItem: $scope.toDoList};

        $http({
            method: "PUT",
            url: "/todo/tech/" + $scope.technology,
            data: toDoItem
        })
    }

//Push a new task to toDoList and update database
    $scope.addTaskToList = function(){
        $scope.toDoList.push($scope.newTask);
        $scope.newTask = null;
        updateToDoList();
    };

//Delete item from toDoList and update database
    $scope.deleteTask = function(index){
        $scope.toDoList.splice(index, 1);
        updateToDoList();
    };

    //TODO Progress and Complete status checks
    //Would need to rework database schema into each array item is an object
//Check status of inProgress Check
    $scope.progressCheck = function(index){

    };
//Check status of Complete Check
    $scope.completeCheck = function(index){

    };
//jQuery section adding min/expand button functionality and slide animations
    $(document).ready(function(){
        $('.mainMenu').children('h3').on('click', function() {
            $(".mainMenu").children('.subMenu').slideToggle('slow');
            $(".taskContainer").slideUp("slow")
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

