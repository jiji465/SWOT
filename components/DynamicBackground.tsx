
import React from 'react';

const backgroundImages: Record<string, string> = {
  // Beginning and End - Corporate meeting
  intro: 'url(https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop)',
  conclusion: 'url(https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop)',
  
  // SWOT Matrix - Abstract grid for analysis
  'swot-matrix': 'url(https://images.unsplash.com/photo-1550745165-9bc0b252726a?q=80&w=2070&auto=format&fit=crop)',
  
  // Priorities - Converging lines representing focus
  priorities: 'url(https://images.unsplash.com/photo-1586592237699-7a31a4036734?q=80&w=2070&auto=format&fit=crop)',
  
  // All TOWS Strategies - Connecting nodes representing synergy and combinations
  'so-0': 'url(https://images.unsplash.com/photo-1586182996123-58272535a22c?q=80&w=2070&auto=format&fit=crop)',
  'st-1': 'url(https://images.unsplash.com/photo-1586182996123-58272535a22c?q=80&w=2070&auto=format&fit=crop)',
  'wo-2': 'url(https://images.unsplash.com/photo-1586182996123-58272535a22c?q=80&w=2070&auto=format&fit=crop)',
  'wt-3': 'url(https://images.unsplash.com/photo-1586182996123-58272535a22c?q=80&w=2070&auto=format&fit=crop)',
  'so-4': 'url(https://images.unsplash.com/photo-1586182996123-58272535a22c?q=80&w=2070&auto=format&fit=crop)',
  'wo-5': 'url(https://images.unsplash.com/photo-1586182996123-58272535a22c?q=80&w=2070&auto=format&fit=crop)',
};

interface DynamicBackgroundProps {
  backgroundKey: string;
}

export const DynamicBackground: React.FC<DynamicBackgroundProps> = ({ backgroundKey }) => {
  return (
    <div className="fixed inset-0 -z-10 bg-slate-950">
      {Object.keys(backgroundImages).map(key => (
        <div
          key={key}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            backgroundKey === key ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: backgroundImages[key] }}
        />
      ))}
      <div className="absolute inset-0 bg-black/60" />
    </div>
  );
};
