
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from 'recharts';
import { WorshipStats } from '../types';

const data = [
  { day: 'Mar 1', salah: 4 },
  { day: 'Mar 2', salah: 5 },
  { day: 'Mar 3', salah: 3 },
  { day: 'Mar 4', salah: 5 },
  { day: 'Mar 5', salah: 5 },
  { day: 'Mar 6', salah: 4 },
  { day: 'Today', salah: 4 },
];

interface Props {
  stats: WorshipStats;
}

const Insights: React.FC<Props> = ({ stats }) => {
  return (
    <div className="px-6 py-4 animate-fade-in space-y-8">
      <header>
         <h1 className="text-2xl font-bold font-display">Spiritual Insights</h1>
         <p className="text-xs text-slate-500">Your journey of consistency</p>
      </header>

      <section className="grid grid-cols-2 gap-4">
         <div className="bg-primary/10 p-5 rounded-4xl border border-primary/20 flex flex-col justify-between h-36">
            <span className="material-icons-round text-primary filled">local_fire_department</span>
            <div>
               <p className="text-2xl font-bold text-white">{stats.streak}</p>
               <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active Streak</p>
            </div>
         </div>
         <div className="bg-secondary/10 p-5 rounded-4xl border border-secondary/20 flex flex-col justify-between h-36">
            <span className="material-icons-round text-secondary filled">verified</span>
            <div>
               <p className="text-2xl font-bold text-white">94%</p>
               <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Consistency</p>
            </div>
         </div>
      </section>

      <section className="bg-surface-dark p-6 rounded-4xl border border-white/5">
        <div className="flex justify-between items-center mb-6">
           <div>
              <h3 className="font-bold text-sm">Salah Punctuality</h3>
              <p className="text-[10px] text-slate-500">Last 7 Days</p>
           </div>
           <div className="bg-primary/20 px-3 py-1 rounded-full text-primary text-[10px] font-bold">+12%</div>
        </div>
        
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 0, left: -40, bottom: 0 }}>
              <Tooltip 
                cursor={{fill: 'rgba(255,255,255,0.05)'}} 
                contentStyle={{backgroundColor: '#121214', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px'}}
                itemStyle={{color: '#C08439'}}
              />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#64748b'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#64748b'}} domain={[0, 5]} />
              <Bar dataKey="salah" radius={[10, 10, 10, 10]} barSize={24}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === data.length - 1 ? '#C08439' : '#C0843933'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="bg-gradient-to-br from-primary/20 to-secondary/20 p-6 rounded-4xl border border-white/10 relative overflow-hidden group">
         <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-150 transition-transform">
            <span className="material-symbols-outlined text-8xl">auto_awesome</span>
         </div>
         <div className="relative z-10 space-y-3">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
               <span className="material-icons-round text-primary filled">military_tech</span>
            </div>
            <h4 className="font-bold text-white">Consistent Mu'min</h4>
            <p className="text-xs text-white/70 leading-relaxed">You've completed all 5 daily prayers for 7 consecutive days. Your devotion is inspiring!</p>
         </div>
      </section>
    </div>
  );
};

export default Insights;
