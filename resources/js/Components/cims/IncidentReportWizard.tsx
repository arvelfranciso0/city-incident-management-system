import { Button } from "@/Components/ui/button";
import { FileUploadZone } from "@/Components/cims/FileUploadZone";
import IncidentReportMap from "@/Components/cims/IncidentReportMap";
import {
    PublicCard,
    portalInputClass,
    portalLabelClass,
    portalPrimaryBtnClass,
} from "@/Components/cims/PublicUi";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Progress } from "@/Components/ui/progress";
import { useCallback, useRef, useState } from "react";
import type { Category, Priority } from "@/types/cims";
import { useForm } from "@inertiajs/react";
import { reverseGeocode } from "@/lib/reverseGeocode";

const STEPS = ["Details", "Location", "Evidence", "Contact", "Review"];

const DEFAULT_LAT = 10.3157;
const DEFAULT_LNG = 123.8854;

export interface IncidentReportFormData {
    title: string;
    description: string;
    category_id: string;
    priority_id: string;
    location: string;
    address_line: string;
    city: string;
    postal_code: string;
    lat: string;
    lng: string;
    reporter_name: string;
    reporter_email: string;
    reporter_phone: string;
    attachments: File[];
}

interface IncidentReportWizardProps {
    categories: Category[];
    priorities: Priority[];
    variant: "guest" | "citizen";
    initialContact?: Partial<
        Pick<IncidentReportFormData, "reporter_name" | "reporter_email" | "reporter_phone">
    >;
    submitRoute?: string;
    onComplete?: (form: IncidentReportFormData) => void;
}

const FIELD_LABELS: Record<keyof IncidentReportFormData, string> = {
    title: "Title",
    description: "Description",
    category_id: "Category",
    priority_id: "Priority",
    location: "Location",
    address_line: "Street address",
    city: "City",
    postal_code: "ZIP code",
    lat: "Latitude",
    lng: "Longitude",
    reporter_name: "Full name",
    reporter_email: "Email",
    reporter_phone: "Phone",
    attachments: "Attachments",
};

