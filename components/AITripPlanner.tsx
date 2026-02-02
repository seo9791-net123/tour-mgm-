
import React, { useState } from 'react';
import { LOCATIONS, THEMES, ACCOMMODATIONS, DURATIONS, VEHICLE_OPTIONS } from '../constants';
import { TripPlanRequest, TripPlanResult } from '../types';
import { generateTripPlan } from '../services/geminiService';

interface Props {
  onPlanGenerated: (plan: TripPlanResult) => void;
  onBack?: () => void;
}

const AITripPlanner: React.FC<Props> = ({ onPlanGenerated, onBack }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<TripPlanRequest>({
    destination: LOCATIONS[0],
    theme: THEMES[0],
    accommodation: ACCOMMODATIONS[0],
    duration: DURATIONS[0],
    pax: 4,
    guide: '예',
    vehicle: VEHICLE_OPTIONS[0]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await generateTripPlan(formData);
      // Pass the selected options to the result for display
      result.options = {
          guide: formData.guide,
          vehicle: formData.vehicle
      };
      setIsModalOpen(false);
      onPlanGenerated(result);
    } catch (error) {
      alert('여행 계획을 생성하는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={onBack ? "min-h-screen bg-white" : ""}>
      {/* Header if onBack exists (Page Mode) */}
      {onBack && (
         <div className="max-w-7xl mx-auto px-4 pt-6 pb-2">
            <div className="flex items-center gap-3 mb-3">
                <button
                onClick={onBack}
                className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition shadow-sm text-gray-600"
                >
                ←
                </button>
                <h2 className="text-xl font-bold text-deepgreen">
                    나만의 여행 만들기 (AI)
                </h2>
            </div>
            <p className="text-gray-600 mb-4 pl-11 text-xs">
                인공지능이 고객님의 취향을 분석하여 최적의 일정과 견적을 제안합니다.
            </p>
         </div>
      )}

      {/* Hero CTA Section */}
      <section className={`py-12 bg-gradient-to-br from-gray-900 to-deepgreen relative overflow-hidden text-white ${onBack ? 'rounded-2xl mx-4 mb-8 shadow-xl' : ''}`}>
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/travel_planning/1920/800')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <span className="inline-block py-0.5 px-2 rounded-full bg-gold-500/20 border border-gold-500 text-gold-400 text-xs font-bold mb-4 animate-pulse">
             ✨ AI TRAVEL GENIUS
          </span>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
            꿈꾸던 여행, <span className="text-gold-400">AI</span>가 현실로 만들어 드립니다
          </h2>
          <p className="text-sm text-gray-300 mb-6 max-w-2xl mx-auto">
            원하는 여행지, 테마, 인원만 선택하세요. <br className="hidden md:block"/>
            상세한 일정표와 투명한 견적서를 즉시 받아보실 수 있습니다.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="group relative inline-flex items-center justify-center px-6 py-3 font-bold text-white transition-all duration-200 bg-gold-500 text-base rounded-full hover:bg-gold-600 hover:shadow-lg hover:-translate-y-1 focus:outline-none ring-offset-2 focus:ring-2 ring-gold-400"
          >
            <span className="mr-2 text-xl">✈️</span>
            나만의 여행상품 만들기
            <div className="absolute inset-0 rounded-full ring-2 ring-white/20 group-hover:ring-white/40 animate-ping opacity-0 group-hover:opacity-100 duration-1000"></div>
          </button>
        </div>
      </section>

      {/* Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-xl overflow-hidden shadow-2xl transform transition-all animate-fade-in-up">
            <div className="bg-deepgreen px-5 py-3 flex justify-between items-center">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>📝</span> 여행 취향 설정
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-white/60 hover:text-white transition text-xl"
              >
                &times;
              </button>
            </div>

            <div className="p-6 bg-gray-50 max-h-[80vh] overflow-y-auto">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">여행지</label>
                    <select
                      className="w-full p-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 outline-none transition text-sm"
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    >
                      {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                    </select>
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">여행 테마</label>
                    <select
                      className="w-full p-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 outline-none transition text-sm"
                      value={formData.theme}
                      onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
                    >
                      {THEMES.map(theme => <option key={theme} value={theme}>{theme}</option>)}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">숙소 등급</label>
                    <select
                      className="w-full p-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 outline-none transition text-sm"
                      value={formData.accommodation}
                      onChange={(e) => setFormData({ ...formData, accommodation: e.target.value })}
                    >
                      {ACCOMMODATIONS.map(acc => <option key={acc} value={acc}>{acc}</option>)}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">여행 일정 (기간)</label>
                    <select
                      className="w-full p-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 outline-none transition text-sm"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    >
                      {DURATIONS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">인원 수</label>
                    <input
                      type="number"
                      min="1"
                      className="w-full p-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 outline-none transition text-sm"
                      value={formData.pax}
                      onChange={(e) => setFormData({ ...formData, pax: parseInt(e.target.value) })}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">렌트카 (기사 포함)</label>
                    <select
                      className="w-full p-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 outline-none transition text-sm"
                      value={formData.vehicle}
                      onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                    >
                      {VEHICLE_OPTIONS.map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                  </div>

                  <div className="col-span-1 md:col-span-2 space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 block mb-1">가이드 이용 여부</label>
                    <div className="flex gap-3">
                      {['예', '아니오'].map(option => (
                        <label key={option} className="flex items-center gap-2 cursor-pointer bg-white px-3 py-1.5 border rounded-lg hover:bg-gray-50 flex-1 justify-center text-sm">
                          <input
                            type="radio"
                            name="guide"
                            value={option}
                            checked={formData.guide === option}
                            onChange={(e) => setFormData({ ...formData, guide: e.target.value })}
                            className="w-3 h-3 text-gold-500 focus:ring-gold-500"
                          />
                          <span className={formData.guide === option ? 'font-bold text-gold-600' : 'text-gray-700'}>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 rounded-lg font-bold text-white text-sm shadow-lg flex justify-center items-center gap-2 transition-all ${
                      loading 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-gold-500 hover:bg-gold-600 hover:shadow-xl hover:-translate-y-0.5'
                    }`}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>AI가 일정을 계획하는 중입니다...</span>
                      </>
                    ) : (
                      <>
                        <span>🚀</span> 여행 일정 및 견적 생성하기
                      </>
                    )}
                  </button>
                  <p className="text-center text-[10px] text-gray-500 mt-2">
                    * AI 분석을 통해 최적의 동선과 비용을 산출합니다. (약 5-10초 소요)
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AITripPlanner;
