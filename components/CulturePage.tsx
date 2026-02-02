
import React from 'react';
import { PageContent } from '../types';

interface Props {
  content: PageContent;
  onBack: () => void;
}

const CulturePage: React.FC<Props> = ({ content, onBack }) => {
  return (
    <div className="min-h-screen bg-[#fcfcf7] text-black font-sans overflow-x-hidden">
      <div className="fixed top-0 left-0 w-full z-50 p-4 flex justify-between items-center bg-gradient-to-b from-white/80 to-transparent">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-black/10 backdrop-blur-md border border-black/10 flex items-center justify-center hover:bg-black/20 transition text-black">←</button>
      </div>

      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={content.heroImage} alt="Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        <div className="relative z-10 text-center animate-fade-in-up px-4">
           <h1 className="text-5xl md:text-8xl font-bold text-white mb-6 uppercase drop-shadow-2xl" style={{ fontFamily: 'serif' }}>{content.heroTitle}</h1>
           <p className="text-xl md:text-2xl font-light tracking-[0.4em] text-gold-400 uppercase font-bold">{content.heroSubtitle}</p>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4">
         <div className="flex flex-col lg:flex-row gap-16 items-center mb-24">
            <div className="flex-1 order-2 lg:order-1">
               <img src={content.introImage} className="w-full h-[550px] object-cover rounded-3xl shadow-2xl" alt="Intro" />
            </div>
            <div className="flex-1 order-1 lg:order-2 space-y-8">
               <h2 className="text-4xl md:text-5xl font-bold text-deepgreen uppercase leading-tight">{content.introTitle}</h2>
               <div className="h-1.5 w-24 bg-gold-500"></div>
               <p className="text-lg leading-relaxed text-gray-700 font-light whitespace-pre-line">{content.introText}</p>
               <div className="grid grid-cols-1 gap-6">
                  {content.sections.map((section, idx) => (
                     <div key={idx} className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                        <p className="font-bold text-gold-600 mb-2 text-xl">{section.title}</p>
                        <p className="text-sm text-gray-500 leading-relaxed">{section.content}</p>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         <div className="text-center mb-16">
            <h3 className="text-3xl font-bold uppercase tracking-widest text-deepgreen">Culture & Beauty Collection</h3>
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.galleryImages.map((img, idx) => (
                <div key={idx} className="group relative h-96 overflow-hidden rounded-3xl shadow-lg">
                   <img src={img} className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700" alt={`Culture ${idx}`} />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-8 flex items-end">
                      <p className="text-white font-bold text-lg">Vietnam Heritage Experience {idx + 1}</p>
                   </div>
                </div>
            ))}
         </div>
      </section>
    </div>
  );
};

export default CulturePage;
