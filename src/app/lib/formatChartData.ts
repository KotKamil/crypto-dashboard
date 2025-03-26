import {MarketReChart} from "@/types/recharts";
import {MarketChart} from "@/types/coingeckoApiResponses";

export const marketChart2Recharts = (marketChart: MarketChart): MarketReChart => {
  return marketChart.prices.map((priceArr, index) => {
    return { name: index.toString(), value: priceArr.length ? priceArr[1] : 0 }
  });
};