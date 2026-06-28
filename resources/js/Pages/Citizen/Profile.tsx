import { Head, Link } from '@inertiajs/react';
import CitizenLayout from '@/Layouts/CitizenLayout';
import { PageHeader } from '@/Components/cims/PageHeader';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Avatar, AvatarFallback } from '@/Components/ui/avatar';
import { usePage } from '@inertiajs/react';

export default function Profile() {
    // const { auth } = usePage().props as { auth: { user: { name: string; email: string } } };
    // const initials = auth.user.name.split(' ').map((n) => n[0]).join('').slice(0, 2);

    return (
        <CitizenLayout>
            <Head title="Profile" />
            <PageHeader title="Profile" description="Your citizen account information." actions={<Button variant="outline" asChild><Link href={route('citizen.settings')}>Edit Settings</Link></Button>} />
            <Card className="mt-6 max-w-lg">
                <CardContent className="flex items-center gap-4 pt-6">
                    <Avatar className="size-16"><AvatarFallback className="text-lg bg-primary/10 text-primary">T</AvatarFallback></Avatar>
                    <div>
                        <p className="text-lg font-semibold">test</p>
                        <p className="text-sm text-muted-foreground">test@gmaio.com</p>
                        <p className="mt-1 text-xs text-muted-foreground">Citizen Account · Member since 2025</p>
                    </div>
                </CardContent>
            </Card>
        </CitizenLayout>
    );
}
