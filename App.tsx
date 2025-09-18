
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SWOT_DATA, STRATEGIC_PRIORITIES, TOWS_STRATEGIES, PRESENTATION_SLIDES } from './constants';
import { SwotCard } from './components/SwotCard';
import { TowsCard } from './components/TowsCard';
import { Header } from './components/Header';
import { PresentationFrame } from './components/PresentationFrame';
import { DynamicBackground } from './components/DynamicBackground';
import { AiChat } from './components/AiChat';
import { 
  LightbulbIcon, 
  ThumbsUpIcon, 
  ThumbsDownIcon, 
  AlertTriangleIcon,
  CheckCircleIcon,
  SparklesIcon
} from './components/IconComponents';
import { PresentationSlide } from './types';

const App: React.FC = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [subStep, setSubStep] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  const [backgroundKey, setBackgroundKey] = useState('intro');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [direction, setDirection] = useState(0);

  const slideSteps = useMemo(() => PRESENTATION_SLIDES.map(slide => 
    slide.type === 'swot-matrix' ? 4 : 1
  ), []);

  const totalSteps = useMemo(() => slideSteps.reduce((acc, steps) => acc + steps, 0), [slideSteps]);
  
  const currentStep = useMemo(() => 
    slideSteps.slice(0, slideIndex).reduce((acc, steps) => acc + steps, 0) + subStep + 1,
    [slideIndex, subStep, slideSteps]
  );

  useEffect(() => {
    const slide = PRESENTATION_SLIDES[slideIndex];
    let key: string;
    if (slide.type === 'tows') {
      // Create a unique key for each TOWS slide
      key = `${TOWS_STRATEGIES[slide.index!].type.toLowerCase()}-${slide.index}`;
    } else {
      key = slide.type;
    }
    setBackgroundKey(key);
  }, [slideIndex]);


  const handleNext = () => {
    setDirection(1);
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
    setDirection(-1);
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
      if (isChatOpen) return;
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
  }, [slideIndex, subStep, isChatOpen]);

  const slideVariants = {
    hidden: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? 30 : -30,
    }),
    visible: {
      opacity: 1,
      x: 0,
    },
    exit: (direction: number) => ({
      opacity: 0,
      x: direction < 0 ? 30 : -30,
    }),
  };

  const renderSlideContent = () => {
    const slide = PRESENTATION_SLIDES[slideIndex];
    switch (slide.type) {
      case 'intro':
        return (
          <div className="text-center">
            <h1 className="text-6xl font-bold text-white mb-4 [text-shadow:_0_2px_4px_rgb(0_0_0_/_40%)]">Análise Estratégica</h1>
            <p className="text-2xl text-slate-200 [text-shadow:_0_1px_2px_rgb(0_0_0_/_30%)]">Apresentação Interativa de Análise SWOT & TOWS</p>
          </div>
        );
      
      case 'swot-matrix':
        const swotConfig = {
            strengths: { data: SWOT_DATA.strengths, icon: <ThumbsUpIcon />, color: 'accent-green', position: 'top-left' as const },
            weaknesses: { data: SWOT_DATA.weaknesses, icon: <ThumbsDownIcon />, color: 'accent-orange', position: 'top-right' as const },
            opportunities: { data: SWOT_DATA.opportunities, icon: <LightbulbIcon />, color: 'accent-blue', position: 'bottom-left' as const },
            threats: { data: SWOT_DATA.threats, icon: <AlertTriangleIcon />, color: 'accent-red', position: 'bottom-right' as const },
        };
        return (
            <div>
                <h2 className="text-4xl font-bold text-center mb-10 text-white [text-shadow:_0_2px_4px_rgb(0_0_0_/_40%)]">Matriz SWOT</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SwotCard isVisible={subStep >= 0} position={swotConfig.strengths.position} title={swotConfig.strengths.data.title} items={swotConfig.strengths.data.items} icon={swotConfig.strengths.icon} colorClass={swotConfig.strengths.color} />
                    <SwotCard isVisible={subStep >= 1} position={swotConfig.weaknesses.position} title={swotConfig.weaknesses.data.title} items={swotConfig.weaknesses.data.items} icon={swotConfig.weaknesses.icon} colorClass={swotConfig.weaknesses.color} />
                    <SwotCard isVisible={subStep >= 2} position={swotConfig.opportunities.position} title={swotConfig.opportunities.data.title} items={swotConfig.opportunities.data.items} icon={swotConfig.opportunities.icon} colorClass={swotConfig.opportunities.color} />
                    <SwotCard isVisible={subStep >= 3} position={swotConfig.threats.position} title={swotConfig.threats.data.title} items={swotConfig.threats.data.items} icon={swotConfig.threats.icon} colorClass={swotConfig.threats.color} />
                </div>
            </div>
        );

      case 'priorities':
        return (
          <div>
            <h2 className="text-4xl font-bold text-center mb-10 text-white [text-shadow:_0_2px_4px_rgb(0_0_0_/_40%)]">Iniciativas Prioritárias (12 Meses)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {STRATEGIC_PRIORITIES.map((priority, index) => (
                    <motion.div 
                      key={index} 
                      className="bg-card text-card-foreground p-6 rounded-lg shadow-lg flex items-start space-x-4 border"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0, transition: { delay: index * 0.1 } }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="flex-shrink-0 text-primary mt-1">
                          <CheckCircleIcon className="h-7 w-7" />
                      </div>
                      <p className="text-xl">{priority}</p>
                    </motion.div>
                ))}
            </div>
          </div>
        );
      
      case 'tows':
        const strategy = TOWS_STRATEGIES[slide.index!];
        return <TowsCard strategy={strategy} />;

      case 'conclusion':
        return (
            <div className="text-center">
                <h1 className="text-6xl font-bold text-white mb-4 [text-shadow:_0_2px_4px_rgb(0_0_0_/_40%)]">Obrigado</h1>
                <p className="text-2xl text-slate-200 [text-shadow:_0_1px_2px_rgb(0_0_0_/_30%)]">Perguntas e Respostas</p>
            </div>
        );

      default:
        return <div>Slide não encontrado</div>;
    }
  };

  return (
    <>
      <DynamicBackground backgroundKey={backgroundKey} />
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
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={animationKey}
            custom={direction}
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
          >
            {renderSlideContent()}
          </motion.div>
        </AnimatePresence>
      </PresentationFrame>
      
      <motion.button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 z-30 h-16 w-16 bg-primary rounded-full shadow-lg flex items-center justify-center text-primary-foreground"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Ask AI"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1, transition: { delay: 0.5 } }}
      >
          <SparklesIcon className="h-8 w-8" />
      </motion.button>

      <AnimatePresence>
          {isChatOpen && (
              <AiChat 
                  isOpen={isChatOpen} 
                  onClose={() => setIsChatOpen(false)} 
                  swotData={SWOT_DATA}
                  towsStrategies={TOWS_STRATEGIES}
                  strategicPriorities={STRATEGIC_PRIORITIES}
              />
          )}
      </AnimatePresence>
    </>
  );
};

export default App;
