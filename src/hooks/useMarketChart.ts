"use client";
import {useEffect, useRef} from 'react';
import { useMarketChartStore } from '@/store/marketChartStore'
import { fetchMarketChart } from '@/api/coingeckoApi';

/**
 * Custom hook to fetch and manage market chart data.
 *
 * This hook retrieves market chart data from the CoinGecko API for the specified
 * cryptocurrency ID and time period. It handles loading states and error handling internally.
 *
 * @param {string[]} ids - Array of cryptocurrency IDs to fetch data for (currently only uses the first ID)
 * @param {number} [chartPeriod=1] - Time period in days for the chart data
 * @returns {object} An object containing:
 *   - marketChart: Object with prices, market caps, and total volumes data arrays
 *   - isLoading: Boolean indicating if data is currently being fetched
 *   - error: Error message string or null if no error occurred
 */
export const useMarketChart = (ids: string[], chartPeriod: number = 1) => {
  const { marketChart, isLoading, error, setMarketChart, setLoading, setError } = useMarketChartStore();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;

    const fetchData = async () => {
      setLoading(true);
      hasFetched.current = true;

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
  }, [ids, chartPeriod, marketChart, setMarketChart, setLoading, setError]);

  return { marketChart, isLoading, error };
};
