'use client';

import React from 'react';
import Footer from '../Footer';
import { cn } from '@/lib/utils';

interface ClientLayoutProps {
    children: React.ReactNode;
    mainLayoutOption?: {
        className?: string;
        paddingTop?: boolean;
    };
}

export default function ClientLayout({
                                         children,
                                         mainLayoutOption = {}
                                     }: ClientLayoutProps) {
    const {
        className: mainLayoutClassName = '',
        paddingTop: mainLayoutPaddingTop = true
    } = mainLayoutOption;

    return (
        <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex flex-col">
            <main
                className={cn(
                    'flex-grow flex justify-center items-center mx-auto w-full',
                    mainLayoutPaddingTop ? 'pt-[72px] sm:pt-[88px]' : '',
                    mainLayoutClassName ? mainLayoutClassName : 'max-w-screen-2xl'
                )}
            >
                {children}
            </main>
            <Footer />
        </div>
    );
}
