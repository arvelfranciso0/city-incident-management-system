import { Input } from '@/Components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Button } from '@/Components/ui/button';
import { IconFilter, IconSearch } from '@tabler/icons-react';
import { cn } from '@/lib/utils';

interface SearchFiltersProps {
    searchPlaceholder?: string;
    searchValue?: string;
    onSearchChange?: (value: string) => void;
    filters?: { key: string; label: string; options: { value: string; label: string }[] }[];
    filterValues?: Record<string, string>;
    onFilterChange?: (key: string, value: string) => void;
    onReset?: () => void;
    className?: string;
}

export function SearchFilters({
    searchPlaceholder = 'Search...',
    searchValue = '',
    onSearchChange,
    filters = [],
    filterValues = {},
    onFilterChange,
    onReset,
    className,
}: SearchFiltersProps) {
    return (
        <div className={cn('flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center', className)}>
            <div className="relative min-w-0 flex-1 sm:max-w-xs">
                <IconSearch className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    placeholder={searchPlaceholder}
                    value={searchValue}
                    onChange={(e) => onSearchChange?.(e.target.value)}
                    className="pl-9"
                />
            </div>
            {filters.map((filter) => (
                <Select
                    key={filter.key}
                    value={filterValues[filter.key] ?? 'all'}
                    onValueChange={(v) => onFilterChange?.(filter.key, v)}
                >
                    <SelectTrigger className="w-full sm:w-[160px]">
                        <IconFilter className="mr-2 size-4 text-muted-foreground" />
                        <SelectValue placeholder={filter.label} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All {filter.label}</SelectItem>
                        {filter.options.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            ))}
            {onReset && (
                <Button variant="ghost" size="sm" onClick={onReset}>
                    Reset
                </Button>
            )}
        </div>
    );
}
