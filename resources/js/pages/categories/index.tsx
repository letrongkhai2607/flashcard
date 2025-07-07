import AppContainer from '@/components/app-container';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Link, router } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function Index({ categories }: any) {
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [showDialog, setShowDialog] = useState(false);
    const [deleteName, setDeleteName] = useState('');

    const handleDelete = (id: number, name: string) => {
        setDeleteId(id);
        setDeleteName(name);
        setShowDialog(true);
    };

    const confirmDelete = () => {
        if (deleteId) {
            router.delete(route('categories.destroy', deleteId));
        }
        setShowDialog(false);
        setDeleteId(null);
        setDeleteName('');
    };

    return (
        <AppContainer>
            <div className="min-h-screen py-8">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Collections</h1>
                    <Link href={route('categories.create')}>
                        <Button size={`sm`} className="cursor-pointer bg-yellow-400 font-semibold text-white hover:bg-yellow-400">
                            + Create Collection
                        </Button>
                    </Link>
                </div>
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {categories.map((cat: any) => (
                        <div key={cat.id} className="group relative">
                            <Link href={route('categories.detail', cat.id)}>
                                <div className="flex h-full min-h-32 flex-col rounded-xl bg-white p-4 text-purple-700">
                                    <h2 className="text-lg font-semibold">{cat.name}</h2>
                                    <p className="mt-2 text-sm text-purple-500">{cat.cards_count} cards</p>
                                </div>
                            </Link>
                            <Button
                                variant="destructive"
                                size="icon"
                                className="absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100"
                                onClick={() => handleDelete(cat.id, cat.name)}
                                title="Delete Collection"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>

                {/* Confirm Delete Dialog */}
                <Dialog open={showDialog} onOpenChange={setShowDialog}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Delete Collection</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to delete <span className="font-semibold">{deleteName}</span>?<br />
                                This action cannot be undone.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setShowDialog(false)}>
                                Cancel
                            </Button>
                            <Button variant="destructive" onClick={confirmDelete}>
                                Delete
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AppContainer>
    );
}
