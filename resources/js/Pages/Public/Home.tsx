import { Head, Link, usePage } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { PortalSectionHeading, PublicCard, portalInputClass, portalLabelClass, portalPrimaryBtnClass, portalTertiaryBtnClass } from '@/Components/cims/PublicUi';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/Components/ui/accordion';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import {
    IconArrowRight,
    IconBolt,
    IconFileReport,
    IconMail,
    IconMapPin,
    IconPhone,
    IconSearch,
    IconShare,
    IconShieldCheck,
} from '@tabler/icons-react';
import { useState } from 'react';
import type { Faq, TenantOrganization } from '@/types/cims';

const HERO_IMAGE =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAQxpubkgW7CRbGfuw82HW0KMxgRj4mK96f_n2u6ciGSWzyVvxIPKD3rdX9r6pUxFLTSmWjevkqHwPp8mgOT-1ZRtUtKQNaZKIj4HuesfdMfGUZSUGgCLiSVKQ5HuBiFI3ZUQxyji0TSGy2ja1FrGbju4C6QkJkrCRdlGKHmKorNlGan1l2rvvtG94sSLr_QsaR3HQirwNI47yA07Xcb4k7JMgsyeYoAglKYMEEA-koNFZ17X7f5S0ZaNCgj0a8DsGUFz-sbH5v2SM';

const COMMAND_IMAGE =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuALMsEuy6GtTeIhN58MdxecAThviZ60LMRe6iDoTeLXPBHMn5UrQLnXzcnMznnNTJuFlqKAPOm2xFqgMp8GSPMMMa0ZGoteh6sxY32hhJku-DZDEMDatCOuWS4f-Nk_s9lRUHLGPYv-xOEvwiJOxq7eO6OjMqa6f7sTH0ymx9fmrUlKbN3OUxVFJsbmVh5OZbieGyQLR80wqRj08hNCy-J3_RDE9RrOIl2GVHBsbgwjjhKxNVasBpuVJ2vBZaKPwAnsNhoRVFyNP7s';

interface HeroStat {
    value: string;
    label: string;
}

interface Props {
    stats: HeroStat[];
    faqs: Faq[];
}

