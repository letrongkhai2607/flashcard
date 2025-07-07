import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, Pause, Play, RotateCcw, SkipBack, SkipForward } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Card, CardContent } from './ui/card';

interface CardData {
    id: number;
    english: string;
    chinese: string;
    vietnamese: string;
    category_id: number;
    created_at: string;
    updated_at: string;
}

interface CardSlideshowProps {
    cards: CardData[];
    isOpen: boolean;
    onClose: () => void;
}

type Language = 'english' | 'chinese' | 'vietnamese';

const CardSlideshow = ({ cards, isOpen, onClose }: CardSlideshowProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [language, setLanguage] = useState<Language>('english');
    const [isAutoPlay, setIsAutoPlay] = useState(false);
    const [autoPlayInterval, setAutoPlayInterval] = useState<NodeJS.Timeout | null>(null);

    const currentCard = cards[currentIndex];

    const nextCard = () => {
        setCurrentIndex((prev) => (prev + 1) % cards.length);
        setShowAnswer(false);
    };

    const prevCard = () => {
        setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
        setShowAnswer(false);
    };

    const goToFirst = () => {
        setCurrentIndex(0);
        setShowAnswer(false);
    };

    const goToLast = () => {
        setCurrentIndex(cards.length - 1);
        setShowAnswer(false);
    };

    const toggleAutoPlay = () => {
        if (isAutoPlay) {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
                setAutoPlayInterval(null);
            }
            setIsAutoPlay(false);
        } else {
            const interval = setInterval(() => {
                nextCard();
            }, 3000); // 3 seconds per card
            setAutoPlayInterval(interval);
            setIsAutoPlay(true);
        }
    };

    const resetSlideshow = () => {
        setCurrentIndex(0);
        setShowAnswer(false);
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            setAutoPlayInterval(null);
        }
        setIsAutoPlay(false);
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!isOpen) return;

            switch (event.key) {
                case 'ArrowRight':
                case ' ':
                    event.preventDefault();
                    nextCard();
                    break;
                case 'ArrowLeft':
                    event.preventDefault();
                    prevCard();
                    break;
                case 'Enter':
                    event.preventDefault();
                    setShowAnswer(!showAnswer);
                    break;
                case 'Escape':
                    event.preventDefault();
                    onClose();
                    break;
                case 'Home':
                    event.preventDefault();
                    goToFirst();
                    break;
                case 'End':
                    event.preventDefault();
                    goToLast();
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, showAnswer, onClose]);

    useEffect(() => {
        if (!isOpen) {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
                setAutoPlayInterval(null);
            }
            setIsAutoPlay(false);
        }
    }, [isOpen, autoPlayInterval]);

    useEffect(() => {
        return () => {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
            }
        };
    }, [autoPlayInterval]);

    const getQuestionText = () => {
        return currentCard[language];
    };

    const getAnswerText = () => {
        const languages: Language[] = ['english', 'chinese', 'vietnamese'];
        const otherLanguages = languages.filter((lang) => lang !== language);
        return otherLanguages.map((lang) => currentCard[lang]).join(' - ');
    };

    if (!currentCard) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-full overflow-hidden bg-gradient-to-br from-purple-900 to-blue-900 text-white md:min-w-4xl">
                <DialogHeader>
                    <div className="flex items-center justify-between">
                        <DialogTitle className="text-xl text-white">
                            Slideshow - {currentIndex + 1} of {cards.length}
                        </DialogTitle>
                    </div>
                </DialogHeader>

                <div className="flex h-full flex-col">
                    {/* Language Selector */}
                    <div className="mb-6 flex justify-center">
                        <div className="flex rounded-lg bg-white/10 p-1 backdrop-blur-sm">
                            {(['english', 'chinese', 'vietnamese'] as Language[]).map((lang) => (
                                <Button
                                    key={lang}
                                    variant={language === lang ? 'default' : 'ghost'}
                                    size="sm"
                                    onClick={() => setLanguage(lang)}
                                    className={`capitalize ${language === lang ? 'bg-white text-purple-900' : 'text-white hover:bg-white/20'}`}
                                >
                                    {lang}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Card Display */}
                    <div className="mb-6 flex flex-1 items-center justify-center">
                        <Card
                            className="group relative h-64 w-full max-w-xl cursor-pointer border-white/20 bg-white/10 backdrop-blur-sm"
                            onClick={() => setShowAnswer(!showAnswer)}
                        >
                            <CardContent className="flex h-full items-center justify-center p-8">
                                <div className="text-center">
                                    {!showAnswer ? (
                                        <div>
                                            <h2 className="mb-4 text-3xl font-bold text-white">{getQuestionText()}</h2>
                                            <p className="text-white/70">Click or press Enter to reveal answer</p>
                                        </div>
                                    ) : (
                                        <div>
                                            <h2 className="mb-4 text-2xl font-bold text-white">{getQuestionText()}</h2>
                                            <div className="text-xl text-white/80">{getAnswerText()}</div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Controls */}
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:gap-0">
                        <div className="flex gap-2">
                            <Button size="sm" onClick={resetSlideshow} className="text-black">
                                <RotateCcw className="mr-2 h-4 w-4" />
                                Reset
                            </Button>
                            <Button size="sm" onClick={toggleAutoPlay} className="text-black">
                                {isAutoPlay ? (
                                    <>
                                        <Pause className="mr-2 h-4 w-4" />
                                        Pause
                                    </>
                                ) : (
                                    <>
                                        <Play className="mr-2 h-4 w-4" />
                                        Auto Play
                                    </>
                                )}
                            </Button>
                        </div>

                        <div className="flex gap-2">
                            <Button size="sm" onClick={goToFirst} disabled={currentIndex === 0} className="text-black">
                                <SkipBack className="h-4 w-4" />
                            </Button>
                            <Button size="sm" onClick={prevCard} disabled={currentIndex === 0} className="text-black">
                                <ChevronLeft className="mr-2 h-4 w-4" />
                                Previous
                            </Button>
                            <Button size="sm" onClick={nextCard} disabled={currentIndex === cards.length - 1} className="text-black">
                                Next
                                <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                            <Button size="sm" onClick={goToLast} disabled={currentIndex === cards.length - 1} className="text-black">
                                <SkipForward className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4">
                        <div className="h-2 w-full rounded-full bg-white/20">
                            <div
                                className="h-2 rounded-full bg-yellow-400 transition-all duration-300"
                                style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
                            />
                        </div>
                    </div>

                    {/* Keyboard Shortcuts Help */}
                    <div className="mt-4 text-center text-xs text-white/60">
                        <p>Keyboard shortcuts: ← → (navigate), Enter (reveal), Space (next), Esc (close), Home/End (first/last)</p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CardSlideshow;
