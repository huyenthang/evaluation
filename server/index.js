const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const db = {
  interns: (() => { try { return JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'interns.json'), 'utf-8')); } catch { return []; } })(),
  evaluations: (() => { try { return JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'evaluations.json'), 'utf-8')); } catch { return []; } })()
};

function saveInterns() { fs.writeFileSync(path.join(DATA_DIR, 'interns.json'), JSON.stringify(db.interns, null, 2)); }
function saveEvaluations() { fs.writeFileSync(path.join(DATA_DIR, 'evaluations.json'), JSON.stringify(db.evaluations, null, 2)); }

const internsData = [
  { name: 'Đào Thị Thủy Trúc', major: 'Bếp', gender: 'Nữ', department: 'BOH', batch: 'K46' },
  { name: 'Hờ A Tỳ', major: 'F&B', gender: 'Nam', department: 'FOH', batch: 'K46' },
  { name: 'Khang Thị Già', major: 'F&B', gender: 'Nữ', department: 'FOH', batch: 'K46' },
  { name: 'Lê Bích Ngọc', major: 'F&B', gender: 'Nữ', department: 'FOH', batch: 'K46' },
  { name: 'Liêng Jrang Ha Khải', major: 'F&B', gender: 'Nam', department: 'FOH', batch: 'K46' },
  { name: 'Lồ A Thắng', major: 'F&B', gender: 'Nam', department: 'FOH', batch: 'K46' },
  { name: 'Lý Thị Si', major: 'Bếp', gender: 'Nữ', department: 'BOH', batch: 'K46' },
  { name: 'Mai Văn Minh', major: 'Bếp', gender: 'Nam', department: 'BOH', batch: 'K46' },
  { name: 'Nguyễn Thị Thanh Nga', major: 'Bếp', gender: 'Nữ', department: 'BOH', batch: 'K46' },
  { name: 'Nguyễn Thị Thuỳ Linh', major: 'Bếp', gender: 'Nữ', department: 'BOH', batch: 'K46' },
  { name: 'Sùng A Sấu', major: 'Bếp', gender: 'Nam', department: 'BOH', batch: 'K46' },
  { name: 'Sùng Văn Dầu', major: 'F&B', gender: 'Nam', department: 'FOH', batch: 'K46' },
  { name: 'Trần Văn Khánh', major: 'Bếp', gender: 'Nam', department: 'BOH', batch: 'K46' },
  { name: 'Vàng A Thán', major: 'Bếp', gender: 'Nam', department: 'BOH', batch: 'K46' },
  { name: 'Vũ Ngọc Nam', major: 'F&B', gender: 'Nam', department: 'FOH', batch: 'K46' },
  { name: 'Lò Thị Hoài', major: 'Bếp', gender: 'Nữ', department: 'BOH', batch: 'K46' },
  { name: 'Nguyễn Võ Minh Hoàng', major: 'F&B', gender: 'Nam', department: 'FOH', batch: 'K46' },
  { name: 'Giàng A Dũng', major: 'Bếp', gender: 'Nam', department: 'BOH', batch: 'K46' },
  { name: 'Giàng Thị Dủa', major: 'F&B', gender: 'Nữ', department: 'FOH', batch: 'K46' },
  { name: 'Lồ Thị Dâu', major: 'F&B', gender: 'Nữ', department: 'FOH', batch: 'K46' },
  { name: 'Lý A Vềnh', major: 'F&B', gender: 'Nam', department: 'FOH', batch: 'K46' },
  { name: 'Ly Suy Sú', major: 'F&B', gender: 'Nữ', department: 'FOH', batch: 'K46' },
  { name: 'Nguyễn Thị Thanh Huyền', major: 'Bếp', gender: 'Nữ', department: 'BOH', batch: 'K46' },
  { name: 'Sùng A Vả', major: 'Bếp', gender: 'Nam', department: 'BOH', batch: 'K46' },
  { name: 'Sùng Thị Xi', major: 'Bếp', gender: 'Nữ', department: 'BOH', batch: 'K46' },
  { name: 'Sùng Tiến Trung', major: 'F&B', gender: 'Nam', department: 'FOH', batch: 'K46' },
  { name: 'Tạ Hoàng Thanh Thủy', major: 'Bếp', gender: 'Nữ', department: 'BOH', batch: 'K46' },
  { name: 'Thào Mý Chờ', major: 'F&B', gender: 'Nam', department: 'FOH', batch: 'K46' },
  { name: 'Trần Thị Kim Dung', major: 'F&B', gender: 'Nữ', department: 'FOH', batch: 'K46' },
  { name: 'Trang A Sính', major: 'Bếp', gender: 'Nam', department: 'BOH', batch: 'K46' },
  { name: 'Vũ Tiến Duy', major: 'Bếp', gender: 'Nam', department: 'BOH', batch: 'K46' },
  { name: 'Y Huyên', major: 'F&B', gender: 'Nữ', department: 'FOH', batch: 'K46' },
  { name: 'Lảo Thị Già', major: 'Bếp', gender: 'Nữ', department: 'BOH', batch: 'K46' },
  { name: 'Vàng A Mùa', major: 'F&B', gender: 'Nam', department: 'FOH', batch: 'K46' },
  { name: 'Giàng A Phong', major: 'Bếp', gender: 'Nam', department: 'BOH', batch: 'K46' },
  { name: 'Chu Thị De', major: 'F&B', gender: 'Nữ', department: 'FOH', batch: 'K46' },
  { name: 'Phu Mè Gơ', major: 'F&B', gender: 'Nữ', department: 'FOH', batch: 'K46' },
  { name: 'Thào A Canh', major: 'F&B', gender: 'Nam', department: 'FOH', batch: 'K46' }
];

