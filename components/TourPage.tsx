
import React from 'react';
import { PageContent } from '../types';

interface Props {
  content: PageContent;
  onBack: () => void;
}

const TourPage: React.FC<Props> = ({ content, onBack }) => {
  return (
    <div className="min-h-screen bg-white text-black font-sans overflow-x-hidden">
      <div className="fixed top-0 left-0 w-full z-50 p-4 flex justify-between items-center bg-gradient-to-b from-white/80 to-transparent">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-black/10 backdrop-blur-md border border-black/10 flex items-center justify-center hover:bg-black/20 transition text-black">←</button>
      </div>

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={content.heroImage} alt="Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 text-center animate-fade-in-up px-4">
           <h1 className="text-6xl md:text-9xl font-bold text-white mb-4 uppercase drop-shadow-2xl" style={{ fontFamily: 'serif' }}>{content.heroTitle}</h1>
           <p className="text-xl md:text-2xl font-bold text-gold-400 tracking-[0.3em] uppercase">{content.heroSubtitle}</p>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
           <h2 className="text-4xl md:text-5xl font-bold text-deepgreen uppercase mb-6">{content.introTitle}</h2>
           <div className="h-1.5 w-24 bg-gold-500 mx-auto mb-8"></div>
           <p className="max-w-4xl mx-auto text-lg leading-relaxed text-gray-700 font-light whitespace-pre-line">{content.introText}</p>
        </div>

        {/* Dynamic Managed Sections */}
        <div className="space-y-32 mb-24">
           {content.sections.map((section, idx) => (
              <div key={idx} className={`flex flex-col lg:flex-row gap-16 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                 <div className="flex-1 space-y-6">
                    <h3 className="text-4xl md:text-5xl font-bold text-deepgreen uppercase leading-tight">{section.title}</h3>
                    <div className="h-1 w-16 bg-gold-400"></div>
                    <p className="text-gray-600 leading-relaxed text-lg">{section.content}</p>
                 </div>
                 <div className="flex-1 w-full">
                    <img 
                      src={content.galleryImages[idx] || (idx === 0 ? content.introImage : 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800')} 
                      className="w-full h-[450px] object-cover rounded-3xl shadow-2xl" 
                      alt={section.title} 
                    />
                 </div>
              </div>
           ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-12 border-t border-gray-100">
           {content.galleryImages.slice(content.sections.length).map((img, idx) => (
               <div key={idx} className="group relative h-64 overflow-hidden rounded-2xl shadow-lg">
                  <img src={img} className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700" alt={`Tour Additional ${idx}`} />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
               </div>
           ))}
        </div>
      </section>
    </div>
  );
};

export default TourPage;
