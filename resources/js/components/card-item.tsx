import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { Edit, Eye, Trash2 } from 'lucide-react';

interface CardItemProps {
    card: {
        id: number;
        english: string;
        chinese: string;
        vietnamese: string;
        category_id: number;
        created_at: string;
        updated_at: string;
        category?: {
            id: number;
            name: string;
        };
    };
    showActions?: boolean;
    onDelete?: (cardId: number) => void;
    className?: string;
}

const CardItem = ({ card, showActions = true, onDelete, className = '' }: CardItemProps) => {
    const handleDelete = (e: React.MouseEvent) => {
        e.preventDefault();
        if (onDelete) {
            onDelete(card.id);
        }
    };

    return (
        <div className={`group relative ${className}`}>
            <div className="rounded-lg bg-gradient-to-br from-purple-600 to-purple-800 p-4 text-white shadow-lg transition-shadow hover:shadow-xl">
                <div className="text-center">
                    <h3 className="mb-2 text-lg font-semibold">{card.english}</h3>
                    <div className="text-sm opacity-90">
                        <p className="mb-1">{card.chinese}</p>
                        <p>{card.vietnamese}</p>
                    </div>
                </div>

                {card.category && (
                    <div className="mt-3 border-t border-purple-500/30 pt-3">
                        <p className="text-xs opacity-75">Category: {card.category.name}</p>
                    </div>
                )}
            </div>

            {showActions && (
                <div className="absolute top-2 right-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <div className="flex gap-1">
                        <Link href={route('cards.show', card.id)}>
                            <Button variant="secondary" size="sm" className="h-8 w-8 p-0">
                                <Eye className="h-3 w-3" />
                            </Button>
                        </Link>
                        <Link href={route('cards.edit', card.id)}>
                            <Button variant="secondary" size="sm" className="h-8 w-8 p-0">
                                <Edit className="h-3 w-3" />
                            </Button>
                        </Link>
                        <Button variant="destructive" size="sm" className="h-8 w-8 p-0" onClick={handleDelete}>
                            <Trash2 className="h-3 w-3" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CardItem;
