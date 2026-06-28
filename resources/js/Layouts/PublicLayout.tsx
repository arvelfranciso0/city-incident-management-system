import { Link, usePage } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/Components/ui/sheet';
import { portalNavLinkClass, portalNavLinkMobileClass } from '@/Components/cims/PublicUi';
import { IconMenu2, IconShield } from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import {
    getActiveNavHref,
    prefixFromRoute,
    toPath,
} from '@/lib/nav';
import { useState } from 'react';
import type { TenantOrganization } from '@/types/cims';

interface PublicPageProps {
    organization?: TenantOrganization | null;
}

const navLinks = [
    { href: route('public.home'), label: 'Home', exact: true },
    { href: route('public.about'), label: 'About', exact: true },
    { href: route('public.faqs'), label: 'FAQs', exact: true },
    { href: route('public.contact'), label: 'Contact', exact: true },
];

const utilityLinks = [
    { href: route('login'), label: 'Login', exact: true },
];

const reportNavLink = {
    href: route('report.choose-type'),
    label: 'Report Incident',
    matchPrefix: prefixFromRoute('report.choose-type', 1),
    excludePaths: [route('report.track')],
};

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    const { url, props } = usePage<PublicPageProps>();
    const organization = props.organization;
    const brandLabel = organization?.name ?? 'CIMS';
    const [open, setOpen] = useState(false);
    const allLinks = [...navLinks, reportNavLink, ...utilityLinks];
    const activeHref = getActiveNavHref(url, allLinks);
    const isHome = toPath(url) === toPath(route('public.home'));

    const isActive = (href: string) =>
        activeHref !== null && toPath(activeHref) === toPath(href);

    return (
        <div className="min-h-screen bg-portal-bg text-portal-on-surface">
            <nav className="portal-acrylic fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between border-b border-portal-outline-variant px-6">
                <Link href={route('public.home')} className="flex items-center gap-3">
                    <IconShield className="size-6 text-portal-primary" stroke={2.5} />
                    <span className="text-xl font-extrabold tracking-tight text-portal-primary">{brandLabel}</span>
                    {organization && (
                        <span className="hidden text-xs font-medium uppercase tracking-wider text-portal-on-surface-variant sm:inline">
                            Public Portal
                        </span>
                    )}
                </Link>

                <div className="hidden items-center gap-4 md:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={portalNavLinkClass(isActive(link.href))}
                            aria-current={isActive(link.href) ? 'page' : undefined}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        size="sm"
                        className={cn(
                            'hidden text-xs font-semibold uppercase tracking-wider sm:inline-flex',
                            isActive(route('login'))
                                ? 'bg-portal-surface-container-high text-portal-primary'
                                : 'text-portal-primary hover:bg-portal-surface-container-high',
                        )}
                        asChild
                    >
                        <Link href={route('login')}>Login</Link>
                    </Button>
                    <Button
                        size="sm"
                        className={cn(
                            'text-xs font-semibold uppercase tracking-wider',
                            isActive(route('report.choose-type'))
                                ? 'bg-portal-tertiary text-portal-on-tertiary hover:bg-portal-tertiary-container'
                                : 'bg-portal-primary text-portal-on-primary hover:bg-portal-primary/90',
                        )}
                        asChild
                    >
                        <Link href={route('report.choose-type')}>Report Incident</Link>
                    </Button>
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <IconMenu2 className="size-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-72 bg-portal-surface-container-lowest">
                            <nav className="mt-8 flex flex-col gap-1">
                                {[...navLinks, reportNavLink, ...utilityLinks].map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setOpen(false)}
                                        className={portalNavLinkMobileClass(isActive(link.href))}
                                        aria-current={isActive(link.href) ? 'page' : undefined}
                                    >
                                        {'label' in link ? link.label : 'Report Incident'}
                                    </Link>
                                ))}
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>

            <main className={cn('pt-16', !isHome && 'min-h-[calc(100vh-8rem)]')}>{children}</main>

            <footer className="border-t border-portal-outline bg-portal-inverse-surface py-8 text-portal-inverse-on-surface">
                <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 px-6 md:flex-row">
                    <div className="flex items-center gap-4">
                        <IconShield className="size-6 text-portal-primary-fixed" />
                        <span className="text-xl font-extrabold tracking-tight text-portal-primary-fixed">CIMS</span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href={route('public.privacy')}
                            className="text-xs font-semibold uppercase tracking-wider opacity-70 transition-opacity hover:opacity-100"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href={route('public.terms')}
                            className="text-xs font-semibold uppercase tracking-wider opacity-70 transition-opacity hover:opacity-100"
                        >
                            Terms of Service
                        </Link>
                        <Link
                            href={route('public.contact')}
                            className="text-xs font-semibold uppercase tracking-wider opacity-70 transition-opacity hover:opacity-100"
                        >
                            Contact
                        </Link>
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-wider opacity-50">
                        © {new Date().getFullYear()} City of Metroville
                    </p>
                </div>
            </footer>
        </div>
    );
}