export default function IncidentReportWizard({
    categories,
    priorities,
    variant,
    initialContact,
    submitRoute = route("report.store"),
    onComplete,
}: IncidentReportWizardProps) {
    const [step, setStep] = useState(0);
    const [isGeocoding, setIsGeocoding] = useState(false);
    const geocodeRequestId = useRef(0);
    const { data, setData, post, processing, errors } =
        useForm<IncidentReportFormData>({
            title: "",
            description: "",
            category_id: "",
            priority_id: "",
            location: "",
            address_line: "",
            city: "Metroville",
            postal_code: "",
            lat: String(DEFAULT_LAT),
            lng: String(DEFAULT_LNG),
            reporter_name: initialContact?.reporter_name ?? "",
            reporter_email: initialContact?.reporter_email ?? "",
            reporter_phone: initialContact?.reporter_phone ?? "",
            attachments: [],
        });

    const submitReport = () => {
        post(submitRoute, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => onComplete?.(data),
        });
    };

    const handleMapLocationChange = useCallback(
        async (lat: number, lng: number) => {
            const requestId = ++geocodeRequestId.current;

            setData((current) => ({
                ...current,
                lat: String(lat),
                lng: String(lng),
            }));

            setIsGeocoding(true);

            try {
                const resolved = await reverseGeocode(lat, lng);

                if (!resolved || requestId !== geocodeRequestId.current) {
                    return;
                }

                setData((current) => ({
                    ...current,
                    lat: String(lat),
                    lng: String(lng),
                    address_line: resolved.address_line || current.address_line,
                    city: resolved.city || current.city,
                    postal_code: resolved.postal_code || current.postal_code,
                    location: resolved.location || current.location,
                }));
            } finally {
                if (requestId === geocodeRequestId.current) {
                    setIsGeocoding(false);
                }
            }
        },
        [setData],
    );

    const displayValue = (key: keyof IncidentReportFormData, value: string | File[]) => {
        if (key === "category_id") {
            return categories.find((category) => String(category.id) === value)?.name ?? value;
        }

        if (key === "priority_id") {
            return priorities.find((priority) => String(priority.id) === value)?.name ?? value;
        }

        if (key === "attachments") {
            return Array.isArray(value) ? `${value.length} file(s)` : "";
        }

        return String(value);
    };

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
                <Progress
                    value={progress}
                    className="bg-portal-surface-container"
                />
            </div>

            <PublicCard padding="lg" className="mt-6">
                <h2 className="mb-4 text-lg font-semibold text-portal-primary">
                    {STEPS[step]}
                </h2>
                <div className="space-y-4">
                    {step === 0 && (
                        <>
                            <div className="space-y-2">
                                <Label className={portalLabelClass}>Title</Label>
                                <Input
                                    className={portalInputClass}
                                    value={data.title}
                                    onChange={(e) => setData("title", e.target.value)}
                                    placeholder="Brief description of the issue"
                                />
                                {errors.title && (
                                    <p className="text-sm text-destructive">{errors.title}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label className={portalLabelClass}>Category</Label>
                                <Select
                                    value={data.category_id}
                                    onValueChange={(value) => setData("category_id", value)}
                                >
                                    <SelectTrigger className={portalInputClass}>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem key={category.id} value={String(category.id)}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.category_id && (
                                    <p className="text-sm text-destructive">{errors.category_id}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label className={portalLabelClass}>Priority</Label>
                                <Select
                                    value={data.priority_id}
                                    onValueChange={(value) => setData("priority_id", value)}
                                >
                                    <SelectTrigger className={portalInputClass}>
                                        <SelectValue placeholder="Select priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {priorities.map((priority) => (
                                            <SelectItem key={priority.id} value={String(priority.id)}>
                                                {priority.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.priority_id && (
                                    <p className="text-sm text-destructive">{errors.priority_id}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label className={portalLabelClass}>Description</Label>
                                <Textarea
                                    className={portalInputClass}
                                    rows={4}
                                    value={data.description}
                                    onChange={(e) => setData("description", e.target.value)}
                                    placeholder="Provide details..."
                                />
                                {errors.description && (
                                    <p className="text-sm text-destructive">{errors.description}</p>
                                )}
                            </div>
                        </>
                    )}

                    {step === 1 && (
                        <>
                            <div className="space-y-2">
                                <Label className={portalLabelClass}>Street address</Label>
                                <Input
                                    className={portalInputClass}
                                    value={data.address_line}
                                    onChange={(e) => setData("address_line", e.target.value)}
                                    placeholder="Street address"
                                />
                                {errors.address_line && (
                                    <p className="text-sm text-destructive">{errors.address_line}</p>
                                )}
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label className={portalLabelClass}>City</Label>
                                    <Input
                                        className={portalInputClass}
                                        value={data.city}
                                        onChange={(e) => setData("city", e.target.value)}
                                    />
                                    {errors.city && (
                                        <p className="text-sm text-destructive">{errors.city}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label className={portalLabelClass}>ZIP code</Label>
                                    <Input
                                        className={portalInputClass}
                                        value={data.postal_code}
                                        onChange={(e) => setData("postal_code", e.target.value)}
                                    />
                                    {errors.postal_code && (
                                        <p className="text-sm text-destructive">{errors.postal_code}</p>
                                    )}
                                </div>
                            </div>
                            <IncidentReportMap
                                lat={Number(data.lat)}
                                lng={Number(data.lng)}
                                onChange={handleMapLocationChange}
                            />
                            <p className="text-xs text-portal-on-surface-variant">
                                {isGeocoding
                                    ? "Looking up address for this pin…"
                                    : "Click the map or drag the pin to autofill the address fields."}
                            </p>
                            {(errors.lat || errors.lng) && (
                                <p className="text-sm text-destructive">
                                    {errors.lat ?? errors.lng}
                                </p>
                            )}
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <FileUploadZone
                                onFilesChange={(files) => setData("attachments", files)}
                            />
                            {errors.attachments && (
                                <p className="text-sm text-destructive">{errors.attachments}</p>
                            )}
                        </>
                    )}

                    {step === 3 && (
                        <>
                            {variant === "citizen" && (
                                <p className="text-sm text-portal-on-surface-variant">
                                    Confirm your contact details for status updates on this report.
                                </p>
                            )}
                            <div className="space-y-2">
                                <Label className={portalLabelClass}>Full name</Label>
                                <Input
                                    className={portalInputClass}
                                    value={data.reporter_name}
                                    onChange={(e) => setData("reporter_name", e.target.value)}
                                />
                                {errors.reporter_name && (
                                    <p className="text-sm text-destructive">{errors.reporter_name}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label className={portalLabelClass}>Email</Label>
                                <Input
                                    className={portalInputClass}
                                    type="email"
                                    value={data.reporter_email}
                                    onChange={(e) => setData("reporter_email", e.target.value)}
                                />
                                {errors.reporter_email && (
                                    <p className="text-sm text-destructive">{errors.reporter_email}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label className={portalLabelClass}>Phone</Label>
                                <Input
                                    className={portalInputClass}
                                    value={data.reporter_phone}
                                    onChange={(e) => setData("reporter_phone", e.target.value)}
                                    placeholder="Optional"
                                />
                                {errors.reporter_phone && (
                                    <p className="text-sm text-destructive">{errors.reporter_phone}</p>
                                )}
                            </div>
                        </>
                    )}

                    {step === 4 && (
                        <div className="space-y-3 text-sm">
                            {(Object.keys(FIELD_LABELS) as Array<keyof IncidentReportFormData>).map(
                                (key) => {
                                    const value = data[key];
                                    const hasValue = Array.isArray(value)
                                        ? value.length > 0
                                        : Boolean(value);

                                    if (!hasValue) {
                                        return null;
                                    }

                                    return (
                                        <div
                                            key={key}
                                            className="flex justify-between gap-4 border-b border-portal-outline-variant pb-2"
                                        >
                                            <span className="text-portal-on-surface-variant">
                                                {FIELD_LABELS[key]}
                                            </span>
                                            <span className="text-right font-medium text-portal-on-surface">
                                                {displayValue(key, value) as string}
                                            </span>
                                        </div>
                                    );
                                },
                            )}
                        </div>
                    )}

                    <div className="flex justify-between pt-4">
                        <Button
                            variant="outline"
                            className="border-portal-outline-variant"
                            disabled={step === 0}
                            onClick={() => setStep((current) => current - 1)}
                        >
                            Back
                        </Button>
                        {step < STEPS.length - 1 ? (
                            <Button
                                className={portalPrimaryBtnClass}
                                onClick={() => setStep((current) => current + 1)}
                            >
                                Continue
                            </Button>
                        ) : (
                            <Button
                                type="button"
                                className={portalPrimaryBtnClass}
                                disabled={processing}
                                onClick={submitReport}
                            >
                                {processing ? "Submitting…" : "Submit Report"}
                            </Button>
                        )}
                    </div>
                </div>
            </PublicCard>
        </>
    );
}
