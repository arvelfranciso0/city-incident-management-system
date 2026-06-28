import { Button } from '@/Components/ui/button';
import { FileUploadZone } from '@/Components/cims/FileUploadZone';
import IncidentReportMap from '@/Components/cims/IncidentReportMap';
import {
    PublicCard,
    portalInputClass,
    portalLabelClass,
    portalPrimaryBtnClass,
} from '@/Components/cims/PublicUi';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select';
import { Progress } from '@/Components/ui/progress';
import { useState } from 'react';
import type { Category } from '@/types/cims';

const STEPS = ['Details', 'Location', 'Evidence', 'Contact', 'Review'];

export interface IncidentReportFormData {
    title: string;
    description: string;
    category: string;
    address: string;
    city: string;
    zip: string;
    name: string;
    email: string;
    phone: string;
}

interface IncidentReportWizardProps {
    categories: Category[];
    variant: 'guest' | 'citizen';
    initialContact?: Partial<Pick<IncidentReportFormData, 'name' | 'email' | 'phone'>>;
    onComplete: (form: IncidentReportFormData) => void;
}

export default function IncidentReportWizard({
    categories,
    variant,
    initialContact,
    onComplete,
}: IncidentReportWizardProps) {
    const [step, setStep] = useState(0);
    const [form, setForm] = useState<IncidentReportFormData>({
        title: '',
        description: '',
        category: '',
        address: '',
        city: 'Metroville',
        zip: '',
        name: initialContact?.name ?? '',
        email: initialContact?.email ?? '',
        phone: initialContact?.phone ?? '',
    });

    const update = (key: keyof IncidentReportFormData, value: string) =>
        setForm((f) => ({ ...f, [key]: value }));

    const progress = ((step + 1) / STEPS.length) * 100;

    return (
        <>
            <div>
                <div className="mb-2 flex justify-between text-xs text-portal-outline">
                    <span>
                        Step {step + 1} of {STEPS.length}: {STEPS[step]}
                    </span>
                    <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="bg-portal-surface-container" />
            </div>

            <PublicCard padding="lg" className="mt-6">
                <h2 className="mb-4 text-lg font-semibold text-portal-primary">{STEPS[step]}</h2>
                <div className="space-y-4">
                    {step === 0 && (
                        <>
                            <div className="space-y-2">
                                <Label className={portalLabelClass}>Title</Label>
                                <Input
                                    className={portalInputClass}
                                    value={form.title}
                                    onChange={(e) => update('title', e.target.value)}
                                    placeholder="Brief description of the issue"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className={portalLabelClass}>Category</Label>
                                <Select value={form.category} onValueChange={(v) => update('category', v)}>
                                    <SelectTrigger className={portalInputClass}>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((c) => (
                                            <SelectItem key={c.id} value={c.name}>
                                                {c.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className={portalLabelClass}>Description</Label>
                                <Textarea
                                    className={portalInputClass}
                                    rows={4}
                                    value={form.description}
                                    onChange={(e) => update('description', e.target.value)}
                                    placeholder="Provide details..."
                                />
                            </div>
                        </>
                    )}

                    {step === 1 && (
                        <>
                            <div className="space-y-2">
                                <Label className={portalLabelClass}>Street Address</Label>
                                <Input
                                    className={portalInputClass}
                                    value={form.address}
                                    onChange={(e) => update('address', e.target.value)}
                                    placeholder="Street address"
                                />
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label className={portalLabelClass}>City</Label>
                                    <Input
                                        className={portalInputClass}
                                        value={form.city}
                                        onChange={(e) => update('city', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className={portalLabelClass}>ZIP Code</Label>
                                    <Input
                                        className={portalInputClass}
                                        value={form.zip}
                                        onChange={(e) => update('zip', e.target.value)}
                                    />
                                </div>
                            </div>
                            <IncidentReportMap />
                        </>
                    )}

                    {step === 2 && <FileUploadZone />}

                    {step === 3 && (
                        <>
                            {variant === 'citizen' && (
                                <p className="text-sm text-portal-on-surface-variant">
                                    Confirm your contact details for status updates on this report.
                                </p>
                            )}
                            <div className="space-y-2">
                                <Label className={portalLabelClass}>Full Name</Label>
                                <Input
                                    className={portalInputClass}
                                    value={form.name}
                                    onChange={(e) => update('name', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className={portalLabelClass}>Email</Label>
                                <Input
                                    className={portalInputClass}
                                    type="email"
                                    value={form.email}
                                    onChange={(e) => update('email', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className={portalLabelClass}>Phone</Label>
                                <Input
                                    className={portalInputClass}
                                    value={form.phone}
                                    onChange={(e) => update('phone', e.target.value)}
                                    placeholder="Optional"
                                />
                            </div>
                        </>
                    )}

                    {step === 4 && (
                        <div className="space-y-3 text-sm">
                            {Object.entries(form).map(
                                ([k, v]) =>
                                    v && (
                                        <div
                                            key={k}
                                            className="flex justify-between border-b border-portal-outline-variant pb-2"
                                        >
                                            <span className="capitalize text-portal-on-surface-variant">{k}</span>
                                            <span className="font-medium text-portal-on-surface">{v}</span>
                                        </div>
                                    ),
                            )}
                        </div>
                    )}

                    <div className="flex justify-between pt-4">
                        <Button
                            variant="outline"
                            className="border-portal-outline-variant"
                            disabled={step === 0}
                            onClick={() => setStep((s) => s - 1)}
                        >
                            Back
                        </Button>
                        {step < STEPS.length - 1 ? (
                            <Button className={portalPrimaryBtnClass} onClick={() => setStep((s) => s + 1)}>
                                Continue
                            </Button>
                        ) : (
                            <Button className={portalPrimaryBtnClass} onClick={() => onComplete(form)}>
                                Submit Report
                            </Button>
                        )}
                    </div>
                </div>
            </PublicCard>
        </>
    );
}
