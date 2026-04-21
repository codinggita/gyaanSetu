import React, { useState, useMemo } from 'react';
import { 
  Trophy, 
  Medal, 
  Crown, 
  TrendingUp, 
  MapPin, 
  Search, 
  ChevronRight, 
  ArrowUp, 
  ArrowDown,
  Filter,
  Users,
  Globe,
  Building,
  Target
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { mockLeaderboard } from '../public/landing/data/mockData';

const Leaderboard = () => {
  const [filterRegion, setFilterRegion] = useState('Global'); // Global, State, City
  const [filterPeriod, setFilterPeriod] = useState('Weekly'); // Weekly, Monthly
  const [searchQuery, setSearchQuery] = useState('');

  // Extended mock data for larger leaderboard simulation
  const extendedScholars = useMemo(() => {
    const base = [...mockLeaderboard];
    // Add some extra random scholars to fill the list
    for (let i = 6; i <= 20; i++) {
        base.push({
            rank: i,
            name: `Scholar ${i}`,
            city: i % 2 === 0 ? 'Indore' : 'Ahmedabad',
            xp: Math.floor(1500 - (i * 50)),
            avatar: `https://i.pravatar.cc/150?u=${i + 50}`,
            isCurrentUser: false,
            trend: Math.random() > 0.5 ? 'up' : 'down'
        });
    }
    return base;
  }, []);

  const filteredScholars = useMemo(() => {
    return extendedScholars.filter(s => {
       const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             s.city.toLowerCase().includes(searchQuery.toLowerCase());
       
       if (filterRegion === 'Global') return matchesSearch;
       if (filterRegion === 'City') return matchesSearch && s.city === 'Ahmedabad'; // Mock local filter
       return matchesSearch;
    });
  }, [extendedScholars, searchQuery, filterRegion]);

  const topThree = filteredScholars.slice(0, 3);
  const others = filteredScholars.slice(3);
  const currentUser = extendedScholars.find(u => u.isCurrentUser);

  return (
    <div className="p-4 md:p-8 max-w-[1200px] mx-auto animate-in fade-in duration-700">
      <Helmet>
        <title>Leaderboard | Scholar Rankings — GyaanSetu</title>
      </Helmet>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
           <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500">
                 <Trophy size={20} />
              </div>
              <Badge variant="primary" className="font-black uppercase tracking-widest text-[10px]">Active Season: Oct 2026</Badge>
           </div>
           <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter mb-4">
              Hall of Excellence
           </h1>
           <p className="text-slate-500 dark:text-slate-400 font-bold max-w-xl italic">
              Competing for knowledge, leading with skills. Top scholars of the week from across Bharat.
           </p>
        </div>

        <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
           <button 
             onClick={() => setFilterPeriod('Weekly')}
             className={cn("px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all", filterPeriod === 'Weekly' ? "bg-primary text-white shadow-lg" : "text-slate-400 hover:text-slate-600")}
           >
             Weekly
           </button>
           <button 
             onClick={() => setFilterPeriod('Monthly')}
             className={cn("px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all", filterPeriod === 'Monthly' ? "bg-primary text-white shadow-lg" : "text-slate-400 hover:text-slate-600")}
           >
             Monthly
           </button>
        </div>
      </div>

      {/* Podium Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end mb-20 px-4">
        
        {/* Rank 2 - Podium Left */}
        {topThree[1] && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="order-2 md:order-1 flex flex-col items-center"
          >
             <div className="relative mb-6">
                <div className="w-24 h-24 rounded-[32px] border-4 border-slate-200 dark:border-slate-700 overflow-hidden shadow-xl">
                   <img src={topThree[1].avatar} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-slate-400 rounded-2xl border-4 border-white dark:border-slate-900 flex items-center justify-center text-white font-black text-sm">
                   2
                </div>
             </div>
             <div className="text-center mb-6">
                <h3 className="font-black text-slate-800 dark:text-white mb-0.5">{topThree[1].name}</h3>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{topThree[1].xp} XP</span>
             </div>
             <div className="w-full h-32 bg-slate-100 dark:bg-slate-800 rounded-t-[40px] border-t-2 border-slate-200 dark:border-slate-700/50 flex flex-col items-center justify-center">
                <Medal size={24} className="text-slate-400 mb-2" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Silver Tier</span>
             </div>
          </motion.div>
        )}

        {/* Rank 1 - Podium Center */}
        {topThree[0] && (
          <motion.div 
             initial={{ opacity: 0, y: 40 }}
             animate={{ opacity: 1, y: 0 }}
             className="order-1 md:order-2 flex flex-col items-center"
          >
             <Crown size={32} className="text-amber-500 mb-4 animate-bounce" />
             <div className="relative mb-6">
                <div className="w-32 h-32 rounded-[40px] border-4 border-amber-400 overflow-hidden shadow-2xl ring-8 ring-amber-400/10 scale-110">
                   <img src={topThree[0].avatar} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-amber-400 rounded-2xl border-4 border-white dark:border-slate-900 flex items-center justify-center text-white font-black text-lg shadow-xl">
                   1
                </div>
             </div>
             <div className="text-center mb-10">
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-1">{topThree[0].name}</h3>
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 bg-amber-50 dark:bg-amber-900/20 px-3 py-1 rounded-full">{topThree[0].xp} XP • CHAMPION</span>
             </div>
             <div className="w-full h-48 bg-gradient-to-t from-amber-500/20 to-amber-500/5 dark:from-amber-900/20 dark:to-transparent rounded-t-[48px] border-t-4 border-amber-400/50 flex flex-col items-center justify-center">
                <Trophy size={40} className="text-amber-500 mb-4 drop-shadow-lg" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-600">Gold Champion</span>
             </div>
          </motion.div>
        )}

        {/* Rank 3 - Podium Right */}
        {topThree[2] && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="order-3 flex flex-col items-center"
          >
             <div className="relative mb-6">
                <div className="w-24 h-24 rounded-[32px] border-4 border-orange-200 dark:border-orange-900/50 overflow-hidden shadow-xl">
                   <img src={topThree[2].avatar} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-orange-400 rounded-2xl border-4 border-white dark:border-slate-900 flex items-center justify-center text-white font-black text-sm">
                   3
                </div>
             </div>
             <div className="text-center mb-6">
                <h3 className="font-black text-slate-800 dark:text-white mb-0.5">{topThree[2].name}</h3>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{topThree[2].xp} XP</span>
             </div>
             <div className="w-full h-24 bg-orange-50 dark:bg-slate-800/80 rounded-t-[40px] border-t-2 border-orange-200 dark:border-slate-700/50 flex flex-col items-center justify-center">
                <Medal size={24} className="text-orange-400 mb-2" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-400">Bronze Tier</span>
             </div>
          </motion.div>
        )}
      </div>

      {/* Control Bar & Rankings */}
      <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden mb-20">
         
         {/* Filter Headers */}
         <div className="p-6 md:p-8 border-b border-slate-50 dark:border-slate-800 flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 p-1.5 rounded-[20px]">
               <button 
                  onClick={() => setFilterRegion('Global')}
                  className={cn("flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest duration-300", filterRegion === 'Global' ? "bg-white dark:bg-slate-800 text-primary shadow-sm" : "text-slate-400 hover:text-slate-600")}
               >
                  <Globe size={14} /> Global
               </button>
               <button 
                  onClick={() => setFilterRegion('State')}
                  className={cn("flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest duration-300", filterRegion === 'State' ? "bg-white dark:bg-slate-800 text-primary shadow-sm" : "text-slate-400 hover:text-slate-600")}
               >
                  <Filter size={14} /> State
               </button>
               <button 
                  onClick={() => setFilterRegion('City')}
                  className={cn("flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest duration-300", filterRegion === 'City' ? "bg-white dark:bg-slate-800 text-primary shadow-sm" : "text-slate-400 hover:text-slate-600")}
               >
                  <Building size={14} /> My City
               </button>
            </div>

            <div className="relative w-full max-w-sm">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
               <input 
                  type="text" 
                  placeholder="Search scholars..." 
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border-0 rounded-2xl py-3 pl-12 pr-4 text-xs font-black text-slate-800 dark:text-white placeholder:text-slate-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
               />
            </div>
         </div>

         {/* Scholars Table/List */}
         <div className="divide-y divide-slate-50 dark:divide-slate-800">
            <AnimatePresence mode="popLayout">
               {others.map((scholar, i) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={scholar.rank} 
                    className={cn(
                      "flex items-center p-6 md:px-10 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all group",
                      scholar.isCurrentUser && "bg-primary/5 dark:bg-primary/5 border-l-4 border-l-primary"
                    )}
                  >
                     <div className="w-12 text-lg font-black text-slate-400 group-hover:text-primary transition-colors">
                        {scholar.rank}
                     </div>
                     <div className="flex items-center space-x-4 flex-1">
                        <div className="w-12 h-12 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden relative">
                           <img src={scholar.avatar} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                           <div className="flex items-center gap-2 mb-0.5">
                              <h4 className="text-sm font-black text-slate-900 dark:text-white">{scholar.name}</h4>
                              {scholar.isCurrentUser && <Badge variant="primary" className="text-[8px] px-1.5 py-0">YOU</Badge>}
                           </div>
                           <div className="flex items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                              <MapPin size={10} className="mr-1" /> {scholar.city}
                           </div>
                        </div>
                     </div>

                     <div className="hidden sm:flex flex-col items-center px-10">
                        {scholar.trend === 'up' ? (
                           <ArrowUp className="text-emerald-500 mb-1" size={14} />
                        ) : (
                           <ArrowDown className="text-rose-500 mb-1" size={14} />
                        )}
                        <span className="text-[9px] font-black tracking-widest uppercase text-slate-400">Position</span>
                     </div>

                     <div className="text-right">
                        <div className="text-lg font-black text-slate-900 dark:text-white mb-0.5">{scholar.xp.toLocaleString()}</div>
                        <div className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Total XP</div>
                     </div>

                     <div className="ml-8 hidden md:block">
                        <ChevronRight className="text-slate-200 group-hover:text-primary transition-colors" size={20} />
                     </div>
                  </motion.div>
               ))}
            </AnimatePresence>
         </div>
      </div>

      {/* Sticky Bottom User Stats */}
      {currentUser && (
         <div className="fixed bottom-0 left-0 right-0 z-50 p-6 md:pl-72 flex justify-center pointer-events-none">
            <div className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 px-10 py-5 rounded-[32px] shadow-2xl shadow-primary/20 pointer-events-auto flex items-center gap-12 animate-in slide-in-from-bottom-5 duration-700">
               <div className="flex items-center gap-4 border-r border-slate-100 dark:border-slate-800 pr-12">
                  <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-primary shadow-lg ring-4 ring-primary/10">
                     <img src={currentUser.avatar} alt="Me" className="w-full h-full object-cover" />
                  </div>
                  <div>
                     <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Your Position</div>
                     <div className="text-xl font-black text-slate-900 dark:text-white leading-none">Rank #{currentUser.rank}</div>
                  </div>
               </div>
               
               <div className="hidden sm:block">
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">To Next Rank</div>
                  <div className="flex items-center gap-4">
                     <div className="w-32 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="w-2/3 h-full bg-primary rounded-full transition-all duration-1000" />
                     </div>
                     <span className="text-xs font-black text-primary">160 XP</span>
                  </div>
               </div>

               <div className="flex items-center gap-3">
                  <Target className="text-primary" size={20} />
                  <div>
                     <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Avg Score</div>
                     <div className="text-xl font-black text-slate-900 dark:text-white leading-none">88.5</div>
                  </div>
               </div>
            </div>
         </div>
      )}
    </div>
  );
};

export default Leaderboard;
