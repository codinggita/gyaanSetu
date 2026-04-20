import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  CheckCircle, 
  Play, 
  FileText, 
  Globe, 
  Clock, 
  Award, 
  ChevronRight,
  Share2,
  Lock,
  Unlock,
  Star,
  FlaskConical
} from 'lucide-react';
import { cn } from '../../utils/cn';

// UI Components
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import Accordion from '../../components/ui/Accordion';
import { ReviewSkeleton } from '../../components/ui/Skeleton';

// Data
import { mockCourses } from '../public/landing/data/mockData';

const CourseDetail = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    // Find course by ID
    const found = mockCourses.find(c => c.id === parseInt(courseId)) || mockCourses[0];
    setCourse(found);

    const handleScroll = () => setIsScrolled(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [courseId]);

  if (!course) return null;

  const breadcrumbItems = [
    { label: 'Courses', path: '/courses' },
    { label: course.category, path: `/courses?cat=${course.category}` },
    { label: course.title }
  ];

  return (
    <>
      <Helmet>
        <title>{course.title} — GyaanSetu</title>
      </Helmet>

      {/* ─── Sticky Top CTA (Appears on Scroll) ─────────────────────── */}
      <div className={cn(
        "fixed top-0 left-0 right-0 z-[60] bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 py-3 transition-transform duration-500 shadow-xl",
        isScrolled ? "translate-y-20" : "-translate-y-full"
      )}>
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          <div className="hidden md:block">
            <h4 className="text-sm font-black text-slate-800 dark:text-white line-clamp-1">{course.title}</h4>
            <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <span>{course.rating} ⭐</span>
              <span>•</span>
              <span>{course.level}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4 ml-auto">
            <span className="text-xl font-black text-slate-900 dark:text-white">₹{course.price}</span>
            <Button size="sm" className="px-8 shadow-lg shadow-orange-100">Enroll Now</Button>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-white dark:bg-slate-950 pb-24 pt-32">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* ─── Left Content (65%) ──────────────────────────────────── */}
            <div className="flex-1 space-y-12">
              
              {/* 1. Hero Header */}
              <div className="space-y-6">
                <Breadcrumbs items={breadcrumbItems} />
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight tracking-tighter">
                  {course.title}
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 font-medium max-w-3xl">
                  {course.category} mastery with hands-on practice in Hindi, Gujarati, and English.
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs font-black uppercase tracking-widest">
                  <div className="flex items-center text-amber-500">
                    <Star size={16} fill="currentColor" className="mr-1" />
                    <span>{course.rating} Rating</span>
                  </div>
                  <span className="text-slate-300">|</span>
                  <span className="text-slate-500">{course.reviews} Students Enrolled</span>
                  <span className="text-slate-300">|</span>
                  <span className="text-slate-500">Last updated Dec 2025</span>
                </div>
                
                <div className="flex items-center space-x-3 pt-4 border-t border-slate-50 dark:border-slate-800/50">
                  <img src="https://i.pravatar.cc/150?u=aman" alt={course.instructor} className="w-12 h-12 rounded-full ring-4 ring-slate-50 dark:ring-slate-900" />
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Instructor</p>
                    <p className="text-sm font-bold text-slate-800 dark:text-white">{course.instructor}</p>
                  </div>
                </div>
              </div>

              {/* 2. What You'll Learn Checklist */}
              <Card className="bg-emerald-50/30 dark:bg-emerald-900/5 border-emerald-100 dark:border-emerald-800 p-8">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">What you&apos;ll learn</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                  {(course.outcomes || [
                    "Master the core concepts of React",
                    "Build high-performance state logic",
                    "Understand clean architecture",
                    "Deploy to industry standard clouds"
                  ]).map((item, i) => (
                    <div key={i} className="flex items-start space-x-3">
                      <CheckCircle className="text-emerald-500 mt-0.5 shrink-0" size={18} />
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* 3. Curriculum Accordion */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Course Content</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    {(course.curriculum || []).length} Sections • 15 Lessons • 12h Total
                  </p>
                </div>
                <div className="border border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
                  {(course.curriculum || [
                    { title: 'Intro Section', lessons: [{ title: 'Lesson 1', duration: '10m', type: 'video', isFreePreview: true }] }
                  ]).map((section, idx) => (
                    <Accordion 
                      key={idx} 
                      title={section.title} 
                      className="bg-white dark:bg-transparent"
                      titleClassName="px-6"
                    >
                      <div className="px-6 space-y-4">
                        {section.lessons.map((lesson, lIdx) => (
                          <div key={lIdx} className="flex items-center justify-between group cursor-pointer py-1">
                            <div className="flex items-center space-x-4">
                              <div className="text-slate-300">
                                {lesson.type === 'video' ? <Play size={16} fill="currentColor" /> : <FlaskConical size={16} />}
                              </div>
                              <span className={cn(
                                "text-sm font-bold group-hover:text-primary transition-colors",
                                lesson.isFreePreview ? "text-slate-800 dark:text-white" : "text-slate-400"
                              )}>
                                {lesson.title}
                              </span>
                            </div>
                            <div className="flex items-center space-x-4">
                              {lesson.isFreePreview && (
                                <span className="text-[10px] font-black text-primary uppercase underline">Free Preview</span>
                              )}
                              <span className="text-xs font-bold text-slate-400">{lesson.duration}</span>
                              {lesson.isFreePreview ? <Unlock size={14} className="text-primary" /> : <Lock size={14} className="text-slate-300" />}
                            </div>
                          </div>
                        ))}
                      </div>
                    </Accordion>
                  ))}
                </div>
              </div>

              {/* 4. Requirements */}
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Requirements</h3>
                <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400 text-sm font-bold">
                  {(course.requirements || [
                    "Willingness to learn and practice daily",
                    "Basic knowledge of computer operation",
                    "Steady internet connection"
                  ]).map((req, i) => <li key={i}>{req}</li>)}
                </ul>
              </div>

              {/* 5. Ratings & Reviews */}
              <div className="space-y-8">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Student Feedback</h3>
                <div className="flex flex-col md:flex-row gap-8 items-center bg-slate-50/50 dark:bg-slate-900/50 p-8 rounded-3xl">
                  <div className="text-center md:text-left">
                    <h4 className="text-5xl font-black text-primary mb-2">{course.rating}</h4>
                    <div className="flex text-amber-400 mb-1">
                      {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                    </div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Course Rating</p>
                  </div>
                  
                  <div className="flex-1 w-full space-y-3">
                    {[
                      { star: 5, perc: 75 },
                      { star: 4, perc: 15 },
                      { star: 3, perc: 6 },
                      { star: 2, perc: 3 },
                      { star: 1, perc: 1 },
                    ].map((row) => (
                      <div key={row.star} className="flex items-center space-x-4">
                        <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-400" style={{ width: `${row.perc}%` }} />
                        </div>
                        <span className="text-xs font-bold text-slate-400 w-12">{row.perc}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(course.reviewItems || []).map((review, i) => (
                    <Card key={i} className="p-6 space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center font-black text-slate-400">
                            {review.name[0]}
                          </div>
                          <div>
                            <p className="text-sm font-black text-slate-800 dark:text-white leading-none">{review.name}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex text-amber-400">
                          {[...Array(review.rating)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                        </div>
                      </div>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400 italic font-body">
                        &quot;{review.text}&quot;
                      </p>
                    </Card>
                  ))}
                </div>
              </div>

            </div>

            {/* ─── Right Sidebar (35%) ─────────────────────────────────── */}
            <div className="lg:w-[400px] space-y-8">
              <aside className="sticky top-32">
                <Card className="overflow-hidden shadow-2xl border-0 ring-1 ring-slate-100 dark:ring-slate-800">
                  {/* Video Preview */}
                  <div className="relative aspect-video group cursor-pointer">
                    <img 
                      src={course.image} 
                      alt="Preview" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-primary shadow-xl group-hover:scale-110 transition-transform">
                        <Play size={24} fill="currentColor" className="ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-0 right-0 text-center">
                      <span className="text-xs font-black text-white uppercase tracking-widest shadow-text">Preview this course</span>
                    </div>
                  </div>

                  <div className="p-8 space-y-6">
                    <div className="flex items-end space-x-2">
                       <span className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">₹{course.price}</span>
                       <span className="text-slate-400 line-through text-sm font-bold mb-1">₹{course.originalPrice}</span>
                       <span className="text-rose-500 text-xs font-bold mb-1 ml-auto">80% OFF</span>
                    </div>

                    <div className="space-y-3">
                      <Button className="w-full py-4 text-sm font-black shadow-lg shadow-orange-100">Enroll Now</Button>
                      <Button variant="ghost" className="w-full py-4 text-xs font-black text-slate-500 uppercase tracking-widest">Try For Free</Button>
                    </div>

                    <p className="text-[10px] text-center font-bold text-slate-400">30-Day Money-Back Guarantee</p>
                    
                    <div className="space-y-4 pt-6 border-t border-slate-50 dark:border-slate-800/50">
                      <p className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-widest">This course includes:</p>
                      {[
                        { icon: Play, text: '24 hours on-demand video' },
                        { icon: FlaskConical, text: `${course.labs} Hand-on browser labs` },
                        { icon: FileText, text: '8 industry projects' },
                        { icon: Globe, text: 'Full lifetime access' },
                        { icon: Award, text: 'Certificate of completion' }
                      ].map((feature, i) => (
                        <div key={i} className="flex items-center space-x-3 text-slate-600 dark:text-slate-400">
                          <feature.icon size={16} />
                          <span className="text-xs font-bold">{feature.text}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-6 flex items-center justify-center space-x-4">
                      <button className="flex items-center text-[10px] font-black text-primary uppercase tracking-widest hover:underline">
                        <Share2 size={14} className="mr-2" /> Share link
                      </button>
                    </div>
                  </div>
                </Card>
              </aside>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetail;
