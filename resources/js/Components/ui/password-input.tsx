import * as React from 'react';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';

function PasswordInput({ className, ...props }: Omit<React.ComponentProps<typeof Input>, 'type'>) {
    const [visible, setVisible] = React.useState(false);

    return (
        <div className="relative">
            <Input
                type={visible ? 'text' : 'password'}
                className={cn('pr-10', className)}
                {...props}
            />
            <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:bg-transparent hover:text-foreground"
                onClick={() => setVisible((show) => !show)}
                aria-label={visible ? 'Hide password' : 'Show password'}
                tabIndex={-1}
            >
                {visible ? <IconEyeOff className="size-4" /> : <IconEye className="size-4" />}
            </Button>
        </div>
    );
}

export { PasswordInput };
