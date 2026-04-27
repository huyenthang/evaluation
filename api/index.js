const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const ADMIN_PASSWORD = 'admin123';

let db = {
  interns: [
    { _id: '1', name: 'Đào Thị Thủy Trúc', major: 'Bếp', gender: 'Nữ', department: 'BOH', batch: 'K46' },
    { _id: '2', name: 'Hờ A Tỳ', major: 'F&B', gender: 'Nam', department: 'FOH', batch: 'K46' },
    { _id: '3', name: 'Khang Thị Già', major: 'F&B', gender: 'Nữ', department: 'FOH', batch: 'K46' },
    { _id: '4', name: 'Lê Bích Ngọc', major: 'F&B', gender: 'Nữ', department: 'FOH', batch: 'K46' },
    { _id: '5', name: 'Liêng Jrang Ha Khải', major: 'F&B', gender: 'Nam', department: 'FOH', batch: 'K46' },
    { _id: '6', name: 'Lồ A Thắng', major: 'F&B', gender: 'Nam', department: 'FOH', batch: 'K46' },
    { _id: '7', name: 'Lý Thị Si', major: 'Bếp', gender: 'Nữ', department: 'BOH', batch: 'K46' },
    { _id: '8', name: 'Mai Văn Minh', major: 'Bếp', gender: 'Nam', department: 'BOH', batch: 'K46' },
    { _id: '9', name: 'Nguyễn Thị Thanh Nga', major: 'Bếp', gender: 'Nữ', department: 'BOH', batch: 'K46' },
    { _id: '10', name: 'Nguyễn Thị Thuỳ Linh', major: 'Bếp', gender: 'Nữ', department: 'BOH', batch: 'K46' },
    { _id: '11', name: 'Sùng A Sấu', major: 'Bếp', gender: 'Nam', department: 'BOH', batch: 'K46' },
    { _id: '12', name: 'Sùng Văn Dầu', major: 'F&B', gender: 'Nam', department: 'FOH', batch: 'K46' },
    { _id: '13', name: 'Trần Văn Khánh', major: 'Bếp', gender: 'Nam', department: 'BOH', batch: 'K46' },
    { _id: '14', name: 'Vàng A Thán', major: 'Bếp', gender: 'Nam', department: 'BOH', batch: 'K46' },
    { _id: '15', name: 'Vũ Ngọc Nam', major: 'F&B', gender: 'Nam', department: 'FOH', batch: 'K46' },
    { _id: '16', name: 'Lò Thị Hoài', major: 'Bếp', gender: 'Nữ', department: 'BOH', batch: 'K46' },
    { _id: '17', name: 'Nguyễn Võ Minh Hoàng', major: 'F&B', gender: 'Nam', department: 'FOH', batch: 'K46' },
    { _id: '18', name: 'Giàng A Dũng', major: 'Bếp', gender: 'Nam', department: 'BOH', batch: 'K46' },
    { _id: '19', name: 'Giàng Thị Dủa', major: 'F&B', gender: 'Nữ', department: 'FOH', batch: 'K46' },
    { _id: '20', name: 'Lồ Thị Dâu', major: 'F&B', gender: 'Nữ', department: 'FOH', batch: 'K46' },
    { _id: '21', name: 'Lý A Vềnh', major: 'F&B', gender: 'Nam', department: 'FOH', batch: 'K46' },
    { _id: '22', name: 'Ly Suy Sú', major: 'F&B', gender: 'Nữ', department: 'FOH', batch: 'K46' },
    { _id: '23', name: 'Nguyễn Thị Thanh Huyền', major: 'Bếp', gender: 'Nữ', department: 'BOH', batch: 'K46' },
    { _id: '24', name: 'Sùng A Vả', major: 'Bếp', gender: 'Nam', department: 'BOH', batch: 'K46' },
    { _id: '25', name: 'Sùng Thị Xi', major: 'Bếp', gender: 'Nữ', department: 'BOH', batch: 'K46' },
    { _id: '26', name: 'Sùng Tiến Trung', major: 'F&B', gender: 'Nam', department: 'FOH', batch: 'K46' },
    { _id: '27', name: 'Tạ Hoàng Thanh Thủy', major: 'Bếp', gender: 'Nữ', department: 'BOH', batch: 'K46' },
    { _id: '28', name: 'Thào Mý Chờ', major: 'F&B', gender: 'Nam', department: 'FOH', batch: 'K46' },
    { _id: '29', name: 'Trần Thị Kim Dung', major: 'F&B', gender: 'Nữ', department: 'FOH', batch: 'K46' },
    { _id: '30', name: 'Trang A Sính', major: 'Bếp', gender: 'Nam', department: 'BOH', batch: 'K46' },
    { _id: '31', name: 'Vũ Tiến Duy', major: 'Bếp', gender: 'Nam', department: 'BOH', batch: 'K46' },
    { _id: '32', name: 'Y Huyên', major: 'F&B', gender: 'Nữ', department: 'FOH', batch: 'K46' },
    { _id: '33', name: 'Lảo Thị Già', major: 'Bếp', gender: 'Nữ', department: 'BOH', batch: 'K46' },
    { _id: '34', name: 'Vàng A Mùa', major: 'F&B', gender: 'Nam', department: 'FOH', batch: 'K46' },
    { _id: '35', name: 'Giàng A Phong', major: 'Bếp', gender: 'Nam', department: 'BOH', batch: 'K46' },
    { _id: '36', name: 'Chu Thị De', major: 'F&B', gender: 'Nữ', department: 'FOH', batch: 'K46' },
    { _id: '37', name: 'Phu Mè Gơ', major: 'F&B', gender: 'Nữ', department: 'FOH', batch: 'K46' },
    { _id: '38', name: 'Thào A Canh', major: 'F&B', gender: 'Nam', department: 'FOH', batch: 'K46' }
  ],
  evaluations: []
};

