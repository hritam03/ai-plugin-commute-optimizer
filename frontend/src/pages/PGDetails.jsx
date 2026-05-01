import React, { useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { pgApi } from '../services/api.jsx';
import { useFetch } from '../hooks/useFetch.jsx';
import LoadingSpinner from '../components/LoadingSpinner';
import { HiArrowLeft, HiLocationMarker, HiCurrencyRupee, HiRefresh } from 'react-icons/hi';
import { MdFoodBank, MdHome } from 'react-icons/md';

const InfoRow = ({ label, value, icon }) => (
  <div className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-b-0">
    <div className="text-gray-400 text-base">{icon}</div>
    <div className="flex-1">
      <span className="text-xs text-gray-400 block">{label}</span>
      <span className="text-sm font-medium text-gray-800">{value}</span>
    </div>
  </div>
);

const PGDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchPG = useCallback(() => pgApi.getPgById(id), [id]);
  const { data, loading, error, refetch } = useFetch(fetchPG, [id]);
  const pg = data?.data;

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-black mb-6 transition-colors"
      >
        <HiArrowLeft /> Back
      </button>

      {loading && <LoadingSpinner message="Loading PG details..." />}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
          <p className="text-red-600 font-medium mb-3">{error}</p>
          <button onClick={refetch} className="btn-primary flex items-center gap-2 mx-auto">
            <HiRefresh /> Retry
          </button>
        </div>
      )}

      {!loading && !error && pg && (
        <div className="card">
          {/* Header */}
          <div className="flex items-start justify-between mb-5">
            <div>
              <h1 className="text-xl font-bold text-gray-900">{pg.name}</h1>
              <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                <HiLocationMarker />
                <span>{pg.area}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-0.5 text-2xl font-bold text-gray-900">
                <HiCurrencyRupee />
                <span>{pg.rent.toLocaleString('en-IN')}</span>
              </div>
              <span className="text-xs text-gray-400">per month</span>
            </div>
          </div>

          {/* Details */}
          <div className="bg-gray-50 rounded-xl px-4 mb-5">
            <InfoRow icon={<MdHome />} label="Room Type" value={pg.roomType} />
            <InfoRow
              icon={<MdFoodBank />}
              label="Food"
              value={pg.foodIncluded ? 'Included ✓' : 'Not Included'}
            />
            <InfoRow icon="🆔" label="PG ID" value={`#${pg.id}`} />
          </div>

          {/* Coordinates */}
          <div className="bg-gray-50 rounded-xl p-4 mb-5">
            <p className="text-xs font-medium text-gray-500 mb-2">Location Coordinates</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-xs text-gray-400 block">Latitude</span>
                <span className="text-sm font-mono text-gray-700">{pg.latitude ?? 'N/A'}</span>
              </div>
              <div>
                <span className="text-xs text-gray-400 block">Longitude</span>
                <span className="text-sm font-mono text-gray-700">{pg.longitude ?? 'N/A'}</span>
              </div>
            </div>
            {pg.latitude && pg.longitude && (
              <a
                href={`https://maps.google.com?q=${pg.latitude},${pg.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-500 hover:text-black underline mt-2 inline-block transition-colors"
              >
                View on Google Maps →
              </a>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Link
              to={`/recommendations?area=${encodeURIComponent(pg.area)}`}
              className="btn-primary flex-1 text-center text-sm py-2.5"
            >
              Find Similar PGs
            </Link>
            <Link to="/browse" className="btn-secondary text-sm py-2.5 px-4">
              Browse All
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default PGDetails;
