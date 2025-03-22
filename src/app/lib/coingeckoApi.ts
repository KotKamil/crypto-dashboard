import axios, {AxiosResponse} from "axios";
import {CoinList, CryptoData, MarketChart} from "@/types/coingeckoApiResponses";

const coingeckoApi = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
  timeout: 10000,
});

/**
 * Fetches a list of all coins available on CoinGecko
 * @returns {Promise<CoinList>}
 * */
export const fetchCoinList = async (): Promise<CoinList> => {
  try {
    const response: AxiosResponse<CoinList> = await coingeckoApi.get("/coins/list");
    return response.data;
  } catch (error) {
    console.error("Error fetching coin list:", error);
    throw error;
  }
};

/**
 * Fetches data for a list of cryptocurrencies
 * @param {string[]} ids - Array of cryptocurrency ids
 * @param {string} currency - Currency to convert to (default: 'usd')
 * @returns {Promise<CryptoData>}
 * */
export const fetchCryptoData= async (ids: string[], currency: string = 'usd'): Promise<CryptoData>  => {
  try {
    const response: AxiosResponse<CryptoData> = await coingeckoApi.get(`/simple/price?ids=${ids.join(',')}&vs_currencies=${currency}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    throw error;
  }
};

/**
 * Fetches market chart data for a cryptocurrency
 * @param {string} id - Cryptocurrency id
 * @param {string} currency - Currency to convert to (default: 'usd')
 * @param {number} days - Number of days to fetch data for (default: 1)
 * @returns {Promise<MarketChart>}
 * */
export const fetchMarketChart = async (id: string, currency: string = 'usd', days: number = 1): Promise<MarketChart> => {
  try {
    const response: AxiosResponse<MarketChart> = await coingeckoApi.get(`/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching market chart data:", error);
    throw error;
  }
};