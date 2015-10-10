/**
 * Created by Dave on 10/2/15.
 */
var express = require('express');
var router = express.Router();
var ToDo = require("../../models/toDoModel.js");

//Get all tasks from Database with ability to grab a single task based on taskName
router.get("/tech/:techName?", function(req, res){
    var techName = req.params.techName;

    if(techName){
        ToDo.findOne({techName: techName}, function(err, ToDo){
            res.json(ToDo);
        })
    } else {
        ToDo.find({}, function(err, ToDo){
            if(err){
                console.log("get request", err);
            }
            res.json(ToDo);
        })
    }
}).put(function(req, res){
    var techName = req.params.techName;

    ToDo.findOne({techName: techName}, function(err, task){
        if(err) throw err;

        task.toDoItem = req.body.toDoItem;

        task.save(function(err){
            if(err)
                res.send(err);

            console.log("ToDo Saved");
        });
    });
});

//ADD IN A POST AND CONSOLE LOG WHATEVER COMES OUT
router.post("/addTech", function(req, res){
    var toDo = new ToDo();
    toDo.techName = req.body.techName;
    toDo.save(function(err){
        if(err){
            console.log("Post", err);
            res.send("Cannont post data");
        }
        console.log("SAVED", toDo);
        res.send(200);
    })
});

//router.put("/add/:techName")
router.put("/update/:techName", function(req,res){
    db.collection.update
});
module.exports = router;