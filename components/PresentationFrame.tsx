import React from 'react';
// FIX: Import Transition type from framer-motion to correctly type the buttonTransition object.
import { motion, Transition } from 'framer-motion';
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

  // FIX: Explicitly type buttonTransition with the Transition type. This resolves the TypeScript error
  // where the 'type' property was being inferred as a generic 'string' instead of the required literal 'spring'.
  const buttonTransition: Transition = {
    type: 'spring',
    stiffness: 500,
    damping: 30,
  };

  return (
    <div className="min-h-screen flex flex-col font-sans p-4 md:p-8">
      
      <header className="h-16 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-muted-foreground tracking-wider uppercase">{title}</h2>
        <span className="text-sm font-medium text-muted-foreground">
          {currentStep} / {totalSteps}
        </span>
      </header>
      
      <main className="flex-grow flex items-center justify-center overflow-hidden">
        <div className="w-full max-w-5xl px-4">
          {children}
        </div>
      </main>

      <footer className="h-20 flex flex-col justify-end">
        <div className="w-full bg-muted rounded-full h-1.5 mb-5 relative overflow-hidden">
          <motion.div
            className="bg-primary h-1.5 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>

        <div className="flex justify-center items-center space-x-4">
          <motion.button
            onClick={onPrev}
            disabled={isPrevDisabled}
            className="flex items-center px-4 py-2 bg-card border rounded-full shadow-sm text-sm font-medium text-card-foreground hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Previous slide"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={buttonTransition}
          >
            <ChevronLeftIcon className="h-5 w-5" />
            <span className="mr-2">Anterior</span>
          </motion.button>
          
          <motion.button
            onClick={onNext}
            disabled={isNextDisabled}
            className="flex items-center px-4 py-2 bg-primary border border-transparent rounded-full shadow-sm text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Next slide"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={buttonTransition}
          >
            <span className="ml-2">Próximo</span>
            <ChevronRightIcon className="h-5 w-5"/>
          </motion.button>
        </div>
      </footer>
    </div>
  );
};
