import React from "react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui";
import {useNavigate} from "react-router-dom";

interface PaginationProps {
    page: number;
    limit: number;
    itemsCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}

const PaginationComponent: React.FC<PaginationProps> = ({
                                                            page,
                                                            pageCount,
                                                            hasPreviousPage,
                                                            hasNextPage,
                                                        }) => {
    const navigate = useNavigate();

    const handlePageChange = (pageNumber: number) => {
        navigate(`?page=${pageNumber}`);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxPagesToShow = 5;
        const startPage = Math.max(1, page - 2);
        const endPage = Math.min(pageCount, startPage + maxPagesToShow - 1);

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <PaginationItem key={i}>
                    <PaginationLink
                        href={`?page=${i}`}
                        isActive={i === page}
                        onClick={(e) => {
                            handlePageChange(i);
                        }}
                    >
                        {i}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        return (
            <>
                {startPage > 1 && (
                    <PaginationItem>
                        <PaginationLink
                            href="?page=1"
                            onClick={() => {
                                handlePageChange(1);
                            }}
                        >
                            1
                        </PaginationLink>
                    </PaginationItem>
                )}
                {startPage > 2 && <PaginationEllipsis/>}
                {pageNumbers}
                {endPage < pageCount - 1 && <PaginationEllipsis/>}
                {endPage < pageCount && (
                    <PaginationItem>
                        <PaginationLink
                            href={`?page=${pageCount}`}
                            onClick={() => {
                                handlePageChange(pageCount);
                            }}
                        >
                            {pageCount}
                        </PaginationLink>
                    </PaginationItem>
                )}
            </>
        );
    };

    return (
        <Pagination>
            <PaginationContent>
                {hasPreviousPage && <PaginationItem>
                    <PaginationPrevious
                        className={"cursor-pointer"}
                        onClick={() => {
                            handlePageChange(page - 1)
                        }}
                    />
                </PaginationItem>}
                {renderPageNumbers()}
                {hasNextPage && <PaginationItem>
                    <PaginationNext
                        className={"cursor-pointer"}
                        onClick={() => {
                            handlePageChange(page + 1)
                        }}
                    />
                </PaginationItem>}
            </PaginationContent>
        </Pagination>
    );
};

export default PaginationComponent;