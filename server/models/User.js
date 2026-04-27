const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'manager'], required: true },
  name: { type: String, required: true },
  department: { type: String, enum: ['FOH', 'BOH', 'ALL'], default: 'ALL' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);