"use client";
import {useEffect, useRef} from 'react';
import { useMarketChartStore } from '@/store/marketChartStore'

/**
 * Custom hook to fetch and manage market chart data.
 *
 * This hook retrieves market chart data from the CoinGecko API for the specified
 * cryptocurrency ID and time period. It handles loading states and error handling internally.
 *
 * @param {string[]} ids - Array of cryptocurrency IDs to fetch data for
 * @param {number} [chartPeriod=1] - Time period in days for the chart data
 * @returns {object} An object containing:
 *   - marketCharts: Record of coinId to MarketChart data
 *   - isLoading: Boolean indicating if data is currently being fetched
 *   - error: Error message string or null if no error occurred
 *   - addMarketChart: Function to fetch a single coin's chart
 *   - addMultipleCharts: Function to fetch multiple coins' charts
 */
export const useMarketChart = (ids: string[], chartPeriod: number = 1) => {
  const marketCharts = useMarketChartStore(state => state.marketCharts);
  const isLoading = useMarketChartStore(state => state.isLoading);
  const setLoading = useMarketChartStore(state => state.setLoading);
  const error = useMarketChartStore(state => state.error);
  const fetchMarketChart = useMarketChartStore(state => state.fetchMarketChart);
  const fetchMultipleMarketCharts = useMarketChartStore(state => state.fetchMultipleMarketCharts);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;

    const initialFetchData = async () => {
      setLoading(true);
      hasFetched.current = true;

      if (ids.length > 0) {
        await fetchMultipleMarketCharts(ids, chartPeriod);
      }

      setLoading(false);
    };

    initialFetchData();
  }, [ids, setLoading, chartPeriod, fetchMultipleMarketCharts]);

  const addMarketChart = async (coinId: string, chartPeriod: number) => {
    await fetchMarketChart(coinId, chartPeriod);
  }

  const addMultipleCharts = async (coinIds: string[], chartPeriod: number) => {
    await fetchMultipleMarketCharts(coinIds, chartPeriod);
  }

  return { marketCharts, isLoading, error, addMarketChart, addMultipleCharts };
};
