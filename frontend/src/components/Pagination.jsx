import React from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

const Pagination = ({ pageNumber, totalPages, totalElements, pageSize, onPageChange, onPageSizeChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i);
  const visiblePages = pages.filter(
    (p) => p === 0 || p === totalPages - 1 || Math.abs(p - pageNumber) <= 1
  );

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span>Rows per page:</span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="border border-gray-200 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-black"
        >
          {[5, 10, 15, 20].map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <span className="ml-2">{totalElements} total</span>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(pageNumber - 1)}
          disabled={pageNumber === 0}
          className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          aria-label="Previous page"
        >
          <HiChevronLeft />
        </button>

        {visiblePages.map((p, i) => {
          const prev = visiblePages[i - 1];
          const showEllipsis = prev !== undefined && p - prev > 1;
          return (
            <React.Fragment key={p}>
              {showEllipsis && (
                <span className="px-2 text-gray-400 text-sm">…</span>
              )}
              <button
                onClick={() => onPageChange(p)}
                className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${
                  p === pageNumber
                    ? 'bg-black text-white'
                    : 'border border-gray-200 hover:bg-gray-100 text-gray-700'
                }`}
              >
                {p + 1}
              </button>
            </React.Fragment>
          );
        })}

        <button
          onClick={() => onPageChange(pageNumber + 1)}
          disabled={pageNumber >= totalPages - 1}
          className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          aria-label="Next page"
        >
          <HiChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
