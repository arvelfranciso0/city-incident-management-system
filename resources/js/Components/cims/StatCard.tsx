import { Card, CardContent } from '@/Components/ui/card';
import { cn } from '@/lib/utils';
import type { StatCard as StatCardType } from '@/types/cims';

interface StatCardProps extends StatCardType {
    className?: string;
}

export function StatCard({ label, value, change, className }: StatCardProps) {
    return (
        <Card className={cn('border-border/50', className)}>
            <CardContent className="pt-6">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
                <p className="mt-2 text-2xl font-medium tracking-tight tabular-nums">{value}</p>
                {change && <p className="mt-1 text-xs text-muted-foreground">{change}</p>}
            </CardContent>
        </Card>
    );
}

interface StatsGridProps {
    stats: StatCardType[];
    className?: string;
}

export function StatsGrid({ stats, className }: StatsGridProps) {
    return (
        <div className={cn('grid gap-4 sm:grid-cols-2 xl:grid-cols-4', className)}>
            {stats.map((stat) => (
                <StatCard key={stat.label} {...stat} />
            ))}
        </div>
    );
}
