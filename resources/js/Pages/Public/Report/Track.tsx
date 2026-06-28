import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import {
    PublicCard,
    PublicPageShell,
    portalInputClass,
    portalLabelClass,
    portalTertiaryBtnClass,
} from '@/Components/cims/PublicUi';
import { IconSearch } from '@tabler/icons-react';
import { useState } from 'react';

export default function Track() {
    const [trackingNumber, setTrackingNumber] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!trackingNumber.trim()) {
            setError('Please enter a tracking number.');
            return;
        }
        window.location.href = route('report.show', trackingNumber.trim().toUpperCase());
    };

    return (
        <PublicLayout>
            <Head title="Track Report" />
            <PublicPageShell
                title="Track Your Report"
                description="Enter the tracking number from your confirmation email."
            >
                <PublicCard padding="lg" className="max-w-lg">
                    <h2 className="text-lg font-semibold text-portal-primary">Tracking Number</h2>
                    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                        {error && <p className="text-sm text-destructive">{error}</p>}
                        <div className="space-y-1">
                            <Label htmlFor="tracking" className={portalLabelClass}>Tracking ID</Label>
                            <div className="relative">
                                <IconSearch className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-portal-outline" />
                                <Input
                                    id="tracking"
                                    placeholder="TRK-XXXXXXXX"
                                    value={trackingNumber}
                                    onChange={(e) => {
                                        setTrackingNumber(e.target.value);
                                        setError('');
                                    }}
                                    className={`pl-10 font-mono uppercase ${portalInputClass}`}
                                />
                            </div>
                        </div>
                        <Button type="submit" className={`w-full ${portalTertiaryBtnClass}`}>
                            Search Records
                        </Button>
                    </form>
                    <p className="mt-4 text-center text-xs text-portal-outline">
                        Try demo:{' '}
                        <Link href={route('report.show', 'TRK-8F3K2M9P')} className="font-medium text-portal-tertiary hover:underline">
                            TRK-8F3K2M9P
                        </Link>
                    </p>
                </PublicCard>
            </PublicPageShell>
        </PublicLayout>
    );
}
