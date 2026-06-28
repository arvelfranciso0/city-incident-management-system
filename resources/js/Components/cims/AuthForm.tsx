import { Input } from '@/Components/ui/input';
import { PasswordInput } from '@/Components/ui/password-input';
import { Label } from '@/Components/ui/label';
import { portalInputClass, portalLabelClass } from '@/Components/cims/PublicUi';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
interface AuthFieldProps {
    id: string;
    label: string;
    type?: string;
    value: string;
    error?: string;
    autoComplete?: string;
    required?: boolean;
    autoFocus?: boolean;
    onChange: (value: string) => void;
    className?: string;
}

export function AuthField({
    id,
    label,
    type = 'text',
    value,
    error,
    autoComplete,
    required,
    autoFocus,
    onChange,
    className,
}: AuthFieldProps) {
    return (
        <div className={cn('space-y-2', className)}>
            <Label htmlFor={id} className={portalLabelClass}>{label}</Label>
            {type === 'password' ? (
                <PasswordInput
                    id={id}
                    name={id}
                    value={value}
                    autoComplete={autoComplete}
                    required={required}
                    autoFocus={autoFocus}
                    aria-invalid={!!error}
                    className={portalInputClass}
                    onChange={(e) => onChange(e.target.value)}
                />
            ) : (
                <Input
                    id={id}
                    name={id}
                    type={type}
                    value={value}
                    autoComplete={autoComplete}
                    required={required}
                    autoFocus={autoFocus}
                    aria-invalid={!!error}
                    className={portalInputClass}
                    onChange={(e) => onChange(e.target.value)}
                />
            )}
            {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
    );
}

interface AuthStatusProps {
    message: string;
    variant?: 'success' | 'info';
}

export function AuthStatus({ message, variant = 'success' }: AuthStatusProps) {
    return (
        <p
            className={cn(
                'rounded-lg border px-3 py-2 text-sm',
                variant === 'success'
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                    : 'border-border bg-muted/50 text-muted-foreground',
            )}
        >
            {message}
        </p>
    );
}

interface AuthFooterLinkProps {
    href: string;
    children: React.ReactNode;
    method?: 'get' | 'post';
    as?: 'a' | 'button';
}

export function AuthFooterLink({ href, children, method, as }: AuthFooterLinkProps) {
    return (
        <Link
            href={href}
            method={method}
            as={as}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
            {children}
        </Link>
    );
}
