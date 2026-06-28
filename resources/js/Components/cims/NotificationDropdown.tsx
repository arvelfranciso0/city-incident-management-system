import { Link } from '@inertiajs/react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/Components/ui/avatar';
import { Button } from '@/Components/ui/button';
import { IconBell } from '@tabler/icons-react';
import type { Notification } from '@/types/cims';
import { cn } from '@/lib/utils';

interface NotificationDropdownProps {
    notifications: Notification[];
    viewAllHref?: string;
}

export function NotificationDropdown({ notifications, viewAllHref }: NotificationDropdownProps) {
    const unread = notifications.filter((n) => !n.read).length;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <IconBell className="size-5" />
                    {unread > 0 && (
                        <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                            {unread}
                        </span>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Notifications
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.slice(0, 5).map((n) => (
                    <DropdownMenuItem key={n.id} className="flex cursor-pointer flex-col items-start gap-1 py-3">
                        <span className={cn('text-sm text-foreground', !n.read && 'font-medium')}>
                            {n.title}
                        </span>
                        <span className="text-xs text-muted-foreground">{n.message}</span>
                    </DropdownMenuItem>
                ))}
                {viewAllHref && (
                    <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href={viewAllHref} className="w-full text-center text-sm text-muted-foreground hover:text-foreground">
                                View all notifications
                            </Link>
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

interface UserMenuProps {
    name: string;
    email?: string;
    links: { href: string; label: string }[];
}

export function UserMenu({ name, email, links }: UserMenuProps) {
    const initials = name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 px-2">
                    <Avatar className="size-8">
                        <AvatarFallback className="bg-muted text-xs text-foreground">{initials}</AvatarFallback>
                    </Avatar>
                    <span className="hidden text-sm font-medium sm:inline">{name}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                    <div>{name}</div>
                    {email && <div className="text-xs font-normal text-muted-foreground">{email}</div>}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {links.map((link) => (
                    <DropdownMenuItem key={link.href}>
                        <Link href={link.href} className="w-full">
                            {link.label}
                        </Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
