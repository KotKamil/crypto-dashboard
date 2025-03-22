import {create} from 'zustand';
import {MarketChart} from "@/types/coingeckoApiResponses";

interface MarketState {
  marketChart: MarketChart;

  isLoading: boolean;
  error: string | null;
  setMarketChart: (data: MarketChart) => void;

  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
}

/**
 * Zustand store for managing market chart data.
 *
 * @returns {MarketState} The state and actions for managing market chart data including
 * prices, market caps, and total volumes over time.
 */
export const useMarketChartStore = create<MarketState>((set) => ({
  marketChart: {prices: [], market_caps: [], total_volumes: []},
  isLoading: false,
  error: null,
  setMarketChart: (data) => set({ marketChart: data }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}))
