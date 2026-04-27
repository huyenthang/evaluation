const express = require('express');
const Evaluation = require('../models/Evaluation');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { internId, status, period, type } = req.query;
    const filter = {};
    if (internId) filter.intern = internId;
    if (status) filter.status = status;
    if (period) filter.period = period;
    if (type) filter.evaluationType = type;
    
    const evaluations = await Evaluation.find(filter)
      .populate('intern', 'name major department')
      .sort({ createdAt: -1 });
    res.json(evaluations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const evaluation = await Evaluation.findById(req.params.id)
      .populate('intern')
      .populate('evaluator', 'name');
    if (!evaluation) return res.status(404).json({ message: 'Evaluation not found' });
    res.json(evaluation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const evaluation = new Evaluation(req.body);
    await evaluation.save();
    res.status(201).json(evaluation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const evaluation = await Evaluation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!evaluation) return res.status(404).json({ message: 'Evaluation not found' });
    res.json(evaluation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const evaluation = await Evaluation.findByIdAndDelete(req.params.id);
    if (!evaluation) return res.status(404).json({ message: 'Evaluation not found' });
    res.json({ message: 'Evaluation deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/intern/:internId/history', async (req, res) => {
  try {
    const evaluations = await Evaluation.find({ intern: req.params.internId })
      .sort({ createdAt: 1 });
    res.json(evaluations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;