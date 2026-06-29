import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

type PaginationProps = {
  page: number;
  totalPages: number;
  basePath: string;
};

function hrefFor(basePath: string, page: number) {
  return page <= 1 ? basePath : `${basePath}?page=${page}`;
}

function getPages(page: number, totalPages: number): (number | "...")[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (page <= 3) return [1, 2, 3, "...", totalPages];
  if (page >= totalPages - 2)
    return [1, "...", totalPages - 2, totalPages - 1, totalPages];

  return [1, "...", page - 1, page, page + 1, "...", totalPages];
}

const arrowBase = "p-2 rounded-lg transition";

export default function Pagination({ page, totalPages, basePath }: PaginationProps) {
  const prevDisabled = page <= 1;
  const nextDisabled = page >= totalPages;

  return (
    <div className="flex justify-center gap-1 mt-4 items-center">
      {prevDisabled ? (
        <span
          aria-disabled="true"
          className={cn(arrowBase, "text-muted-foreground opacity-30 cursor-not-allowed")}
        >
          <ChevronLeft className="w-4 h-4" />
        </span>
      ) : (
        <Link
          href={hrefFor(basePath, page - 1)}
          aria-label="Página anterior"
          className={cn(arrowBase, "text-muted-foreground hover:bg-muted")}
        >
          <ChevronLeft className="w-4 h-4" />
        </Link>
      )}

      {getPages(page, totalPages).map((p, idx) =>
        p === "..." ? (
          <span
            key={`ellipsis-${idx}`}
            className="w-8 text-center text-sm text-muted-foreground"
          >
            …
          </span>
        ) : p === page ? (
          <span
            key={p}
            aria-current="page"
            className="w-8 h-8 inline-flex items-center justify-center text-sm rounded-lg bg-primary text-primary-foreground font-medium"
          >
            {p}
          </span>
        ) : (
          <Link
            key={p}
            href={hrefFor(basePath, p)}
            className="w-8 h-8 inline-flex items-center justify-center text-sm rounded-lg text-muted-foreground hover:bg-muted transition"
          >
            {p}
          </Link>
        )
      )}

      {nextDisabled ? (
        <span
          aria-disabled="true"
          className={cn(arrowBase, "text-muted-foreground opacity-30 cursor-not-allowed")}
        >
          <ChevronRight className="w-4 h-4" />
        </span>
      ) : (
        <Link
          href={hrefFor(basePath, page + 1)}
          aria-label="Próxima página"
          className={cn(arrowBase, "text-muted-foreground hover:bg-muted")}
        >
          <ChevronRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}
