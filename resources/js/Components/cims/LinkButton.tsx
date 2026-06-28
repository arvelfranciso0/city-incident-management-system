import { Link, type InertiaLinkProps } from '@inertiajs/react';
import { type VariantProps } from 'class-variance-authority';
import { buttonVariants } from '@/Components/ui/button';
import { cn } from '@/lib/utils';

type LinkButtonProps = InertiaLinkProps & VariantProps<typeof buttonVariants>;

/**
 * Use instead of `<Button asChild><Link /></Button>`.
 * Inertia Link + Radix Slot can conflict on ref forwarding.
 */
export function LinkButton({ className, variant, size, ...props }: LinkButtonProps) {
    return (
        <Link
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        />
    );
}
