import React from "react";

interface ProductSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  resultsCount: number;
}

const ProductSearch: React.FC<ProductSearchProps> = ({
  searchQuery,
  onSearchChange,
  resultsCount,
}) => {
  return (
    <>
      {/* Search Input Section */}
      <div className="px-6 py-4 border-b border-base-300">
        <label className="input w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </label>
      </div>

      {/* Header Row with Title and Results Count */}
      <div className="px-6 pt-4 pb-2 flex justify-between items-center">
        <h3 className="text-lg font-semibold">Product Catalog</h3>
        <div className="text-sm text-base-content/60">
          Showing {resultsCount} results
        </div>
      </div>
    </>
  );
};

export default ProductSearch;
