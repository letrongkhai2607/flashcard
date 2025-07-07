import { Link } from '@inertiajs/react';

export default function Landing() {
    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-purple-700 to-purple-500">
            <div className="container mx-auto flex flex-col items-center justify-between px-6 py-12 md:flex-row">
                {/* Left: Text Content */}
                <div className="z-10 w-full md:w-1/2">
                    <h1 className="mb-6 text-5xl leading-tight font-bold text-white md:text-6xl">
                        A New Way
                        <br />
                        to <span className="text-yellow-400">Flashcard</span>
                    </h1>
                    <p className="mb-8 max-w-lg text-lg text-white/90">
                        Perfect for exams, language skills, or professional growth,
                        <br />
                        Little Cards adapts to your pace, making learning both fun and effective.
                        <br />
                        Expand your knowledge effortlessly with Little Cards!
                    </p>
                    <Link href={route('categories.index')}>
                        <button className="rounded-full bg-yellow-400 px-10 py-3 text-lg font-semibold text-white shadow-lg transition hover:bg-yellow-500">
                            Collections
                        </button>
                    </Link>
                </div>
                {/* Right: Illustration */}
                <div className="z-10 mt-12 flex w-full justify-center md:mt-0 md:w-1/2">{/* Placeholder for 3D Illustration */}</div>
            </div>
            {/* Floating balls for effect */}
        </div>
    );
}
