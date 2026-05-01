import { useState, useEffect } from 'react';

export const useFetch = (apiCall, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = () => {
    setLoading(true);
    setError(null);

    apiCall()
      .then((response) => {
        if (response.data?.success !== false) {
          setData(response.data);
        } else {
          setError(response.data.message);
        }
      })
      .catch((err) => {
        setError(err.message || 'Something went wrong');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    execute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return { data, loading, error, refetch: execute };
};
