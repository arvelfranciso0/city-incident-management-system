import { Skeleton } from '@/Components/ui/skeleton';

export function PageSkeleton() {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-4 w-96 max-w-full" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-28 rounded-xl" />
                ))}
            </div>
            <Skeleton className="h-64 rounded-xl" />
        </div>
    );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
    return (
        <div className="space-y-3">
            <Skeleton className="h-10 w-full rounded-lg" />
            {Array.from({ length: rows }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full rounded-lg" />
            ))}
        </div>
    );
}

export function CardSkeleton() {
    return (
        <div className="space-y-3 rounded-xl border border-border p-6">
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
        </div>
    );
}
