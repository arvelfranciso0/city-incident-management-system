import type { ChartData } from '@/types/cims';
import { cn } from '@/lib/utils';

interface ChartPlaceholderProps {
    data: ChartData;
    title?: string;
    className?: string;
}

export function ChartPlaceholder({ data, title = 'Incidents Overview', className }: ChartPlaceholderProps) {
    const max = Math.max(...data.incidents, ...data.resolved, 1);

    return (
        <div className={cn('rounded-xl border border-border bg-card p-6', className)}>
            <h3 className="mb-6 text-sm font-semibold text-foreground">{title}</h3>
            <div className="flex h-48 items-end justify-between gap-2 sm:gap-4">
                {data.labels.map((label, i) => (
                    <div key={label} className="flex flex-1 flex-col items-center gap-1">
                        <div className="flex w-full items-end justify-center gap-1">
                            <div
                                className="w-3 rounded-t bg-primary/80 sm:w-4"
                                style={{ height: `${(data.incidents[i] / max) * 100}%`, minHeight: 4 }}
                            />
                            <div
                                className="w-3 rounded-t bg-chart-2 sm:w-4"
                                style={{ height: `${(data.resolved[i] / max) * 100}%`, minHeight: 4 }}
                            />
                        </div>
                        <span className="text-[10px] text-muted-foreground sm:text-xs">{label}</span>
                    </div>
                ))}
            </div>
            <div className="mt-4 flex items-center justify-center gap-6 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                    <span className="size-2.5 rounded-sm bg-primary/80" /> Reported
                </span>
                <span className="flex items-center gap-1.5">
                    <span className="size-2.5 rounded-sm bg-chart-2" /> Resolved
                </span>
            </div>
        </div>
    );
}