export default function Home({ stats, faqs }: Props) {
    const { organization } = usePage<{ organization?: TenantOrganization | null }>().props;
    const cityName = organization?.name ?? 'your community';
    const [trackingNumber, setTrackingNumber] = useState('');
    const [trackError, setTrackError] = useState('');
    const [contactSubmitted, setContactSubmitted] = useState(false);
    const [contactForm, setContactForm] = useState({
        name: '',
        email: '',
        subject: 'Technical Support',
        message: '',
    });

    const handleTrack = (e: React.FormEvent) => {
        e.preventDefault();
        if (!trackingNumber.trim()) {
            setTrackError('Please enter a tracking number.');
            return;
        }
        window.location.href = route('report.show', trackingNumber.trim().toUpperCase());
    };

    const handleContact = (e: React.FormEvent) => {
        e.preventDefault();
        setContactSubmitted(true);
    };

    return (
        <PublicLayout>
            <Head title="Unified Incident Management" />

            {/* Hero */}
            <section className="relative flex min-h-[600px] items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div
                        className="h-full w-full scale-100 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
                        style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
                    />
                    <div className="absolute inset-0 bg-portal-primary/40 brightness-50" />
                </div>

                <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-8 px-6 md:grid-cols-2">
                    <div className="space-y-4 text-white">
                        <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-[36px] sm:leading-[44px]">
                            {organization ? `Welcome to ${organization.name}` : 'Unified Coordination for Public Safety'}
                        </h1>
                        <p className="max-w-lg text-base leading-relaxed text-portal-surface-container/90 sm:text-lg">
                            {organization
                                ? `Report, track, and manage incidents in ${cityName} through your official public safety portal.`
                                : 'CIMS provides citizens and first responders with a seamless interface to report, track, and manage local incidents in real-time.'}
                        </p>
                        <div className="flex flex-wrap gap-4 pt-4">
                            <Button
                                size="lg"
                                className="bg-portal-surface-container-lowest text-portal-primary shadow-xl hover:bg-portal-secondary-container"
                                asChild
                            >
                                <Link href={route('report.choose-type')}>
                                    <IconFileReport className="size-4" />
                                    Report an Incident
                                </Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-portal-surface-container-lowest bg-transparent text-white hover:bg-white/10"
                                asChild
                            >
                                <Link href={route('report.track')}>Track a Report</Link>
                            </Button>
                        </div>
                    </div>

                    {/* Tracking card */}
                    <div className="rounded-xl border border-white/20 bg-portal-surface-container-lowest/90 p-8 shadow-2xl backdrop-blur-md">
                        <h3 className="text-xl font-semibold text-portal-primary">Track Status</h3>
                        <p className="mt-1 text-sm text-portal-on-surface-variant">
                            Enter your incident tracking number to see real-time updates.
                        </p>
                        <form onSubmit={handleTrack} className="mt-4 space-y-4">
                            <div className="relative">
                                <IconSearch className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-portal-outline" />
                                <Input
                                    value={trackingNumber}
                                    onChange={(e) => {
                                        setTrackingNumber(e.target.value);
                                        setTrackError('');
                                    }}
                                    placeholder="e.g. TRK-XXXXXXXX"
                                    className="border-portal-outline-variant bg-white pl-10 uppercase focus-visible:ring-portal-tertiary-container"
                                />
                            </div>
                            {trackError && (
                                <p className="text-sm text-destructive">{trackError}</p>
                            )}
                            <Button
                                type="submit"
                                className="w-full bg-portal-tertiary text-portal-on-tertiary hover:bg-portal-tertiary-container"
                            >
                                Search Records
                            </Button>
                        </form>
                        <div className="mt-8 grid grid-cols-3 gap-4 border-t border-portal-outline-variant pt-8 text-center">
                            {stats.map((stat) => (
                                <div key={stat.label}>
                                    <div className="text-xl font-semibold text-portal-primary">{stat.value}</div>
                                    <div className="text-[10px] uppercase tracking-wider text-portal-outline">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* About bento */}
            <section className="bg-white py-24" id="about">
                <div className="mx-auto max-w-6xl px-6">
                    <PortalSectionHeading
                        eyebrow="Our Mission"
                        title="Engineered for high-stakes coordination"
                        description="The CIMS platform bridges the gap between public reporting and professional emergency response, ensuring every second counts."
                        className="mb-16"
                    />

                    <div className="grid gap-4 md:grid-cols-12">
                        <div className="group relative flex min-h-[400px] flex-col justify-end overflow-hidden rounded-xl border border-portal-outline-variant bg-portal-surface-container p-10 md:col-span-8">
                            <IconShare className="absolute right-10 top-10 size-16 text-portal-primary/10 transition-transform duration-500 group-hover:scale-110" />
                            <div className="relative z-10 max-w-lg">
                                <h3 className="text-xl font-semibold text-portal-primary">Centralized Intel</h3>
                                <p className="mt-2 text-sm leading-relaxed text-portal-on-surface-variant">
                                    We integrate multi-channel data streams—from mobile reports to field updates—to create a unified operating picture for city-wide safety management.
                                </p>
                                <Link
                                    href={route('public.about')}
                                    className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-portal-tertiary transition-all hover:gap-2"
                                >
                                    Learn about our infrastructure
                                    <IconArrowRight className="size-4" />
                                </Link>
                            </div>
                        </div>

                        <div className="flex flex-col justify-between rounded-xl bg-portal-primary p-10 text-portal-on-primary md:col-span-4">
                            <IconShieldCheck className="size-10" />
                            <div>
                                <h3 className="text-xl font-semibold">Ironclad Security</h3>
                                <p className="mt-2 text-sm text-portal-on-primary-container">
                                    Enterprise-grade encryption and PII protection ensure that sensitive incident data remains confidential and audit-ready.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col justify-between rounded-xl bg-portal-secondary-container p-10 md:col-span-4">
                            <IconBolt className="size-10 text-portal-on-secondary-container" />
                            <div>
                                <h3 className="text-xl font-semibold text-portal-on-secondary-container">Rapid Response</h3>
                                <p className="mt-2 text-sm text-portal-on-secondary-container/80">
                                    Automated triage routes high-urgency reports to the right department, reducing response time during critical events.
                                </p>
                            </div>
                        </div>

                        <div className="h-[300px] overflow-hidden rounded-xl md:col-span-8">
                            <div
                                className="h-full w-full bg-cover bg-center"
                                style={{ backgroundImage: `url('${COMMAND_IMAGE}')` }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQs */}
            <section className="bg-portal-bg py-24" id="faqs">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="flex flex-col gap-12 md:flex-row">
                        <div className="md:w-1/3">
                            <h2 className="text-2xl font-semibold tracking-tight text-portal-primary sm:text-[28px]">
                                Frequently Asked Questions
                            </h2>
                            <p className="mt-4 text-sm leading-relaxed text-portal-on-surface-variant">
                                Everything you need to know about reporting and tracking incidents in the CIMS ecosystem.
                            </p>
                            <div className="mt-8 rounded-lg bg-portal-surface-container-high p-4">
                                <p className="text-xs font-semibold uppercase tracking-wider text-portal-primary">
                                    Still have questions?
                                </p>
                                <a
                                    href="#contact"
                                    className="mt-2 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-portal-tertiary-container"
                                >
                                    Contact Support
                                    <IconMail className="size-4" />
                                </a>
                            </div>
                        </div>

                        <div className="md:w-2/3">
                            <Accordion type="single" collapsible className="space-y-2 border-0 bg-transparent">
                                {faqs.map((faq, i) => (
                                    <AccordionItem
                                        key={i}
                                        value={`faq-${i}`}
                                        className="overflow-hidden rounded-lg border border-portal-outline-variant bg-white px-0"
                                    >
                                        <AccordionTrigger className="px-6 py-4 text-left text-base font-semibold text-portal-primary hover:bg-portal-surface-container hover:no-underline">
                                            {faq.question}
                                        </AccordionTrigger>
                                        <AccordionContent className="px-6 pb-4 text-sm leading-relaxed text-portal-on-surface-variant">
                                            {faq.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section className="border-t border-portal-outline-variant bg-white py-24" id="contact">
                <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2">
                    <div>
                        <h2 className="text-2xl font-semibold tracking-tight text-portal-primary sm:text-[28px]">
                            Get in Touch
                        </h2>
                        <p className="mt-2 text-base leading-relaxed text-portal-on-surface-variant">
                            Our administrative offices are available for non-emergency inquiries and platform support during business hours.
                        </p>
                        <div className="mt-8 space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="rounded-full bg-portal-secondary-container p-2 text-portal-primary">
                                    <IconMapPin className="size-5" />
                                </div>
                                <div>
                                    <p className="font-semibold text-portal-primary">Headquarters</p>
                                    <p className="text-sm text-portal-on-surface-variant">
                                        100 City Hall Plaza
                                        <br />
                                        Metroville, MV 10001
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="rounded-full bg-portal-secondary-container p-2 text-portal-primary">
                                    <IconPhone className="size-5" />
                                </div>
                                <div>
                                    <p className="font-semibold text-portal-primary">Admin Line</p>
                                    <p className="text-sm text-portal-on-surface-variant">(555) 311-CITY</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-portal-outline-variant bg-portal-bg p-8">
                        {contactSubmitted ? (
                            <p className="text-sm text-portal-on-surface-variant">
                                Thank you! We&apos;ll respond within 1–2 business days.
                            </p>
                        ) : (
                            <form onSubmit={handleContact} className="space-y-4">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-1">
                                        <Label className="text-xs font-semibold uppercase tracking-wider text-portal-on-surface-variant">
                                            Full Name
                                        </Label>
                                        <Input
                                            value={contactForm.name}
                                            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                                            className="border-portal-outline-variant bg-white focus-visible:ring-portal-primary-container"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-xs font-semibold uppercase tracking-wider text-portal-on-surface-variant">
                                            Email Address
                                        </Label>
                                        <Input
                                            type="email"
                                            value={contactForm.email}
                                            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                                            className="border-portal-outline-variant bg-white focus-visible:ring-portal-primary-container"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-xs font-semibold uppercase tracking-wider text-portal-on-surface-variant">
                                        Subject
                                    </Label>
                                    <select
                                        value={contactForm.subject}
                                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                                        className="h-9 w-full rounded-lg border border-portal-outline-variant bg-white px-3 text-sm focus:ring-2 focus:ring-portal-primary-container focus:outline-none"
                                    >
                                        <option>Technical Support</option>
                                        <option>Feedback</option>
                                        <option>Media Inquiry</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-xs font-semibold uppercase tracking-wider text-portal-on-surface-variant">
                                        Message
                                    </Label>
                                    <Textarea
                                        rows={4}
                                        value={contactForm.message}
                                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                                        className="border-portal-outline-variant bg-white focus-visible:ring-portal-primary-container"
                                        required
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full bg-portal-primary text-portal-on-primary hover:bg-portal-primary/95"
                                >
                                    Send Message
                                </Button>
                            </form>
                        )}
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
