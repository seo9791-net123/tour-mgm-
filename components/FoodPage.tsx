
import React from 'react';
import { PageContent } from '../types';

interface Props {
  content: PageContent;
  onBack: () => void;
}

const FoodPage: React.FC<Props> = ({ content, onBack }) => {
  return (
    <div className="min-h-screen bg-white text-black font-sans overflow-x-hidden">
      <div className="fixed top-0 left-0 w-full z-50 p-4 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/40 transition text-white">←</button>
      </div>

      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={content.heroImage} alt="Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 text-center animate-fade-in-up px-4">
           <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 uppercase drop-shadow-xl">{content.heroTitle}</h1>
           <p className="text-xl md:text-2xl text-gold-400 font-bold tracking-widest">{content.heroSubtitle}</p>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
           <h2 className="text-4xl md:text-5xl font-bold uppercase mb-6 text-deepgreen">{content.introTitle}</h2>
           <div className="h-1.5 w-24 bg-gold-500 mx-auto mb-8"></div>
           <p className="max-w-4xl mx-auto text-lg leading-relaxed text-gray-700 font-light">{content.introText}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           <div className="md:col-span-2 lg:col-span-2 relative h-[400px] overflow-hidden rounded-3xl shadow-2xl">
              <img src={content.introImage} className="w-full h-full object-cover" alt="Main Food" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                 <div className="text-white">
                    <h3 className="text-2xl font-bold mb-2">Signature Vietnamese Dish</h3>
                    <p className="opacity-80">베트남의 영혼을 담은 최고의 요리를 만나보세요.</p>
                 </div>
              </div>
           </div>
           {content.sections.map((section, idx) => (
               <div key={idx} className="bg-white border border-gray-100 p-8 rounded-3xl shadow-sm flex flex-col justify-center">
                  <h4 className="text-xl font-bold mb-4 text-gold-600">{section.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{section.content}</p>
               </div>
           ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {content.galleryImages.map((img, idx) => (
                <div key={idx} className="group overflow-hidden rounded-2xl shadow-xl h-48 relative">
                   <img src={img} className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700" alt={`Food Gallery ${idx}`} />
                </div>
            ))}
        </div>
      </section>
      
      <section className="py-24 bg-gray-50 border-t">
         <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4">
               <div className="text-4xl">🍜</div>
               <h4 className="text-xl font-bold">오리지널 쌀국수</h4>
               <p className="text-gray-500 text-sm">깊고 진한 육수의 베트남 전통 맛집만을 엄선하여 안내합니다.</p>
            </div>
            <div className="space-y-4">
               <div className="text-4xl">🦞</div>
               <h4 className="text-xl font-bold">붕따우 해산물</h4>
               <p className="text-gray-500 text-sm">항구 도시 붕따우의 갓 잡아 올린 신선한 해산물을 즐기세요.</p>
            </div>
            <div className="space-y-4">
               <div className="text-4xl">🍹</div>
               <h4 className="text-xl font-bold">루프탑 디너</h4>
               <p className="text-gray-500 text-sm">호치민 시내의 화려한 야경과 함께하는 로맨틱한 정찬 코스입니다.</p>
            </div>
         </div>
      </section>
    </div>
  );
};

export default FoodPage;
