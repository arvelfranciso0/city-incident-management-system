import { Link } from '@inertiajs/react';
import { PublicCard } from '@/Components/cims/PublicUi';
import { IconShield } from '@tabler/icons-react';
import { type PropsWithChildren } from 'react';

/** @deprecated Use AuthLayout with title and description instead. */
export default function GuestLayout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-portal-bg text-portal-on-surface">
            <header className="portal-acrylic border-b border-portal-outline-variant">
                <div className="mx-auto flex h-16 max-w-6xl items-center px-6">
                    <Link href={route('public.home')} className="flex items-center gap-3">
                        <IconShield className="size-6 text-portal-primary" stroke={2.5} />
                        <span className="text-xl font-extrabold tracking-tight text-portal-primary">CIMS</span>
                    </Link>
                </div>
            </header>
            <main className="flex justify-center px-6 py-12 sm:py-16">
                <PublicCard padding="lg" className="w-full max-w-md">
                    {children}
                </PublicCard>
            </main>
        </div>
    );
}
