import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../context/AuthContext';
import { useApp } from '../App';
import { GraduationCap, LogOut } from 'lucide-react';

const ManagerWorkspace = () => {
  const [interns, setInterns] = useState([]);
  const [evaluations, setEvaluations] = useState([]);
  const [filter, setFilter] = useState({ department: '' });
  const navigate = useNavigate();
  const { managerInfo, saveManagerInfo } = useApp();
  const [showLoginForm, setShowLoginForm] = useState(!managerInfo);

  const [loginData, setLoginData] = useState({ name: '', position: '', phone: '', restaurant: '' });

  useEffect(() => {
    fetchData();
  }, [filter]);

  const fetchData = async () => {
    try {
      const params = { batch: 'K46' };
      if (filter.department) params.department = filter.department;
      
      const [internRes, evalRes] = await Promise.all([
        api.get('/interns', { params }),
        api.get('/evaluations')
      ]);
      
      setInterns(internRes.data);
      setEvaluations(evalRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginData.name || !loginData.position || !loginData.phone || !loginData.restaurant) {
      alert('Vui lòng nhập đầy đủ thông tin!');
      return;
    }
    saveManagerInfo(loginData);
    setShowLoginForm(false);
  };

  const handleLogout = () => {
    navigate('/');
  };

  if (showLoginForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6">
          <div className="text-center mb-6">
            <div className="bg-amber-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-amber-700 font-bold text-3xl">K</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Đăng nhập Manager</h1>
            <p className="text-gray-500">Nhập thông tin để tiếp tục</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Họ tên *</label>
              <input type="text" value={loginData.name} onChange={(e) => setLoginData({...loginData, name: e.target.value})} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500" placeholder="Họ tên" required />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Chức vụ *</label>
              <input type="text" value={loginData.position} onChange={(e) => setLoginData({...loginData, position: e.target.value})} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500" placeholder="Quản lý, Trưởng ca..." required />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Số điện thoại *</label>
              <input type="tel" value={loginData.phone} onChange={(e) => setLoginData({...loginData, phone: e.target.value})} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500" placeholder="SĐT" required />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Nhà hàng/Bộ phận *</label>
              <input type="text" value={loginData.restaurant} onChange={(e) => setLoginData({...loginData, restaurant: e.target.value})} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500" placeholder="Tên nhà hàng" required />
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-4 rounded-xl font-bold text-lg hover:from-amber-600 hover:to-amber-700 transition">
              Tiếp tục
            </button>
          </form>
        </div>
      </div>
    );
  }

  const getEvaluationStatus = (internId) => {
    const internEvals = evaluations.filter(e => {
      const evalInternId = typeof e.intern === 'object' ? e.intern._id : e.intern;
      return evalInternId === internId;
    });
    if (internEvals.length === 0) return { status: 'Chưa đánh giá', color: 'bg-gray-100 text-gray-800', hasScore: false, period: '' };
    
    // Check the most recent evaluation
    const latestEval = internEvals.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
    const scoreValues = latestEval.scores ? Object.values(latestEval.scores).filter(v => v > 0) : [];
    
    if (scoreValues.length === 0) return { status: 'Chưa đánh giá', color: 'bg-gray-100 text-gray-800', hasScore: false, period: '' };
    
    const score = parseFloat(latestEval.averageScore);
    const period = latestEval.period || '';
    if (score < 3) return { status: `${score.toFixed(1)}`, period, color: 'bg-red-100 text-red-800', hasScore: true };
    if (score >= 4.5) return { status: `${score.toFixed(1)}`, period, color: 'bg-green-100 text-green-800', hasScore: true };
    return { status: `${score.toFixed(1)}`, period, color: 'bg-blue-100 text-blue-800', hasScore: true };
  };

  const filteredInterns = interns.filter(intern => {
    if (filter.department && intern.department !== filter.department) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <nav className="bg-gradient-to-r from-amber-600 to-amber-700 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-4">
              <div className="bg-white p-2 rounded-full">
                <GraduationCap className="w-8 h-8 text-amber-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Khu vực Manager</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-white/20 px-4 py-2 rounded-lg text-white text-sm">
                <p className="font-medium">{managerInfo?.name}</p>
                <p className="text-amber-200 text-xs">{managerInfo?.restaurant}</p>
              </div>
              <button onClick={handleLogout} className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg">
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
            <h2 className="text-xl font-bold text-gray-800">Danh sách học viên K46</h2>
            <div className="flex gap-3">
              <select
                className="border-2 border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:border-amber-500"
                value={filter.department}
                onChange={(e) => setFilter({ ...filter, department: e.target.value })}
              >
                <option value="">Tất cả Bộ phận</option>
                <option value="FOH">FOH (Phục vụ)</option>
                <option value="BOH">BOH (Bếp)</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gradient-to-r from-amber-500 to-amber-600 text-white">
                  <th className="px-4 py-3 text-left rounded-tl-xl">STT</th>
                  <th className="px-4 py-3 text-left">Họ tên</th>
                  <th className="px-4 py-3 text-left">Chuyên ngành</th>
                  <th className="px-4 py-3 text-left">Bộ phận</th>
                  <th className="px-4 py-3 text-left">Giới tính</th>
                  <th className="px-4 py-3 text-left">Trạng thái</th>
                  <th className="px-4 py-3 text-left rounded-tr-xl">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredInterns.map((intern, index) => {
                  const evalStatus = getEvaluationStatus(intern._id);
                  return (
                    <tr key={intern._id} className="hover:bg-amber-50 transition">
                      <td className="px-4 py-3">
                        <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">{index + 1}</span>
                      </td>
                      <td className="px-4 py-3 font-semibold text-gray-800">{intern.name}</td>
                      <td className="px-4 py-3">{intern.major}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${intern.department === 'FOH' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                          {intern.department}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{intern.gender}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col gap-1">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${evalStatus.color}`}>
                            {evalStatus.status}
                          </span>
                          {evalStatus.period && (
                            <span className="text-xs text-gray-500">{evalStatus.period}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => navigate(`/evaluate/${intern._id}`)}
                          className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-2 rounded-xl font-medium hover:from-amber-600 hover:to-amber-700 transition shadow-md"
                        >
                          {evalStatus.hasScore ? 'Cập nhật' : 'Đánh giá'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 text-sm text-gray-500">
            Tổng: {filteredInterns.length} học viên
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerWorkspace;