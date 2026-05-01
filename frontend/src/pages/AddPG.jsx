import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { pgApi } from '../services/api.jsx';
import { AppContext } from '../context/AppContext.jsx';
import { ROOM_TYPES } from '../utils/constants.jsx';
import { HiPlus } from 'react-icons/hi';

const initialValues = {
  name: '',
  area: '',
  roomType: 'Shared',
  rent: '',
  foodIncluded: false,
  latitude: '',
  longitude: '',
};

const validate = (values) => {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Name is required';
  if (!values.area.trim()) errors.area = 'Area is required';
  if (!values.roomType) errors.roomType = 'Room type is required';
  if (!values.rent || isNaN(values.rent) || Number(values.rent) < 0)
    errors.rent = 'Valid rent amount is required';
  if (!values.latitude || isNaN(values.latitude))
    errors.latitude = 'Valid latitude is required (e.g. 12.9716)';
  if (!values.longitude || isNaN(values.longitude))
    errors.longitude = 'Valid longitude is required (e.g. 77.5946)';
  return errors;
};

const FieldError = ({ msg }) =>
  msg ? <p className="text-red-500 text-xs mt-1">{msg}</p> : null;

const AddPG = () => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const { showToast } = useContext(AppContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setTouched(
        Object.fromEntries(Object.keys(validationErrors).map((k) => [k, true]))
      );
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name: values.name.trim(),
        area: values.area.trim(),
        roomType: values.roomType,
        rent: Number(values.rent),
        foodIncluded: values.foodIncluded,
        latitude: Number(values.latitude),
        longitude: Number(values.longitude),
      };
      await pgApi.createPg(payload);
      showToast('PG listing created successfully!', 'success');
      navigate('/browse');
    } catch (err) {
      showToast(err.message || 'Failed to create PG. Please try again.', 'error');
      setErrors({ submit: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  const inputClass = (field) =>
    `input-field ${touched[field] && errors[field] ? 'border-red-400 focus:ring-red-300' : ''}`;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Add New PG</h1>
        <p className="text-sm text-gray-500 mt-1">List a paying guest accommodation in Bangalore</p>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              PG Name <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              type="text"
              placeholder="e.g. Comfort PG"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputClass('name')}
            />
            <FieldError msg={touched.name && errors.name} />
          </div>

          {/* Area */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Area <span className="text-red-500">*</span>
            </label>
            <input
              name="area"
              type="text"
              placeholder="e.g. Whitefield"
              value={values.area}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputClass('area')}
            />
            <FieldError msg={touched.area && errors.area} />
          </div>

          {/* Room Type + Rent */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Room Type <span className="text-red-500">*</span>
              </label>
              <select
                name="roomType"
                value={values.roomType}
                onChange={handleChange}
                onBlur={handleBlur}
                className={inputClass('roomType')}
              >
                {ROOM_TYPES.map((rt) => (
                  <option key={rt.value} value={rt.value}>{rt.label}</option>
                ))}
              </select>
              <FieldError msg={touched.roomType && errors.roomType} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Monthly Rent (₹) <span className="text-red-500">*</span>
              </label>
              <input
                name="rent"
                type="number"
                placeholder="e.g. 10000"
                value={values.rent}
                onChange={handleChange}
                onBlur={handleBlur}
                min={0}
                className={inputClass('rent')}
              />
              <FieldError msg={touched.rent && errors.rent} />
            </div>
          </div>

          {/* Food Included */}
          <div className="flex items-center gap-3">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="foodIncluded"
                checked={values.foodIncluded}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="w-10 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-black rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
            </label>
            <span className="text-sm font-medium text-gray-700">Food Included</span>
          </div>

          {/* Coordinates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Latitude <span className="text-red-500">*</span>
              </label>
              <input
                name="latitude"
                type="number"
                step="any"
                placeholder="e.g. 12.9716"
                value={values.latitude}
                onChange={handleChange}
                onBlur={handleBlur}
                className={inputClass('latitude')}
              />
              <FieldError msg={touched.latitude && errors.latitude} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Longitude <span className="text-red-500">*</span>
              </label>
              <input
                name="longitude"
                type="number"
                step="any"
                placeholder="e.g. 77.5946"
                value={values.longitude}
                onChange={handleChange}
                onBlur={handleBlur}
                className={inputClass('longitude')}
              />
              <FieldError msg={touched.longitude && errors.longitude} />
            </div>
          </div>

          <p className="text-xs text-gray-400 -mt-2">
            Tip: Find coordinates using{' '}
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">
              Google Maps
            </a>{' '}
            — right-click the location.
          </p>

          {/* Submit error */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-600">
              {errors.submit}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <HiPlus /> Create PG Listing
                </>
              )}
            </button>
            <button type="button" onClick={handleReset} className="btn-secondary">
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPG;
