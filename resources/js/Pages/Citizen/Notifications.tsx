import { Head } from '@inertiajs/react';
import CitizenLayout from '@/Layouts/CitizenLayout';
import { PageHeader } from '@/Components/cims/PageHeader';
import { Card, CardContent } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { cn } from '@/lib/utils';
import type { Notification } from '@/types/cims';

export default function Notifications({ notifications }: { notifications: Notification[] }) {
    return (
        <CitizenLayout notifications={notifications}>
            <Head title="Notifications" />
            <PageHeader title="Notifications" description="Stay updated on your incident reports." />
            <div className="mt-6 space-y-3">
                {notifications.map((n) => (
                    <Card key={n.id} className={cn(!n.read && 'border-primary/30 bg-primary/5')}>
                        <CardContent className="flex flex-wrap items-start justify-between gap-2 pt-6">
                            <div>
                                <p className="font-medium">{n.title}</p>
                                <p className="mt-1 text-sm text-muted-foreground">{n.message}</p>
                                <p className="mt-2 text-xs text-muted-foreground">{new Date(n.timestamp).toLocaleString()}</p>
                            </div>
                            {!n.read && <Badge>New</Badge>}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </CitizenLayout>
    );
}
