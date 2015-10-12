/**
 * Created by Dave on 10/10/15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var toDoSchema = new Schema({
    techName: String,
    toDoItem: [
        {
            task: String,
            inProgress: Boolean,
            taskComplete: Boolean
        }
    ]
});

var ToDo = mongoose.model('ToDo', toDoSchema);

module.exports = ToDo;