import { IconUpload, IconX } from '@tabler/icons-react';
import { useCallback, useRef, useState } from 'react';
import { Button } from '@/Components/ui/button';
import { cn } from '@/lib/utils';

interface FileUploadZoneProps {
    onFilesChange?: (files: File[]) => void;
    accept?: string;
    maxFiles?: number;
    className?: string;
    hint?: string;
}

export function FileUploadZone({
    onFilesChange,
    accept = 'image/*,.pdf',
    maxFiles = 5,
    className,
    hint,
}: FileUploadZoneProps) {
    const [files, setFiles] = useState<File[]>([]);
    const [dragOver, setDragOver] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const addFiles = useCallback(
        (incoming: FileList | null) => {
            if (!incoming) return;
            const incomingFiles = Array.from(incoming);
            const next =
                maxFiles === 1
                    ? incomingFiles.slice(0, 1)
                    : [...files, ...incomingFiles].slice(0, maxFiles);
            setFiles(next);
            onFilesChange?.(next);
        },
        [files, maxFiles, onFilesChange],
    );

    const removeFile = (index: number) => {
        const next = files.filter((_, i) => i !== index);
        setFiles(next);
        onFilesChange?.(next);
    };

    return (
        <div className={cn('space-y-3', className)}>
            <div
                onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                    e.preventDefault();
                    setDragOver(false);
                    addFiles(e.dataTransfer.files);
                }}
                className={cn(
                    'flex flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-10 transition-colors',
                    dragOver ? 'border-primary bg-primary/5' : 'border-border bg-muted/20',
                )}
            >
                <IconUpload className="mb-3 size-8 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground">Drag & drop files here</p>
                <p className="mt-1 text-xs text-muted-foreground">{hint ?? 'PNG, JPG, PDF up to 10MB each'}</p>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => inputRef.current?.click()}
                >
                    Browse files
                </Button>
                <input
                    ref={inputRef}
                    type="file"
                    className="hidden"
                    accept={accept}
                    multiple
                    onChange={(e) => addFiles(e.target.files)}
                />
            </div>
            {files.length > 0 && (
                <ul className="space-y-2">
                    {files.map((file, i) => (
                        <li
                            key={`${file.name}-${i}`}
                            className="flex items-center justify-between rounded-lg border border-border bg-card px-3 py-2 text-sm"
                        >
                            <span className="truncate text-foreground">{file.name}</span>
                            <Button type="button" variant="ghost" size="icon-xs" onClick={() => removeFile(i)}>
                                <IconX className="size-3.5" />
                            </Button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
