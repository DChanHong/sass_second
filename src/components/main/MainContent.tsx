'use client';

import Section3 from '@/components/main/Section3';
import Section1 from '@/components/main/Section1';
import Section2 from '@/components/main/Section2';

export default function MainContent() {
    return (
        <main className="min-h-screen">
            <Section1 />
            <Section2 />
            <Section3 />
        </main>
    );
}
