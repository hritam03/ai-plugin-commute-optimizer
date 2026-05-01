import React, { useState, useContext } from 'react';
import { pgApi } from '../services/api.jsx';
import { AppContext } from '../context/AppContext.jsx';
import { OFFICE_LOCATIONS } from '../utils/constants.jsx';
import RecommendationCard from '../components/RecommendationCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { HiSparkles, HiRefresh } from 'react-icons/hi';

const Recommendations = () => {
  const [form, setForm] = useState({
    officeLocation: '',
    preferredArea: '',
    budget: '',
  });
  const [errors, setErrors] = useState({});
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const { showToast } = useContext(AppContext);

  const validate = () => {
    const e = {};
    if (!form.officeLocation) e.officeLocation = 'Please select an office location';
    if (!form.budget || isNaN(form.budget) || Number(form.budget) <= 0)
      e.budget = 'Please enter a valid budget amount';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setApiError(null);
    setResults(null);

    try {
      const response = await pgApi.getRecommendations(
        form.officeLocation,
        form.preferredArea,
        Number(form.budget)
      );
      const data = Array.isArray(response.data) ? response.data : [];
      const sorted = [...data].sort((a, b) => b.score - a.score);
      setResults(sorted);
      if (sorted.length === 0) {
        showToast('No recommendations found for your criteria.', 'info');
      }
    } catch (err) {
      setApiError(err.message || 'Failed to get recommendations');
      showToast('Failed to fetch recommendations.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field) =>
    `input-field ${errors[field] ? 'border-red-400 focus:ring-red-300' : ''}`;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Smart Recommendations</h1>
        <p className="text-sm text-gray-500 mt-1">
          Get AI-powered PG suggestions scored by commute, budget, and lifestyle
        </p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 mb-8">
        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            {/* Office Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Office Location <span className="text-red-500">*</span>
              </label>
              <select
                name="officeLocation"
                value={form.officeLocation}
                onChange={handleChange}
                className={inputClass('officeLocation')}
              >
                <option value="">Select office...</option>
                {OFFICE_LOCATIONS.map((loc) => (
                  <option key={loc.value} value={loc.value}>{loc.label}</option>
                ))}
              </select>
              {errors.officeLocation && (
                <p className="text-red-500 text-xs mt-1">{errors.officeLocation}</p>
              )}
            </div>

            {/* Preferred Area */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Area <span className="text-gray-400 text-xs">(optional)</span>
              </label>
              <input
                name="preferredArea"
                type="text"
                placeholder="e.g. Koramangala"
                value={form.preferredArea}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            {/* Budget */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Monthly Budget (₹) <span className="text-red-500">*</span>
              </label>
              <input
                name="budget"
                type="number"
                placeholder="e.g. 15000"
                value={form.budget}
                onChange={handleChange}
                min={0}
                className={inputClass('budget')}
              />
              {errors.budget && (
                <p className="text-red-500 text-xs mt-1">{errors.budget}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center gap-2 py-2.5 disabled:opacity-60"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <HiSparkles /> Get Recommendations
              </>
            )}
          </button>
        </form>
      </div>

      {/* Loading */}
      {loading && <LoadingSpinner message="Analyzing PGs for you..." />}

      {/* Error */}
      {apiError && !loading && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
          <p className="text-red-600 font-medium mb-3">{apiError}</p>
          <button onClick={handleSubmit} className="btn-primary flex items-center gap-2 mx-auto">
            <HiRefresh /> Retry
          </button>
        </div>
      )}

      {/* Results */}
      {!loading && results !== null && results.length === 0 && (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-gray-500 font-medium">No PGs found within your budget for this office location.</p>
          <p className="text-sm text-gray-400 mt-1">Try increasing your budget or changing the office location.</p>
        </div>
      )}

      {!loading && results && results.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-800">
              {results.length} Recommendation{results.length !== 1 ? 's' : ''} Found
            </h2>
            <span className="text-xs text-gray-400">Sorted by match score</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((rec, idx) => (
              <RecommendationCard key={rec.id} rec={rec} rank={idx} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Recommendations;
