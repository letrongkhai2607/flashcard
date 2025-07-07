import AppContainer from '@/components/app-container';
import CreateCardForm from '@/components/fomrs/create-card';
import { Link } from '@inertiajs/react';

interface Category {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

interface CreateCardPageProps {
    categories: Category[];
    categoryId?: number;
}

export default function CreateCardPage({ categories, categoryId }: CreateCardPageProps) {
    return (
        <AppContainer>
            <div className="min-h-screen py-8">
                <div className="mb-8">
                    <Link
                        href={categoryId ? route('categories.detail', categoryId) : route('categories.index')}
                        className="mb-4 inline-block text-purple-400 hover:text-purple-300"
                    >
                        ← Back to {categoryId ? 'Category' : 'Collections'}
                    </Link>
                </div>

                <CreateCardForm categories={categories} categoryId={categoryId} />
            </div>
        </AppContainer>
    );
}
