
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon } from './IconComponents';
import type { SwotColors } from '../types';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  colors: SwotColors;
  onColorChange: (quadrant: keyof SwotColors, newColor: string) => void;
}

const quadrantLabels: Record<keyof SwotColors, string> = {
    strengths: 'Forças',
    weaknesses: 'Fraquezas',
    opportunities: 'Oportunidades',
    threats: 'Ameaças',
};

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ isOpen, onClose, colors, onColorChange }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[calc(100vw-3rem)] max-w-sm bg-card rounded-xl shadow-2xl flex flex-col border"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            aria-modal="true"
            role="dialog"
          >
            <header className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Customizar Cores SWOT</h2>
              <button onClick={onClose} className="p-1 rounded-full text-muted-foreground hover:bg-accent hover:text-accent-foreground" aria-label="Close settings">
                <XIcon className="h-5 w-5" />
              </button>
            </header>
            <div className="p-6 space-y-4">
              {(Object.keys(colors) as Array<keyof SwotColors>).map((quadrant) => (
                <div key={quadrant} className="flex items-center justify-between">
                  <label htmlFor={`${quadrant}-color`} className="font-medium capitalize">{quadrantLabels[quadrant]}</label>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-muted-foreground font-mono">{colors[quadrant]}</span>
                    <input
                      id={`${quadrant}-color`}
                      type="color"
                      value={colors[quadrant]}
                      onChange={(e) => onColorChange(quadrant, e.target.value)}
                      className="w-8 h-8 p-0 border-none rounded-md cursor-pointer bg-transparent"
                      style={{'WebkitAppearance': 'none', 'MozAppearance': 'none', appearance: 'none'} as React.CSSProperties}
                    />
                  </div>
                </div>
              ))}
            </div>
            <footer className="p-4 border-t flex justify-end">
                <button onClick={onClose} className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90">
                    Fechar
                </button>
            </footer>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
