const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const { MONGODB_URI } = require('../secret.json');
const noteController = require('./controller/controller');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect(MONGODB_URI);
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB at port 3000');
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, '../index.html')));

app.get('/todos', (req, res) => {
  res.status(200).send('Hello, World!');
});

app.post('/todos', noteController.postTodo, (req, res) => {
  console.log(res.locals.newTodo);
  res.status(200).setHeader('Content-Type', 'application/json').send('Todo successfully stored in database');
});

app.delete('/todos', (req, res) => {
  res.setHeader('Content-Type', 'application/json').send('Todo successfully deleted.');
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: `Express eeror handler caught unknown middleware error ${err}`,
    status: 500,
    message: { err: 'An error occurred' },
  };

  const errorObj = Object.assign({}, ...defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(port, () => {
  console.log(`Express server is listening at http://localhost:${port}`);
});
