import React, { useState, useRef, useEffect } from 'react';
// FIX: Import Variants type from framer-motion to correctly type animation variants.
import { motion, Variants } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";
import { SendIcon, XIcon, SparklesIcon } from './IconComponents';
import type { SwotData, TowsStrategy } from '../types';

interface AiChatProps {
    isOpen: boolean;
    onClose: () => void;
    swotData: SwotData;
    towsStrategies: TowsStrategy[];
    strategicPriorities: string[];
}

interface Message {
    role: 'user' | 'ai';
    text: string;
}

const TypingIndicator = () => (
    <div className="flex items-center space-x-1 p-2">
        <motion.div className="h-2 w-2 bg-muted-foreground rounded-full" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="h-2 w-2 bg-muted-foreground rounded-full" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.1 }} />
        <motion.div className="h-2 w-2 bg-muted-foreground rounded-full" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }} />
    </div>
);

export const AiChat: React.FC<AiChatProps> = ({ isOpen, onClose, swotData, towsStrategies, strategicPriorities }) => {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'ai', text: "Olá! Como posso ajudar a analisar os dados desta apresentação?" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const buildSystemPrompt = () => {
        return `Você é um assistente de IA especializado em análise de negócios, treinado para atuar como um consultor de estratégia sênior. Sua principal função é analisar e sintetizar as informações fornecidas para responder a perguntas sobre o plano estratégico da empresa.

**Sua Base de Conhecimento (Dados Fornecidos):**

1.  **Análise SWOT:**
    - **Forças:** ${swotData.strengths.items.join('; ')}.
    - **Fraquezas:** ${swotData.weaknesses.items.join('; ')}.
    - **Oportunidades:** ${swotData.opportunities.items.join('; ')}.
    - **Ameaças:** ${swotData.threats.items.join('; ')}.

2.  **Iniciativas Estratégicas Prioritárias (Próximos 12 meses):**
${strategicPriorities.map(p => `    - ${p}`).join('\n')}

3.  **Estratégias Derivadas (Matriz TOWS):**
${towsStrategies.map(s => `    - **${s.type} (${s.title})**: ${s.strategy} (Racional: ${s.rationale})`).join('\n')}

---

**Diretrizes Essenciais para suas Respostas:**

1.  **Foco na Interconexão:** Sua principal diretriz é **conectar os pontos** entre as diferentes análises. Não responda sobre um item isolado. Em vez disso, explique **como** uma Força ou Fraqueza, combinada com uma Oportunidade ou Ameaça, leva a uma Estratégia TOWS específica e **por que** isso se alinha com uma das Prioridades Estratégicas.

2.  **Síntese, Não Repetição:** Não se limite a listar os dados. Sintetize as informações para fornecer insights. O usuário pode ler os slides; seu valor está em explicar o "porquê" e as relações de causa e efeito.

3.  **Base Exclusiva nos Dados:** Responda *apenas* com base nas informações fornecidas. Se a pergunta for sobre algo não contido nos dados (ex: "Qual o nosso orçamento de marketing?"), informe que essa informação não está disponível na análise atual.

4.  **Linguagem e Tom:** Use Português do Brasil. Mantenha um tom profissional, claro e didático, como um verdadeiro consultor de negócios.

**Exemplos de Respostas Ideais:**

*   **Pergunta do Usuário:** "Por que a expansão no Sudeste é tão importante?"
*   **Sua Resposta Ideal:** "A expansão no Sudeste é uma de nossas quatro iniciativas prioritárias e é sustentada por uma forte estratégia de 'Força + Oportunidade'. Estamos utilizando nossa **Força** — a marca já reconhecida no Nordeste — para aproveitar a **Oportunidade** do crescimento do público flexitariano naquela região. A estratégia é acelerar a entrada, consolidando nossa presença antes dos concorrentes, o que se alinha diretamente com a prioridade de 'Expandir a penetração de mercado no Sudeste'."

*   **Pergunta do Usuário:** "Como o novo ERP nos ajuda com a concorrência?"
*   **Sua Resposta Ideal:** "A atualização do ERP é uma estratégia de 'Fraqueza + Oportunidade' que tem um impacto indireto, mas crucial, na nossa competitividade. Nossa **Fraqueza** é o ERP antigo e limitador. Ao aproveitar a **Oportunidade** de sistemas em nuvem mais acessíveis, nós melhoramos a eficiência interna e o planejamento de estoque. Isso libera margem operacional, o que nos permite ser mais competitivos em preço, uma vantagem importante para enfrentar as ameaças do mercado, como a entrada de multinacionais."
`;
    };

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        const currentInput = input;
        setInput('');
        setIsLoading(true);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: currentInput,
                config: {
                    systemInstruction: buildSystemPrompt(),
                },
            });
            const aiMessage: Message = { role: 'ai', text: response.text };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error("Gemini API error:", error);
            const errorMessage: Message = { role: 'ai', text: 'Desculpe, encontrei um erro. Por favor, tente novamente.' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    }, [isOpen]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // FIX: Explicitly type modalVariants with the Variants type to fix TypeScript error with transition properties.
    const modalVariants: Variants = {
        hidden: { opacity: 0, scale: 0.9, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', damping: 15, stiffness: 200 } },
        exit: { opacity: 0, scale: 0.9, y: 20, transition: { duration: 0.2 } }
    };

    const backdropVariants: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 }
    };

    return (
        <>
            <motion.div 
                className="fixed inset-0 bg-black/50 z-40" 
                onClick={onClose}
                variants={backdropVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            />
            <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] max-w-md h-[calc(100vh-6rem)] max-h-[600px] bg-card rounded-xl shadow-2xl flex flex-col border"
                aria-modal="true"
                role="dialog"
            >
                <header className="flex items-center justify-between p-4 border-b">
                    <div className="flex items-center space-x-2">
                        <SparklesIcon className="h-6 w-6 text-primary" />
                        <h2 className="text-lg font-semibold">Assistente de Estratégia</h2>
                    </div>
                    <button onClick={onClose} className="p-1 rounded-full text-muted-foreground hover:bg-accent hover:text-accent-foreground" aria-label="Close chat">
                        <XIcon className="h-5 w-5" />
                    </button>
                </header>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] rounded-lg px-4 py-2 ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-muted rounded-lg px-4 py-2">
                                <TypingIndicator />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                <footer className="p-4 border-t">
                    <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center space-x-2">
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Pergunte sobre a análise..."
                            className="flex-1 bg-input rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            disabled={isLoading}
                        />
                        <button type="submit" disabled={isLoading || !input.trim()} className="h-9 w-9 bg-primary text-primary-foreground rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed">
                            <SendIcon className="h-5 w-5" />
                        </button>
                    </form>
                </footer>
            </motion.div>
        </>
    );
};