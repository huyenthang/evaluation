const express = require('express');
const Intern = require('../models/Intern');
const Evaluation = require('../models/Evaluation');
const router = express.Router();

router.get('/stats', async (req, res) => {
  try {
    const { department, batch } = req.query;
    const internFilter = {};
    if (department) internFilter.department = department;
    if (batch) internFilter.batch = batch;

    const totalInterns = await Intern.countDocuments(internFilter);

    const completedEvals = await Evaluation.find({ status: 'completed' })
      .populate('intern', 'department batch');
    
    const filteredEvals = completedEvals.filter(e => {
      if (department && e.intern?.department !== department) return false;
      if (batch && e.intern?.batch !== batch) return true;
      return true;
    });

    const lowScores = filteredEvals.filter(e => parseFloat(e.averageScore) < 3.0).length;
    const highScores = filteredEvals.filter(e => parseFloat(e.averageScore) > 4.5).length;
    
    const avgScore = filteredEvals.length > 0 
      ? (filteredEvals.reduce((sum, e) => sum + parseFloat(e.averageScore), 0) / filteredEvals.length).toFixed(2)
      : 0;

    res.json({
      totalInterns,
      completedEvaluations: filteredEvals.length,
      lowScores,
      highScores,
      averageScore: avgScore
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/progress', async (req, res) => {
  try {
    const { batch } = req.query;
    const periods = ['Đợt 1', 'Đợt 2', 'Đợt 3'];
    const progressData = [];

    for (const period of periods) {
      const evals = await Evaluation.find({ period, status: 'completed' })
        .populate('intern', 'batch');
      
      let filteredEvals = evals;
      if (batch) {
        filteredEvals = evals.filter(e => e.intern?.batch === batch);
      }

      const count = filteredEvals.length;
      const avg = count > 0 
        ? (filteredEvals.reduce((sum, e) => sum + parseFloat(e.averageScore), 0) / count).toFixed(2)
        : 0;
      
      progressData.push({ period, count, average: parseFloat(avg) });
    }

    res.json(progressData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/interns/progress/:internId', async (req, res) => {
  try {
    const evaluations = await Evaluation.find({ 
      intern: req.params.internId, 
      status: 'completed' 
    }).sort({ createdAt: 1 });
    
    const progressData = evaluations.map((e, index) => ({
      evaluation: `Đợt ${index + 1}`,
      score: parseFloat(e.averageScore),
      period: e.period,
      date: e.createdAt
    }));
    
    res.json(progressData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/by-department', async (req, res) => {
  try {
    const stats = await Evaluation.aggregate([
      { $match: { status: 'completed' } },
      {
        $lookup: {
          from: 'interns',
          localField: 'intern',
          foreignField: '_id',
          as: 'internInfo'
        }
      },
      { $unwind: '$internInfo' },
      {
        $group: {
          _id: '$internInfo.department',
          avgScore: { $avg: { $toDouble: '$averageScore' } },
          count: { $sum: 1 }
        }
      }
    ]);

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;