
import React from 'react';
import { PageContent } from '../types';

interface Props {
  content: PageContent;
  onBack: () => void;
}

const GolfPage: React.FC<Props> = ({ content, onBack }) => {
  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
      <div className="fixed top-0 left-0 w-full z-50 p-4 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition text-white">←</button>
      </div>

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={content.heroImage} alt="Hero" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black"></div>
        </div>
        <div className="relative z-10 text-center animate-fade-in-up px-4">
           <div className="mb-6 inline-block border-b-2 border-gold-500 pb-1">
             <p className="text-lg md:text-xl font-bold tracking-[0.3em] uppercase text-gold-500">{content.heroSubtitle}</p>
           </div>
           <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white drop-shadow-2xl mb-4 uppercase leading-tight" style={{ fontFamily: 'serif' }}>{content.heroTitle}</h1>
        </div>
      </section>

      <section className="py-24 bg-[#f5f5ef] text-black">
        <div className="max-w-7xl mx-auto px-4 text-center">
           <h2 className="text-3xl md:text-5xl font-bold uppercase mb-8 tracking-wide text-deepgreen">{content.introTitle}</h2>
           <div className="h-1.5 w-24 bg-gold-500 mx-auto mb-10"></div>
           <p className="max-w-4xl mx-auto text-lg md:text-xl leading-relaxed text-gray-700 font-light whitespace-pre-line">{content.introText}</p>
        </div>
      </section>

      <section className="py-24 bg-white text-black">
         <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
               {content.sections.map((section, idx) => (
                  <div key={idx} className="group cursor-pointer">
                     <div className="overflow-hidden rounded-2xl shadow-xl mb-6 h-80 relative">
                        <img 
                          src={content.galleryImages[idx] || 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=800'} 
                          className="w-full h-full object-cover transform group-hover:scale-110 transition duration-1000" 
                          alt={`Golf ${idx}`} 
                        />
                        <div className="absolute top-4 left-4 bg-gold-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">Course/Info {idx + 1}</div>
                     </div>
                     <h3 className="text-2xl font-bold mb-2 group-hover:text-gold-600 transition">{section.title}</h3>
                     <p className="text-gray-500 text-sm leading-relaxed">{section.content}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      <section className="py-24 bg-[#1a1a1a] text-white">
         <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <img src={content.introImage} className="w-full h-[450px] object-cover rounded-2xl shadow-2xl" alt="Golf Service" />
            <div className="space-y-6">
               <h3 className="text-3xl font-bold text-gold-400">TOUR MGM만의 특별한 골프 케어</h3>
               <ul className="space-y-4 text-lg font-light opacity-90">
                  <li className="flex items-center gap-3"><span className="text-gold-500">✓</span> 전일정 전용 차량 및 전문 매니저 동행</li>
                  <li className="flex items-center gap-3"><span className="text-gold-500">✓</span> 골프장 티업 타임 우선 배정 권한</li>
                  <li className="flex items-center gap-3"><span className="text-gold-500">✓</span> 라운딩 후 최고급 스파 및 석식 예약</li>
                  <li className="flex items-center gap-3"><span className="text-gold-500">✓</span> 단체 행사 및 대회 기획 지원</li>
               </ul>
            </div>
         </div>
      </section>
    </div>
  );
};

export default GolfPage;
