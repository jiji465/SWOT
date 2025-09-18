
import React from 'react';
import { motion } from 'framer-motion';

interface SwotQuadrantProps {
  title: string;
  items: string[];
  icon: React.ReactElement<{ className?: string }>;
  colorClass: string;
  isVisible: boolean;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export const SwotCard: React.FC<SwotQuadrantProps> = ({ title, items, icon, colorClass, isVisible, position }) => {
  const borderClass = `border-${colorClass}`;

  const positionVariants = {
    'top-left': { x: -20, y: -20 },
    'top-right': { x: 20, y: -20 },
    'bottom-left': { x: -20, y: 20 },
    'bottom-right': { x: 20, y: 20 },
  };

  const initialPos = positionVariants[position];

  return (
    <motion.div 
      className={`flex flex-col bg-card text-card-foreground rounded-lg shadow-lg p-6 border-l-4 ${borderClass}`}
      initial={{ opacity: 0, x: initialPos.x, y: initialPos.y }}
      animate={{
        opacity: isVisible ? 1 : 0,
        x: isVisible ? 0 : initialPos.x,
        y: isVisible ? 0 : initialPos.y,
      }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <div className="flex items-center mb-4">
        <div className={`text-${colorClass} mr-3`}>
          {React.cloneElement(icon, { className: "h-7 w-7" })}
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <motion.ul 
        className="space-y-2"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        {items.map((item, index) => (
          <motion.li key={index} className="flex items-start" variants={itemVariants}>
            <span className={`flex-shrink-0 font-semibold text-${colorClass} mr-2 mt-1`}>•</span>
            <span className="text-muted-foreground text-base">{item}</span>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
};
