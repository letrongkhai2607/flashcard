import AppContainer from '@/components/app-container';
import CardItem from '@/components/card-item';
import CardSlideshow from '@/components/card-slideshow';
import { Button } from '@/components/ui/button';
import { Link, router } from '@inertiajs/react';
import { Play, Plus } from 'lucide-react';
import { useState } from 'react';

interface Category {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

interface CardData {
    id: number;
    english: string;
    chinese: string;
    vietnamese: string;
    category_id: number;
    created_at: string;
    updated_at: string;
    category: Category;
}

interface CardsIndexPageProps {
    cards: CardData[];
}

export default function CardsIndexPage({ cards }: CardsIndexPageProps) {
    const [isSlideshowOpen, setIsSlideshowOpen] = useState(false);

    const handleDeleteCard = (cardId: number) => {
        if (confirm('Are you sure you want to delete this card?')) {
            router.delete(route('cards.destroy', cardId));
        }
    };

    const handlePlaySlideshow = () => {
        if (cards.length === 0) {
            alert('No cards available to play. Please add some cards first.');
            return;
        }
        setIsSlideshowOpen(true);
    };

    return (
        <AppContainer>
            <div className="min-h-screen py-8">
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-white">All Cards</h1>
                            <p className="mt-2 text-purple-200">Manage all your flashcards</p>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" onClick={handlePlaySlideshow} disabled={cards.length === 0}>
                                <Play className="mr-2 h-4 w-4" />
                                Practice All ({cards.length})
                            </Button>
                            <Link href={route('cards.create')}>
                                <Button>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Create New Card
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {cards.map((card) => (
                        <CardItem key={card.id} card={card} onDelete={handleDeleteCard} />
                    ))}
                </div>

                {cards.length === 0 && (
                    <div className="py-12 text-center">
                        <div className="mb-4 text-6xl">📝</div>
                        <h3 className="mb-2 text-xl font-semibold text-white">No cards yet</h3>
                        <p className="mb-6 text-purple-200">Start creating your first flashcard to begin learning!</p>
                        <Link href={route('cards.create')}>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Create Your First Card
                            </Button>
                        </Link>
                    </div>
                )}

                {/* Slideshow Modal */}
                <CardSlideshow cards={cards} isOpen={isSlideshowOpen} onClose={() => setIsSlideshowOpen(false)} />
            </div>
        </AppContainer>
    );
}
