"use client";
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { FixedSizeList as List } from 'react-window';

interface MultiSelectProps {
  options: { id: string; name: string; symbol?: string }[];
  selectedValues: string[];
  onChange: (selectedIds: string[]) => void;
  isLoading?: boolean;
  error?: string | null;
  placeholder?: string;
  height?: number;
  itemHeight?: number;
}

/**
 * A virtualized multi-select dropdown component for selecting multiple items from large lists.
 *
 * Features:
 * - Handles large datasets (17,000+ items) efficiently with virtualized rendering
 * - Search functionality to filter items by name or symbol
 * - Multi-selection with checkboxes
 * - Selected items state management
 * - Loading and error states
 *
 * @param {Object} props - Component props
 * @param {Array<{id: string, name: string, symbol?: string}>} props.options - Array of selectable items
 * @param {string[]} props.selectedValues - Array of currently selected item IDs
 * @param {Function} props.onChange - Callback function that receives updated array of selected IDs
 * @param {boolean} [props.isLoading=false] - Whether the component is in loading state
 * @param {string|null} [props.error=null] - Error message to display, if any
 * @param {string} [props.placeholder="Select items..."] - Placeholder text when no items are selected
 * @param {number} [props.height=300] - Height of the dropdown list in pixels
 * @param {number} [props.itemHeight=35] - Height of each item in the list in pixels
 *
 * @returns {JSX.Element} The MultiSelect component
 *
 * @example
 * <MultiSelect
 *   options={coinOptions}
 *   selectedValues={selectedCoins}
 *   onChange={setSelectedCoins}
 *   isLoading={isLoading}
 *   error={error}
 *   placeholder="Select cryptocurrencies..."
 * />
 */
export const MultiSelect = ({options, selectedValues, onChange, isLoading = false, error = null, placeholder = "Select items...", height = 300, itemHeight = 35,}: MultiSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter options based on search query
  const filteredOptions = useMemo(() => {
    if (!searchQuery.trim()) return options;

    const lowerCaseQuery = searchQuery.toLowerCase();
    return options.filter(option =>
      option.name.toLowerCase().includes(lowerCaseQuery) ||
      (option.symbol && option.symbol.toLowerCase().includes(lowerCaseQuery))
    );
  }, [options, searchQuery]);

  // Handle selection toggle
  const toggleSelection = (id: string) => {
    const newSelection = selectedValues.includes(id)
      ? selectedValues.filter(val => val !== id)
      : [...selectedValues, id];

    onChange(newSelection);
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Render each item in the virtualized list
  const ItemRenderer = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const option = filteredOptions[index];
    if (!option) return null;

    return (
      <div
        style={style}
        className={`px-3 py-2 cursor-pointer ${selectedValues.includes(option.id) ? 'bg-blue-500' : 'hover:bg-gray-700'}`}
        onClick={() => toggleSelection(option.id)}
      >
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={selectedValues.includes(option.id)}
            onChange={() => toggleSelection(option.id)}
            className="mr-2"
          />
          <span>
            {option.name} {option.symbol ? `(${option.symbol})` : ''}
          </span>
        </label>
      </div>
    );
  };

  return (
    <div ref={dropdownRef} className="relative w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading || !!error}
        className={`w-full px-3 py-2 text-left border border-gray-300 rounded bg-gray-600 mb-2 flex justify-between items-center ${isLoading || !!error ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
      >
        <span>
          {selectedValues.length > 0
            ? `${selectedValues.length} item${selectedValues.length > 1 ? 's' : ''} selected`
            : placeholder}
        </span>
        <span className="ml-2">▼</span>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full max-h-[350px] bg-gray-600 border border-gray-300 rounded shadow-md overflow-hidden">
          <div className="p-2">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-2 py-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-[100px]">
              <div className="w-6 h-6 border-3 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <div className="p-4 text-red-500">{error}</div>
          ) : filteredOptions.length === 0 ? (
            <div className="p-4">No results found</div>
          ) : (
            <List
              height={height}
              itemCount={filteredOptions.length}
              itemSize={itemHeight}
              width="100%"
            >
              {ItemRenderer}
            </List>
          )}

          <div className="flex justify-between p-2 border-t border-gray-300">
            <button
              onClick={() => onChange([])}
              className="px-3 py-1.5 border border-gray-300 rounded bg-gray-600 hover:bg-gray-50"
            >
              Clear All
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="px-3 py-1.5 border border-blue-600 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};