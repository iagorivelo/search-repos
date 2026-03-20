"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

type PaginationProps = {
  page: number;
  perPage: number;
  totalCount?: number;
  hasMore: boolean;
  onPrev: () => void;
  onNext: () => void;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  page,
  perPage,
  totalCount,
  hasMore,
  onPrev,
  onNext,
  onPageChange,
}: PaginationProps) {
  const totalPages = totalCount
    ? Math.ceil(totalCount / perPage)
    : page + (hasMore ? 1 : 0);

  const getPages = (): (number | "...")[] => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (page <= 3) return [1, 2, 3, "...", totalPages];
    if (page >= totalPages - 2)
      return [1, "...", totalPages - 2, totalPages - 1, totalPages];

    return [1, "...", page - 1, page, page + 1, "...", totalPages];
  };

  return (
    <div className="flex justify-center gap-1 mt-4 items-center">
      <button
        disabled={page === 1}
        onClick={onPrev}
        aria-label="Página anterior"
        className="p-2 rounded-lg text-zinc-500 hover:bg-zinc-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {getPages().map((p, idx) =>
        p === "..." ? (
          <span
            key={`ellipsis-${idx}`}
            className="w-8 text-center text-sm text-zinc-400"
          >
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p as number)}
            className={cn(
              "w-8 h-8 text-sm rounded-lg transition",
              p === page
                ? "bg-zinc-900 text-white font-medium"
                : "text-zinc-600 hover:bg-zinc-100"
            )}
          >
            {p}
          </button>
        )
      )}

      <button
        disabled={page >= totalPages}
        onClick={onNext}
        aria-label="Próxima página"
        className="p-2 rounded-lg text-zinc-500 hover:bg-zinc-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
