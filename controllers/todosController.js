const Todo = require('../models/todoModel');

exports.getAllTodos = (req, res, next) => {
  Todo.find()
    .then((allTodos) => {
      res.status(200).json(allTodos);
    })
    .catch((err) => {
      res.status(400).json({ message: 'Something went wrong!', err });
    });
};

exports.getActiveTodos = (req, res, next) => {
  Todo.find({ isComplete: false })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json({ message: 'Something went wrong!', err });
    });
};

exports.addTodo = (req, res, next) => {
  const { title, isComplete } = req.body;
  const newTodo = new Todo({
    title: title,
    isComplete: isComplete,
  });
  newTodo
    .save()
    .then((result) => {
      return Todo.find();
    })
    .then((todos) => {
      res.status(201).json({ message: 'New todo successfully saved!', todos });
    })
    .catch((err) => {
      res.status(400).json({ message: 'Something went wrong!', err });
    });
};

exports.getCompletedTodos = (req, res, next) => {
  Todo.find({ isComplete: true })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json({ message: 'Something went wrong!', err });
    });
};

exports.getActiveCount = (req, res, next) => {
  Todo.find({ isComplete: false })
    .then((result) => {
      res.status(200).json({ activeCount: result.length });
    })
    .catch((err) => {
      res.status(400).json({ message: 'Something went wrong!', err });
    });
};

exports.deleteTodoById = (req, res, next) => {
  const prodId = req.body.productId;
  console.log(prodId);
  Todo.deleteOne({ _id: prodId })
    .then((result) => {
      res.status(201).json({ message: 'Deleted todo', todo: result });
    })
    .catch((err) => {
      res.status(400).json({ message: 'Something went wrong!', err });
    });
};

exports.deleteAllCompleted = (req, res, next) => {
  Todo.deleteMany({ isComplete: true })
    .then((result) => {
      console.log('deleted all completed', result);
      res
        .status(201)
        .json({ message: 'Successfully deleted all completed todos' });
    })
    .catch((err) => {
      res.status(400).json({ message: 'Something went wrong!', err });
    });
};

exports.updateTodo = (req, res, next) => {
  const prodId = req.body.productId;
  const { title, isComplete } = req.body;
  Todo.findById(prodId)
    .then((todo) => {
      todo.title = title;
      todo.isComplete = isComplete;
      return todo.save();
    })
    .then((result) => {
      return Todo.find();
    })
    .then((result) => {
      res
        .status(201)
        .json({ message: 'Successfully updated todo', todos: result });
    })
    .catch((err) => {
      res.status(400).json({ message: 'Something went wrong!', err });
    });
};
