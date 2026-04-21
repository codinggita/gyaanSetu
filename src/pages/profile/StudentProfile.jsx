import React from 'react';
import { 
  Award, 
  Flame, 
  TrendingUp, 
  BookOpen, 
  CheckCircle, 
  Calendar, 
  Star, 
  ChevronRight,
  Shield,
  Zap,
  MapPin,
  Clock, 
  ExternalLink, 
  Share
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import ProgressBar from '../../components/ui/ProgressBar';
import { 
  mockUserSkills, 
  mockAchievements, 
  mockActivityHistory,
  mockLeaderboard 
} from '../public/landing/data/mockData';

const StudentProfile = () => {
  // Safe access to mock data
  const leaderboard = mockLeaderboard || [];
  const currentUser = leaderboard.find(u => u.isCurrentUser) || leaderboard[2] || { name: 'Dhruv Ozha', city: 'Bhuj', xp: 1840, avatar: 'https://i.pravatar.cc/150?u=dhruv' };
  const skills = mockUserSkills || [];
  const achievements = mockAchievements || [];
  const history = mockActivityHistory || [];

  const stats = [
    { label: 'Courses Done', value: '12', icon: BookOpen, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { label: 'Projects Finished', value: '4', icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
    { label: 'Rank', value: `#${currentUser.rank || 3}`, icon: Star, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20' },
    { label: 'XP Points', value: (currentUser.xp || 0).toLocaleString(), icon: Zap, color: 'text-primary', bg: 'bg-orange-50 dark:bg-orange-900/20' },
  ];

  return (
    <div className="p-4 md:p-8 max-w-[1600px] mx-auto animate-in fade-in duration-700">
      <Helmet>
        <title>Scholar Profile | {currentUser.name} — GyaanSetu</title>
      </Helmet>

      {/* Hero Section Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        
        {/* Profile Card (Left 4 Cols) */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 p-10 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
            
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-[40px] border-4 border-white dark:border-slate-800 shadow-2xl overflow-hidden ring-8 ring-primary/5 group-hover:rotate-3 transition-transform duration-500">
                  <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-primary rounded-2xl border-4 border-white dark:border-slate-900 flex items-center justify-center text-white shadow-lg">
                  <Award size={20} />
                </div>
              </div>
              
              <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">{currentUser.name}</h1>
              <div className="flex items-center gap-2 text-slate-400 font-bold mb-6">
                <MapPin size={14} />
                <span className="text-[10px] uppercase tracking-widest">{currentUser.city}</span>
              </div>
              
              <div className="w-full grid grid-cols-2 gap-4">
                 <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <div className="text-[10px] font-black text-slate-400 uppercase mb-1">Level</div>
                    <div className="text-xl font-black text-primary italic">18</div>
                 </div>
                 <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <div className="text-[10px] font-black text-slate-400 uppercase mb-1">XP</div>
                    <div className="text-xl font-black text-slate-900 dark:text-white">{currentUser.xp}</div>
                 </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-[40px] p-8 text-white shadow-xl">
             <h3 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center">
                <TrendingUp size={18} className="mr-3 text-primary" />
                Next Milestone
             </h3>
             <div className="space-y-4">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                   <span>Senior Scholar</span>
                   <span className="text-primary">160 XP to goal</span>
                </div>
                <ProgressBar progress={84} color="primary" size="md" className="h-3 rounded-full" />
                <p className="text-[10px] text-slate-400 font-bold leading-relaxed italic">
                   "Your consistency in React Labs is pushing you into the top 5% of scholars this week!"
                </p>
             </div>
          </div>
        </div>

        {/* Main Content (Right 8 Cols) */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          {/* Quick Stats Bento Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 rounded-[32px] p-6 border border-slate-100 dark:border-slate-800 shadow-sm flex items-center space-x-4 hover:border-primary/30 transition-colors">
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", stat.bg, stat.color)}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
                  <div className="text-xl font-black text-slate-900 dark:text-white leading-none">{stat.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Skill Radar / Bars Bento Card */}
          <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 p-10 shadow-sm flex-1">
             <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight mb-10 flex items-center">
                <Shield size={28} className="mr-3 text-emerald-500" />
                Technical Proficiencies
             </h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
               {skills.map((skill, index) => (
                 <div key={index} className="space-y-3">
                    <div className="flex justify-between items-end">
                       <span className="text-sm font-black text-slate-700 dark:text-slate-200 uppercase tracking-tight">{skill.name}</span>
                       <span className="text-[10px] font-black uppercase text-slate-400 bg-slate-50 dark:bg-slate-800/50 px-2 py-0.5 rounded-lg">{skill.category}</span>
                    </div>
                    <ProgressBar 
                      progress={skill.level} 
                      color={skill.level > 80 ? 'success' : skill.level > 60 ? 'primary' : 'orange'}
                      className="h-2.5 rounded-full"
                    />
                 </div>
               ))}
             </div>
             
             <div className="mt-12 pt-8 border-t border-slate-50 dark:border-slate-800 flex justify-center text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest max-w-sm">
                   Skills are verified through hands-on lab environment completion and project peer reviews.
                </p>
             </div>
          </div>
        </div>
      </div>

      {/* Second Row Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mb-20">
        
        {/* Achievements (8 Cols) */}
        <div className="xl:col-span-8 flex flex-col gap-8">
          <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 p-10 shadow-sm">
             <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight mb-10 flex items-center">
                <Award size={28} className="mr-3 text-amber-500" />
                Achievement Shelf
             </h3>
             <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {achievements.map((achieve) => (
                  <div key={achieve.id} className="group relative">
                     <div className="aspect-square bg-slate-50 dark:bg-slate-900/50 rounded-[32px] border border-slate-100 dark:border-slate-800 p-6 flex flex-col items-center justify-center text-center transition-all group-hover:bg-primary group-hover:border-primary group-hover:-translate-y-2">
                        <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-amber-500 mb-4 shadow-sm group-hover:scale-110 transition-transform">
                           <Zap size={32} />
                        </div>
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white group-hover:text-white transition-colors mb-1">{achieve.name}</h4>
                        <span className="text-[8px] font-bold text-slate-400 dark:text-slate-500 group-hover:text-white/60 transition-colors uppercase tracking-widest">{achieve.date}</span>
                        
                        <div className="absolute inset-0 bg-primary/95 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6 text-center z-20 pointer-events-none">
                           <p className="text-[10px] font-bold text-white uppercase tracking-wider leading-relaxed">{achieve.desc}</p>
                        </div>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Streak & Weekly Goals (4 Cols) */}
        <div className="xl:col-span-4 space-y-8">
          <div className="bg-gradient-to-br from-rose-500 to-orange-500 rounded-[40px] p-10 text-white shadow-2xl shadow-rose-500/20 relative overflow-hidden group">
             <div className="absolute top-[-10%] right-[-10%] w-40 h-40 bg-white/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
             
             <div className="flex items-center space-x-4 mb-8">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                   <Flame size={32} className="text-white animate-pulse" />
                </div>
                <div>
                   <h3 className="text-lg font-black uppercase tracking-widest leading-none">Hot Streak</h3>
                   <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Don&apos;t break the chain!</span>
                </div>
             </div>

             <div className="flex justify-between items-end mb-8">
                <div className="text-5xl font-black italic">12</div>
                <div className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">DAYS ACTIVE</div>
             </div>

             <div className="grid grid-cols-7 gap-2 mb-8">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className={cn("aspect-square rounded-lg flex items-center justify-center", i < 5 ? "bg-white text-primary" : "bg-white/20 text-white/40")}>
                    <CheckCircle size={14} />
                  </div>
                ))}
             </div>

             <Button className="w-full bg-white text-primary font-black uppercase hover:bg-slate-50 shadow-xl border-0 py-6 text-xs tracking-widest">
                Start Daily Challenge
             </Button>
          </div>
          
          <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 p-8 shadow-sm">
             <div className="flex items-center justify-between mb-8">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Past Activity</h3>
                <Clock size={16} className="text-slate-300" />
             </div>
             <div className="space-y-6">
                {history.map((item) => (
                  <div key={item.id} className="flex items-start space-x-4 group">
                     <div className="w-2 h-2 rounded-full bg-primary mt-1.5 group-hover:scale-150 transition-transform" />
                     <div className="flex-1 min-w-0">
                        <div className="text-[10px] font-black text-slate-900 dark:text-white truncate uppercase mb-0.5">{item.title}</div>
                        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{item.date} • +{item.xp} XP</div>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
