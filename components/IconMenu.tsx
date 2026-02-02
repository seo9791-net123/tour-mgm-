
import React from 'react';

interface MenuItem {
  label: string;
  icon: string;
}

interface Props {
  items: MenuItem[];
  onItemClick?: (label: string) => void;
}

const IconMenu: React.FC<Props> = ({ items, onItemClick }) => {
  return (
    <div className="py-12 bg-white max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-4 md:grid-cols-8 gap-6 md:gap-8">
        {items.map((item, index) => (
          <div
            key={index}
            onClick={() => onItemClick && onItemClick(item.label)}
            className="group flex flex-col items-center gap-3 cursor-pointer transition-transform duration-300 hover:-translate-y-2"
          >
            {/* 3D Icon Container with Enhanced Glassmorphism */}
            <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-[2rem] bg-gradient-to-br from-gray-50 to-white shadow-[0_10px_30px_rgba(0,0,0,0.05)] flex items-center justify-center border border-white group-hover:shadow-[0_20px_40px_rgba(197,160,40,0.2)] group-hover:border-gold-200 transition-all duration-500 overflow-hidden">
               {/* Decorative background glow */}
               <div className="absolute inset-0 bg-gradient-to-tr from-gold-100/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
               
               {/* Icon Image - Increased size to match "Video" icon prominence */}
               <img 
                 src={item.icon} 
                 alt={item.label}
                 className="w-14 h-14 md:w-16 md:h-16 object-contain drop-shadow-xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ease-out z-10"
                 onError={(e) => {
                   (e.target as HTMLImageElement).style.display = 'none';
                   (e.target as HTMLImageElement).parentElement!.innerText = item.icon;
                 }}
               />
               
               {/* High-end Shine effect */}
               <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-[-25deg] group-hover:animate-[shine_0.8s_ease-in-out]"></div>
            </div>
            
            {/* Label - Bolder and clearer */}
            <span className="text-[11px] md:text-[13px] font-bold text-gray-600 group-hover:text-deepgreen tracking-tight transition-colors duration-300 text-center leading-tight">
              {item.label}
            </span>
          </div>
        ))}
      </div>
      
      <style>{`
        @keyframes shine {
          0% { left: -100%; }
          100% { left: 200%; }
        }
      `}</style>
    </div>
  );
};

export default IconMenu;
