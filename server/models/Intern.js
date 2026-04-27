const mongoose = require('mongoose');

const internSchema = new mongoose.Schema({
  name: { type: String, required: true },
  major: { type: String, enum: ['Bếp', 'F&B'], required: true },
  gender: { type: String, enum: ['Nam', 'Nữ'], required: true },
  batch: { type: String, default: 'K46' },
  department: { type: String, enum: ['FOH', 'BOH'], required: true },
  status: { type: String, enum: ['active', 'completed', 'dropped'], default: 'active' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Intern', internSchema);