import { Link } from '@inertiajs/react';
import React from 'react';

const AppContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="relative min-h-screen bg-gradient-to-b from-purple-900 to-purple-700 text-white">
            {/* Header */}
            <header className="flex items-center justify-between bg-gradient-to-b px-8 py-6">
                <div className="text-2xl font-bold text-yellow-300">Little Cards</div>
                <nav className="hidden items-center gap-8 text-sm md:flex">
                    <Link href="/" className="hover:text-yellow-300">
                        Explore
                    </Link>
                    <Link href="/collections" className="hover:text-yellow-300">
                        My Collections
                    </Link>
                </nav>
            </header>

            {/* Main Content */}
            <div className="px-6 md:px-20">{children}</div>
        </div>
    );
};

export default AppContainer;
