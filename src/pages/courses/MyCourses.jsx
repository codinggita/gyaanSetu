import React, { useState, useMemo } from 'react';
import { 
  Play, 
  CheckCircle, 
  Bookmark, 
  Search, 
  Filter, 
  LayoutGrid, 
  List,
  ArrowRight,
  Download,
  Star as StarIcon,
  BookOpen
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import CourseCard from '../../components/ui/CourseCard';
import { mockCourses } from '../public/landing/data/mockData';

const MyCourses = () => {
  const [activeTab, setActiveTab] = useState('in-progress');
  const [searchQuery, setSearchQuery] = useState('');

  // Simulating user course states
  const userCourses = useMemo(() => {
    return [
      { ...mockCourses[0], status: 'in-progress', progress: 25, completedLessons: 12, totalLessons: 48, lastAccessed: '2 days ago' },
      { ...mockCourses[1], status: 'in-progress', progress: 60, completedLessons: 30, totalLessons: 50, lastAccessed: 'Yesterday' },
      { ...mockCourses[2], status: 'completed', progress: 100, completedLessons: 42, totalLessons: 42, lastAccessed: '1 week ago' },
      { ...mockCourses[3], status: 'bookmarked', progress: 0, completedLessons: 0, totalLessons: 32, lastAccessed: 'N/A' },
    ];
  }, []);

  const filteredCourses = useMemo(() => {
    return userCourses.filter(c => {
      const matchesTab = c.status === activeTab;
      const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [userCourses, activeTab, searchQuery]);

  const tabs = [
    { id: 'in-progress', label: 'In Progress', icon: Play, count: userCourses.filter(c => c.status === 'in-progress').length },
    { id: 'completed', label: 'Completed', icon: CheckCircle, count: userCourses.filter(c => c.status === 'completed').length },
    { id: 'bookmarked', label: 'Bookmarked', icon: Bookmark, count: userCourses.filter(c => c.status === 'bookmarked').length },
  ];

  return (
    <div className="w-full animate-in fade-in duration-700">
      <Helmet>
        <title>My Courses | GyaanSetu</title>
      </Helmet>

      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
           <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                 <BookOpen size={18} />
              </div>
              <Badge variant="primary" className="text-[10px] uppercase font-black tracking-widest">My Learning</Badge>
           </div>
           <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter mb-4">
              Continue Your <span className="text-primary italic">Journey.</span>
           </h1>
           <p className="text-slate-500 font-bold dark:text-slate-400 max-w-lg italic">
              "Education is not the learning of facts, but the training of the mind to think." — Keep pushing.
           </p>
        </div>

        <div className="relative w-full max-w-sm">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
           <input 
              type="text" 
              placeholder="Search your library..." 
              className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-2xl py-3.5 pl-12 pr-4 text-sm font-black text-slate-700 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
           />
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap items-center gap-2 mb-10 p-1.5 bg-slate-50 dark:bg-slate-950/50 rounded-[24px] w-fit border border-slate-100 dark:border-slate-800">
         {tabs.map((tab) => (
           <button
             key={tab.id}
             onClick={() => setActiveTab(tab.id)}
             className={cn(
               "flex items-center gap-3 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300",
               activeTab === tab.id 
                 ? "bg-white dark:bg-slate-800 text-primary shadow-xl shadow-primary/10 scale-105" 
                 : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
             )}
           >
             <tab.icon size={16} />
             {tab.label}
             <span className={cn(
               "ml-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px]",
               activeTab === tab.id ? "bg-primary/10 text-primary" : "bg-slate-200 dark:bg-slate-800 text-slate-500"
             )}>
               {tab.count}
             </span>
           </button>
         ))}
      </div>

      {/* Course Grid Area */}
      <div className="min-h-[400px]">
         <AnimatePresence mode="wait">
            {filteredCourses.length > 0 ? (
               <motion.div 
                 key={activeTab}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
                 className="grid grid-cols-1 lg:grid-cols-2 gap-8"
               >
                  {filteredCourses.map((course) => (
                    <div key={course.id} className="relative group">
                       <CourseCard 
                         course={course} 
                         variant={activeTab === 'in-progress' ? 'resume' : 'catalog'}
                         className={activeTab === 'completed' ? 'border-emerald-500/20' : ''}
                       />
                       
                       {/* Specific overlays for Completed/Bookmarked */}
                       {activeTab === 'completed' && (
                          <div className="mt-4 flex items-center gap-3">
                             <Button size="sm" variant="outline" className="flex-1 text-[10px] uppercase font-black tracking-widest border-emerald-500 text-emerald-500 hover:bg-emerald-50">
                                <Download size={14} className="mr-2" /> Download Certificate
                             </Button>
                             <Button size="sm" variant="ghost" className="text-[10px] uppercase font-black tracking-widest text-slate-400">
                                <StarIcon size={14} className="mr-2" /> Rate Course
                             </Button>
                          </div>
                       )}
                       
                       {activeTab === 'bookmarked' && (
                          <div className="mt-4">
                             <Button size="sm" className="w-full text-[10px] uppercase font-black tracking-widest">
                                Enroll & Start Learning
                             </Button>
                          </div>
                       )}
                    </div>
                  ))}
               </motion.div>
            ) : (
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 className="flex flex-col items-center justify-center py-32 text-center"
               >
                  <div className="w-24 h-24 bg-slate-50 dark:bg-slate-900 rounded-[40px] flex items-center justify-center text-slate-200 dark:text-slate-800 mb-8 border-2 border-dashed border-slate-100 dark:border-slate-800">
                     {activeTab === 'in-progress' ? <Play size={40} /> : activeTab === 'completed' ? <CheckCircle size={40} /> : <Bookmark size={40} />}
                  </div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tight">Nothing here yet</h3>
                  <p className="text-sm font-bold text-slate-400 dark:text-slate-500 max-w-sm mb-8">
                     {activeTab === 'in-progress' ? "You aren't currently enrolled in any courses. Browse our catalog to start your journey." : 
                      activeTab === 'completed' ? "You haven't completed any courses yet. Finish your active courses to see them here." : 
                      "Save courses you're interested in to find them easily later."}
                  </p>
                  <Button variant="primary" className="text-xs font-black uppercase tracking-widest px-10">
                     Browse Dashboard
                  </Button>
               </motion.div>
            )}
         </AnimatePresence>
      </div>

      {/* Recommended for you footer (optional but premium touch) */}
      {activeTab === 'completed' && filteredCourses.length > 0 && (
         <div className="mt-24 pt-16 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between mb-10">
               <h3 className="text-2xl font-black text-slate-900 dark:text-white">Next Steps for Your Career</h3>
               <button className="text-sm font-black text-primary hover:underline">Explore More →</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {mockCourses.slice(0, 3).map(c => (
                  <CourseCard key={c.id} course={c} />
               ))}
            </div>
         </div>
      )}
    </div>
  );
};

export default MyCourses;
