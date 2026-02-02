
import React from 'react';
import { PageContent } from '../types';

interface Props {
  content: PageContent;
  onBack: () => void;
}

const HotelVillaPage: React.FC<Props> = ({ content, onBack }) => {
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
           <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white drop-shadow-2xl mb-4 uppercase leading-tight" style={{ fontFamily: 'serif' }}>{content.heroTitle}</h1>
           <p className="text-xl md:text-3xl font-light tracking-[0.2em] text-gold-400 uppercase mt-4">{content.heroSubtitle}</p>
        </div>
      </section>

      <section className="py-24 bg-white text-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-16 items-center mb-24">
             <div className="flex-1 space-y-8">
                <h2 className="text-4xl md:text-6xl font-bold uppercase leading-tight text-deepgreen">{content.introTitle}</h2>
                <div className="h-1.5 w-24 bg-gold-500"></div>
                <p className="text-lg leading-relaxed text-gray-700 font-light whitespace-pre-line">{content.introText}</p>
             </div>
             <div className="flex-1 relative">
                <img src={content.introImage} className="w-full h-[500px] object-cover rounded-2xl shadow-2xl" alt="Intro" />
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
             {content.sections.map((section, idx) => (
                <div key={idx} className="p-8 bg-[#f5f5ef] rounded-3xl border border-gray-100 shadow-sm flex flex-col h-full">
                   <h3 className="text-2xl font-bold text-deepgreen mb-4">{section.title}</h3>
                   <p className="text-gray-600 leading-relaxed text-sm flex-1">{section.content}</p>
                </div>
             ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {content.galleryImages.map((img, idx) => (
                <div key={idx} className="group overflow-hidden rounded-2xl shadow-xl h-80 relative">
                   <img src={img} className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700" alt={`Villa ${idx}`} />
                   <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500"></div>
                   <div className="absolute bottom-6 left-6 text-white">
                      <p className="text-xs uppercase font-bold text-gold-400 mb-1">Accommodation</p>
                      <h4 className="text-xl font-bold">Premium Stay Gallery {idx + 1}</h4>
                   </div>
                </div>
             ))}
          </div>
        </div>
      </section>
      
      <section className="py-24 bg-[#f5f5ef] text-black">
         <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">완벽한 휴식을 위한 큐레이션</h2>
            <p className="text-gray-600 mb-10 leading-relaxed">TOUR MGM은 전 일정 동안 고객님이 가장 편안하게 쉴 수 있는 공간을 제안합니다.</p>
            <div className="flex flex-wrap justify-center gap-4">
               <span className="bg-white px-6 py-2 rounded-full border border-gray-200 text-sm font-bold shadow-sm">#5성급호텔</span>
               <span className="bg-white px-6 py-2 rounded-full border border-gray-200 text-sm font-bold shadow-sm">#독채풀빌라</span>
               <span className="bg-white px-6 py-2 rounded-full border border-gray-200 text-sm font-bold shadow-sm">#오션뷰리조트</span>
               <span className="bg-white px-6 py-2 rounded-full border border-gray-200 text-sm font-bold shadow-sm">#시내중심</span>
            </div>
         </div>
      </section>
    </div>
  );
};

export default HotelVillaPage;
