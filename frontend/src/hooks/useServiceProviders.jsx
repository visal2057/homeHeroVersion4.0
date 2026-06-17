import { useState, useEffect } from 'react';
import { API_BASE } from '../config/api';

const useServiceProviders = (category) => {
  const [providers, setProviders] = useState([]);
  const [loadingProviders, setLoadingProviders] = useState(true);
  const [providerError, setProviderError] = useState(null);

  useEffect(() => {
    if (!category) return;

    const controller = new AbortController();
    const fetchProviders = async () => {
      setLoadingProviders(true);
      setProviderError(null);
      try {
        const baseUrl = (API_BASE || 'http://localhost:5000').replace(/\/$/, '');
        const url = `${baseUrl}/api/service-providers?category=${encodeURIComponent(category)}`;
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
          console.error('Provider fetch failed:', url, response.status, response.statusText);
          throw new Error(`Failed to load providers: ${response.status}`);
        }
        const data = await response.json();
        setProviders(data);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Provider fetch error:', error);
          setProviderError('Unable to load service providers right now.');
        }
      } finally {
        setLoadingProviders(false);
      }
    };

    fetchProviders();
    return () => controller.abort();
  }, [category]);

  return { providers, loadingProviders, providerError };
};

export default useServiceProviders;
