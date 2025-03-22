import {CoinList} from "@/types/coingeckoApiResponses";
import {create} from "zustand/index";

interface CoinListState {
  coinList: CoinList;

  isLoading: boolean;
  error: string | null;
  setCoinList: (data: CoinList) => void;

  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
}

/**
 * Zustand store for coin list data.
 *
 * @returns {CoinListState} The state and actions for managing cryptocurrency data.
 */
export const useCoinListStore = create<CoinListState>((set) => ({
  coinList: {},
  isLoading: false,
  error: null,
  setCoinList: (data) => set({ coinList: data }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}))
