const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  author: String,
  title: String,
  message: String,
});

module.exports = mongoose.model('Message', messageSchema);
