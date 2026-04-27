import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../context/AuthContext';
import { useApp } from '../App';
import { getCriteriaByPeriod } from '../utils/scoreCriteria';
import { Line } from 'react-chartjs-2';
import { GraduationCap, CheckCircle, AlertCircle, Star } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SCORE_EXPLANATIONS = {
  attitude: {
    1: "Thái độ kém, không hợp tác, thường xuyên vi phạm kỷ luật.",
    2: "Thiếu nhiệt tình, cần nhắc nhở nhiều về tác phong.",
    3: "Đạt yêu cầu, thực hiện đúng nội quy nhưng chưa chủ động.",
    4: "Thái độ tốt, cầu thị, có tinh thần trách nhiệm cao.",
    5: "Tuyệt vời, là tấm gương về thái độ và tinh thần làm việc."
  },
  technical: {
    1: "Không nắm được kiến thức cơ bản, không thể làm việc.",
    2: "Kỹ năng yếu, phạm nhiều lỗi nghiệp vụ.",
    3: "Làm được các công việc cơ bản theo chỉ dẫn.",
    4: "Thành thạo nghiệp vụ, có thể hỗ trợ người khác.",
    5: "Kỹ năng xuất sắc, xử lý được các tình huống khó/phức tạp."
  },
  communication: {
    1: "Không thể giao tiếp, không hiểu chỉ dẫn bằng lời.",
    2: "Ngôn ngữ hạn chế, gây khó khăn khi làm việc với khách.",
    3: "Giao tiếp đủ nghe, hiểu, xử lý được yêu cầu cơ bản.",
    4: "Giao tiếp tự tin, lưu loát, hỗ trợ khách hàng tốt.",
    5: "Khả năng ngôn ngữ vượt trội, giao tiếp chuyên nghiệp như nhân viên chính thức."
  },
  problemSolving: {
    1: "Không thể giải quyết vấn đề, luôn cần hỗ trợ.",
    2: "Gặp vấn đề thường bỏ qua hoặc xử lý chậm.",
    3: "Xử lý được các vấn đề cơ bản theo hướng dẫn.",
    4: "Có khả năng giải quyết vấn đề độc lập, hiệu quả.",
    5: "Xuất sắc trong giải quyết vấn đề, sáng tạo giải pháp."
  },
  punctuality: {
    1: "Thường xuyên đi muộn, không đúng giờ.",
    2: "Hay đi muộn, cần nhắc nhở nhiều.",
    3: "Đúng giờ đa số, có迟到 vài lần.",
    4: "Đúng giờ, có trách nhiệm với thời gian.",
    5: "Luôn đúng giờ, là tấm gương về tính đúng giờ."
  },
  default: {
    1: "Cần cải thiện nhiều.",
    2: "Chưa đạt yêu cầu, cần nỗ lực hơn.",
    3: "Đạt yêu cầu cơ bản.",
    4: "Thể hiện tốt, gần như hoàn thành.",
    5: "Xuất sắc, vượt kỳ vọng."
  }
};

const getExplanation = (criteriaLabel, score) => {
  const label = criteriaLabel.toLowerCase();
  if (label.includes('thái độ') || label.includes('attitude') || label.includes('tinh thần') || label.includes('enthusiasm') || label.includes('punctuality') || label.includes('đúng giờ')) {
    return SCORE_EXPLANATIONS.attitude[score] || SCORE_EXPLANATIONS.default[score];
  }
  if (label.includes('kiến thức') || label.includes('knowledge') || label.includes('kỹ năng') || label.includes('skill') || label.includes('chuyên môn') || label.includes('professional')) {
    return SCORE_EXPLANATIONS.technical[score] || SCORE_EXPLANATIONS.default[score];
  }
  if (label.includes('giao tiếp') || label.includes('communication') || label.includes('ngôn ngữ') || label.includes('language') || label.includes('nói') || label.includes('tiếp')) {
    return SCORE_EXPLANATIONS.communication[score] || SCORE_EXPLANATIONS.default[score];
  }
  if (label.includes('giải quyết') || label.includes('problem') || label.includes('xử lý')) {
    return SCORE_EXPLANATIONS.problemSolving[score] || SCORE_EXPLANATIONS.default[score];
  }
  if (label.includes('đúng giờ') || label.includes('chuyên cần') || label.includes('attendance')) {
    return SCORE_EXPLANATIONS.punctuality[score] || SCORE_EXPLANATIONS.default[score];
  }
  return SCORE_EXPLANATIONS.default[score];
};

