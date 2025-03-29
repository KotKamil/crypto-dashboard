import {MarketReChart, MarketRePage} from "@/types/recharts";
import {MarketChart} from "@/types/coingeckoApiResponses";

/**
 * Converts market chart data to a format suitable for Recharts.
 *
 * @param {Record<string, MarketChart>} marketCharts - The market chart data from the API keyed by coin ID.
 * @returns {MarketReChart} - The formatted data for Recharts.
 */
export const marketChart2Recharts = (marketCharts: Record<string, MarketChart>): MarketReChart => {
  const rechart: MarketReChart = [];
  const coinIds = Object.keys(marketCharts);

  if (coinIds.length === 0) {
    return rechart;
  }

  // Find the minimum length across all chart data
  const chartSpan = coinIds.reduce((minLength, coinId) => {
    const length = marketCharts[coinId].prices.length || 0;
    return length < minLength ? length : minLength;
  }, Infinity);

  if (chartSpan === Infinity || chartSpan === 0) {
    return [];
  }

  for (let i = 0; i < chartSpan; i++) {
    // Name of the page is the index
    const marketRePage: MarketRePage = {name: i.toString()};

    coinIds.forEach((coinId) => {
      if(marketCharts[coinId]?.prices?.[i]) {
        const priceArr = marketCharts[coinId].prices[i];
        marketRePage[coinId] = priceArr.length >= 2 ? priceArr[1] : 0;
      }
    });

    rechart.push(marketRePage);
  }

  return rechart;
};