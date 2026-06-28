import { cn } from '@/lib/utils';

export function PortalSectionHeading({
    eyebrow,
    title,
    description,
    className,
    align = 'center',
}: {
    eyebrow?: string;
    title: string;
    description?: string;
    className?: string;
    align?: 'center' | 'left';
}) {
    return (
        <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
            {eyebrow && (
                <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.2em] text-portal-tertiary">
                    {eyebrow}
                </span>
            )}
            <h2 className="text-2xl font-semibold tracking-tight text-portal-primary sm:text-[28px] sm:leading-9">
                {title}
            </h2>
            {description && (
                <p className="mt-4 text-base leading-relaxed text-portal-on-surface-variant">{description}</p>
            )}
        </div>
    );
}

export function PublicPageShell({
    title,
    description,
    meta,
    children,
    wide = false,
    className,
}: {
    title?: string;
    description?: string;
    meta?: string;
    children: React.ReactNode;
    wide?: boolean;
    className?: string;
}) {
    return (
        <div className={cn('mx-auto px-6 py-16', wide ? 'max-w-6xl' : 'max-w-3xl', className)}>
            {title && (
                <h1 className="text-2xl font-semibold tracking-tight text-portal-primary sm:text-[28px] sm:leading-9">
                    {title}
                </h1>
            )}
            {description && (
                <p className="mt-3 text-base leading-relaxed text-portal-on-surface-variant">{description}</p>
            )}
            {meta && <p className="mt-2 text-sm text-portal-outline">{meta}</p>}
            <div className={cn(title || description || meta ? 'mt-8' : '')}>{children}</div>
        </div>
    );
}

export function PublicCard({
    children,
    className,
    padding = 'md',
}: {
    children: React.ReactNode;
    className?: string;
    padding?: 'none' | 'md' | 'lg';
}) {
    return (
        <div
            className={cn(
                'rounded-xl border border-portal-outline-variant bg-white',
                padding === 'md' && 'p-6',
                padding === 'lg' && 'p-8',
                className,
            )}
        >
            {children}
        </div>
    );
}

export const portalLabelClass =
    'text-xs font-semibold uppercase tracking-wider text-portal-on-surface-variant';

export const portalInputClass =
    'border-portal-outline-variant bg-white focus-visible:ring-portal-primary-container';

export const portalPrimaryBtnClass =
    'bg-portal-primary text-portal-on-primary hover:bg-portal-primary/90';

export const portalTertiaryBtnClass =
    'bg-portal-tertiary text-portal-on-tertiary hover:bg-portal-tertiary-container';

export function portalNavLinkClass(active: boolean) {
    return active
        ? 'border-b-2 border-portal-primary pb-1 text-xs font-semibold uppercase tracking-wider text-portal-primary'
        : 'text-xs font-semibold uppercase tracking-wider text-portal-on-surface-variant transition-colors hover:text-portal-primary';
}

export function portalNavLinkMobileClass(active: boolean) {
    return active
        ? 'rounded-lg bg-portal-surface-container px-3 py-2.5 text-sm font-medium text-portal-primary'
        : 'rounded-lg px-3 py-2.5 text-sm text-portal-on-surface-variant transition-colors hover:bg-portal-surface-container';
}
