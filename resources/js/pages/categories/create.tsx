import AppContainer from '@/components/app-container';
import CreateCategoryForm from '@/components/fomrs/create-category';
import { Link } from '@inertiajs/react';

export default function CreateCategoryPage() {
    return (
        <AppContainer>
            <div className="min-h-screen py-8">
                <div className="mb-8">
                    <Link href={route('categories.index')} className="mb-4 inline-block text-white hover:text-yellow-300">
                        ← Back to Collections
                    </Link>
                </div>
                <CreateCategoryForm />
            </div>
        </AppContainer>
    );
}