const ScoreButton = ({ score, isSelected, onClick }) => {
  const colors = {
    1: { bg: 'bg-red-500', hover: 'hover:bg-red-600', text: 'text-white', shadow: 'shadow-red-500/50' },
    2: { bg: 'bg-orange-400', hover: 'hover:bg-orange-500', text: 'text-white', shadow: 'shadow-orange-400/50' },
    3: { bg: 'bg-yellow-400', hover: 'hover:bg-yellow-500', text: 'text-white', shadow: 'shadow-yellow-400/50' },
    4: { bg: 'bg-blue-400', hover: 'hover:bg-blue-500', text: 'text-white', shadow: 'shadow-blue-400/50' },
    5: { bg: 'bg-green-500', hover: 'hover:bg-green-600', text: 'text-white', shadow: 'shadow-green-500/50' }
  };
  const c = colors[score];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl font-bold text-lg md:text-xl transition-all duration-300 ${
        isSelected 
          ? `${c.bg} ${c.text} shadow-lg ${c.shadow} ring-4 ring-offset-2 ring-amber-400 scale-110 z-10` 
          : `bg-gray-100 text-gray-600 ${c.hover} hover:scale-105 hover:shadow-md`
      }`}
    >
      {score}
    </button>
  );
};

const CriteriaCard = ({ criteria, value, onChange, error }) => {
  const explanation = value > 0 ? getExplanation(criteria.label, value) : null;
  
  return (
    <div className={`bg-white rounded-2xl p-4 md:p-5 transition-all duration-300 ${
      error ? 'border-2 border-red-500 shadow-lg shadow-red-100' : 'border-2 border-gray-100 hover:border-amber-300 hover:shadow-lg'
    }`}>
      <div className="flex justify-between items-start mb-3">
        <h4 className="text-sm font-bold text-gray-800 leading-tight flex-1 pr-2">{criteria.label}</h4>
        {value > 0 && (
          <span className={`px-3 py-1 rounded-full text-sm font-bold flex-shrink-0 ${
            value === 5 ? 'bg-green-500 text-white shadow-lg' :
            value === 4 ? 'bg-blue-500 text-white shadow-lg' :
            value === 3 ? 'bg-yellow-500 text-white shadow-lg' :
            'bg-red-500 text-white shadow-lg'
          }`}>
            {value}
          </span>
        )}
      </div>
      <div className="flex justify-center gap-1 md:gap-2 mb-3">{[1, 2, 3, 4, 5].map(score => (
        <ScoreButton key={score} score={score} isSelected={value === score} onClick={() => onChange(score)} />
      ))}</div>
      {explanation && (
        <div className={`mt-2 p-2 rounded-lg text-sm text-center ${
          value >= 4 ? 'bg-green-50 text-green-700 border border-green-200' :
          value >= 3 ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' :
          'bg-red-50 text-red-700 border border-red-200'
        }`}>
          <div className="flex items-center justify-center gap-2">
            {value >= 4 ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span>{explanation}</span>
          </div>
        </div>
      )}
      {error && <p className="text-red-500 text-xs mt-2 text-center">⚠ {error}</p>}
    </div>
  );
};

const EvaluationForm = () => {
  const { internId } = useParams();
  const navigate = useNavigate();
  const { managerInfo } = useApp();
  const [intern, setIntern] = useState(null);
  const [period, setPeriod] = useState('1 tháng');
  const [scores, setScores] = useState({});
  const [improvement, setImprovement] = useState('');
  const [otherComments, setOtherComments] = useState('');
  const [existingEval, setExistingEval] = useState(null);
  const [progressData, setProgressData] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchIntern();
    fetchProgress();
  }, [internId]);

  const fetchIntern = async () => {
    try {
      const res = await api.get(`/interns/${internId}`);
      setIntern(res.data);
      
      const evalRes = await api.get(`/evaluations?internId=${internId}`);
      if (evalRes.data.length > 0) {
        const latest = evalRes.data[0];
        setExistingEval(latest);
        setPeriod(latest.period || '1 tháng');
        setImprovement(latest.improvement || '');
        setOtherComments(latest.otherComments || '');
        setScores(latest.scores || {});
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchProgress = async () => {
    try {
      const res = await api.get(`/api/admin/interns/progress/${internId}`);
      setProgressData(res.data);
    } catch (error) {
      console.error('Error fetching progress:', error);
    }
  };

  const handleScoreChange = (key, value) => {
    setScores(prev => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[key];
        return newErrors;
      });
    }
  };

  const handlePeriodChange = (newPeriod) => {
    setPeriod(newPeriod);
    setScores({});
    setErrors({});
  };

  const validateForm = () => {
    const criteriaByPeriod = getCriteriaByPeriod(period);
    const allCriteria = Object.values(criteriaByPeriod).flat();
    const newErrors = {};
    
    allCriteria.forEach(c => {
      if (!scores[c.key] || scores[c.key] === 0) {
        newErrors[c.key] = 'Chưa chấm điểm';
      }
    });
    
    if (!improvement.trim()) {
      newErrors.improvement = 'Nhập điểm cần cải thiện';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      alert('Vui lòng đánh giá tất cả tiêu chí và nhập điểm cần cải thiện!');
      return;
    }

    try {
      const payload = {
        intern: internId,
        period,
        status: 'completed',
        scores,
        improvement,
        otherComments,
        evaluatorName: managerInfo?.name || '',
        evaluatorPosition: managerInfo?.position || '',
        evaluatorPhone: managerInfo?.phone || '',
        restaurant: managerInfo?.restaurant || ''
      };

      if (existingEval) {
        await api.put(`/evaluations/${existingEval._id}`, payload);
      } else {
        await api.post('/api/evaluations', payload);
      }

      alert('Đánh giá đã được lưu!');
      navigate('/manager');
    } catch (error) {
      console.error('Error saving:', error);
      alert('Có lỗi xảy ra');
    }
  };

  const calculateAverage = () => {
    const values = Object.values(scores).filter(v => v > 0);
    if (values.length === 0) return 0;
    return (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1);
  };

  const criteriaByPeriod = getCriteriaByPeriod(period);
  const criteriaGroups = Object.entries(criteriaByPeriod).map(([key, criteriaList]) => ({
    key,
    label: key === 'professionalAttitude' ? 'THÁI ĐỘ & HÀNH VI CHUYÊN NGHIỆP' :
           key === 'professionalPerformance' ? 'THỂ HIỆN CÔNG VIỆC' :
           key === 'professionalKnowledge' ? 'KIẾN THỨC CHUYÊN MÔN' :
           key === 'guestRelations' ? 'QUAN HỆ KHÁCH HÀNG' :
           key === 'communicationTeamwork' ? 'GIAO TIẾP & LÀM VIỆC NHÓM' :
           key === 'languageSkills' ? 'KỸ NĂNG NGÔN NGỮ' :
           key === 'professional' ? 'HIỆU SUẤT NGHỀ NGHIỆP' :
           key === 'knowledge' ? 'KIẾN THỨC CHUYÊN MÔN' :
           key === 'behavior' ? 'THÁI ĐỘ & HÀNH VI' :
           key === 'overall' ? 'TỔNG QUÁT' : key.toUpperCase(),
    criteria: Array.isArray(criteriaList) ? criteriaList : []
  }));

  const chartData = {
    labels: progressData.map(p => p.period || p.evaluation),
    datasets: [{
      label: 'Điểm TB',
      data: progressData.map(p => p.score),
      borderColor: 'rgb(245, 158, 11)',
      backgroundColor: 'rgba(245, 158, 11, 0.3)',
      tension: 0.4,
      fill: true
    }]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-amber-50">
      <nav className="bg-gradient-to-r from-amber-600 to-amber-700 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate('/manager')} className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl transition flex items-center gap-2">
                ← Quay lại
              </button>
              <div className="bg-white p-2 rounded-xl">
                <GraduationCap className="w-8 h-8 text-amber-600" />
              </div>
              <h1 className="text-xl font-bold text-white">Đánh giá Thực tập sinh</h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white/20 px-4 py-2 rounded-xl text-center min-w-[100px]">
                <span className="text-white text-xs block">ĐIỂM TB</span>
                <span className={`text-3xl font-bold ${
                  parseFloat(calculateAverage()) >= 4.5 ? 'text-green-400' :
                  parseFloat(calculateAverage()) >= 3 ? 'text-yellow-300' :
                  parseFloat(calculateAverage()) > 0 ? 'text-red-400' : 'text-gray-300'
                }`}>{calculateAverage()}</span>
              </div>
              <div className="bg-white/20 px-4 py-2 rounded-xl text-center">
                <span className="text-white text-xs block">TIẾN ĐỘ</span>
                <div className="flex gap-1">
                  {['1 tháng', '3 tháng', '6 tháng'].map(p => (
                    <span key={p} className={`px-2 py-0.5 rounded text-xs font-medium ${
                      period === p ? 'bg-amber-500 text-white' : 'bg-white/10 text-gray-300'
                    }`}>{p}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {intern && (
          <div className="bg-white p-6 rounded-2xl shadow-lg mb-6 border-l-4 border-amber-500">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{intern.name}</h2>
                <div className="flex gap-6 mt-2 text-gray-600">
                  <span>📚 {intern.major}</span>
                  <span>🏢 {intern.department}</span>
                  <span>👤 {intern.gender}</span>
                </div>
              </div>
              <span className="bg-amber-100 text-amber-800 px-4 py-1 rounded-full text-sm font-medium">K46</span>
            </div>
          </div>
        )}

        {progressData.length > 0 && (
          <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
            <h3 className="font-semibold mb-4 text-gray-700">📈 Tiến bộ của học viên</h3>
            <div className="h-40">
              <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false, scales: { y: { min: 0, max: 5 } } }} />
            </div>
          </div>
        )}

        <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">ĐỢT ĐÁNH GIÁ</label>
            <select
              value={period}
              onChange={(e) => handlePeriodChange(e.target.value)}
              className="w-full md:w-80 border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 bg-white"
            >
              <option value="1 tháng">📅 Đánh giá 1 tháng</option>
              <option value="3 tháng">📅 Đánh giá 3 tháng</option>
              <option value="6 tháng">📅 Đánh giá 6 tháng</option>
            </select>
          </div>

          <div className="mb-6 p-4 bg-amber-50 rounded-xl">
            <p className="text-sm text-gray-600">
              <span className="font-bold">Thang điểm:</span> Nhấp vào số để chấm điểm (1-5)
            </p>
            <div className="flex gap-4 mt-2 text-xs">
              <span className="px-2 py-1 bg-red-500 text-white rounded">1: Yếu</span>
              <span className="px-2 py-1 bg-orange-400 text-white rounded">2: Dưới TB</span>
              <span className="px-2 py-1 bg-yellow-400 text-white rounded">3: Đạt</span>
              <span className="px-2 py-1 bg-blue-400 text-white rounded">4: Khá</span>
              <span className="px-2 py-1 bg-green-500 text-white rounded">5: Xuất sắc</span>
            </div>
          </div>

          {criteriaGroups.map(group => (
            <div key={group.key} className="mb-8">
              <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b-2 border-amber-400 bg-amber-50 px-4 py-2 rounded-t-xl">
                {group.label}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {group.criteria.map(c => (
                  <div key={c.key} className={errors[c.key] ? 'border-2 border-red-500 rounded-2xl p-1' : ''}>
                    <CriteriaCard
                      criteria={c}
                      value={scores[c.key] || 0}
                      onChange={(val) => handleScoreChange(c.key, val)}
                      error={errors[c.key]}
                    />
                    {errors[c.key] && (
                      <p className="text-red-500 text-xs mt-1 ml-2">⚠️ {errors[c.key]}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="border-t-2 border-gray-200 pt-6 mt-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">📝 NHẬN XÉT</h3>
            
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Điểm cần cải thiện <span className="text-red-500">*</span>
              </label>
              <textarea
                value={improvement}
                onChange={(e) => setImprovement(e.target.value)}
                className={`w-full border-2 rounded-xl p-4 h-28 focus:outline-none ${errors.improvement ? 'border-red-500' : 'border-gray-200 focus:border-amber-500'}`}
                placeholder="Nhận xét về các điểm cần cải thiện..."
              />
              {errors.improvement && (
                <p className="text-red-500 text-sm mt-1">⚠️ {errors.improvement}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Nhận xét khác</label>
              <textarea
                value={otherComments}
                onChange={(e) => setOtherComments(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-xl p-4 h-28 focus:outline-none focus:border-amber-500"
                placeholder="Nhận xét bổ sung..."
              />
            </div>
          </div>

          <div className="flex justify-between items-center mt-6">
            <div className="text-sm text-gray-500">
              {Object.keys(errors).length > 0 ? (
                <span className="text-red-500">⚠ Còn {Object.keys(errors).length} tiêu chí chưa đánh giá</span>
              ) : (
                <span className="text-green-600">✓ Đã đánh giá đầy đủ</span>
              )}
            </div>
            <button
              onClick={handleSubmit}
              disabled={Object.keys(errors).length > 0 || !improvement.trim()}
              className={`px-8 py-4 rounded-xl font-bold text-lg transition-all ${
                Object.keys(errors).length > 0 || !improvement.trim()
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 shadow-lg hover:shadow-xl transform hover:scale-105'
              }`}
            >
              💾 Lưu đánh giá
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluationForm;