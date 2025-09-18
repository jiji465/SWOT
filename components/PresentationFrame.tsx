import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from './IconComponents';

interface PresentationFrameProps {
  children: React.ReactNode;
  slideIndex: number;
  totalSlides: number;
  title: string;
  onNext: () => void;
  onPrev: () => void;
}

export const PresentationFrame: React.FC<PresentationFrameProps> = ({ children, slideIndex, totalSlides, title, onNext, onPrev }) => {
  const progressPercentage = totalSlides > 1 ? ((slideIndex) / (totalSlides - 1)) * 100 : 0;

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800 dark:text-slate-200 p-4 md:p-6">
      
      <header className="h-12 flex items-center">
        <h2 className="text-lg font-semibold text-slate-600 dark:text-slate-400">{title}</h2>
      </header>
      
      <main className="flex-grow flex items-center justify-center overflow-hidden">
        <div key={slideIndex} className="animate-fade-in-up w-full max-w-5xl">
          {children}
        </div>
      </main>

      <footer className="h-20 flex flex-col justify-end">
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mb-4">
          <div
            className="bg-brand-primary h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={onPrev}
            disabled={slideIndex === 0}
            className="flex items-center px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeftIcon />
            Anterior
          </button>
          <span className="text-sm text-slate-500 dark:text-slate-400">
            {slideIndex + 1} / {totalSlides}
          </span>
          <button
            onClick={onNext}
            disabled={slideIndex === totalSlides - 1}
            className="flex items-center px-4 py-2 bg-brand-primary border border-transparent rounded-lg shadow-sm text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Next slide"
          >
            Próximo
            <ChevronRightIcon />
          </button>
        </div>
      </footer>
    </div>
  );
};