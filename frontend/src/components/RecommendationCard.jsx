import React, { useState } from 'react';
import { HiLocationMarker, HiCurrencyRupee } from 'react-icons/hi';
import { MdDirectionsBike } from 'react-icons/md';
import { RECOMMENDATION_LABELS, COMMUTE_BURDEN_COLORS } from '../utils/constants.jsx';

const RecommendationCard = ({ rec, rank }) => {
  const [expanded, setExpanded] = useState(false);
  const isTop = rank === 0;

  const scoreColor =
    rec.score >= 75 ? 'bg-green-500' : rec.score >= 50 ? 'bg-yellow-500' : 'bg-red-400';

  const commuteBurdenColor = COMMUTE_BURDEN_COLORS[rec.commuteBurden] || 'text-gray-600';

  return (
    <div className={`card hover:scale-[1.02] relative flex flex-col gap-3 ${isTop ? 'ring-2 ring-black' : ''}`}>
      {/* Top Pick badge */}
      {isTop && (
        <div className="absolute -top-3 left-5">
          <span className="bg-black text-white text-xs px-2 py-1 rounded font-semibold">
            Top Pick ⭐
          </span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mt-1">
        <div>
          <h3 className="font-semibold text-gray-900 text-base leading-tight">{rec.name}</h3>
          <div className="flex items-center gap-1 text-gray-500 text-sm mt-0.5">
            <HiLocationMarker className="flex-shrink-0" />
            <span>{rec.area}</span>
          </div>
        </div>
        <div className="text-right flex-shrink-0 ml-2">
          <div className="flex items-center gap-0.5 text-gray-900 font-bold text-base">
            <HiCurrencyRupee />
            <span>{rec.rent.toLocaleString('en-IN')}</span>
          </div>
          <span className="text-xs text-gray-400">/month</span>
        </div>
      </div>

      {/* Score bar */}
      <div>
        <div className="flex justify-between text-xs mb-1">
          <span className="text-gray-500 font-medium">Match Score</span>
          <span className="font-bold text-gray-900">{rec.score}/100</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${scoreColor}`}
            style={{ width: `${rec.score}%` }}
          />
        </div>
      </div>

      {/* Stats row */}
      <div className="flex flex-wrap gap-3 text-sm">
        <div className="flex items-center gap-1 text-gray-600">
          <MdDirectionsBike className="text-base" />
          <span>{rec.distance?.toFixed(1)} km away</span>
        </div>
        <div className={`flex items-center gap-1 font-medium ${commuteBurdenColor}`}>
          <span>Commute:</span>
          <span>{rec.commuteBurden}</span>
        </div>
        <div className="text-gray-600">
          <span className="font-medium">Room:</span> {rec.roomType}
        </div>
      </div>

      {/* Insights */}
      <div className="bg-gray-50 rounded-xl p-3 space-y-1">
        {rec.budgetFit && (
          <p className="text-sm text-gray-700">• {rec.budgetFit}</p>
        )}
        {rec.trafficInsight && (
          <p className="text-sm text-gray-700">• {rec.trafficInsight}</p>
        )}
        {rec.lifestyleFit && (
          <p className="text-sm text-gray-700">• {rec.lifestyleFit}</p>
        )}
      </div>

      {/* Labels */}
      {rec.labels && rec.labels.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {rec.labels.map((label) => {
            const config = RECOMMENDATION_LABELS[label] || { text: label, className: 'bg-gray-100 text-gray-600' };
            return (
              <span
                key={label}
                className={`label-badge ${config.className}`}
              >
                {config.text}
              </span>
            );
          })}
        </div>
      )}

      {/* Recommendation Reason */}
      {rec.recommendationReason && (
        <div>
          <p className={`text-sm italic text-gray-600 mt-1 ${!expanded ? 'line-clamp-2' : ''}`}>
            "{rec.recommendationReason}"
          </p>
          {rec.recommendationReason.length > 100 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-xs text-gray-500 hover:text-black mt-1 transition-colors underline"
            >
              {expanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default RecommendationCard;
