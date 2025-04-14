import { PaginationItem, PaginationPrevious, PaginationLink, PaginationEllipsis, PaginationNext } from "../ui/pagination";
import { PaginationState, Table } from "@tanstack/react-table";

export function generatePaginationLinks<T>(
  table: Table<T>, 
  pagination: PaginationState, 
) {
  const totalPages = table.getPageCount();
  const currentPage = pagination.pageIndex;
  const links = [];

  links.push(
    <PaginationItem key="prev">
      <PaginationPrevious
        onClick={() => table.previousPage()}
        className={!table.getCanPreviousPage() ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
        href="#"
      />
    </PaginationItem>
  );

  links.push(
    <PaginationItem key="first">
      <PaginationLink
        href="#"
        onClick={() => table.setPageIndex(0)}
        isActive={currentPage === 0}
      >
        1
      </PaginationLink>
    </PaginationItem>
  );

  if (currentPage > 2) {
    links.push(
      <PaginationItem key="ellipsis-start">
        <PaginationEllipsis />
      </PaginationItem>
    );
  }

  for (let i = Math.max(1, currentPage - 1); i <= Math.min(totalPages - 2, currentPage + 1); i++) {
    links.push(
      <PaginationItem key={i + 1}>
        <PaginationLink
          href="#"
          onClick={() => table.setPageIndex(i)}
          isActive={currentPage === i}
        >
          {i + 1}
        </PaginationLink>
      </PaginationItem>
    );
  }

  if (currentPage < totalPages - 3) {
    links.push(
      <PaginationItem key="ellipsis-end">
        <PaginationEllipsis />
      </PaginationItem>
    );
  }

  if (totalPages > 1) {
    links.push(
      <PaginationItem key="last">
        <PaginationLink
          href="#"
          onClick={() => table.setPageIndex(totalPages - 1)}
          isActive={currentPage === totalPages - 1}
        >
          {totalPages}
        </PaginationLink>
      </PaginationItem>
    );
  }

  links.push(
    <PaginationItem key="next">
      <PaginationNext
        onClick={() => table.nextPage()}
        className={!table.getCanNextPage() ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
        href="#"
      />
    </PaginationItem>
  );

  return links;
};