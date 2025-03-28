import {MarketReChart, MarketRePage} from "@/types/recharts";
import {MarketChart} from "@/types/coingeckoApiResponses";

/**
 * Converts market chart data to a format suitable for Recharts.
 *
 * @param {MarketChart[]} marketCharts - The market chart data from the API.
 * @returns {MarketReChart} - The formatted data for Recharts.
 */
export const marketChart2Recharts = (marketCharts: MarketChart[]): MarketReChart => {
  const rechart: MarketReChart = [];

  //tmp
  const names = marketCharts.map((_, index) => index.toString());
  const chartSpan = marketCharts.reduce((minLength, chart) => {
    const length = chart.prices.length;
    return length < minLength ? length : minLength;
  }, Infinity);

  for (let i = 0; i < chartSpan; i++) {
    const marketRePage: MarketRePage = {name: i.toString()};
    marketCharts.forEach((marketChart, j) => {
      const priceArr = marketChart.prices[i];
      const price = priceArr.length ? priceArr[1] : 0;
      marketRePage[names[j]] = price;
    });

    rechart.push(marketRePage);
  }

  return rechart;
};