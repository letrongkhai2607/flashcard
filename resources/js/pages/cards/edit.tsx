import AppContainer from '@/components/app-container';
import EditCardForm from '@/components/fomrs/edit-card';
import { Link } from '@inertiajs/react';

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
}

interface EditCardPageProps {
    card: CardData;
    categories: Category[];
}

export default function EditCardPage({ card, categories }: EditCardPageProps) {
    return (
        <AppContainer>
            <div className="min-h-screen py-8">
                <div className="mb-8">
                    <Link href={route('categories.detail', card.category_id)} className="mb-4 inline-block text-white hover:text-yellow-300">
                        ← Back to Category
                    </Link>
                </div>

                <EditCardForm card={card} categories={categories} />
            </div>
        </AppContainer>
    );
}
