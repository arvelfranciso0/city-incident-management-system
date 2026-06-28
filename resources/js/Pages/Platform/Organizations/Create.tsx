import { Head, Link, useForm } from "@inertiajs/react";
import PlatformLayout from "@/Layouts/PlatformLayout";
import { PageHeader } from "@/Components/cims/PageHeader";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { PasswordInput } from "@/Components/ui/password-input";
import { Label } from "@/Components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Alert, AlertDescription } from "@/Components/ui/alert";

interface PlanOption {
    value: string;
    label: string;
}

export default function Create({
    subscriptionPlans,
    defaultDomain,
}: {
    subscriptionPlans: PlanOption[];
    defaultDomain: string;
}) {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        slug: "",
        subdomain: "",
        domain: defaultDomain,
        support_email: "",
        support_phone: "",
        subscription_plan: subscriptionPlans[0]?.value ?? "trial",
        admin_name: "",
        admin_email: "",
        admin_password: "",
        admin_password_confirmation: "",
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post(route("platform.organizations.store"));
    }

    return (
        <PlatformLayout>
            <Head title="Provision Subscriber" />
            <Button
                variant="ghost"
                size="sm"
                asChild
                className="-ml-2 mb-2 text-muted-foreground"
            >
                <Link href={route("platform.organizations.index")}>
                    ← Back to Subscribers
                </Link>
            </Button>

            <PageHeader
                title="Provision Subscriber"
                description="Create a new organization and its primary administrator account."
            />

            <form onSubmit={submit} className="mt-6 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">
                            Organization
                        </CardTitle>
                        <CardDescription>
                            Subscriber tenant details.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2 sm:col-span-2">
                            <Label htmlFor="name">Organization name</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />
                            {errors.name && (
                                <p className="text-sm text-destructive">
                                    {errors.name}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="slug">Slug (optional)</Label>
                            <Input
                                id="slug"
                                value={data.slug}
                                onChange={(e) =>
                                    setData("slug", e.target.value)
                                }
                                placeholder="auto-generated"
                            />
                            {errors.slug && (
                                <p className="text-sm text-destructive">
                                    {errors.slug}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="subdomain">Subdomain</Label>
                            <Input
                                id="subdomain"
                                value={data.subdomain}
                                onChange={(e) =>
                                    setData("subdomain", e.target.value)
                                }
                                placeholder="metroville"
                            />
                            {errors.subdomain && (
                                <p className="text-sm text-destructive">
                                    {errors.subdomain}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="domain">Domain</Label>
                            <Input
                                id="domain"
                                value={data.domain}
                                onChange={(e) =>
                                    setData("domain", e.target.value)
                                }
                                placeholder={defaultDomain}
                            />
                            {errors.domain && (
                                <p className="text-sm text-destructive">
                                    {errors.domain}
                                </p>
                            )}
                            {data.subdomain && data.domain && (
                                <p className="text-xs text-muted-foreground">
                                    Public portal:{" "}
                                    <span className="font-mono">
                                        {data.subdomain}.{data.domain}
                                    </span>
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="support_email">Support email</Label>
                            <Input
                                id="support_email"
                                type="email"
                                value={data.support_email}
                                onChange={(e) =>
                                    setData("support_email", e.target.value)
                                }
                            />
                            {errors.support_email && (
                                <p className="text-sm text-destructive">
                                    {errors.support_email}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="subscription_plan">
                                Subscription plan
                            </Label>
                            <Select
                                value={data.subscription_plan}
                                onValueChange={(v) =>
                                    setData("subscription_plan", v)
                                }
                            >
                                <SelectTrigger id="subscription_plan">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {subscriptionPlans.map((plan) => (
                                        <SelectItem
                                            key={plan.value}
                                            value={plan.value}
                                        >
                                            {plan.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.subscription_plan && (
                                <p className="text-sm text-destructive">
                                    {errors.subscription_plan}
                                </p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">
                            Organization Admin
                        </CardTitle>
                        <CardDescription>
                            This user manages the subscriber tenant in the Admin
                            Portal.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2 sm:col-span-2">
                            <Label htmlFor="admin_name">Full name</Label>
                            <Input
                                id="admin_name"
                                value={data.admin_name}
                                onChange={(e) =>
                                    setData("admin_name", e.target.value)
                                }
                            />
                            {errors.admin_name && (
                                <p className="text-sm text-destructive">
                                    {errors.admin_name}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                            <Label htmlFor="admin_email">Email</Label>
                            <Input
                                id="admin_email"
                                type="email"
                                value={data.admin_email}
                                onChange={(e) =>
                                    setData("admin_email", e.target.value)
                                }
                            />
                            {errors.admin_email && (
                                <p className="text-sm text-destructive">
                                    {errors.admin_email}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="admin_password">Password</Label>
                            <PasswordInput
                                id="admin_password"
                                value={data.admin_password}
                                onChange={(e) =>
                                    setData("admin_password", e.target.value)
                                }
                            />
                            {errors.admin_password && (
                                <p className="text-sm text-destructive">
                                    {errors.admin_password}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="admin_password_confirmation">
                                Confirm password
                            </Label>
                            <PasswordInput
                                id="admin_password_confirmation"
                                value={data.admin_password_confirmation}
                                onChange={(e) =>
                                    setData(
                                        "admin_password_confirmation",
                                        e.target.value,
                                    )
                                }
                            />
                        </div>
                    </CardContent>
                </Card>

                {Object.keys(errors).length > 0 && (
                    <Alert variant="destructive">
                        <AlertDescription>
                            Please fix the errors above and try again.
                        </AlertDescription>
                    </Alert>
                )}

                <div className="flex gap-2">
                    <Button type="submit" disabled={processing}>
                        {processing
                            ? "Provisioning…"
                            : "Create Subscriber & Admin"}
                    </Button>
                    <Button type="button" variant="outline" asChild>
                        <Link href={route("platform.organizations.index")}>
                            Cancel
                        </Link>
                    </Button>
                </div>
            </form>
        </PlatformLayout>
    );
}
