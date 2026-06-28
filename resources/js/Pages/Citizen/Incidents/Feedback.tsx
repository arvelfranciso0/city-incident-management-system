import { Head, Link } from '@inertiajs/react';
import CitizenLayout from '@/Layouts/CitizenLayout';
import { PageHeader } from '@/Components/cims/PageHeader';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { IconCheck, IconStar } from '@tabler/icons-react';
import { useState } from 'react';
import type { Incident, Notification } from '@/types/cims';

export default function Feedback({ incident, notifications }: { incident: Incident; notifications: Notification[] }) {
    const [rating, setRating] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    return (
        <CitizenLayout notifications={notifications}>
            <Head title="Submit Feedback" />
            <PageHeader title="Submit Feedback" description={`Rate your experience for ${incident.title}`} />
            <Card className="mt-6 max-w-lg">
                <CardHeader><CardTitle>How was the resolution?</CardTitle></CardHeader>
                <CardContent>
                    {submitted ? (
                        <Alert><IconCheck className="size-4" /><AlertDescription>Thank you for your feedback!</AlertDescription></Alert>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((n) => (
                                    <button key={n} type="button" onClick={() => setRating(n)} className="p-1">
                                        <IconStar className={`size-8 ${n <= rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'}`} />
                                    </button>
                                ))}
                            </div>
                            <div className="space-y-2"><Label>Comments (optional)</Label><Textarea rows={4} placeholder="Tell us about your experience..." /></div>
                            <div className="flex gap-2">
                                <Button onClick={() => setSubmitted(true)} disabled={rating === 0}>Submit Feedback</Button>
                                <Button variant="outline" asChild><Link href={route('citizen.incidents.show', incident.id)}>Cancel</Link></Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </CitizenLayout>
    );
}
