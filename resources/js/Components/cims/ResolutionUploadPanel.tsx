import { useState } from 'react';
import { FileUploadZone } from '@/Components/cims/FileUploadZone';
import { ImageGallery } from '@/Components/cims/ImageGallery';
import { Alert, AlertDescription, AlertTitle } from '@/Components/ui/alert';
import { Button } from '@/Components/ui/button';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { IconCheck, IconPhoto } from '@tabler/icons-react';

export interface SavedResolutionPhoto {
    id: string;
    src: string;
    alt: string;
    name: string;
    uploadedAt: string;
}

interface ResolutionUploadPanelProps {
    incidentId: string;
}

export function ResolutionUploadPanel({ incidentId }: ResolutionUploadPanelProps) {
    const [pendingFiles, setPendingFiles] = useState<File[]>([]);
    const [savedPhotos, setSavedPhotos] = useState<SavedResolutionPhoto[]>([]);
    const [resolutionNote, setResolutionNote] = useState('');
    const [savedNote, setSavedNote] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);

    function handleSave() {
        setError(null);
        setSuccessMessage(null);

        if (pendingFiles.length === 0 && !resolutionNote.trim()) {
            setError('Add at least one photo or a resolution note before saving.');
            return;
        }

        setSaving(true);

        // Mock persist — in production this would POST multipart/form-data to the API.
        window.setTimeout(() => {
            const newPhotos: SavedResolutionPhoto[] = pendingFiles.map((file) => ({
                id: `${incidentId}-${file.name}-${Date.now()}`,
                src: URL.createObjectURL(file),
                alt: `Resolution photo: ${file.name}`,
                name: file.name,
                uploadedAt: new Date().toISOString(),
            }));

            setSavedPhotos((prev) => [...prev, ...newPhotos]);
            if (resolutionNote.trim()) {
                setSavedNote(resolutionNote.trim());
            }
            setPendingFiles([]);
            setResolutionNote('');
            setSuccessMessage(
                newPhotos.length > 0
                    ? `Saved ${newPhotos.length} resolution photo${newPhotos.length === 1 ? '' : 's'} for ${incidentId}.`
                    : 'Resolution note saved.',
            );
            setSaving(false);
        }, 600);
    }

    return (
        <div className="space-y-6">
            {successMessage && (
                <Alert className="border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/30">
                    <IconCheck className="size-4 text-emerald-600" />
                    <AlertTitle>Saved</AlertTitle>
                    <AlertDescription>{successMessage}</AlertDescription>
                </Alert>
            )}

            {error && (
                <Alert variant="destructive">
                    <AlertTitle>Cannot save</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            <FileUploadZone
                accept="image/*"
                maxFiles={5}
                onFilesChange={setPendingFiles}
                hint="PNG or JPG up to 10MB each. Add photos showing completed work."
            />

            <div className="space-y-2">
                <Label htmlFor="resolution-note">Resolution Note (optional)</Label>
                <Textarea
                    id="resolution-note"
                    rows={3}
                    placeholder="Describe work completed, materials used, or follow-up needed..."
                    value={resolutionNote}
                    onChange={(e) => setResolutionNote(e.target.value)}
                />
            </div>

            <div className="flex flex-wrap gap-2">
                <Button onClick={handleSave} disabled={saving}>
                    {saving ? 'Saving...' : 'Save Resolution'}
                </Button>
                {pendingFiles.length > 0 && (
                    <Button variant="outline" onClick={() => setPendingFiles([])}>
                        Clear Selection
                    </Button>
                )}
            </div>

            {(savedPhotos.length > 0 || savedNote) && (
                <div className="space-y-4 rounded-lg border border-border bg-muted/20 p-4">
                    <div className="flex items-center gap-2">
                        <IconPhoto className="size-4 text-primary" />
                        <p className="text-sm font-medium">Saved Resolution</p>
                    </div>
                    {savedNote && (
                        <div className="rounded-lg border border-border bg-card p-3 text-sm">
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Note</p>
                            <p className="mt-1">{savedNote}</p>
                        </div>
                    )}
                    {savedPhotos.length > 0 && (
                        <>
                            <ImageGallery images={savedPhotos.map((p) => ({ src: p.src, alt: p.alt }))} />
                            <ul className="space-y-1 text-xs text-muted-foreground">
                                {savedPhotos.map((photo) => (
                                    <li key={photo.id}>
                                        {photo.name} · {new Date(photo.uploadedAt).toLocaleString()}
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
