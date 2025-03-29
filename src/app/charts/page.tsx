"use client"
import React, {useState, useMemo, useEffect} from 'react';
import { useCoinList } from "@/hooks/useCoinList";
import {useMarketChart} from "@/hooks/useMarketChart";
import { MultiSelect } from "@/components/MultiSelect";
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import {marketChart2Recharts} from "@/app/lib/formatChartData";

export default function ChartsPage() {
  const { coinList, isLoading, error } = useCoinList();
  const [selectedCoins, setSelectedCoins] = useState<string[]>([]);
  const [graphDays, setGraphDays] = useState<number>(7);
  const { marketCharts, addMultipleCharts } = useMarketChart(selectedCoins);

  const removeFromSelectedCoins = (coin: string) => {
    setSelectedCoins(selectedCoins.filter(c => c !== coin));
  };

  // Transform coinList into the format needed by MultiSelect
  const coinOptions = useMemo(() => {
    return Object.values(coinList).map(coin => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol
    }));
  }, [coinList]);

  useEffect(() => {
    console.log(marketChart2Recharts(marketCharts));
  }, [marketCharts]);


  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-6">
        Cryptocurrency Charts
      </h1>

      <div className="mb-6">
        <p className="mb-2 font-bold">
          Select cryptocurrencies:
        </p>
        <MultiSelect
          options={coinOptions}
          selectedValues={selectedCoins}
          onChange={setSelectedCoins}
          isLoading={isLoading}
          error={error}
          placeholder="Select cryptocurrencies..."
        />
      </div>

      {selectedCoins.length > 0 && (
        <div>
          <p className="mb-2 font-bold">
            Selected cryptocurrencies:
          </p>
          {selectedCoins.map((coin, index) => (
            <div className="mb-6 flex items-center" key={index}>
              <span className="font-bold mr-2">{coin}</span>
              <button onClick={() => removeFromSelectedCoins(coin)}
                      className="py-1 px-3 bg-red-600 rounded-md cursor-pointer">X
              </button>
            </div>
          ))}
        </div>
      )}

      <LineChart width={900} height={600} data={marketChart2Recharts(marketCharts)}>
        <CartesianGrid strokeDasharray="1 1" vertical={false}/>
        <XAxis dataKey="name"/>
        <YAxis/>
        <Tooltip/>
        <Legend/>
        {selectedCoins.map((coin, index) => (
        <Line key={index} type="monotone" dataKey={coin} stroke={`#${Math.floor(Math.random()*16777215).toString(16)}`}/>
        ))}
      </LineChart>

      <input type="number" value={graphDays} onChange={(e) => setGraphDays(Number(e.target.value))}/>
      <button onClick={() => addMultipleCharts(selectedCoins, graphDays)}
              className="py-2 px-4 bg-blue-600 text-white rounded-md ml-2">
        Add Charts
      </button>
    </div>
  );
}