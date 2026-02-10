
import React, { useState, useEffect, useCallback } from 'react';
import { AppTab, WorshipStats, PrayerTime } from './types';
import { PRAYER_NAMES } from './constants';
import Dashboard from './components/Dashboard';
import Tracker from './components/Tracker';
import QuranReader from './components/QuranReader';
import Tasbeeh from './components/Tasbeeh';
import Insights from './components/Insights';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DASHBOARD);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [stats, setStats] = useState<WorshipStats>({
    salahCount: 4,
    quranPages: 12,
    dhikrCount: 1245,
    streak: 12,
    lastUpdated: new Date().toISOString()
  });

  const [prayers, setPrayers] = useState<PrayerTime[]>([
    { name: "Fajr", time: "05:12 AM", completed: true, icon: "wb_twilight" },
    { name: "Dhuhr", time: "12:34 PM", completed: true, icon: "light_mode" },
    { name: "Asr", time: "03:58 PM", completed: true, icon: "wb_sunny" },
    { name: "Maghrib", time: "06:42 PM", completed: true, icon: "nights_stay" },
    { name: "Isha", time: "08:05 PM", completed: false, icon: "bedtime" }
  ]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const togglePrayer = (index: number) => {
    const newPrayers = [...prayers];
    newPrayers[index].completed = !newPrayers[index].completed;
    setPrayers(newPrayers);
    
    const count = newPrayers.filter(p => p.completed).length;
    setStats(prev => ({ ...prev, salahCount: count }));
  };

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.DASHBOARD: return <Dashboard stats={stats} nextPrayer={prayers[4]} onOpenTracker={() => setActiveTab(AppTab.TRACKER)} />;
      case AppTab.TRACKER: return <Tracker prayers={prayers} stats={stats} onToggle={togglePrayer} onUpdateStats={setStats} />;
      case AppTab.QURAN: return <QuranReader />;
      case AppTab.TASBEEH: return <Tasbeeh stats={stats} onUpdateStats={setStats} />;
      case AppTab.INSIGHTS: return <Insights stats={stats} />;
      default: return <Dashboard stats={stats} nextPrayer={prayers[4]} onOpenTracker={() => setActiveTab(AppTab.TRACKER)} />;
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-slate-100 dark:bg-black font-sans selection:bg-primary/30">
      <div className="w-full max-w-[430px] bg-white dark:bg-bg-dark h-screen relative flex flex-col shadow-2xl overflow-hidden border-x border-gray-200 dark:border-white/5">
        {/* Status Bar Mock */}
        <div className="h-10 px-8 flex justify-between items-center shrink-0 z-50">
          <span className="text-sm font-semibold dark:text-white">9:41</span>
          <div className="flex gap-1.5 items-center dark:text-white">
            <span className="material-icons-round text-sm">signal_cellular_alt</span>
            <span className="material-icons-round text-sm">wifi</span>
            <span className="material-icons-round text-sm">battery_full</span>
          </div>
        </div>

        {/* Dynamic Content */}
        <main className="flex-1 overflow-y-auto hide-scrollbar">
          {renderContent()}
        </main>

        {/* Theme Toggle Floating */}
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="fixed top-12 right-6 z-[60] w-10 h-10 rounded-full bg-white dark:bg-surface-dark shadow-xl border border-gray-200 dark:border-white/10 flex items-center justify-center transition-all active:scale-90"
        >
          <span className="material-icons-round text-primary">
            {isDarkMode ? 'light_mode' : 'dark_mode'}
          </span>
        </button>

        {/* Premium Bottom Nav */}
        <nav className="h-20 bg-white/80 dark:bg-surface-dark/80 backdrop-blur-xl border-t border-gray-100 dark:border-white/5 px-6 flex justify-between items-center shrink-0 z-50">
          {[
            { tab: AppTab.DASHBOARD, icon: 'home', label: 'Home' },
            { tab: AppTab.TRACKER, icon: 'assessment', label: 'Tracker' },
            { tab: AppTab.TASBEEH, icon: 'radio_button_checked', label: 'Dhikr' },
            { tab: AppTab.QURAN, icon: 'menu_book', label: 'Quran' },
            { tab: AppTab.INSIGHTS, icon: 'bar_chart', label: 'Stats' },
          ].map((item) => (
            <button 
              key={item.tab}
              onClick={() => setActiveTab(item.tab)}
              className={`flex flex-col items-center gap-1 transition-all duration-300 ${activeTab === item.tab ? 'text-primary scale-110' : 'text-slate-400'}`}
            >
              <span className={`material-icons-round ${activeTab === item.tab ? 'filled' : ''}`}>
                {item.icon}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
              {activeTab === item.tab && <div className="w-1 h-1 bg-primary rounded-full animate-fade-in" />}
            </button>
          ))}
        </nav>
        
        {/* iOS Home Indicator */}
        <div className="h-6 flex justify-center items-center dark:bg-surface-dark/80 backdrop-blur-xl shrink-0">
          <div className="w-32 h-1 bg-slate-300 dark:bg-white/20 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default App;
