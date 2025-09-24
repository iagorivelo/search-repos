"use client";

import React from "react";

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
  const totalPages = totalCount ? Math.ceil(totalCount / perPage) : page + (hasMore ? 1 : 0);

  const getPages = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex justify-center gap-2 mt-8 items-center">
      <button
        disabled={page === 1}
        onClick={onPrev}
        className="px-3 py-1 bg-indigo-600 rounded disabled:opacity-50"
      >
        ⬅️
      </button>

      {getPages().map((p, idx) =>
        typeof p === "number" ? (
          <button
            key={idx}
            onClick={() => onPageChange(p)}
            className={`px-3 py-1 rounded ${
              p === page
                ? "bg-indigo-400 text-black font-bold"
                : "bg-indigo-700 hover:bg-indigo-500"
            }`}
          >
            {p}
          </button>
        ) : (
          <span key={idx} className="px-2 text-gray-400">
            {p}
          </span>
        )
      )}

      <button
        disabled={page >= totalPages}
        onClick={onNext}
        className="px-3 py-1 bg-indigo-600 rounded disabled:opacity-50"
      >
        ➡️
      </button>
    </div>
  );
}
