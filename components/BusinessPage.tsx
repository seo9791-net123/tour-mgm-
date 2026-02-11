
import React from 'react';
import { PageContent } from '../types';

interface Props {
  content: PageContent;
  onBack: () => void;
}

const BusinessPage: React.FC<Props> = ({ content, onBack }) => {
  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
      <div className="fixed top-0 left-0 w-full z-50 p-4 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition text-white">←</button>
      </div>

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={content.heroImage} alt="Hero" className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black"></div>
        </div>
        <div className="relative z-10 text-center animate-fade-in-up">
           <h1 className="text-6xl md:text-8xl font-bold tracking-widest text-white drop-shadow-2xl mb-4 uppercase" style={{ fontFamily: 'serif' }}>{content.heroTitle}</h1>
           <p className="text-sm md:text-base tracking-[0.5em] text-gold-400 uppercase font-bold">{content.heroSubtitle}</p>
        </div>
      </section>

      <section className="py-24 bg-[#f5f5ef] text-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <div className="space-y-8">
                <h2 className="text-4xl md:text-5xl font-bold text-deepgreen uppercase leading-tight whitespace-pre-line">{content.introTitle}</h2>
                <div className="h-1.5 w-24 bg-gold-500"></div>
                <p className="text-lg leading-relaxed font-light text-gray-800 whitespace-pre-line">{content.introText}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                   {content.sections.slice(0, 2).map((section, idx) => (
                      <div key={idx} className="p-4 bg-white rounded-xl shadow-sm border border-gray-200">
                         <h4 className="font-bold mb-2 text-deepgreen">{section.title}</h4>
                         <p className="text-gray-500 leading-relaxed">{section.content}</p>
                      </div>
                   ))}
                </div>
             </div>
             <div className="relative">
                <img src={content.introImage} className="w-full h-[500px] object-cover rounded-2xl shadow-2xl" alt="Intro" />
             </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white text-black">
         <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
               <h3 className="text-gold-600 font-bold tracking-widest mb-2">GALLERY</h3>
               <h2 className="text-4xl md:text-5xl font-bold uppercase">비지니스 VIP 갤러리</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {content.galleryImages.map((img, idx) => (
                  <div key={idx} className="group relative overflow-hidden rounded-2xl shadow-lg h-72">
                     <img src={img} className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700" alt={`Gallery ${idx}`} />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                        <p className="text-white font-bold">VIP Service Insight {idx + 1}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {content.sections.length > 2 && (
         <section className="py-24 bg-[#1a1a1a] text-white">
            <div className="max-w-7xl mx-auto px-4">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {content.sections.slice(2).map((section, idx) => (
                     <div key={idx} className="p-8 border border-white/10 rounded-3xl bg-white/5">
                        <h3 className="text-2xl font-bold text-gold-400 mb-4">{section.title}</h3>
                        <p className="text-gray-400 leading-relaxed">{section.content}</p>
                     </div>
                  ))}
               </div>
            </div>
         </section>
      )}

      <section className="py-20 bg-deepgreen text-white">
         <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 uppercase">성공적인 비지니스를 위한 파트너</h2>
            <p className="text-lg opacity-80 mb-10 max-w-3xl mx-auto">MANGO TOUR는 베트남 남부 전 지역에서 고객님의 품격을 높여드리는 전문 의전팀을 운영하고 있습니다.</p>
            <button className="bg-gold-500 text-white px-10 py-4 rounded-full font-bold hover:bg-gold-600 transition shadow-xl">실시간 의전 상담하기</button>
         </div>
      </section>
    </div>
  );
};

export default BusinessPage;