if (db.interns.length === 0) {
  db.interns = internsData.map((d, i) => ({ _id: (i + 1).toString(), ...d }));
  saveInterns();
}

const ALL_CRITERIA = {
  professional: [
    { key: 'followInstruction', label: 'Follow instruction', en: 'Follow instruction' },
    { key: 'completesWork', label: 'Completes work assignments', en: 'Completes work assignments' },
    { key: 'solvesProblems', label: 'Solves problems', en: 'Solves problems' },
    { key: 'communicatesOrally', label: 'Communicates orally', en: 'Communicates orally' }
  ],
  knowledge: [
    { key: 'hotelServicesKnowledge', label: "Hotel's services knowledge", en: "Hotel's services knowledge" },
    { key: 'growthInKnowledge', label: 'Growth in knowledge', en: 'Growth in knowledge' },
    { key: 'practicalApplication', label: 'Practical application', en: 'Practical application' },
    { key: 'independentThinking', label: 'Independent thinking', en: 'Independent thinking' }
  ],
  behavior: [
    { key: 'courtesy', label: 'Courtesy', en: 'Courtesy' },
    { key: 'appearance', label: 'Appearance', en: 'Appearance' },
    { key: 'matureJudgements', label: 'Mature judgements', en: 'Mature judgements' },
    { key: 'attendance', label: 'Attendance', en: 'Attendance' },
    { key: 'punctuality', label: 'Punctuality', en: 'Punctuality' },
    { key: 'reliability', label: 'Reliability', en: 'Reliability' },
    { key: 'enthusiasm', label: 'Enthusiasm', en: 'Enthusiasm' },
    { key: 'adaptability', label: 'Adaptability', en: 'Adaptability' },
    { key: 'accuracy', label: 'Accuracy', en: 'Accuracy' },
    { key: 'willingnessGuidance', label: 'Willingness to use guidance', en: 'Willingness to use guidance' },
    { key: 'acceptsSuggestions', label: 'Accepts suggestions', en: 'Accepts suggestions' },
    { key: 'followsRules', label: 'Follows rules', en: 'Follows rules' }
  ]
};

function calcAvg(evalData) {
  if (!evalData || !evalData.scores) return 0;
  const scores = Object.values(evalData.scores).filter(x => x > 0);
  return scores.length ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2) : 0;
}

app.get('/api/criteria', (req, res) => {
  res.json(ALL_CRITERIA);
});

app.get('/api/interns', (req, res) => {
  let data = db.interns;
  if (req.query.batch) data = data.filter(i => i.batch === req.query.batch);
  if (req.query.department) data = data.filter(i => i.department === req.query.department);
  res.json(data.sort((a, b) => a.name.localeCompare(b.name)));
});

app.get('/api/interns/:id', (req, res) => {
  const intern = db.interns.find(i => i._id === req.params.id);
  if (!intern) return res.status(404).json({ message: 'Not found' });
  res.json(intern);
});

app.get('/api/evaluations', (req, res) => {
  let data = db.evaluations;
  if (req.query.internId) data = data.filter(e => e.intern === req.query.internId);
  if (req.query.status) data = data.filter(e => e.status === req.query.status);
  if (req.query.period) data = data.filter(e => e.period === req.query.period);
  data = data.map(e => ({ 
    ...e, 
    averageScore: calcAvg(e),
    intern: db.interns.find(i => i._id === e.intern)
  }));
  res.json(data);
});

app.get('/api/evaluations/:id', (req, res) => {
  const ev = db.evaluations.find(e => e._id === req.params.id);
  if (!ev) return res.status(404).json({ message: 'Not found' });
  res.json({ ...ev, averageScore: calcAvg(ev), intern: db.interns.find(i => i._id === ev.intern) });
});

