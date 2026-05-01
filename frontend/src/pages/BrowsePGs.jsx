import React, { useState, useCallback } from 'react';
import { pgApi } from '../services/api.jsx';
import { useFetch } from '../hooks/useFetch.jsx';
import PGCard from '../components/PGCard';
import FilterPanel from '../components/FilterPanel';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';
import { HiRefresh } from 'react-icons/hi';
import { MdApartment } from 'react-icons/md';

const BrowsePGs = () => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(9);
  const [filters, setFilters] = useState({ area: '', maxRent: null });

  const fetchPGs = useCallback(
    () => pgApi.getAllPgs(page, size, filters.area || null, filters.maxRent),
    [page, size, filters]
  );

  const { data, loading, error, refetch } = useFetch(fetchPGs, [page, size, filters]);

  const pgs = data?.data?.content || [];
  const pagination = data?.data || {};

  const handleFilterApply = (newFilters) => {
    setFilters(newFilters);
    setPage(0);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Browse PGs</h1>
        <p className="text-sm text-gray-500 mt-1">Find paying guest accommodations across Bangalore</p>
      </div>

      {/* Filter Panel */}
      <FilterPanel onApply={handleFilterApply} />

      {/* States */}
      {loading && <LoadingSpinner message="Fetching PG listings..." />}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
          <p className="text-red-600 font-medium mb-3">{error}</p>
          <button onClick={refetch} className="btn-primary flex items-center gap-2 mx-auto">
            <HiRefresh /> Retry
          </button>
        </div>
      )}

      {!loading && !error && pgs.length === 0 && (
        <div className="text-center py-20">
          <MdApartment className="text-5xl text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 font-medium">No PGs found matching your filters.</p>
          <p className="text-sm text-gray-400 mt-1">Try adjusting your area or rent range.</p>
        </div>
      )}

      {!loading && !error && pgs.length > 0 && (
        <>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-500">
              Showing <span className="font-semibold text-gray-900">{pgs.length}</span> of{' '}
              <span className="font-semibold text-gray-900">{pagination.totalElements}</span> listings
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {pgs.map((pg) => (
              <PGCard key={pg.id} pg={pg} />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            pageNumber={pagination.pageNumber ?? 0}
            totalPages={pagination.totalPages ?? 1}
            totalElements={pagination.totalElements ?? 0}
            pageSize={size}
            onPageChange={setPage}
            onPageSizeChange={(s) => { setSize(s); setPage(0); }}
          />
        </>
      )}
    </div>
  );
};

export default BrowsePGs;
