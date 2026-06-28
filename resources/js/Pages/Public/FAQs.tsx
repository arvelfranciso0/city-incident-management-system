import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/Components/ui/accordion';
import { PublicPageShell } from '@/Components/cims/PublicUi';
import { IconMail } from '@tabler/icons-react';
import type { Faq } from '@/types/cims';

export default function FAQs({ faqs }: { faqs: Faq[] }) {
    return (
        <PublicLayout>
            <Head title="FAQs" />
            <PublicPageShell wide>
                <div className="flex flex-col gap-12 md:flex-row">
                    <div className="md:w-1/3">
                        <h1 className="text-2xl font-semibold tracking-tight text-portal-primary sm:text-[28px]">
                            Frequently Asked Questions
                        </h1>
                        <p className="mt-4 text-sm leading-relaxed text-portal-on-surface-variant">
                            Find answers to common questions about reporting and tracking incidents in the CIMS ecosystem.
                        </p>
                        <div className="mt-8 rounded-lg bg-portal-surface-container-high p-4">
                            <p className="text-xs font-semibold uppercase tracking-wider text-portal-primary">
                                Still have questions?
                            </p>
                            <Link
                                href={route('public.contact')}
                                className="mt-2 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-portal-tertiary-container"
                            >
                                Contact Support
                                <IconMail className="size-4" />
                            </Link>
                        </div>
                    </div>
                    <div className="md:w-2/3">
                        <Accordion type="single" collapsible className="space-y-2 border-0 bg-transparent">
                            {faqs.map((faq, i) => (
                                <AccordionItem
                                    key={i}
                                    value={`item-${i}`}
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
            </PublicPageShell>
        </PublicLayout>
    );
}
