import React from 'react';
import { cn } from '../../utils/cn';

const Skeleton = ({ className }) => {
  return (
    <div className={cn("animate-pulse bg-slate-100 dark:bg-slate-800 rounded-lg", className)} />
  );
};

export const CourseSkeleton = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 p-2 overflow-hidden shadow-sm">
      <Skeleton className="h-48 rounded-[1.8rem] mb-4" />
      <div className="p-4 space-y-4">
        <div className="flex space-x-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <div className="flex items-center space-x-2 pt-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex items-center justify-between pt-4">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-10 w-24 rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export const ReviewSkeleton = () => {
  return (
    <div className="p-6 border border-slate-100 dark:border-slate-800 rounded-2xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
        <Skeleton className="h-4 w-20" />
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  );
};

export default Skeleton;
