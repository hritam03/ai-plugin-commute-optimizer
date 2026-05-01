import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiLocationMarker, HiCurrencyRupee, HiHome, HiCheckCircle, HiXCircle } from 'react-icons/hi';

const PGCard = ({ pg }) => {
  const navigate = useNavigate();

  return (
    <div
      className="card hover:scale-[1.02] cursor-pointer group"
      onClick={() => navigate(`/pg/${pg.id}`)}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && navigate(`/pg/${pg.id}`)}
    >
      {/* Room type badge */}
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-600 font-medium">
          {pg.roomType}
        </span>
        <span className={`flex items-center gap-1 text-xs font-medium ${pg.foodIncluded ? 'text-green-600' : 'text-gray-400'}`}>
          {pg.foodIncluded
            ? <><HiCheckCircle className="text-sm" /> Food incl.</>
            : <><HiXCircle className="text-sm" /> No food</>
          }
        </span>
      </div>

      {/* Name */}
      <h3 className="font-semibold text-gray-900 text-base mb-1 group-hover:text-black line-clamp-1">
        {pg.name}
      </h3>

      {/* Area */}
      <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
        <HiLocationMarker className="flex-shrink-0" />
        <span>{pg.area}</span>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
        <div className="flex items-center gap-1 text-gray-900 font-bold text-base">
          <HiCurrencyRupee />
          <span>{pg.rent.toLocaleString('en-IN')}<span className="text-xs font-normal text-gray-500">/mo</span></span>
        </div>
        <span className="text-xs text-gray-400 group-hover:text-black transition-colors">
          View details →
        </span>
      </div>
    </div>
  );
};

export default PGCard;
