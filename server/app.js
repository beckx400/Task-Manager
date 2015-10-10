/**
 * Created by Dave on 10/2/15.
 */
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var toDoRouter = require('./routes/toDoRouter');
var mongoose = require('mongoose');

//Initialize MongoDB
var mongoURI = "mongodb://localhost:27017/toDoList";
var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on("error", function(err){
    console.log("MongoDB connection error:", err);
});

MongoDB.once('open', function(){
    console.log("MongoDB is open!!")
});

var app = express();

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use("/todo", toDoRouter);

//Create server here
var server = app.listen(process.env.PORT || 3000, function(){
    var port = server.address().port;
    console.log("Listening on port: " + port);
})

//get index.html served
app.get("/", function(req, res){
    res.sendFile(__dirname + "/public/views/index.html");
});

module.exports = app;