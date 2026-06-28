import { Head, Link } from '@inertiajs/react';
import CitizenLayout from '@/Layouts/CitizenLayout';
import { PageHeader } from '@/Components/cims/PageHeader';
import { FileUploadZone } from '@/Components/cims/FileUploadZone';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { IconCheck } from '@tabler/icons-react';
import { useState } from 'react';
import type { Incident, Notification } from '@/types/cims';

export default function UploadEvidence({ incident, notifications }: { incident: Incident; notifications: Notification[] }) {
    const [uploaded, setUploaded] = useState(false);

    return (
        <CitizenLayout notifications={notifications}>
            <Head title="Upload Evidence" />
            <PageHeader title="Upload Additional Evidence" description={`For incident ${incident.id}`} />
            <Card className="mt-6 max-w-2xl">
                <CardHeader><CardTitle>Upload Files</CardTitle></CardHeader>
                <CardContent>
                    {uploaded ? (
                        <Alert><IconCheck className="size-4" /><AlertDescription>Evidence uploaded successfully. Staff will review shortly.</AlertDescription></Alert>
                    ) : (
                        <>
                            <FileUploadZone />
                            <div className="mt-4 flex gap-2">
                                <Button onClick={() => setUploaded(true)}>Upload</Button>
                                <Button variant="outline" asChild><Link href={route('citizen.incidents.show', incident.id)}>Cancel</Link></Button>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>
        </CitizenLayout>
    );
}
