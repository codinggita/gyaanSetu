import React, { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, ArrowUpDown, Filter } from 'lucide-react';
import { cn } from '../../utils/cn';

// UI Components
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Accordion from '../../components/ui/Accordion';
import CourseCard from '../../components/ui/CourseCard';
import { CourseSkeleton } from '../../components/ui/Skeleton';
import Input from '../../components/ui/Input';

// Data
import { mockCourses } from '../public/landing/data/mockData';

const CourseCatalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Filter States (Derived from URL)
  const searchQuery = searchParams.get('q') || '';
  const selectedLanguages = searchParams.get('lang')?.split(',') || [];
  const selectedCategories = searchParams.get('cat')?.split(',') || [];
  const selectedDifficulty = searchParams.get('diff') || 'All';
  const sortBy = searchParams.get('sort') || 'Popular';

  // Toggle Loading simulation
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [searchParams]);

  const updateFilters = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (!value || value === 'All' || (Array.isArray(value) && value.length === 0)) {
      newParams.delete(key);
    } else {
      newParams.set(key, Array.isArray(value) ? value.join(',') : value);
    }
    setSearchParams(newParams);
  };

  const clearAllFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  // Filter Logic
  const filteredCourses = useMemo(() => {
    return mockCourses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLang = selectedLanguages.length === 0 || selectedLanguages.includes(course.language);
      const matchesCat = selectedCategories.length === 0 || selectedCategories.includes(course.category);
      const matchesDiff = selectedDifficulty === 'All' || course.level === selectedDifficulty;
      return matchesSearch && matchesLang && matchesCat && matchesDiff;
    }).sort((a, b) => {
      if (sortBy === 'Price Low') return a.price - b.price;
      if (sortBy === 'Price High') return b.price - a.price;
      if (sortBy === 'Rating') return b.rating - a.rating;
      return 0; // Default: Popular/Unsorted
    });
  }, [searchQuery, selectedLanguages, selectedCategories, selectedDifficulty, sortBy]);

  const categories = [...new Set(mockCourses.map(c => c.category))];
  const languages = ['English', 'Hindi', 'Gujarati'];

  return (
    <>
      <Helmet>
        <title>Explore Courses — GyaanSetu</title>
      </Helmet>

      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 md:px-8 py-12 pt-32">
        <div className="container mx-auto">
          
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* ─── Sticky Sidebar (Desktop) ───────────────────────────── */}
            <aside className="hidden lg:block w-72 sticky top-32 space-y-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-black text-slate-800 dark:text-white">Filters</h3>
                {searchParams.toString() && (
                  <button onClick={clearAllFilters} className="text-xs font-bold text-primary hover:underline">
                    Clear All
                  </button>
                )}
              </div>

              <Card className="p-2 divide-y divide-slate-100 dark:divide-slate-800">
                <Accordion title="Language" defaultOpen>
                  <div className="space-y-2 pt-2">
                    {languages.map(lang => (
                      <label key={lang} className="flex items-center space-x-3 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 rounded-md border-slate-300 text-primary focus:ring-primary"
                          checked={selectedLanguages.includes(lang)}
                          onChange={(e) => {
                            const next = e.target.checked 
                              ? [...selectedLanguages, lang] 
                              : selectedLanguages.filter(l => l !== lang);
                            updateFilters('lang', next);
                          }}
                        />
                        <span className="text-sm font-bold text-slate-600 dark:text-slate-400 group-hover:text-slate-900 transition-colors">
                          {lang}
                        </span>
                      </label>
                    ))}
                  </div>
                </Accordion>

                <Accordion title="Category" defaultOpen>
                  <div className="space-y-2 pt-2">
                    {categories.map(cat => (
                      <label key={cat} className="flex items-center space-x-3 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 rounded-md border-slate-300 text-primary focus:ring-primary"
                          checked={selectedCategories.includes(cat)}
                          onChange={(e) => {
                            const next = e.target.checked 
                              ? [...selectedCategories, cat] 
                              : selectedCategories.filter(c => c !== cat);
                            updateFilters('cat', next);
                          }}
                        />
                        <span className="text-sm font-bold text-slate-600 dark:text-slate-400 group-hover:text-slate-900 transition-colors">
                          {cat}
                        </span>
                      </label>
                    ))}
                  </div>
                </Accordion>

                <Accordion title="Difficulty" defaultOpen>
                  <div className="space-y-2 pt-2">
                    {['All', 'Beginner', 'Intermediate', 'Advanced'].map(diff => (
                      <label key={diff} className="flex items-center space-x-3 cursor-pointer group">
                        <input 
                          type="radio" 
                          className="w-4 h-4 border-slate-300 text-primary focus:ring-primary"
                          checked={selectedDifficulty === diff}
                          onChange={() => updateFilters('diff', diff)}
                        />
                        <span className="text-sm font-bold text-slate-600 dark:text-slate-400 group-hover:text-slate-900 transition-colors">
                          {diff}
                        </span>
                      </label>
                    ))}
                  </div>
                </Accordion>
              </Card>
            </aside>

            {/* ─── Main Content ───────────────────────────────────────── */}
            <main className="flex-1 w-full space-y-8">
              
              {/* Header & Search */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">
                    Ready to <span className="text-primary italic underline decoration-wavy underline-offset-4">Build?</span>
                  </h1>
                  <p className="text-slate-500 font-bold mt-1">Showing {filteredCourses.length} bilingual results</p>
                </div>
                
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <div className="relative flex-1 md:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <Input 
                      placeholder="Search for tools or skills..." 
                      className="pl-12"
                      value={searchQuery}
                      onChange={(e) => updateFilters('q', e.target.value)}
                    />
                  </div>
                  <button 
                    onClick={() => setIsFilterDrawerOpen(true)}
                    className="lg:hidden p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl"
                  >
                    <SlidersHorizontal size={20} className="text-primary" />
                  </button>
                </div>
              </div>

              {/* Active Chips */}
              <div className="flex flex-wrap gap-2">
                {sortBy !== 'Popular' && (
                  <Chip label={`Sorted by: ${sortBy}`} onRemove={() => updateFilters('sort', null)} />
                )}
                {selectedLanguages.map(l => (
                  <Chip key={l} label={l} onRemove={() => updateFilters('lang', selectedLanguages.filter(lang => lang !== l))} />
                ))}
                {selectedCategories.map(c => (
                  <Chip key={c} label={c} onRemove={() => updateFilters('cat', selectedCategories.filter(cat => cat !== c))} />
                ))}
                {selectedDifficulty !== 'All' && (
                  <Chip label={selectedDifficulty} onRemove={() => updateFilters('diff', null)} />
                )}
              </div>

              {/* Grid */}
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => <CourseSkeleton key={i} />)}
                </div>
              ) : filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-fade-in-up">
                  {filteredCourses.map(course => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <div className="w-24 h-24 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center text-slate-400 mb-6">
                    <Filter size={40} />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">No courses match your criteria</h3>
                  <p className="text-slate-500 mt-2 mb-8">Try adjusting your filters or search query.</p>
                  <Button onClick={clearAllFilters} variant="outline">Clear All Filters</Button>
                </div>
              )}

              {/* Pagination (Demo) */}
              {!isLoading && filteredCourses.length > 0 && (
                <div className="flex items-center justify-center space-x-2 pt-12">
                  <button className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl font-bold text-slate-400 cursor-not-allowed">
                    Prev
                  </button>
                  <button className="px-4 py-2 bg-primary text-white rounded-xl font-black">
                    1
                  </button>
                  <button className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl font-bold text-slate-600 dark:text-slate-400">
                    2
                  </button>
                  <button className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl font-bold text-slate-600 dark:text-slate-400">
                    Next
                  </button>
                </div>
              )}
            </main>

          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer Placeholder */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsFilterDrawerOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white dark:bg-slate-950 p-6 flex flex-col animate-slide-in-right">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">Filters</h2>
              <button onClick={() => setIsFilterDrawerOpen(false)} className="p-2 text-slate-400">
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto pr-2 space-y-6">
              {/* Reuse Desktop Filters logic here or separate component */}
              <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Filter components would mirror desktop...</p>
            </div>
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
              <Button onClick={() => setIsFilterDrawerOpen(false)} className="w-full">
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const Chip = ({ label, onRemove }) => (
  <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-white dark:bg-slate-900 border border-primary/20 text-primary rounded-full text-xs font-black ring-2 ring-transparent hover:ring-primary/10 transition-all">
    <span>{label}</span>
    <button onClick={onRemove} className="hover:text-rose-500 transition-colors">
      <X size={12} strokeWidth={3} />
    </button>
  </div>
);

export default CourseCatalog;
