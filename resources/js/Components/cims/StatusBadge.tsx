import { cn } from '@/lib/utils';

const statusDots: Record<string, string> = {
    open: 'bg-blue-500',
    in_progress: 'bg-amber-500',
    pending: 'bg-violet-500',
    resolved: 'bg-emerald-500',
    closed: 'bg-muted-foreground/40',
};

const priorityDots: Record<string, string> = {
    critical: 'bg-destructive',
    high: 'bg-orange-500',
    medium: 'bg-primary',
    low: 'bg-muted-foreground/50',
};

interface StatusBadgeProps {
    status: string;
    className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
    const key = status.toLowerCase().replace(/\s+/g, '_');
    const label = status.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

    return (
        <span className={cn('inline-flex items-center gap-1.5 text-xs text-muted-foreground', className)}>
            <span className={cn('size-1.5 shrink-0 rounded-full', statusDots[key] ?? 'bg-muted-foreground/40')} />
            <span className="capitalize">{label}</span>
        </span>
    );
}

interface PriorityBadgeProps {
    priority: string;
    className?: string;
}

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
    const key = priority.toLowerCase();

    return (
        <span className={cn('inline-flex items-center gap-1.5 text-xs text-muted-foreground', className)}>
            <span className={cn('size-1.5 shrink-0 rounded-full', priorityDots[key] ?? 'bg-muted-foreground/40')} />
            <span className="capitalize">{priority}</span>
        </span>
    );
}
