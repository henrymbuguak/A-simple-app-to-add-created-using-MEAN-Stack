var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost/mytasklist', ['tasks']);

//Logic to return all tasks in the databases
router.get('/tasks', function (req, res, next) {
  db.tasks.find(function(err, tasks){
    if (err) {
      res.send(err);
    }
    res.json(tasks);
  });
});

//Logic to return a single task
router.get('/task/:id', function (req, res, next) {
  db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)},function(err, task){
    if (err) {
      res.send(err);
    }
    res.json(task);
  });
});

//Logic to save tasks to our database
router.post('/task/add', function (req, res, next) {
  var task = req.body;
  if (!task.title || !(task.isDone + '')) {
    res.status(400);
    res.json({
      "error": "An error occurred, please try again."
    });
  } else {
    db.tasks.save(task, function (err, task) {
      if (err) {
        res.send(err);
      }
      res.json(task);
    });
  }
});

//Logic to delete task from database
router.delete('/task/:id', function (req, res, next) {
  db.tasks.remove({_id: mongojs.ObjectId(req.params.id)},function(err, task){
    if (err) {
      res.send(err);
    }
    res.json(task);
  });
});

//Logic to update a task in our database
router.put('/task/:id', function (req, res, next) {
  var task = req.body;
  var updateTask = {};

  if (task.title) {
    updateTask.title = task.title;
  }

  if (task.isDone) {
    updateTask.isDone = task.isDone;
  }

  if (!updateTask) {
    res.status(400);
    res.json({
      "error" : "An error occurred, please try again."
    });
  } else {
    db.tasks.update({_id: mongojs.ObjectId(req.params.id)},updateTask, {},function(err, task){
      if (err) {
        res.send(err);
      }
      res.json(task);
    });
  }
});


module.exports = router;
