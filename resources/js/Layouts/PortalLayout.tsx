import { Link, usePage } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/Components/ui/sheet';
import { ScrollArea } from '@/Components/ui/scroll-area';
import { IconMenu2 } from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import { getActiveNavHref, portalNavLinkClass, toPath, type NavLink } from '@/lib/nav';
import { useState } from 'react';
import { NotificationDropdown, UserMenu } from '@/Components/cims/NotificationDropdown';
import type { Notification } from '@/types/cims';

export interface NavItem extends NavLink {
    label: string;
    icon: React.ReactNode;
}

interface PortalLayoutProps {
    children: React.ReactNode;
    portalName: string;
    portalSubtitle: string;
    navItems: NavItem[];
    notifications?: Notification[];
    notificationsHref?: string;
    userMenuLinks: { href: string; label: string; method?: 'get' | 'post' }[];
    accent?: 'citizen' | 'staff' | 'admin';
}

function SidebarNav({ items, onNavigate }: { items: NavItem[]; onNavigate?: () => void }) {
    const { url } = usePage();
    const activeHref = getActiveNavHref(url, items);

    return (
        <nav className="flex flex-col gap-0.5 p-3">
            {items.map((item) => {
                const active =
                    activeHref !== null &&
                    toPath(activeHref) === toPath(item.href);
                return (
                    <Link
                        key={`${item.href}-${item.label}`}
                        href={item.href}
                        method={item.method ?? 'get'}
                        as={item.method === 'post' ? 'button' : undefined}
                        onClick={onNavigate}
                        className={cn(
                            'flex w-full items-center gap-3 rounded-lg py-2 text-sm transition-colors',
                            item.method === 'post' ? 'text-left' : '',
                            portalNavLinkClass(active),
                        )}
                        aria-current={active ? 'page' : undefined}
                    >
                        <span className={cn('opacity-70', active && 'opacity-100')}>{item.icon}</span>
                        {item.label}
                    </Link>
                );
            })}
        </nav>
    );
}

function SidebarBrand({ portalName, portalSubtitle }: { portalName: string; portalSubtitle: string }) {
    return (
        <div className="flex h-14 items-center border-b border-sidebar-border px-5">
            <div>
                <p className="text-sm font-semibold tracking-tight text-foreground">{portalName}</p>
                <p className="text-xs text-muted-foreground">{portalSubtitle}</p>
            </div>
        </div>
    );
}

export default function PortalLayout({
    children,
    portalName,
    portalSubtitle,
    navItems,
    notifications = [],
    notificationsHref,
    userMenuLinks,
}: PortalLayoutProps) {
    const { props } = usePage<{ auth: { user: { name: string; email: string } } }>();
    const user = props.auth?.user;
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-background">
            <aside className="hidden w-56 shrink-0 flex-col border-r border-border/60 bg-sidebar lg:flex">
                <SidebarBrand portalName={portalName} portalSubtitle={portalSubtitle} />
                <ScrollArea className="flex-1">
                    <SidebarNav items={navItems} />
                </ScrollArea>
            </aside>

            <div className="flex min-w-0 flex-1 flex-col">
                <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-border/60 bg-background/80 px-4 backdrop-blur-sm sm:px-6">
                    <div className="flex items-center gap-3">
                        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="lg:hidden">
                                    <IconMenu2 className="size-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-64 bg-sidebar p-0">
                                <SidebarBrand portalName={portalName} portalSubtitle={portalSubtitle} />
                                <SidebarNav items={navItems} onNavigate={() => setMobileOpen(false)} />
                            </SheetContent>
                        </Sheet>
                        <p className="text-sm font-medium text-foreground lg:hidden">{portalName}</p>
                    </div>
                    <div className="flex items-center gap-1">
                        {notifications.length > 0 && (
                            <NotificationDropdown notifications={notifications} viewAllHref={notificationsHref} />
                        )}
                        {user && (
                            <UserMenu name={user.name} email={user.email} links={userMenuLinks} />
                        )}
                    </div>
                </header>

                <main className="flex-1 p-6 sm:p-8">
                    <div className="mx-auto max-w-6xl">{children}</div>
                </main>
            </div>
        </div>
    );
}

export function PortalPageSection({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={cn('space-y-8', className)}>{children}</div>;
}
