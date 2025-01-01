"use client";
import { Pagination, type PaginationProps } from "@/ui/pagination";
import { paths } from "@/utils/paths";
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
		/>
	);
};
