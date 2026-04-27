import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import ManagerWorkspace from './pages/ManagerWorkspace';
import EvaluationForm from './pages/EvaluationForm';
import { GraduationCap } from 'lucide-react';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

const ADMIN_PASSWORD = 'admin123';

const AppProvider = ({ children }) => {
  const [managerInfo, setManagerInfo] = useState(() => {
    const saved = localStorage.getItem('managerInfo');
    return saved ? JSON.parse(saved) : null;
  });
  const [adminAuth, setAdminAuth] = useState(() => {
    return sessionStorage.getItem('isAdmin') === 'true';
  });

  useEffect(() => {
    if (managerInfo) {
      localStorage.setItem('managerInfo', JSON.stringify(managerInfo));
    } else {
      localStorage.removeItem('managerInfo');
    }
  }, [managerInfo]);

  useEffect(() => {
    sessionStorage.setItem('isAdmin', adminAuth.toString());
  }, [adminAuth]);

  const saveManagerInfo = (info) => setManagerInfo(info);
  const setAdminAuthenticated = (status) => setAdminAuth(status);

  return (
    <AppContext.Provider value={{ managerInfo, saveManagerInfo, adminAuth, setAdminAuthenticated }}>
      {children}
    </AppContext.Provider>
  );
};

const LoginPage = () => {
  const navigate = useNavigate();
  const { saveManagerInfo, setAdminAuthenticated } = useApp();
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [phone, setPhone] = useState('');
  const [restaurant, setRestaurant] = useState('');
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');

  const handleManagerSubmit = (e) => {
    e.preventDefault();
    if (!name || !position || !phone || !restaurant) {
      setError('Vui lòng nhập đầy đủ thông tin!');
      return;
    }
    saveManagerInfo({ name, position, phone, restaurant });
    navigate('/manager');
  };

  const handleAdminAccess = () => {
    const enteredPassword = window.prompt('Nhập mật khẩu Admin:');
    if (enteredPassword === ADMIN_PASSWORD) {
      setAdminAuthenticated(true);
      sessionStorage.setItem('isAdmin', 'true');
      navigate('/admin');
    } else if (enteredPassword !== null) {
      alert('Mật khẩu không đúng!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-gradient-to-r from-amber-600 to-amber-700 p-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="bg-white p-2 rounded-xl">
              <GraduationCap className="w-10 h-10 text-amber-600" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold text-white tracking-wider">KOTO</h1>
              <p className="text-amber-200 text-xs">Internship Evaluation</p>
            </div>
          </div>
        </div>

        {step === 1 && (
          <div className="p-6">
            <div className="space-y-4">
              <button
                onClick={() => setStep(2)}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-4 rounded-xl font-bold text-lg hover:from-amber-600 hover:to-amber-700 transition"
              >
                Đăng nhập Manager
              </button>
              <button
                onClick={handleAdminAccess}
                className="w-full bg-gray-800 text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-900 transition flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Thống kê
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleManagerSubmit} className="p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Thông tin Manager</h2>
            {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Họ tên *</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500" placeholder="Nhập họ tên" required />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Chức vụ *</label>
                <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500" placeholder="Quản lý, Trưởng ca..." required />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Số điện thoại *</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500" placeholder="SĐT liên hệ" required />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Nhà hàng/Bộ phận *</label>
                <input type="text" value={restaurant} onChange={(e) => setRestaurant(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500" placeholder="Tên nhà hàng/bộ phận" required />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button type="button" onClick={() => setStep(1)} className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-medium">Quay lại</button>
              <button type="submit" className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 rounded-xl font-bold">Tiếp tục</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

const ProtectedRoute = ({ children, requireAdmin }) => {
  const { adminAuth } = useApp();
  
  if (requireAdmin && !adminAuth) {
    return <Navigate to="/" />;
  }
  
  return children;
};

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/manager" element={<ProtectedRoute><ManagerWorkspace /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute requireAdmin><AdminDashboard /></ProtectedRoute>} />
          <Route path="/evaluate/:internId" element={<ProtectedRoute><EvaluationForm /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;