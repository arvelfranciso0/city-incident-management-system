import { IconInbox } from '@tabler/icons-react';
import { Button } from '@/Components/ui/button';

interface EmptyStateProps {
    title: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
    icon?: React.ReactNode;
}

export function EmptyState({ title, description, actionLabel, onAction, icon }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 px-6 py-16 text-center">
            <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
                {icon ?? <IconInbox className="size-7" />}
            </div>
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            {description && <p className="mt-2 max-w-sm text-sm text-muted-foreground">{description}</p>}
            {actionLabel && onAction && (
                <Button className="mt-6" onClick={onAction}>
                    {actionLabel}
                </Button>
            )}
        </div>
    );
}
