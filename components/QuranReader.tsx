
import React, { useState } from 'react';
import { SURAH_LIST } from '../constants';

const QuranReader: React.FC = () => {
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null);

  if (selectedSurah) {
    const surah = SURAH_LIST.find(s => s.id === selectedSurah);
    return (
      <div className="animate-fade-in flex flex-col h-full">
        <header className="px-6 py-4 flex items-center justify-between border-b border-white/5 sticky top-0 bg-bg-dark/80 backdrop-blur-xl z-10">
          <button onClick={() => setSelectedSurah(null)} className="text-slate-500">
            <span className="material-icons-round">arrow_back_ios</span>
          </button>
          <div className="text-center">
            <h2 className="text-lg font-display font-bold text-primary">{surah?.name}</h2>
            <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">{surah?.englishName}</p>
          </div>
          <button className="text-slate-500">
            <span className="material-icons-round">bookmark_border</span>
          </button>
        </header>

        <main className="flex-1 p-6 space-y-12">
          <div className="text-center py-8">
            <p className="font-arabic text-3xl text-primary">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
          </div>
          
          <div className="space-y-10">
            {[1, 2, 3].map(v => (
              <div key={v} className="space-y-4">
                <div className="flex justify-between items-center">
                   <div className="w-6 h-6 rounded-full border border-primary/30 flex items-center justify-center text-[10px] text-primary">{v}</div>
                   <button className="text-slate-700"><span className="material-icons-round text-sm">more_horiz</span></button>
                </div>
                <p className="font-arabic text-3xl text-right leading-[2.5] text-white/90">
                   {v === 1 ? 'الٓمٓ' : v === 2 ? 'ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ' : 'الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ الصَّلَاةَ وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ'}
                </p>
                <p className="text-sm text-slate-400 font-light leading-relaxed">
                  {v === 1 ? 'Alif, Lam, Meem.' : v === 2 ? 'This is the Book about which there is no doubt, a guidance for those conscious of Allah.' : 'Who believe in the unseen, establish prayer, and spend out of what We have provided for them.'}
                </p>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="px-6 py-4 animate-fade-in space-y-6">
      <header className="flex items-center justify-between">
         <h1 className="text-2xl font-bold font-display">Al Quran</h1>
         <div className="bg-white/5 p-2 rounded-full">
            <span className="material-icons-round text-slate-400">search</span>
         </div>
      </header>

      <section className="grid grid-cols-1 gap-3">
        {SURAH_LIST.map((surah) => (
          <div 
            key={surah.id} 
            onClick={() => setSelectedSurah(surah.id)}
            className="flex items-center justify-between p-4 bg-surface-dark border border-white/5 rounded-3xl hover:border-primary/20 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-xs font-bold group-hover:bg-primary group-hover:text-white transition-colors">
                {surah.id}
              </div>
              <div>
                <h3 className="font-bold text-sm">{surah.englishName}</h3>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{surah.type} • {surah.verses} Verses</p>
              </div>
            </div>
            <p className="font-arabic text-xl text-primary">{surah.name}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default QuranReader;
