import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Users, 
  MapPin, 
  Star, 
  Globe, 
  MessageSquare, 
  Shield,
  ChevronRight,
  Compass,
  Briefcase
} from 'lucide-react';
import { cn } from '@/utils/cn';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import CourseCard from '@/components/ui/CourseCard';
import { mockInstructors, mockCourses } from '@/pages/public/landing/data/mockData';

/**
 * InstructorProfile - Public facing instructor details page
 * Refined for stability with absolute path aliases and ultra-defensive logic.
 */
const InstructorProfile = () => {
  const { instructorId } = useParams();
  const [activeTab, setActiveTab] = useState('courses');
  
  // Safe data extraction
  const instructor = (mockInstructors || []).find(i => i.id === instructorId) || (mockInstructors && mockInstructors[0]) || {
    id: 'inst1',
    name: 'Sameer Khan',
    designation: 'Senior Cloud Architect',
    company: 'GyaanSetu',
    avatar: 'https://i.pravatar.cc/150?u=sameer',
    languages: ['Hindi', 'English'],
    rating: 4.9,
    totalReviews: 2450,
    students: '15.2K',
    courses: 8,
    years: 12,
    skills: ['Cloud', 'DevOps'],
    bio: 'Expert instructor committed to bilingual technical education.',
    experience: []
  };

  const tabs = [
    { id: 'courses', label: 'Courses', icon: Compass },
    { id: 'about', label: 'About', icon: Briefcase },
    { id: 'reviews', label: 'Reviews', icon: Star },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pb-20">
      {/* Dynamic Header */}
      <div className="h-[300px] w-full bg-slate-900 overflow-hidden relative">
         <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-teal-500/80" />
         <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-slate-950 to-transparent" />
      </div>

      <div className="max-w-[1200px] mx-auto px-4 -mt-24 relative z-10">
         {/* Profile Card Overlay */}
         <div className="flex flex-col md:flex-row items-end gap-8 mb-16 px-4">
            <div className="relative">
               <div className="w-40 h-40 md:w-48 md:h-48 rounded-[48px] border-8 border-white dark:border-slate-950 shadow-2xl overflow-hidden bg-slate-200 dark:bg-slate-800">
                  <img 
                    src={instructor.avatar || 'https://i.pravatar.cc/150'} 
                    alt={instructor.name} 
                    className="w-full h-full object-cover" 
                  />
               </div>
               <div className="absolute bottom-4 right-4 w-10 h-10 bg-primary rounded-2xl flex items-center justify-center text-white border-4 border-white dark:border-slate-950">
                  <Shield size={20} />
               </div>
            </div>

            <div className="flex-1 pb-4 text-center md:text-left">
               <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
                  {(instructor.languages || []).map(lang => (
                    <Badge key={lang} variant="primary" className="text-[10px] uppercase font-black tracking-widest">{lang}</Badge>
                  ))}
               </div>
               <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter mb-4">{instructor.name}</h1>
               <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-slate-500 font-bold italic">
                  <div className="flex items-center gap-2">
                     <Briefcase size={16} className="text-primary" />
                     {instructor.designation}
                  </div>
                  <div className="flex items-center gap-2">
                     <Star size={16} className="text-amber-500" fill="currentColor" />
                     {instructor.rating} ({instructor.totalReviews} reviews)
                  </div>
               </div>
            </div>

            <div className="flex gap-3 pb-4">
               <Button variant="primary" className="rounded-2xl px-8 uppercase font-black text-xs tracking-widest">
                  Connect
               </Button>
            </div>
         </div>

         {/* Stats */}
         <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 p-8 bg-slate-50 dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800">
            <div className="text-center md:border-r border-slate-200 dark:border-slate-800 p-4">
               <div className="text-[10px] font-black uppercase text-slate-400 mb-1">Courses</div>
               <div className="text-2xl font-black text-slate-900 dark:text-white">{instructor.courses}</div>
            </div>
            <div className="text-center md:border-r border-slate-200 dark:border-slate-800 p-4">
               <div className="text-[10px] font-black uppercase text-slate-400 mb-1">Students</div>
               <div className="text-2xl font-black text-slate-900 dark:text-white">{instructor.students}</div>
            </div>
            <div className="text-center md:border-r border-slate-200 dark:border-slate-800 p-4">
               <div className="text-[10px] font-black uppercase text-slate-400 mb-1">Rating</div>
               <div className="text-2xl font-black text-slate-900 dark:text-white">{instructor.rating}</div>
            </div>
            <div className="text-center p-4">
               <div className="text-[10px] font-black uppercase text-slate-400 mb-1">Experience</div>
               <div className="text-2xl font-black text-slate-900 dark:text-white">{instructor.years}Y</div>
            </div>
         </div>

         {/* Tab navigation */}
         <div className="flex border-b border-slate-100 dark:border-slate-800 mb-12 gap-8 px-4">
            {tabs.map(tab => (
               <button
                 key={tab.id}
                 onClick={() => setActiveTab(tab.id)}
                 className={cn(
                   "pb-4 text-xs font-black uppercase tracking-widest transition-all relative",
                   activeTab === tab.id ? "text-primary" : "text-slate-400 hover:text-slate-600"
                 )}
               >
                 {tab.label}
                 {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full" />}
               </button>
            ))}
         </div>

         {/* Inner Content */}
         <div className="min-h-[400px] px-4">
            {activeTab === 'courses' && (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {(mockCourses || []).slice(0, instructor.courses || 6).map(course => (
                     <CourseCard key={course.id || Math.random()} course={course} />
                  ))}
               </div>
            )}

            {activeTab === 'about' && (
               <div className="space-y-12">
                  <div className="max-w-3xl">
                     <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4">Bio</h3>
                     <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium italic">"{instructor.bio}"</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                     <div>
                        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Experience Highlights</h3>
                        <div className="space-y-6">
                           {(instructor.experience || []).map((exp, i) => (
                              <div key={i} className="flex gap-4 p-4 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                                 <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                                    <Briefcase size={20} />
                                 </div>
                                 <div>
                                    <div className="font-black text-slate-900 dark:text-white text-sm">{exp.role}</div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{exp.company} • {exp.years}</div>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                     <div>
                        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Top Skills</h3>
                        <div className="flex flex-wrap gap-2">
                           {(instructor.skills || []).map(skill => (
                              <Badge key={skill} variant="secondary" className="px-4 py-2 text-[10px]">{skill}</Badge>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            )}

            {activeTab === 'reviews' && (
               <div className="flex flex-col items-center justify-center text-center py-20 bg-slate-50 dark:bg-slate-900/40 rounded-[48px]">
                  <Star size={48} className="text-slate-200 mb-6" />
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Verified Reviews Only</h3>
                  <p className="text-sm font-bold text-slate-400 max-w-sm">Detailed student reviews are available once you start a course with this instructor.</p>
               </div>
            )}
         </div>
      </div>
    </div>
  );
};

export default InstructorProfile;
