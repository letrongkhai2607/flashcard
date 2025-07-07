import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';

const CreateCategoryForm = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('categories.store'), {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <Card className="mx-auto w-full max-w-md">
            <CardHeader>
                <CardTitle>Create New Collection</CardTitle>
                <CardDescription>Add a new collection to organize your flashcards</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Collection Name</Label>
                        <Input
                            id="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Enter category name"
                            className={errors.name ? 'border-red-500' : ''}
                        />
                        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                    </div>
                    <Button type="submit" className="w-full" disabled={processing}>
                        {processing ? 'Creating...' : 'Create Collection'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default CreateCategoryForm;
