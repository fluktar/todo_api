const Todo = require("../models/todo.model");

async function getAllTodos(req, res, next) {
  let todos;
  try {
    todos = await Todo.getTodos();
  } catch (error) {
    return next(error);
  }
  res.json({ todos: todos });
}

async function addTodo(req, res, next) {
  const todoText = req.body.text;
  const todo = new Todo(todoText);
  let insertedId;
  try {
    const result = await todo.save();
    insertedId = result.insertedId;
  } catch (error) {
    return next(error);
  }
  todo.id = insertedId.toString();
  res.json({ message: "Todo added successfully!", createTodo: todo });
}

function deleteTodo(req, res, next) {
  const todoId = req.params.id;
  const todo = new Todo();
  try {
    todo.delete();
  } catch (error) {
    return next(error);
  }
}
function updateTodo(req, res, next) {
  const todoId = req.params.id;
  const todoText = req.body.text;
  const todo = new Todo(todoText, todoId);
  try {
    todo.save();
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getAllTodos: getAllTodos,
  addTodo: addTodo,
  deleteTodo: deleteTodo,
  UpdateTodo: updateTodo,
};
