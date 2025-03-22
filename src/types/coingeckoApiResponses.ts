export interface CoinList {
  [key: string]: {
    id: string;
    symbol: string;
    name: string;
  };
}

export interface CryptoData {
  [key: string]: {
    usd: number;
    usd_market_cap: number;
    usd_24h_vol: number;
    usd_24h_change: number;
    last_updated_at: number;
  };
}

export interface MarketChart {
  prices: number[][];
  market_caps: number[][];
  total_volumes: number[][];
}