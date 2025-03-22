import {create} from 'zustand';
import {CryptoData} from "@/types/coingeckoApiResponses";

interface CryptoState {
  cryptoData: CryptoData;

  isLoading: boolean;
  error: string | null;
  setCryptoData: (data: CryptoData) => void;

  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
}

/**
 * Zustand store for managing cryptocurrency data.
 *
 * @returns {CryptoState} The state and actions for managing cryptocurrency data,
 * including loading states and error handling.
 */
export const useCryptoStore = create<CryptoState>((set) => ({
  cryptoData: {},
  isLoading: false,
  error: null,
  setCryptoData: (data) => set({ cryptoData: data }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}))
