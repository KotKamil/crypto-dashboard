"use client";
import {useCoinListStore} from "@/store/coinListStore";
import {useEffect} from "react";
import {fetchCoinList} from "@/api/coingeckoApi";

/**
 * Custom hook to fetch and manage coin list data.
 *
 * This hook retrieves the coin list from the CoinGecko API if it hasn't been fetched yet.
 * It handles loading states and error handling internally.
 *
 * @returns {object} An object containing:
 *   - coinList: Object containing the list of available cryptocurrencies
 *   - isLoading: Boolean indicating if data is currently being fetched
 *   - error: Error message string or null if no error occurred
 */
export const useCoinList = () => {
  const { coinList, isLoading, error, setCoinList, setLoading, setError } = useCoinListStore();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      if (Object.keys(coinList).length === 0) {
        try {
          const data = await fetchCoinList();
          setCoinList(data);
        } catch (error: unknown) {
          setError(`Error fetching coin list data: ${error}`);
        }
      }

      setLoading(false);
    };

    fetchData();
  }, [coinList, setCoinList, setLoading, setError]);

  return { coinList, isLoading, error };
};
