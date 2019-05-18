var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/TodoDB", { useNewUrlParser: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function (callback) {
    console.log("Connection succeeded.");
});
var ToDoSchema = new mongoose.Schema({
    title: String,
    subTasks:[],
    priority: String,
    taskId: Number
});

var Todo = mongoose.model('Todo', ToDoSchema);

module.exports = Todo;