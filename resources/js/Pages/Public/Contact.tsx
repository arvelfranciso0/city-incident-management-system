import { Head, useForm } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import {
    PublicCard,
    PublicPageShell,
    portalInputClass,
    portalLabelClass,
    portalPrimaryBtnClass,
} from '@/Components/cims/PublicUi';
import { IconCheck, IconMail, IconMapPin, IconPhone } from '@tabler/icons-react';
import { useState } from 'react';

export default function Contact() {
    const [submitted, setSubmitted] = useState(false);
    const { data, setData, processing } = useForm({ name: '', email: '', subject: '', message: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <PublicLayout>
            <Head title="Contact" />
            <PublicPageShell wide title="Get in Touch" description="Reach the CIMS support team for help with your reports.">
                <div className="mt-0 grid gap-8 md:grid-cols-2">
                    <div className="space-y-6">
                        {[
                            { icon: IconPhone, label: 'Phone', value: '(555) 311-CITY' },
                            { icon: IconMail, label: 'Email', value: 'support@cims.metroville.gov' },
                            { icon: IconMapPin, label: 'Address', value: '100 City Hall Plaza, Metroville' },
                        ].map(({ icon: Icon, label, value }) => (
                            <div key={label} className="flex items-start gap-4">
                                <div className="rounded-full bg-portal-secondary-container p-2 text-portal-primary">
                                    <Icon className="size-5" />
                                </div>
                                <div>
                                    <p className="font-semibold text-portal-primary">{label}</p>
                                    <p className="text-sm text-portal-on-surface-variant">{value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <PublicCard padding="lg" className="bg-portal-bg">
                        {submitted ? (
                            <div className="flex items-start gap-3 text-sm text-portal-on-surface-variant">
                                <IconCheck className="mt-0.5 size-5 shrink-0 text-emerald-600" />
                                <p>Thank you! We&apos;ll respond within 1–2 business days.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-1">
                                        <Label htmlFor="name" className={portalLabelClass}>Full Name</Label>
                                        <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} className={portalInputClass} required />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="email" className={portalLabelClass}>Email</Label>
                                        <Input id="email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} className={portalInputClass} required />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="subject" className={portalLabelClass}>Subject</Label>
                                    <Input id="subject" value={data.subject} onChange={(e) => setData('subject', e.target.value)} className={portalInputClass} required />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="message" className={portalLabelClass}>Message</Label>
                                    <Textarea id="message" rows={5} value={data.message} onChange={(e) => setData('message', e.target.value)} className={portalInputClass} required />
                                </div>
                                <Button type="submit" disabled={processing} className={`w-full ${portalPrimaryBtnClass}`}>
                                    Send Message
                                </Button>
                            </form>
                        )}
                    </PublicCard>
                </div>
            </PublicPageShell>
        </PublicLayout>
    );
}
