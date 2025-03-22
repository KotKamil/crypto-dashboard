"use client";
import {useEffect, useRef} from 'react';
import { useCryptoStore } from '@/store/cryptoStore';
import { fetchCryptoData } from "@/api/coingeckoApi";

/**
 * Custom hook to fetch and manage cryptocurrency data.
 *
 * This hook retrieves detailed cryptocurrency data from the CoinGecko API for the specified
 * cryptocurrency IDs. It handles loading states and error handling internally.
 *
 * @param {string[]} ids - Array of cryptocurrency IDs to fetch data for
 * @returns {object} An object containing:
 *   - cryptoData: Object containing the fetched cryptocurrency data
 *   - isLoading: Boolean indicating if data is currently being fetched
 *   - error: Error message string or null if no error occurred
 */
export const useCryptoData = (ids: string[]) => {
  const { cryptoData, isLoading, setCryptoData, error, setLoading, setError } = useCryptoStore();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;

    const fetchData = async () => {
      setLoading(true);
      hasFetched.current = true;

      if (Object.keys(cryptoData).length === 0) {
        try {
          const data = await fetchCryptoData(ids);
          setCryptoData(data);
        } catch (error: unknown) {
          setError(`Error fetching crypto data: ${error}`);
        }
      }

      setLoading(false);
    };

    fetchData();
  }, [ids, cryptoData, setCryptoData, setLoading, setError]);

  return { cryptoData, isLoading, error };
};
