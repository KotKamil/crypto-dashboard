"use client"
import React, { useState, useMemo } from 'react';
import { useCoinList } from "@/hooks/useCoinList";
import { MultiSelect } from "@/components/MultiSelect";

export default function ChartsPage() {
  const { coinList, isLoading, error } = useCoinList();
  const [selectedCoins, setSelectedCoins] = useState<string[]>([]);

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
              <button onClick={() => removeFromSelectedCoins(coin)} className="py-1 px-3 bg-red-600 rounded-md cursor-pointer">X</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}