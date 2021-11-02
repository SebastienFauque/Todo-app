const mongoose = require('mongoose');

const { Schema } = mongoose;

const NoteSchema = new Schema({
  date: { type: Date, default: Date.now },
  todo: { type: String, required: true },
  completed: { type: Boolean, required: true },
  password: { type: String, required: true },
});

const note = mongoose.model('note', NoteSchema);

module.exports = note;
