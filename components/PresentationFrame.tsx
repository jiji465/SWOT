import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from './IconComponents';

interface PresentationFrameProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  title: string;
  onNext: () => void;
  onPrev: () => void;
  isNextDisabled: boolean;
  isPrevDisabled: boolean;
}

export const PresentationFrame: React.FC<PresentationFrameProps> = ({ 
  children, 
  currentStep, 
  totalSteps, 
  title, 
  onNext, 
  onPrev,
  isNextDisabled,
  isPrevDisabled
}) => {
  const progressPercentage = totalSteps > 1 ? ((currentStep -1) / (totalSteps - 1)) * 100 : 0;

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800 dark:text-slate-200 p-4 md:p-8">
      
      <header className="h-16 flex items-center justify-between">
        <h2 className="text-md font-semibold text-slate-500 dark:text-slate-400 tracking-wider uppercase">{title}</h2>
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
          {currentStep} / {totalSteps}
        </span>
      </header>
      
      <main className="flex-grow flex items-center justify-center overflow-hidden">
        <div className="w-full max-w-5xl px-4">
          {children}
        </div>
      </main>

      <footer className="h-20 flex flex-col justify-end">
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 mb-5 relative">
          <div
            className="bg-brand-primary h-1.5 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        <div className="flex justify-center items-center space-x-4">
          <button
            onClick={onPrev}
            disabled={isPrevDisabled}
            className="flex items-center px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-full shadow-sm text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeftIcon className="h-5 w-5" />
            <span className="mr-2">Anterior</span>
          </button>
          
          <button
            onClick={onNext}
            disabled={isNextDisabled}
            className="flex items-center px-4 py-2 bg-brand-primary border border-transparent rounded-full shadow-sm text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            aria-label="Next slide"
          >
            <span className="ml-2">Próximo</span>
            <ChevronRightIcon className="h-5 w-5"/>
          </button>
        </div>
      </footer>
    </div>
  );
};