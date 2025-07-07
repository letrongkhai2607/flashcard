import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from '@inertiajs/react';

interface Category {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

interface CreateCardFormProps {
    categories: Category[];
    categoryId?: number;
}

const CreateCardForm = ({ categories, categoryId }: CreateCardFormProps) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        english: '',
        chinese: '',
        vietnamese: '',
        category_id: categoryId || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('cards.store'), {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <Card className="mx-auto w-full max-w-md">
            <CardHeader>
                <CardTitle>Create New Card</CardTitle>
                <CardDescription>Add a new flashcard to your collection</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="english">English</Label>
                        <Input
                            id="english"
                            type="text"
                            value={data.english}
                            onChange={(e) => setData('english', e.target.value)}
                            placeholder="Enter English text"
                            className={errors.english ? 'border-red-500' : ''}
                        />
                        {errors.english && <p className="text-sm text-red-500">{errors.english}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="chinese">Chinese</Label>
                        <Input
                            id="chinese"
                            type="text"
                            value={data.chinese}
                            onChange={(e) => setData('chinese', e.target.value)}
                            placeholder="Enter Chinese text"
                            className={errors.chinese ? 'border-red-500' : ''}
                        />
                        {errors.chinese && <p className="text-sm text-red-500">{errors.chinese}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="vietnamese">Vietnamese</Label>
                        <Input
                            id="vietnamese"
                            type="text"
                            value={data.vietnamese}
                            onChange={(e) => setData('vietnamese', e.target.value)}
                            placeholder="Enter Vietnamese text"
                            className={errors.vietnamese ? 'border-red-500' : ''}
                        />
                        {errors.vietnamese && <p className="text-sm text-red-500">{errors.vietnamese}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select value={data.category_id.toString()} onValueChange={(value) => setData('category_id', parseInt(value))}>
                            <SelectTrigger className={errors.category_id ? 'border-red-500' : ''}>
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((category) => (
                                    <SelectItem key={category.id} value={category.id.toString()}>
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.category_id && <p className="text-sm text-red-500">{errors.category_id}</p>}
                    </div>

                    <Button type="submit" className="w-full" disabled={processing}>
                        {processing ? 'Creating...' : 'Create Card'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default CreateCardForm;
