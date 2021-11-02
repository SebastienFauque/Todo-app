// Import the DB
const Todo = require('../model/model');

const noteController = {};

noteController.getTodos = function () {
  // Get all messages from database
};

noteController.postTodo = async function (req, res, next) {
  console.log('res.body', req.body);
  const newTodo = new Todo ({
    todo: req.body.todo,
    password: req.body.password,
    completed: req.body.completed,
  });

  await newTodo.save();

  if (!Todo.find({ todo: req.body.todo })) {
    return next({
      log: 'DB Error handler caught noteController.postNote error 400',
      status: 400,
      message: { err: 'a client error occured' },
    });
  }

  // Return the newNote data
  res.locals.newTodo = newTodo;
  return next();
};

noteController.deleteTodo = async function(req, res, next) {
  if (res.locals._id && res.locals.password) {
    await Todo.findOneAndDelete({
      password: res.locals.password,
      _id: res.locals._id,
    });
  }
};

module.exports = noteController;
