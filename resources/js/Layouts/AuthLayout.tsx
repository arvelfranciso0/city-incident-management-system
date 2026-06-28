import { Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { IconShield } from '@tabler/icons-react';
import { cn } from '@/lib/utils';

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    description?: string;
    className?: string;
}

export default function AuthLayout({
    children,
    title,
    description,
    className,
}: AuthLayoutProps) {
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
                <Card className={cn('w-full max-w-md border-portal-outline-variant bg-white shadow-none', className)}>
                    <CardHeader className="pb-4">
                        <CardTitle className="text-xl font-medium tracking-tight text-portal-primary">{title}</CardTitle>
                        {description && (
                            <CardDescription className="text-sm leading-relaxed text-portal-on-surface-variant">
                                {description}
                            </CardDescription>
                        )}
                    </CardHeader>
                    <CardContent>{children}</CardContent>
                </Card>
            </main>
        </div>
    );
}