function calcAvg(evalData) {
  if (!evalData || !evalData.scores) return 0;
  const scores = Object.values(evalData.scores).filter(x => x > 0);
  return scores.length ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2) : 0;
}

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
  data = data.map(e => ({ ...e, averageScore: calcAvg(e), intern: db.interns.find(i => i._id === e.intern) }));
  res.json(data);
});

app.post('/api/evaluations', (req, res) => {
  const ev = { _id: Date.now().toString(), ...req.body, createdAt: new Date().toISOString() };
  db.evaluations.push(ev);
  res.status(201).json({ ...ev, averageScore: calcAvg(ev) });
});

app.put('/api/evaluations/:id', (req, res) => {
  const idx = db.evaluations.findIndex(e => e._id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Not found' });
  db.evaluations[idx] = { ...db.evaluations[idx], ...req.body };
  res.json({ ...db.evaluations[idx], averageScore: calcAvg(db.evaluations[idx]) });
});

app.get('/api/admin/stats', (req, res) => {
  const completed = db.evaluations.filter(e => e.status === 'completed');
  const avg = completed.length ? (completed.reduce((s, e) => s + parseFloat(calcAvg(e)), 0) / completed.length).toFixed(2) : 0;
  res.json({ totalInterns: db.interns.length, completedEvaluations: completed.length, averageScore: avg });
});

app.get('/api/admin/evaluations', (req, res) => {
  const data = db.evaluations.filter(e => e.status === 'completed').map(e => {
    const intern = db.interns.find(i => i._id === e.intern);
    return { _id: e._id, internId: e.intern, internName: intern?.name, internDepartment: intern?.department, period: e.period, averageScore: calcAvg(e), improvement: e.improvement };
  });
  res.json(data);
});

app.post('/api/admin/verify', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) res.json({ valid: true });
  else res.status(401).json({ valid: false });
});

module.exports = app;