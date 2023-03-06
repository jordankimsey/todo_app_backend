const express = require('express');
const {
  getAllTodos,
  getActiveTodos,
  getCompletedTodos,
  getActiveCount,
  addTodo,
  deleteTodoById,
  updateTodo,
  deleteAllCompleted,
} = require('../controllers/todosController');
const router = express.Router();

// ! Get Routes
router.get('/', getAllTodos);

router.get('/active-todos', getActiveTodos);

router.get('/completed-todos', getCompletedTodos);

router.get('/active-count', getActiveCount);

// ! Post Routes
router.post('/add-todo', addTodo);

router.post('/delete-todo', deleteTodoById);

router.post('/update', updateTodo);

router.post('/clear-completed', deleteAllCompleted);

module.exports = router;
