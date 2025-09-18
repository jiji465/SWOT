import React, { useState, useEffect } from 'react';
import { SWOT_DATA, STRATEGIC_PRIORITIES, TOWS_STRATEGIES, PRESENTATION_SLIDES } from './constants';
import { SwotCard } from './components/SwotCard';
import { TowsCard } from './components/TowsCard';
import { Header } from './components/Header';
import { PresentationFrame } from './components/PresentationFrame';
import { 
  TargetIcon, 
  LightbulbIcon, 
  ThumbsUpIcon, 
  ThumbsDownIcon, 
  AlertTriangleIcon 
} from './components/IconComponents';

const App: React.FC = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleNext = () => {
    if (slideIndex < PRESENTATION_SLIDES.length - 1) {
      setSlideIndex(slideIndex + 1);
    }
  };

  const handlePrev = () => {
    if (slideIndex > 0) {
      setSlideIndex(slideIndex - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        handleNext();
      } else if (event.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [slideIndex]);


  const renderSlideContent = () => {
    const slide = PRESENTATION_SLIDES[slideIndex];
    switch (slide.type) {
      case 'intro':
        return (
          <div className="text-center">
            <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-4">Análise Estratégica</h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">Dashboard Interativo de Análise SWOT & TOWS</p>
            <p className="text-lg text-slate-500 dark:text-slate-300">Use as setas do teclado ou os botões abaixo para navegar.</p>
          </div>
        );
      
      case 'swot':
        const swotCategory = slide.category as keyof typeof SWOT_DATA;
        const swotItem = SWOT_DATA[swotCategory];
        const swotConfig = {
            strengths: { icon: <ThumbsUpIcon className="h-10 w-10" />, color: 'accent-green' },
            weaknesses: { icon: <ThumbsDownIcon className="h-10 w-10" />, color: 'accent-orange' },
            opportunities: { icon: <LightbulbIcon className="h-10 w-10" />, color: 'accent-blue' },
            threats: { icon: <AlertTriangleIcon className="h-10 w-10" />, color: 'accent-red' },
        };
        return (
            <SwotCard 
              title={swotItem.title} 
              items={swotItem.items} 
              icon={swotConfig[swotCategory].icon}
              colorClass={swotConfig[swotCategory].color}
            />
        );

      case 'priorities':
        return (
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 border border-slate-200 dark:border-slate-700">
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 text-brand-primary">
                <TargetIcon className="h-12 w-12" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">Principais Iniciativas (12 Meses)</h3>
                <ul className="space-y-4">
                  {STRATEGIC_PRIORITIES.map((priority, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-brand-secondary font-bold text-xl mr-4 mt-0.5">{index + 1}.</span>
                      <p className="text-slate-600 dark:text-slate-300 text-lg">{priority}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      
      case 'tows':
        const strategy = TOWS_STRATEGIES[slide.index!];
        return <TowsCard strategy={strategy} />;

      case 'conclusion':
        return (
            <div className="text-center">
                <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-4">Obrigado!</h1>
                <p className="text-xl text-slate-600 dark:text-slate-400">Sessão de Perguntas e Respostas</p>
            </div>
        );

      default:
        return <div>Slide não encontrado</div>;
    }
  };

  return (
    <>
      <Header />
      <PresentationFrame
        title={PRESENTATION_SLIDES[slideIndex].title}
        slideIndex={slideIndex}
        totalSlides={PRESENTATION_SLIDES.length}
        onNext={handleNext}
        onPrev={handlePrev}
      >
        {renderSlideContent()}
      </PresentationFrame>
    </>
  );
};

export default App;