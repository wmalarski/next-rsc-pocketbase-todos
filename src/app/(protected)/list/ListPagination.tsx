"use client";
import { Button } from "@/components/Button/Button";
import { IconButton } from "@/components/IconButton/IconButton";
import {
  Pagination,
  PaginationEllipsis,
  PaginationItem,
  PaginationNextTrigger,
  PaginationPrevTrigger,
} from "@/components/Pagination/Pagination";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

type ListPaginationProps = {
  totalItems: number;
  pageSize: number;
};

export const ListPagination = ({
  totalItems,
  pageSize,
}: ListPaginationProps) => {
  return (
    <Pagination
      count={totalItems}
      pageSize={pageSize}
      siblingCount={1}
      defaultPage={1}
    >
      {({ pages }) => (
        <>
          <PaginationPrevTrigger asChild>
            <IconButton variant="ghost" aria-label="Next Page">
              <ChevronLeftIcon />
            </IconButton>
          </PaginationPrevTrigger>

          {pages.map((page, index) =>
            page.type === "page" ? (
              <PaginationItem key={index} {...page} asChild>
                <Button variant="outline">{page.value}</Button>
              </PaginationItem>
            ) : (
              <PaginationEllipsis key={index} index={index}>
                &#8230;
              </PaginationEllipsis>
            ),
          )}
          <PaginationNextTrigger asChild>
            <IconButton variant="ghost" aria-label="Next Page">
              <ChevronRightIcon />
            </IconButton>
          </PaginationNextTrigger>
        </>
      )}
    </Pagination>
  );
};
