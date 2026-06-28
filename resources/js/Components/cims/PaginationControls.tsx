import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/Components/ui/pagination';

interface PaginationControlsProps {
    currentPage?: number;
    totalPages?: number;
    onPageChange?: (page: number) => void;
}

export function PaginationControls({
    currentPage = 1,
    totalPages = 5,
    onPageChange,
}: PaginationControlsProps) {
    const pages = Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1);

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            if (currentPage > 1) onPageChange?.(currentPage - 1);
                        }}
                    />
                </PaginationItem>
                {pages.map((page) => (
                    <PaginationItem key={page}>
                        <PaginationLink
                            href="#"
                            isActive={page === currentPage}
                            onClick={(e) => {
                                e.preventDefault();
                                onPageChange?.(page);
                            }}
                        >
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                {totalPages > 5 && (
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                )}
                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            if (currentPage < totalPages) onPageChange?.(currentPage + 1);
                        }}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
