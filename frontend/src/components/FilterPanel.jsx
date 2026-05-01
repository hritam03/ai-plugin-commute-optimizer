import React, { useState } from 'react';
import { HiSearch, HiAdjustments } from 'react-icons/hi';

const FilterPanel = ({ onApply }) => {
  const [area, setArea] = useState('');
  const [maxRent, setMaxRent] = useState('');

  const handleApply = () => {
    onApply({ area: area.trim(), maxRent: maxRent ? Number(maxRent) : null });
  };

  const handleClear = () => {
    setArea('');
    setMaxRent('');
    onApply({ area: '', maxRent: null });
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <HiAdjustments className="text-gray-500" />
        <span className="font-semibold text-gray-800 text-sm">Filters</span>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1 font-medium">Area</label>
          <input
            type="text"
            placeholder="e.g. Whitefield"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="input-field"
            onKeyPress={(e) => e.key === 'Enter' && handleApply()}
          />
        </div>
        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1 font-medium">Max Rent (₹)</label>
          <input
            type="number"
            placeholder="e.g. 15000"
            value={maxRent}
            onChange={(e) => setMaxRent(e.target.value)}
            className="input-field"
            onKeyPress={(e) => e.key === 'Enter' && handleApply()}
            min={0}
          />
        </div>
        <div className="flex items-end gap-2">
          <button onClick={handleApply} className="btn-primary flex items-center gap-2 whitespace-nowrap">
            <HiSearch className="text-sm" /> Apply
          </button>
          <button onClick={handleClear} className="btn-secondary whitespace-nowrap">
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
