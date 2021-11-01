const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, './../index.html')));

app.get('/todos', (req, res) => {
  res.send('Hello, World!');
});

app.post('/todos', (req, res) => {
  res.setHeader('Content-Type', 'application/json').send('Todo successfully stored in database');
});

app.delete('/todos', (req, res) => {
  res.setHeader('Content-Type', 'application/json').send('Todo successfully deleted.');
});

app.listen(port, () => {
  console.log(`Express server is listening at http://localhost:${port}`);
});
