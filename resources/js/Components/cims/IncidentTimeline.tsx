import { IconMapPin } from '@tabler/icons-react';
import type { TimelineEvent } from '@/types/cims';
import { cn } from '@/lib/utils';

interface IncidentTimelineProps {
    events: TimelineEvent[];
    className?: string;
}

const typeColors: Record<string, string> = {
    created: 'bg-primary',
    assigned: 'bg-blue-500',
    status: 'bg-amber-500',
    note: 'bg-muted-foreground',
    resolved: 'bg-green-500',
};

export function IncidentTimeline({ events, className }: IncidentTimelineProps) {
    return (
        <div className={cn('relative space-y-0', className)}>
            {events.map((event, index) => (
                <div key={event.id} className="relative flex gap-4 pb-8 last:pb-0">
                    {index < events.length - 1 && (
                        <div className="absolute left-[7px] top-4 h-full w-px bg-border" />
                    )}
                    <div
                        className={cn(
                            'relative z-10 mt-1 size-3.5 shrink-0 rounded-full ring-4 ring-background',
                            typeColors[event.type] ?? 'bg-primary',
                        )}
                    />
                    <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                            <p className="font-medium text-foreground">{event.title}</p>
                            <span className="text-xs text-muted-foreground">
                                {new Date(event.timestamp).toLocaleString()}
                            </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                        <p className="text-xs text-muted-foreground">by {event.user}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export function MapPlaceholder({ title, className }: { title?: string; className?: string }) {
    return (
        <div
            className={cn(
                'flex aspect-[16/9] min-h-[280px] flex-col items-center justify-center rounded-xl border border-border bg-gradient-to-br from-primary/5 via-muted/30 to-primary/10',
                className,
            )}
        >
            <IconMapPin className="mb-3 size-10 text-primary/60" />
            <p className="text-sm font-medium text-foreground">{title ?? 'Interactive Map'}</p>
            <p className="mt-1 text-xs text-muted-foreground">Map integration placeholder</p>
        </div>
    );
}
