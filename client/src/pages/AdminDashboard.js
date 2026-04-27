import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { api } from '../context/AuthContext';
import { useApp } from '../App';
import { GraduationCap, BarChart3, Download, LogOut, Users, Star, TrendingUp } from 'lucide-react';

const AdminDashboard = () => {
  const { adminAuth, setAdminAuthenticated } = useApp();
  const navigate = useNavigate();
  const [evaluations, setEvaluations] = useState([]);
  const [stats, setStats] = useState({});
  const [allProgress, setAllProgress] = useState([]);
  const [periodFilter, setPeriodFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isAdmin = sessionStorage.getItem('isAdmin') === 'true';
    if (isAdmin) {
      fetchData();
    } else {
      navigate('/');
    }
  }, [periodFilter]);

  const fetchData = async () => {
    try {
      const params = {};
      if (periodFilter !== 'all') params.period = periodFilter;
      const evalRes = await api.get('/admin/evaluations', { params });
      setEvaluations(evalRes.data);

      const statsRes = await api.get('/admin/stats', { params: { period: periodFilter === 'all' ? undefined : periodFilter } });
      setStats(statsRes.data);

      const progressRes = await api.get('/api/admin/all-progress');
      setAllProgress(progressRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    const s = parseFloat(score);
    if (s >= 4.5) return 'text-green-600 bg-green-100';
    if (s >= 3) return 'text-blue-600 bg-blue-100';
    if (s > 0) return 'text-red-600 bg-red-100';
    return 'text-gray-600 bg-gray-100';
  };

  const handleExport = () => {
    const headers = ['STT', 'Họ tên HV', 'Chuyên ngành', 'Bộ phận', 'Đợt', 'Điểm TB', 'Người đánh giá', 'Chức vụ', 'SĐT', 'Nhà hàng', 'Điểm cần cải thiện', 'Nhận xét khác'];
    
    const rows = evaluations.map((e, idx) => [
      idx + 1, e.internName, e.internMajor, e.internDepartment, e.period, e.averageScore, e.evaluatorName, e.evaluatorPosition, e.evaluatorPhone, e.restaurant, e.improvement, e.otherComments
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.map(v => `"${v || ''}"`).join(','))].join('\n');
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `bao_cao_danh_gia_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const chartData = allProgress.map(p => ({
    name: p.name.length > 12 ? p.name.substring(0, 12) + '...' : p.name,
    '1 tháng': p.scores['1 tháng'],
    '3 tháng': p.scores['3 tháng'],
    '6 tháng': p.scores['6 tháng']
  })).filter(p => p['1 tháng'] || p['3 tháng'] || p['6 tháng']);

  const handleLogout = () => {
    setAdminAuthenticated(false);
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-2xl text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <nav className="bg-gradient-to-r from-amber-600 to-amber-700 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-4">
              <div className="bg-white p-2 rounded-xl">
                <GraduationCap className="w-8 h-8 text-amber-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
                <p className="text-amber-200 text-sm">Thống kê đánh giá K46</p>
              </div>
            </div>
            <button onClick={handleLogout} className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl">
              Đăng xuất
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-5 rounded-2xl shadow-lg border-l-4 border-blue-500">
            <p className="text-gray-500 text-sm">Tổng học viên</p>
            <p className="text-3xl font-bold text-blue-600">{stats.totalInterns || 0}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-lg border-l-4 border-green-500">
            <p className="text-gray-500 text-sm">Đánh giá hoàn thành</p>
            <p className="text-3xl font-bold text-green-600">{stats.completedEvaluations || 0}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-lg border-l-4 border-red-500">
            <p className="text-gray-500 text-sm">Điểm thấp (&lt;3.0)</p>
            <p className="text-3xl font-bold text-red-600">{stats.lowScores || 0}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-lg border-l-4 border-purple-500">
            <p className="text-gray-500 text-sm">Điểm cao (&gt;4.5)</p>
            <p className="text-3xl font-bold text-purple-600">{stats.highScores || 0}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-gray-700 font-medium">Lọc:</span>
              <div className="flex rounded-xl overflow-hidden border-2 border-gray-200">
                {['all', '1 tháng', '3 tháng', '6 tháng'].map(p => (
                  <button
                    key={p}
                    onClick={() => setPeriodFilter(p)}
                    className={`px-4 py-2 ${periodFilter === p ? 'bg-amber-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                  >
                    {p === 'all' ? 'Tất cả' : p}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={handleExport}
              className="bg-green-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-green-700 transition flex items-center gap-2"
            >
              📥 Xuất Excel
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-amber-500 to-amber-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left sticky left-0 bg-amber-600">STT</th>
                  <th className="px-4 py-3 text-left">Họ tên</th>
                  <th className="px-4 py-3 text-left">Bộ phận</th>
                  <th className="px-4 py-3 text-left">Đợt</th>
                  <th className="px-4 py-3 text-left">Điểm TB</th>
                  <th className="px-4 py-3 text-left">Người đánh giá</th>
                  <th className="px-4 py-3 text-left">Nhà hàng</th>
                  <th className="px-4 py-3 text-left">Ngày đánh giá</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {evaluations.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                      Chưa có dữ liệu đánh giá
                    </td>
                  </tr>
                ) : (
                  evaluations.map((ev, idx) => (
                    <tr key={ev._id || idx} className="hover:bg-amber-50">
                      <td className="px-4 py-3 sticky left-0 bg-white">
                        <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-medium">{idx + 1}</span>
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-800">{ev.internName}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs ${ev.internDepartment === 'FOH' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                          {ev.internDepartment}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs">{ev.period}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${getScoreColor(ev.averageScore)}`}>
                          {ev.averageScore || 'N/A'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">{ev.evaluatorName || '-'}</td>
                      <td className="px-4 py-3 text-sm">{ev.restaurant || '-'}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {ev.createdAt ? new Date(ev.createdAt).toLocaleDateString('vi-VN') : '-'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Biểu đồ so sánh tiến bộ</h3>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData.slice(0, 20)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="1 tháng" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="3 tháng" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="6 tháng" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-gray-500 mt-2 text-center">Hiển thị 20 học viên đầu tiên</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;