app.post('/api/evaluations', (req, res) => {
  const ev = { 
    _id: Date.now().toString(), 
    ...req.body, 
    createdAt: new Date().toISOString() 
  };
  db.evaluations.push(ev);
  saveEvaluations();
  res.status(201).json({ ...ev, averageScore: calcAvg(ev), intern: db.interns.find(i => i._id === ev.intern) });
});

app.put('/api/evaluations/:id', (req, res) => {
  const idx = db.evaluations.findIndex(e => e._id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Not found' });
  db.evaluations[idx] = { ...db.evaluations[idx], ...req.body };
  saveEvaluations();
  res.json({ ...db.evaluations[idx], averageScore: calcAvg(db.evaluations[idx]), intern: db.interns.find(i => i._id === db.evaluations[idx].intern) });
});

app.delete('/api/evaluations/:id', (req, res) => {
  const idx = db.evaluations.findIndex(e => e._id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Not found' });
  db.evaluations.splice(idx, 1);
  saveEvaluations();
  res.json({ message: 'Deleted' });
});

app.get('/api/admin/stats', (req, res) => {
  const { department, period } = req.query;
  let completed = db.evaluations.filter(e => e.status === 'completed');
  
  if (period) completed = completed.filter(e => e.period === period);
  
  const internsWithEvals = new Set(completed.map(e => e.intern));
  const low = completed.filter(e => parseFloat(calcAvg(e)) < 3).length;
  const high = completed.filter(e => parseFloat(calcAvg(e)) > 4.5).length;
  const avg = completed.length ? (completed.reduce((s, e) => s + parseFloat(calcAvg(e)), 0) / completed.length).toFixed(2) : 0;
  
  res.json({ 
    totalInterns: db.interns.length, 
    completedEvaluations: completed.length,
    internsEvaluated: internsWithEvals.size,
    lowScores: low, 
    highScores: high, 
    averageScore: avg 
  });
});

app.get('/api/admin/progress', (req, res) => {
  const periods = ['1 tháng', '3 tháng', '6 tháng'];
  const result = periods.map(p => {
    const evs = db.evaluations.filter(e => e.period === p && e.status === 'completed');
    return { 
      period: p, 
      count: evs.length, 
      average: evs.length ? parseFloat((evs.reduce((s, e) => s + parseFloat(calcAvg(e)), 0) / evs.length).toFixed(2)) : 0 
    };
  });
  res.json(result);
});

app.get('/api/admin/evaluations', (req, res) => {
  const { period, department } = req.query;
  
  let data = db.evaluations.filter(e => e.status === 'completed');
  if (period) data = data.filter(e => e.period === period);
  
  const result = data.map(e => {
    const intern = db.interns.find(i => i._id === e.intern);
    if (department && intern && intern.department !== department) return null;
    
    return {
      _id: e._id,
      internId: e.intern,
      internName: intern ? intern.name : 'N/A',
      internMajor: intern ? intern.major : 'N/A',
      internDepartment: intern ? intern.department : 'N/A',
      period: e.period,
      averageScore: calcAvg(e),
      evaluatorName: e.evaluatorName || '',
      evaluatorPosition: e.evaluatorPosition || '',
      evaluatorPhone: e.evaluatorPhone || '',
      restaurant: e.restaurant || '',
      scores: e.scores || {},
      improvement: e.improvement || '',
      otherComments: e.otherComments || '',
      createdAt: e.createdAt
    };
  }).filter(e => e !== null);
  
  res.json(result);
});

app.get('/api/admin/all-progress', (req, res) => {
  const allProgress = db.interns.map(intern => {
    const evs = db.evaluations.filter(e => e.intern === intern._id && e.status === 'completed');
    return {
      internId: intern._id,
      name: intern.name,
      major: intern.major,
      department: intern.department,
      scores: {
        '1 tháng': evs.find(e => e.period === '1 tháng') ? parseFloat(calcAvg(evs.find(e => e.period === '1 tháng'))) : null,
        '3 tháng': evs.find(e => e.period === '3 tháng') ? parseFloat(calcAvg(evs.find(e => e.period === '3 tháng'))) : null,
        '6 tháng': evs.find(e => e.period === '6 tháng') ? parseFloat(calcAvg(evs.find(e => e.period === '6 tháng'))) : null
      }
    };
  });
  res.json(allProgress);
});

const ADMIN_PASSWORD = 'KOTO123';

app.post('/api/admin/verify', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    res.json({ valid: true });
  } else {
    res.status(401).json({ valid: false, message: 'Invalid password' });
  }
});

console.log(`✓ Server running on http://localhost:${process.env.PORT || 5000}`);
console.log(`✓ ${db.interns.length} interns loaded`);
app.listen(process.env.PORT || 5000);