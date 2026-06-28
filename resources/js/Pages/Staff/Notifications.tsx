import { Head } from '@inertiajs/react';
import StaffLayout from '@/Layouts/StaffLayout';
import { PageHeader } from '@/Components/cims/PageHeader';
import { Card, CardContent } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { cn } from '@/lib/utils';
import type { Notification } from '@/types/cims';

export default function Notifications({ notifications }: { notifications: Notification[] }) {
    return (
        <StaffLayout notifications={notifications}>
            <Head title="Notification Center" />
            <PageHeader title="Notification Center" description="Assignments, updates, and system alerts." />
            <div className="mt-6 space-y-3">
                {notifications.map((n) => (
                    <Card key={n.id} className={cn(!n.read && 'border-primary/30')}>
                        <CardContent className="flex items-start justify-between pt-6">
                            <div><p className="font-medium">{n.title}</p><p className="text-sm text-muted-foreground">{n.message}</p></div>
                            {!n.read && <Badge>New</Badge>}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </StaffLayout>
    );
}
