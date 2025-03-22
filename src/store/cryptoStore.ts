import {create} from 'zustand';
import {CryptoData, MarketChart} from "@/types/coingeckoApiResponses";

interface CryptoState {
  cryptoData: CryptoData;
  marketChart: MarketChart;

  isLoading: boolean;
  error: string | null;
  setCryptoData: (data: CryptoData) => void;
  setMarketChart: (data: MarketChart) => void;

  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
}

/**
 * Zustand store for managing cryptocurrency data.
 *
 * @returns {CryptoState} The state and actions for managing cryptocurrency data.
 */
export const useCryptoStore = create<CryptoState>((set) => ({
  cryptoData: {},
  marketChart: {prices: [], market_caps: [], total_volumes: []},
  isLoading: false,
  error: null,
  setCryptoData: (data) => set({ cryptoData: data }),
  setMarketChart: (data) => set({ marketChart: data }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}))
