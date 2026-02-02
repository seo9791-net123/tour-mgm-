
import React from 'react';
import { PageContent } from '../types';

interface Props {
  content: PageContent;
  onBack: () => void;
}

const ForMenPage: React.FC<Props> = ({ content, onBack }) => {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden">
      <div className="fixed top-0 left-0 w-full z-50 p-4 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition text-white">←</button>
      </div>

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={content.heroImage} alt="Hero" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#050505]"></div>
        </div>
        <div className="relative z-10 text-center animate-fade-in-up px-4">
           <div className="mb-6 inline-block border-b-2 border-gold-500 pb-1">
             <p className="text-lg md:text-xl font-bold tracking-[0.4em] uppercase text-gold-500">Exclusive Nightlife</p>
           </div>
           <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-white drop-shadow-2xl mb-6 uppercase leading-tight" style={{ fontFamily: 'serif' }}>{content.heroTitle}</h1>
           <p className="text-xl md:text-2xl font-light text-gray-300 uppercase tracking-widest">{content.heroSubtitle}</p>
        </div>
      </section>

      <section className="py-24 bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4">
           <div className="flex flex-col lg:flex-row gap-16 items-center mb-24">
              <div className="flex-1 space-y-8">
                 <h2 className="text-4xl md:text-6xl font-bold uppercase mb-6 text-gold-500" style={{ fontFamily: 'serif' }}>{content.introTitle}</h2>
                 <div className="h-1.5 w-24 bg-white/20"></div>
                 <p className="text-lg leading-relaxed text-gray-400 font-light whitespace-pre-line">{content.introText}</p>
                 <div className="space-y-6">
                    {content.sections.map((section, idx) => (
                       <div key={idx} className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                          <h4 className="text-gold-500 font-bold mb-2 text-lg">{section.title}</h4>
                          <p className="text-gray-400 text-sm leading-relaxed">{section.content}</p>
                       </div>
                    ))}
                 </div>
                 <div className="pt-6">
                    <button className="bg-gold-600 text-white px-8 py-3 rounded-full font-bold hover:bg-gold-500 transition shadow-xl">VIP 밤문화 예약 상담</button>
                 </div>
              </div>
              <div className="flex-1 w-full">
                 <img src={content.introImage} className="w-full h-[550px] object-cover rounded-3xl shadow-[0_0_50px_rgba(197,160,40,0.2)]" alt="Nightlife" />
              </div>
           </div>

           <div className="text-center mb-16">
              <h3 className="text-2xl font-bold text-white uppercase tracking-widest border-b-2 border-gold-500 inline-block pb-2">HCMC Night Collection</h3>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {content.galleryImages.map((img, idx) => (
                  <div key={idx} className="group overflow-hidden rounded-2xl shadow-2xl h-[450px] relative border border-white/5">
                     <img src={img} className="w-full h-full object-cover transform group-hover:scale-105 transition duration-1000" alt={`Men ${idx}`} />
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                     <div className="absolute bottom-8 left-8 right-8 text-white">
                        <p className="text-gold-500 font-bold mb-2">Exclusive Guide {idx + 1}</p>
                        <h4 className="text-2xl font-bold mb-2">Venue Style {idx + 1}</h4>
                        <p className="text-sm opacity-60">최고의 서비스를 보장하는 검증된 장소입니다.</p>
                     </div>
                  </div>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
};

export default ForMenPage;
