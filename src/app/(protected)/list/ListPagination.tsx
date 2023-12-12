"use client";
import { Button } from "@/components/Button/Button";
import { IconButton } from "@/components/IconButton/IconButton";
import {
  Pagination,
  PaginationEllipsis,
  PaginationItem,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationProps,
} from "@/components/Pagination/Pagination";
import { paths } from "@/utils/paths";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";

type ListPaginationProps = {
  page: number;
  pageSize: number;
  totalItems: number;
};

export const ListPagination = ({
  page,
  pageSize,
  totalItems,
}: ListPaginationProps) => {
  const router = useRouter();

  const onPageChange: PaginationProps["onPageChange"] = (details) => {
    router.push(paths.list({ page: details.page }));
  };

  return (
    <Pagination
      count={totalItems}
      pageSize={pageSize}
      siblingCount={1}
      defaultPage={page}
      justifyContent="center"
      onPageChange={onPageChange}
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
