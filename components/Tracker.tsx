
import React from 'react';
import { WorshipStats, PrayerTime } from '../types';

interface Props {
  prayers: PrayerTime[];
  stats: WorshipStats;
  onToggle: (index: number) => void;
  onUpdateStats: (stats: WorshipStats) => void;
}

const Tracker: React.FC<Props> = ({ prayers, stats, onToggle, onUpdateStats }) => {
  const completedCount = prayers.filter(p => p.completed).length;

  return (
    <div className="px-6 py-4 animate-fade-in space-y-6">
      <header className="flex items-center justify-between">
         <h1 className="text-2xl font-bold font-display">Worship Tracker</h1>
         <div className="bg-primary/10 px-3 py-1 rounded-full flex items-center gap-1">
            <span className="material-icons-round text-primary text-xs">calendar_today</span>
            <span className="text-[10px] font-bold text-primary uppercase">15 Ramadan</span>
         </div>
      </header>

      <section>
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-lg font-bold">Daily Salah</h2>
          <span className="text-xs text-slate-500">{completedCount}/5 Completed</span>
        </div>
        <div className="space-y-3">
          {prayers.map((prayer, idx) => (
            <div 
              key={prayer.name} 
              onClick={() => onToggle(idx)}
              className={`flex items-center justify-between p-4 rounded-3xl border transition-all duration-300 cursor-pointer ${
                prayer.completed 
                ? 'bg-primary/5 border-primary/20' 
                : 'bg-surface-dark border-white/5'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors ${
                  prayer.completed ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white/5 text-slate-500'
                }`}>
                  <span className="material-icons-round text-xl">{prayer.icon}</span>
                </div>
                <div>
                  <h3 className="font-bold text-sm">{prayer.name}</h3>
                  <p className="text-[10px] font-medium text-slate-500">{prayer.time}</p>
                </div>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                prayer.completed ? 'bg-primary border-primary' : 'border-slate-700'
              }`}>
                {prayer.completed && <span className="material-icons-round text-white text-sm">check</span>}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-2 gap-4">
        <div className="bg-surface-dark p-5 rounded-4xl border border-white/5">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-4">
            <span className="material-icons-round">menu_book</span>
          </div>
          <h3 className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-1">Quran</h3>
          <div className="flex justify-between items-end">
            <p className="text-2xl font-bold">{stats.quranPages}<span className="text-[10px] text-slate-500 ml-1">PGS</span></p>
            <div className="flex gap-1">
              <button 
                onClick={(e) => { e.stopPropagation(); onUpdateStats({...stats, quranPages: Math.max(0, stats.quranPages - 1)})}}
                className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-xs"
              >-</button>
              <button 
                onClick={(e) => { e.stopPropagation(); onUpdateStats({...stats, quranPages: stats.quranPages + 1})}}
                className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-xs"
              >+</button>
            </div>
          </div>
        </div>
        <div className="bg-surface-dark p-5 rounded-4xl border border-white/5">
          <div className="w-10 h-10 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-400 mb-4">
            <span className="material-icons-round">volunteer_activism</span>
          </div>
          <h3 className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-1">Charity</h3>
          <p className="text-2xl font-bold">£0.00</p>
        </div>
      </section>
    </div>
  );
};

export default Tracker;
