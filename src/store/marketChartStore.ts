import {create} from 'zustand';
import {MarketChart} from "@/types/coingeckoApiResponses";
import {fetchMarketChart} from "@/api/coingeckoApi";

interface MarketState {
  marketCharts: Record<string, MarketChart>;
  isLoading: boolean;
  error: string | null;

  addMarketChart: (coindId: string, data: MarketChart) => void;
  removeMarketChart: (coinId: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;

  fetchMarketChart: (coinId: string, days: number) => Promise<void>;
  fetchMultipleMarketCharts: (coinIds: string[], days: number) => Promise<void>;
  clearAllCharts: () => void;
}

/**
 * Zustand store for managing market chart data.
 *
 * @returns {MarketState} The state and actions for managing market chart data including
 * prices, market caps, and total volumes over time.
 */
export const useMarketChartStore = create<MarketState>((set, get) => ({
  marketCharts: {},
  isLoading: false,
  error: null,

  addMarketChart: (coinId, data) => set(state => ({
    marketCharts: { ...state.marketCharts, [coinId]: data }
  })),

  removeMarketChart: (coinId) => set(state => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [coinId]: _, ...rest } = state.marketCharts;
    return { marketCharts: rest };
  }),

  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  fetchMarketChart: async (coinId, days) => {
    set({ isLoading: true, error: null });

    try {
      const chartData = await fetchMarketChart(coinId, 'usd', days);
      get().addMarketChart(coinId, chartData);
    } catch (error: unknown) {
      set({ error: `Error fetching chart data for ${coinId}: ${error}` });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchMultipleMarketCharts: async (coinIds, days) => {
    set({ isLoading: true, error: null });

    try {
      const promises = coinIds.map(id => fetchMarketChart(id, 'usd', days));
      const results = await Promise.all(promises);

      const newMarketCharts = coinIds.reduce((acc, coinId, index) => {
        acc[coinId] = results[index];
        return acc;
      }, {} as Record<string, MarketChart>);

      set({ marketCharts: newMarketCharts });
    } catch (error: unknown) {
      set({ error: `Error fetching multiple chart data: ${error}` });
    } finally {
      set({ isLoading: false });
    }
  },

  clearAllCharts: () => set({ marketCharts: {} })
}))
