import AppContainer from '@/components/app-container';
import CardSlideshow from '@/components/card-slideshow';
import { Button } from '@/components/ui/button';
import { Link, router } from '@inertiajs/react';
import { Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';

const tags = ['Geography', 'USA', 'Capitals', 'Places', 'Topography'];
const cards = [{ name: 'Alabama' }, { name: 'Alaska' }, { name: 'Arizona' }, { name: 'Arkansas' }];

export interface Card {
    id: number;
    english: string;
    chinese: string;
    vietnamese: string;
    category_id: number;
    created_at: string;
    updated_at: string;
}
export interface Category {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export default function DeckView({ cards, category }: { cards: Card[]; category: Category }) {
    const [language, setLanguage] = useState('chinese');
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
                {/* Header Section */}
                <div className="mb-8 flex flex-col items-start gap-6 md:flex-row md:items-center">
                    <img
                        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=128&h=128&q=80"
                        alt="Collection"
                        className="h-28 w-28 rounded-full border-4 border-purple-600 object-cover shadow-lg"
                    />
                    <div className="flex-1">
                        <Link className="hover:text-yellow-300" href={route('categories.index')}>
                            ← My Collections
                        </Link>
                        <div className="mb-2 flex items-center gap-2">
                            <h1 className="text-3xl font-bold text-white md:text-4xl">{category.name}</h1>
                        </div>
                        <div className="mb-1 flex items-center gap-4 text-sm text-purple-200">
                            <span>{new Date(category.created_at).toLocaleDateString()}</span>
                            <span>{cards.length} cards</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 md:ml-6">
                        <button
                            onClick={handlePlaySlideshow}
                            className="flex items-center gap-2 rounded-full bg-yellow-400 px-6 py-2 font-semibold text-white shadow transition hover:bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-50"
                            disabled={cards.length === 0}
                        >
                            <svg width="18" height="18" fill="currentColor" className="inline-block">
                                <path d="M6 4l8 5-8 5V4z" />
                            </svg>
                            Play
                        </button>
                        {/* Select Language */}
                    </div>
                </div>
                {/* Cards Grid */}
                <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
                    {/* Add Card */}
                    <Link href={`${route('cards.create')}?category_id=${category.id}`} className="block">
                        <div className="flex h-32 cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-purple-300 bg-purple-800 text-5xl text-purple-300 transition hover:bg-purple-700 md:h-48">
                            +
                        </div>
                    </Link>
                    {/* State Cards */}
                    {cards.map((card: Card) => {
                        let backendSide = '';
                        if (language === 'english') {
                            backendSide = `${card.chinese} - ${card.vietnamese}`;
                        } else if (language === 'chinese') {
                            backendSide = `${card.english} - ${card.vietnamese}`;
                        } else if (language === 'vietnamese') {
                            backendSide = `${card.english} - ${card.chinese}`;
                        }
                        return DeckCard(card, language, backendSide, handleDeleteCard);
                    })}
                </div>

                {/* Slideshow Modal */}
                <CardSlideshow cards={cards} isOpen={isSlideshowOpen} onClose={() => setIsSlideshowOpen(false)} />
            </div>
        </AppContainer>
    );
}
function DeckCard(card: Card, language: string, backendSide: string, handleDeleteCard: (cardId: number) => void) {
    const [flipped, setFlipped] = useState(false);

    const handleClick = () => {
        // Chỉ xử lý click nếu là mobile (hoặc luôn xử lý nếu bạn muốn click toggle được ở cả PC)
        if (window.innerWidth <= 768) {
            setFlipped((prev) => !prev);
        }
    };
    return (
        <div key={card.id} className="group relative h-32 [perspective:1000px] md:h-48">
            <div className="group h-full w-full" onClick={handleClick}>
                <div
                    className={`relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] ${
                        flipped ? '[transform:rotateY(180deg)]' : ''
                    } group-hover:[transform:rotateY(180deg)]`}
                >
                    {/* Front Side */}
                    <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-gradient-to-b from-purple-300/40 to-purple-100/10 text-center text-xl font-bold text-white shadow-md [backface-visibility:hidden]">
                        {language === 'english' ? card.english : language === 'chinese' ? card.chinese : card.vietnamese}
                    </div>

                    {/* Back Side */}
                    <div className="text-md absolute inset-0 flex [transform:rotateY(180deg)] items-center justify-center rounded-xl bg-purple-500 px-4 text-center font-bold text-white shadow-md [backface-visibility:hidden]">
                        {backendSide}
                    </div>
                </div>
            </div>

            {/* Card Actions - Only visible on hover */}
            <div className="absolute top-2 right-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <div className="flex gap-1">
                    <Link href={route('cards.edit', card.id)}>
                        <Button variant="secondary" size="sm" className="h-8 w-8 p-0">
                            <Edit className="h-3 w-3" />
                        </Button>
                    </Link>
                    <Button
                        variant="destructive"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={(e) => {
                            e.preventDefault();
                            handleDeleteCard(card.id);
                        }}
                    >
                        <Trash2 className="h-3 w-3" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
