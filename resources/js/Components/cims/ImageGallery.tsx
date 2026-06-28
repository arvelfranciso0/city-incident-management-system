import { IconChevronLeft, IconChevronRight, IconX } from '@tabler/icons-react';
import { useState } from 'react';
import { Button } from '@/Components/ui/button';
import { Dialog, DialogContent } from '@/Components/ui/dialog';
import { cn } from '@/lib/utils';

interface ImageGalleryProps {
    images: { src: string; alt: string }[];
    className?: string;
}

export function ImageGallery({ images, className }: ImageGalleryProps) {
    const [selected, setSelected] = useState<number | null>(null);

    if (images.length === 0) {
        return (
            <div className={cn('rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground', className)}>
                No images uploaded
            </div>
        );
    }

    return (
        <>
            <div className={cn('grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4', className)}>
                {images.map((img, i) => (
                    <button
                        key={i}
                        type="button"
                        onClick={() => setSelected(i)}
                        className="group relative aspect-square overflow-hidden rounded-lg border border-border bg-muted"
                    >
                        <img src={img.src} alt={img.alt} className="size-full object-cover transition-transform group-hover:scale-105" />
                    </button>
                ))}
            </div>
            <Dialog open={selected !== null} onOpenChange={() => setSelected(null)}>
                <DialogContent className="max-w-3xl p-0">
                    {selected !== null && (
                        <div className="relative">
                            <img src={images[selected].src} alt={images[selected].alt} className="max-h-[70vh] w-full object-contain" />
                            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-black/50 p-3">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-white hover:bg-white/20"
                                    onClick={() => setSelected((selected - 1 + images.length) % images.length)}
                                >
                                    <IconChevronLeft />
                                </Button>
                                <span className="text-sm text-white">
                                    {selected + 1} / {images.length}
                                </span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-white hover:bg-white/20"
                                    onClick={() => setSelected((selected + 1) % images.length)}
                                >
                                    <IconChevronRight />
                                </Button>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute right-2 top-2 text-white hover:bg-white/20"
                                onClick={() => setSelected(null)}
                            >
                                <IconX />
                            </Button>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}
