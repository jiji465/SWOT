import React, { useState, useEffect, useMemo } from 'react';
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
  AlertTriangleIcon,
  CheckCircleIcon
} from './components/IconComponents';

const App: React.FC = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [subStep, setSubStep] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);

  const slideSteps = useMemo(() => PRESENTATION_SLIDES.map(slide => 
    slide.type === 'swot-matrix' ? 4 : 1
  ), []);

  const totalSteps = useMemo(() => slideSteps.reduce((acc, steps) => acc + steps, 0), [slideSteps]);
  
  const currentStep = useMemo(() => 
    slideSteps.slice(0, slideIndex).reduce((acc, steps) => acc + steps, 0) + subStep + 1,
    [slideIndex, subStep, slideSteps]
  );

  const handleNext = () => {
    const currentSlide = PRESENTATION_SLIDES[slideIndex];
    if (currentSlide.type === 'swot-matrix' && subStep < 3) {
      setSubStep(subStep + 1);
    } else if (slideIndex < PRESENTATION_SLIDES.length - 1) {
      setSlideIndex(slideIndex + 1);
      setSubStep(0);
      setAnimationKey(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (subStep > 0) {
      setSubStep(subStep - 1);
    } else if (slideIndex > 0) {
      const prevSlideSteps = slideSteps[slideIndex - 1];
      setSlideIndex(slideIndex - 1);
      setSubStep(prevSlideSteps - 1);
      setAnimationKey(prev => prev + 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' && currentStep < totalSteps) {
        handleNext();
      } else if (event.key === 'ArrowLeft' && currentStep > 1) {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [slideIndex, subStep]);


  const renderSlideContent = () => {
    const slide = PRESENTATION_SLIDES[slideIndex];
    switch (slide.type) {
      case 'intro':
        return (
          <div className="text-center animate-fade-in-up">
            <h1 className="text-6xl font-bold text-slate-800 dark:text-white mb-4">Análise Estratégica</h1>
            <p className="text-2xl text-slate-600 dark:text-slate-300">Apresentação Interativa de Análise SWOT & TOWS</p>
          </div>
        );
      
      case 'swot-matrix':
        const swotConfig = {
            strengths: { data: SWOT_DATA.strengths, icon: <ThumbsUpIcon />, color: 'accent-green' },
            weaknesses: { data: SWOT_DATA.weaknesses, icon: <ThumbsDownIcon />, color: 'accent-orange' },
            opportunities: { data: SWOT_DATA.opportunities, icon: <LightbulbIcon />, color: 'accent-blue' },
            threats: { data: SWOT_DATA.threats, icon: <AlertTriangleIcon />, color: 'accent-red' },
        };
        return (
            <div>
                <h2 className="text-4xl font-bold text-center mb-10 text-slate-800 dark:text-white animate-fade-in">Matriz SWOT</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SwotCard isVisible={subStep >= 0} title={swotConfig.strengths.data.title} items={swotConfig.strengths.data.items} icon={swotConfig.strengths.icon} colorClass={swotConfig.strengths.color} />
                    <SwotCard isVisible={subStep >= 1} title={swotConfig.weaknesses.data.title} items={swotConfig.weaknesses.data.items} icon={swotConfig.weaknesses.icon} colorClass={swotConfig.weaknesses.color} />
                    <SwotCard isVisible={subStep >= 2} title={swotConfig.opportunities.data.title} items={swotConfig.opportunities.data.items} icon={swotConfig.opportunities.icon} colorClass={swotConfig.opportunities.color} />
                    <SwotCard isVisible={subStep >= 3} title={swotConfig.threats.data.title} items={swotConfig.threats.data.items} icon={swotConfig.threats.icon} colorClass={swotConfig.threats.color} />
                </div>
            </div>
        );

      case 'priorities':
        return (
          <div className="animate-fade-in-up">
            <h2 className="text-4xl font-bold text-center mb-10 text-slate-800 dark:text-white">Iniciativas Prioritárias (12 Meses)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {STRATEGIC_PRIORITIES.map((priority, index) => (
                    <div key={index} className="bg-white dark:bg-slate-800/50 p-6 rounded-lg shadow-lg flex items-start space-x-4 border border-slate-200 dark:border-slate-700">
                      <div className="flex-shrink-0 text-brand-primary dark:text-brand-secondary mt-1">
                          <CheckCircleIcon className="h-7 w-7" />
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 text-lg">{priority}</p>
                    </div>
                ))}
            </div>
          </div>
        );
      
      case 'tows':
        const strategy = TOWS_STRATEGIES[slide.index!];
        return <div className="animate-fade-in-up"><TowsCard strategy={strategy} /></div>;

      case 'conclusion':
        return (
            <div className="text-center animate-fade-in-up">
                <h1 className="text-6xl font-bold text-slate-800 dark:text-white mb-4">Obrigado</h1>
                <p className="text-2xl text-slate-600 dark:text-slate-300">Perguntas e Respostas</p>
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
        currentStep={currentStep}
        totalSteps={totalSteps}
        onNext={handleNext}
        onPrev={handlePrev}
        isNextDisabled={currentStep >= totalSteps}
        isPrevDisabled={currentStep <= 1}
      >
        <div key={animationKey}>
          {renderSlideContent()}
        </div>
      </PresentationFrame>
    </>
  );
};

export default App;