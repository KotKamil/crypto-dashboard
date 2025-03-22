import { useEffect } from 'react';
import { useCryptoStore } from '@/store/cryptoStore';
import { fetchCryptoData, fetchMarketChart } from '@/app/lib/coingeckoApi';

/**
 * Custom hook to fetch and manage cryptocurrency data and market chart data.
 *
 * This hook retrieves both cryptocurrency data and market chart data from the CoinGecko API
 * if they haven't been fetched yet. It handles loading states and error handling internally.
 * Market chart data is only fetched for the first cryptocurrency ID in the provided array.
 *
 * @param {string[]} ids - Array of cryptocurrency IDs to fetch data for.
 * @param {number} [chartPeriod=1] - Period for the market chart data in days.
 * @returns {object} An object containing:
 *   - cryptoData: Object containing cryptocurrency data
 *   - marketChart: Object containing price, market cap, and volume data over time
 *   - isLoading: Boolean indicating if data is currently being fetched
 *   - error: Error message string or null if no error occurred
 */
export const useCryptoData = (ids: string[], chartPeriod: number = 1) => {
  const { cryptoData, marketChart, isLoading, error, setCryptoData, setMarketChart, setLoading, setError } = useCryptoStore();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      if (Object.keys(cryptoData).length === 0) {
        try {
          const data = await fetchCryptoData(ids);
          setCryptoData(data);
        } catch (error: unknown) {
          setError(`Error fetching crypto data: ${error}`);
        }
      }

      if (Object.keys(marketChart).length === 0 && ids.length > 0) {
        try {
          const chartData = await fetchMarketChart(ids[0], 'usd', chartPeriod);
          setMarketChart(chartData);
        } catch (error: unknown) {
          setError(`Error fetching market chart data ${error}`);
        }
      }

      setLoading(false);
    };

    fetchData();
  }, [ids, chartPeriod, cryptoData, marketChart, setCryptoData, setMarketChart, setLoading, setError]);

  return { cryptoData, marketChart, isLoading, error };
};
