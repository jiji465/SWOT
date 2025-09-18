
import React from 'react';
import type { TowsStrategy } from '../types';
import { SOIcon, STIcon, WOIcon, WTIcon } from './IconComponents';
import { motion } from 'framer-motion';

interface TowsCardProps {
  strategy: TowsStrategy;
}

const strategyMeta = {
  SO: {
    color: 'text-accent-green',
    gradient: 'from-accent-green/10 to-transparent',
    icon: <SOIcon className="h-10 w-10"/>,
  },
  ST: {
    color: 'text-accent-blue',
    gradient: 'from-accent-blue/10 to-transparent',
    icon: <STIcon className="h-10 w-10"/>,
  },
  WO: {
    color: 'text-accent-orange',
    gradient: 'from-accent-orange/10 to-transparent',
    icon: <WOIcon className="h-10 w-10"/>,
  },
  WT: {
    color: 'text-accent-red',
    gradient: 'from-accent-red/10 to-transparent',
    icon: <WTIcon className="h-10 w-10"/>,
  },
};

export const TowsCard: React.FC<TowsCardProps> = ({ strategy }) => {
  const meta = strategyMeta[strategy.type];
  
  return (
    <motion.div 
      className="bg-card text-card-foreground rounded-xl shadow-2xl flex flex-col overflow-hidden border hover:scale-[1.01] transition-transform duration-300"
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      <div className={`p-8 bg-gradient-to-br ${meta.gradient}`}>
        <div className="flex items-center mb-4">
          <div className={`${meta.color} mr-4`}>
            {meta.icon}
          </div>
          <h4 className="text-3xl font-bold">{strategy.title}</h4>
        </div>
        <p className="text-xl mb-4">{strategy.strategy}</p>
      </div>
      <div className="mt-auto bg-muted/50 p-6 border-t">
        <p className="text-lg text-muted-foreground flex items-start">
          <span className="font-bold mr-2 text-foreground">👉 Racional:</span>
          <span>{strategy.rationale}</span>
        </p>
      </div>
    </motion.div>
  );
};
