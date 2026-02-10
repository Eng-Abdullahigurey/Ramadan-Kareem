
import React, { useState } from 'react';
import { WorshipStats } from '../types';
import { DHIKR_LIST } from '../constants';

interface Props {
  stats: WorshipStats;
  onUpdateStats: (stats: WorshipStats) => void;
}

const Tasbeeh: React.FC<Props> = ({ stats, onUpdateStats }) => {
  const [currentDhikrIndex, setCurrentDhikrIndex] = useState(0);
  const [sessionCount, setSessionCount] = useState(0);
  const target = 33;

  const handleIncrement = () => {
    setSessionCount(prev => prev + 1);
    onUpdateStats({ ...stats, dhikrCount: stats.dhikrCount + 1 });
    
    // Haptic feedback logic if available in target platform
    if ('vibrate' in navigator) navigator.vibrate(20);
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSessionCount(0);
  };

  const currentDhikr = DHIKR_LIST[currentDhikrIndex];
  const progress = (sessionCount / target) * 100;

  return (
    <div className="px-6 py-4 animate-fade-in flex flex-col h-full space-y-8">
      <header className="text-center space-y-2">
         <h1 className="text-2xl font-bold font-display">Tasbeeh Counter</h1>
         <div 
           className="flex items-center justify-center gap-2 cursor-pointer bg-white/5 w-fit mx-auto px-4 py-1.5 rounded-full"
           onClick={() => setCurrentDhikrIndex((prev) => (prev + 1) % DHIKR_LIST.length)}
         >
           <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Select Dhikr</span>
           <span className="material-icons-round text-primary text-xs">expand_more</span>
         </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center space-y-12">
        <div className="text-center space-y-4">
          <p className="font-arabic text-5xl text-white drop-shadow-[0_0_15px_rgba(192,132,57,0.3)]">{currentDhikr.arabic}</p>
          <div className="space-y-1">
            <p className="text-primary font-medium">{currentDhikr.transliteration}</p>
            <p className="text-xs text-slate-500 italic">{currentDhikr.meaning}</p>
          </div>
        </div>

        {/* Counter UI */}
        <div 
          onClick={handleIncrement}
          className="relative w-72 h-72 flex items-center justify-center cursor-pointer group active:scale-95 transition-transform"
        >
          {/* Progress Ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
            <circle cx="50" cy="50" fill="transparent" r="46" stroke="rgba(255,255,255,0.05)" strokeWidth="4"></circle>
            <circle 
              cx="50" cy="50" fill="transparent" r="46" stroke="var(--primary-gold)" strokeWidth="4"
              strokeDasharray="289" 
              strokeDashoffset={289 - (289 * (progress % 100)) / 100}
              className="transition-all duration-300 ease-out"
              style={{ stroke: 'url(#goldGradient)' }}
            ></circle>
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#C08439" />
                <stop offset="100%" stopColor="#E5C17C" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center Button */}
          <div className="w-56 h-56 rounded-full bg-surface-dark border border-white/10 flex flex-col items-center justify-center shadow-2xl relative z-10 group-hover:border-primary/30 transition-colors">
            <span className="text-6xl font-display font-bold text-white mb-1">{sessionCount}</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Count</span>
          </div>

          <button 
            onClick={handleReset}
            className="absolute -right-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 hover:text-primary transition-colors z-20"
          >
            <span className="material-icons-round text-xl">refresh</span>
          </button>
        </div>

        <div className="w-full flex justify-between px-6 py-4 bg-surface-dark rounded-4xl border border-white/5">
           <div className="text-center">
             <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-1">Target</p>
             <p className="font-bold text-white">{target}</p>
           </div>
           <div className="w-px h-8 bg-white/5"></div>
           <div className="text-center">
             <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-1">Total Today</p>
             <p className="font-bold text-white">{stats.dhikrCount}</p>
           </div>
           <div className="w-px h-8 bg-white/5"></div>
           <div className="text-center">
             <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-1">Cycle</p>
             <p className="font-bold text-primary">{Math.floor(sessionCount / target)}</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Tasbeeh;
