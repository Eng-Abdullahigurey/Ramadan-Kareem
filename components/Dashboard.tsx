
import React, { useState, useEffect } from 'react';
import { WorshipStats, PrayerTime } from '../types';
import { getDailyReflection } from '../services/geminiService';

interface Props {
  stats: WorshipStats;
  nextPrayer: PrayerTime;
  onOpenTracker: () => void;
}

const Dashboard: React.FC<Props> = ({ stats, nextPrayer, onOpenTracker }) => {
  const [reflection, setReflection] = useState("Indeed, with hardship [will be] ease.");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReflection = async () => {
      setLoading(true);
      const text = await getDailyReflection(stats.streak);
      setReflection(text);
      setLoading(false);
    };
    fetchReflection();
  }, [stats.streak]);

  return (
    <div className="px-6 py-4 animate-fade-in space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Assalamu Alaikum</p>
          <h1 className="text-2xl font-display font-bold text-primary">NoorTrack</h1>
        </div>
        <div className="w-10 h-10 rounded-full bg-primary/20 border-2 border-primary/30 flex items-center justify-center overflow-hidden">
          <img src="https://picsum.photos/seed/noor/200" alt="Avatar" className="w-full h-full object-cover" />
        </div>
      </header>

      {/* Main Prayer Card */}
      <section className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-[#1A1A1C] to-[#2D2D30] p-6 shadow-2xl border border-white/5">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-primary">
              <span className="material-icons-round text-sm">location_on</span>
              <span className="text-[10px] font-bold uppercase tracking-widest">London, UK</span>
            </div>
            <h2 className="text-4xl font-bold text-white">{nextPrayer.name} <span className="text-primary">{nextPrayer.time}</span></h2>
            <p className="text-slate-400 text-sm">Next prayer in <span className="text-white">45 mins</span></p>
          </div>
          <div className="bg-white/5 p-2 rounded-2xl text-center border border-white/10">
            <span className="block text-[8px] font-bold text-primary uppercase">Imsak</span>
            <span className="text-xs font-bold text-white">04:12</span>
          </div>
        </div>
        <div className="mt-8 flex justify-between items-center">
           <div className="flex items-center gap-2 flex-1 max-w-[150px]">
              <div className="h-1.5 flex-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-2/3 shadow-[0_0_10px_rgba(192,132,57,0.5)]"></div>
              </div>
           </div>
           <button onClick={onOpenTracker} className="bg-primary text-black px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-accent transition-colors">
             Full Schedule
           </button>
        </div>
      </section>

      {/* Daily Reflection (Gemini Powered) */}
      <section className="space-y-3">
        <div className="flex justify-between items-end">
          <h3 className="text-lg font-bold">Spiritual Focus</h3>
          <span className="text-[10px] text-primary font-bold uppercase tracking-tighter">Powered by Noor AI</span>
        </div>
        <div className="bg-surface-dark p-6 rounded-4xl border border-white/5 relative group">
          <span className="material-icons-round text-primary/20 absolute top-4 left-4 text-6xl select-none">format_quote</span>
          <p className={`text-slate-300 italic leading-relaxed relative z-10 transition-opacity duration-500 ${loading ? 'opacity-50' : 'opacity-100'}`}>
            "{reflection}"
          </p>
          <div className="mt-4 flex justify-between items-center relative z-10">
            <span className="text-[10px] font-bold text-primary tracking-widest uppercase">Reflection for Day {stats.streak}</span>
            <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-500 hover:text-white transition-colors">
              <span className="material-icons-round text-sm">share</span>
            </button>
          </div>
        </div>
      </section>

      {/* Stats Quick View */}
      <section className="grid grid-cols-2 gap-4">
        <div className="bg-surface-dark p-5 rounded-4xl border border-white/5 flex flex-col justify-between h-40">
           <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
             <span className="material-icons-round">local_fire_department</span>
           </div>
           <div>
              <p className="text-3xl font-bold text-white">{stats.streak}</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Day Streak</p>
           </div>
        </div>
        <div className="bg-surface-dark p-5 rounded-4xl border border-white/5 flex flex-col justify-between h-40">
           <div className="w-10 h-10 rounded-2xl bg-secondary/20 flex items-center justify-center text-secondary">
             <span className="material-icons-round">menu_book</span>
           </div>
           <div>
              <p className="text-3xl font-bold text-white">{stats.quranPages}</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Pages Read</p>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
