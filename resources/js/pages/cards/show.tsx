import AppContainer from '@/components/app-container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, router } from '@inertiajs/react';
import { Edit, Trash2 } from 'lucide-react';

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

interface ShowCardPageProps {
    card: CardData;
}

export default function ShowCardPage({ card }: ShowCardPageProps) {
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this card?')) {
            router.delete(route('cards.destroy', card.id));
        }
    };

    return (
        <AppContainer>
            <div className="min-h-screen py-8">
                <div className="mb-8">
                    <Link href={route('categories.detail', card.category_id)} className="mb-4 inline-block text-purple-400 hover:text-purple-300">
                        ← Back to Category
                    </Link>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-white">Card Details</h1>
                            <p className="mt-2 text-purple-200">Category: {card.category.name}</p>
                        </div>
                        <div className="flex gap-2">
                            <Link href={route('cards.edit', card.id)}>
                                <Button variant="outline" size="sm">
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                </Button>
                            </Link>
                            <Button variant="destructive" size="sm" onClick={handleDelete}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-center">English</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-center text-lg font-medium">{card.english}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-center">Chinese</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-center text-lg font-medium">{card.chinese}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-center">Vietnamese</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-center text-lg font-medium">{card.vietnamese}</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Card Information</CardTitle>
                            <CardDescription>Additional details about this card</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Created:</span>
                                <span>{new Date(card.created_at).toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Last Updated:</span>
                                <span>{new Date(card.updated_at).toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Category:</span>
                                <span>{card.category.name}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppContainer>
    );
}
