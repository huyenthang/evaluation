const express = require('express');
const Intern = require('../models/Intern');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { batch, department, major } = req.query;
    const filter = {};
    if (batch) filter.batch = batch;
    if (department) filter.department = department;
    if (major) filter.major = major;
    const interns = await Intern.find(filter).sort({ createdAt: -1 });
    res.json(interns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const intern = await Intern.findById(req.params.id);
    if (!intern) return res.status(404).json({ message: 'Intern not found' });
    res.json(intern);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const intern = new Intern(req.body);
    await intern.save();
    res.status(201).json(intern);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/bulk', async (req, res) => {
  try {
    const interns = await Intern.insertMany(req.body);
    res.status(201).json(interns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const intern = await Intern.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!intern) return res.status(404).json({ message: 'Intern not found' });
    res.json(intern);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const intern = await Intern.findByIdAndDelete(req.params.id);
    if (!intern) return res.status(404).json({ message: 'Intern not found' });
    res.json({ message: 'Intern deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;