var Todo = require('./todo');
var express = require('express');
var router = express.Router();

router.get('/', async function (req, res) {
    try {
        await Todo.find({}, function (err, todos) {
            var todoMap = [];

            todos.forEach(function (todo) {
                todoMap.push(todo);
            });

            res.json(todoMap);
        });
    } catch (error) {
        throw Error("Error while Getting Todos");
    }

});


router.post('/', async function (req, res, next) {
    try {
        var newTodo = new Todo({
            title: req.body.title,
            subTasks: req.body.subTasks,
            priority: req.body.priority,
            taskId: req.body.taskId
        });
        console.log(newTodo);
        var createdTodo = await newTodo.save(function (err) {
            if (err) return handleError(err);
            console.log("Your todo has been saved!");
        });
        return res.json(newTodo);
    } catch (e) {
        throw Error("Error while Creating Todo");
    }


});

router.put('/', async function (req, res, next) {
    try {
        await Todo.update({ "title": req.body.title },{$set:{"subTasks":req.body.subTasks}} , function (err) {
            if (err) return handleError(err);
            console.log("Your todo has been updated");
        });
        var upTodo = Todo.findOne({ "title": req.body.title }, function (err) {
            if (err) return handleError(err);
        });
        return res.json(upTodo);
    } catch (e) {
        throw Error("Error while Updating Todo");
    }

});

router.delete('/:taskId', async function (req, res, next) {
    try {
        await Todo.deleteOne({ "taskId": req.params.taskId }, function (err) {
            if (err) return handleError(err);
            console.log(req.params.taskId);
            console.log("Your todo has been deteleted!");
        });
        return res.json("Deleted task: " + req.body.taskId);
    } catch (e) {
        throw Error("Error while Deleting Todo");
    }

});

router.delete('/subtask/:subTask/:taskId', async function (req, res, next) {
    try {
        console.log(req.params);
        let result = await Todo.update({"taskId":req.params.taskId}, {"$unset":{['subTasks.'+req.params.subTask]:""}}, function (err) {
            if (err) return handleError(err);
            console.log("Your todo has been deteleted!");
        });
        Todo.update({"taskId":req.params.taskId}, {"$pull": {"subTasks" : null}}, function (err) {
            if (err) return handleError(err);
            console.log("Null is removed");
        });
        console.log(result);
        return res.json("Deleted task: " + req.body.taskId);
    } catch (e) {
        throw Error("Error while Deleting Todo");
    }

});

module.exports = router;                      