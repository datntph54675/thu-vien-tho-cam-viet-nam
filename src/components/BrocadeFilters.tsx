import React from 'react';
import { Search, X, RotateCcw, ArrowUpDown } from 'lucide-react';
import { 
  ETHNIC_GROUPS, 
  REGIONS, 
  CATEGORIES, 
  COLOR_FILTERS 
} from '../data/brocadeData';

interface BrocadeFiltersProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  selectedEthnic: string;
  onEthnicChange: (val: string) => void;
  selectedRegion: string;
  onRegionChange: (val: string) => void;
  selectedCategory: string;
  onCategoryChange: (val: string) => void;
  selectedColor: string;
  onColorChange: (val: string) => void;
  sortBy: 'name-asc' | 'name-desc' | 'date-newest';
  onSortChange: (val: 'name-asc' | 'name-desc' | 'date-newest') => void;
  onResetFilters: () => void;
  totalResults: number;
  totalAll: number;
  hasActiveFilters: boolean;
}

export const BrocadeFilters: React.FC<BrocadeFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedEthnic,
  onEthnicChange,
  selectedRegion,
  onRegionChange,
  selectedCategory,
  onCategoryChange,
  selectedColor,
  onColorChange,
  sortBy,
  onSortChange,
  onResetFilters,
  totalResults,
  totalAll,
  hasActiveFilters
}) => {
  return (
    <div id="bo-loc-hoa-van" className="bg-[#FFFFFF] rounded-2xl border border-[#E9DFCC] shadow-xs p-6 sm:p-7 mb-10 text-left">
      
      {/* Top row: Search input & Sorting */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between pb-6 border-b border-[#E9DFCC]/80">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#6F5544]">
            <Search className="w-4 h-4 text-[#A83232]" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm kiếm theo tên hoa văn, ý nghĩa, dân tộc, chất liệu, kỹ thuật..."
            className="w-full pl-11 pr-10 py-3 text-body-sub bg-[#F7F2E8] border border-[#E9DFCC] rounded-xl text-[#29251F] placeholder-[#6F5544]/70 focus:outline-none focus:ring-2 focus:ring-[#A83232] focus:bg-[#FFFFFF] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#6F5544] hover:text-[#A83232]"
              title="Xóa từ khóa tìm kiếm"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort by dropdown */}
        <div className="flex items-center gap-2.5 shrink-0">
          <label htmlFor="sort-select" className="text-caption-fine font-bold text-[#20252B] flex items-center gap-1.5 uppercase tracking-wider">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#D5A642]" />
            <span>Sắp xếp:</span>
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as any)}
            className="text-caption-fine font-semibold bg-[#F7F2E8] border border-[#E9DFCC] rounded-lg px-3.5 py-2.5 text-[#20252B] focus:outline-none focus:ring-2 focus:ring-[#A83232] cursor-pointer"
          >
            <option value="name-asc">Tên hoa văn (A → Z)</option>
            <option value="name-desc">Tên hoa văn (Z → A)</option>
            <option value="date-newest">Tư liệu mới cập nhật</option>
          </select>
        </div>
      </div>

      {/* Middle row: Multi-criteria Filters with generous spacing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-6 pb-5">
        
        {/* Ethnic Group filter */}
        <div>
          <label className="block text-caption-fine font-bold text-[#20252B] mb-2 uppercase tracking-wider">
            Dân tộc / Cộng đồng
          </label>
          <select
            value={selectedEthnic}
            onChange={(e) => onEthnicChange(e.target.value)}
            className="w-full text-caption-fine font-medium bg-[#F7F2E8] border border-[#E9DFCC] rounded-lg px-3.5 py-2.5 text-[#20252B] focus:outline-none focus:ring-2 focus:ring-[#A83232] transition-colors"
          >
            {ETHNIC_GROUPS.map((item) => (
              <option key={item} value={item}>
                {item === 'Tất cả' ? 'Tất cả dân tộc' : item}
              </option>
            ))}
          </select>
        </div>

        {/* Region filter */}
        <div>
          <label className="block text-caption-fine font-bold text-[#20252B] mb-2 uppercase tracking-wider">
            Vùng miền văn hóa
          </label>
          <select
            value={selectedRegion}
            onChange={(e) => onRegionChange(e.target.value)}
            className="w-full text-caption-fine font-medium bg-[#F7F2E8] border border-[#E9DFCC] rounded-lg px-3.5 py-2.5 text-[#20252B] focus:outline-none focus:ring-2 focus:ring-[#A83232] transition-colors"
          >
            {REGIONS.map((item) => (
              <option key={item} value={item}>
                {item === 'Tất cả' ? 'Tất cả các vùng' : item}
              </option>
            ))}
          </select>
        </div>

        {/* Category filter */}
        <div>
          <label className="block text-caption-fine font-bold text-[#20252B] mb-2 uppercase tracking-wider">
            Chủ đề hoa văn
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full text-caption-fine font-medium bg-[#F7F2E8] border border-[#E9DFCC] rounded-lg px-3.5 py-2.5 text-[#20252B] focus:outline-none focus:ring-2 focus:ring-[#A83232] transition-colors"
          >
            {CATEGORIES.map((item) => (
              <option key={item} value={item}>
                {item === 'Tất cả' ? 'Tất cả chủ đề' : item}
              </option>
            ))}
          </select>
        </div>

        {/* Dominant Color filter */}
        <div>
          <label className="block text-caption-fine font-bold text-[#20252B] mb-2 uppercase tracking-wider">
            Màu sắc chủ đạo
          </label>
          <select
            value={selectedColor}
            onChange={(e) => onColorChange(e.target.value)}
            className="w-full text-caption-fine font-medium bg-[#F7F2E8] border border-[#E9DFCC] rounded-lg px-3.5 py-2.5 text-[#20252B] focus:outline-none focus:ring-2 focus:ring-[#A83232] transition-colors"
          >
            {COLOR_FILTERS.map((item) => (
              <option key={item.label} value={item.label}>
                {item.label === 'Tất cả' ? 'Tất cả màu sắc' : item.label}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Visual quick color swatch bar */}
      <div className="pt-3 pb-2 border-t border-[#E9DFCC]/80 flex flex-wrap items-center gap-2">
        <span className="text-caption-fine text-[#6F5544] font-semibold mr-1">
          Lọc nhanh màu:
        </span>
        {COLOR_FILTERS.map((col) => {
          const isActive = selectedColor === col.label;
          return (
            <button
              key={col.label}
              onClick={() => onColorChange(isActive ? 'Tất cả' : col.label)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-caption-fine font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#20252B] text-[#F7F2E8] shadow-sm ring-1 ring-[#D5A642]'
                  : 'bg-[#F7F2E8] text-[#29251F] hover:bg-[#E9DFCC] border border-[#E9DFCC]'
              }`}
            >
              {col.color !== 'transparent' && (
                <span 
                  className="w-2.5 h-2.5 rounded-full border border-black/10 shrink-0" 
                  style={{ backgroundColor: col.color }}
                />
              )}
              <span>{col.label}</span>
            </button>
          );
        })}
      </div>

      {/* Bottom status row: Results count & Reset button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-5 border-t border-[#E9DFCC]/80 mt-3 text-caption-fine">
        <div className="flex items-center gap-2 text-[#29251F] font-medium">
          <span>
            Hiển thị <strong className="text-[#A83232] font-bold text-sm">{totalResults}</strong> / {totalAll} hoa văn thổ cẩm phù hợp
          </span>
          {hasActiveFilters && (
            <span className="text-[#6F5544] italic">· Đang áp dụng bộ lọc</span>
          )}
        </div>

        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-caption-fine font-bold text-[#A83232] hover:text-[#783B32] bg-[#A83232]/10 hover:bg-[#A83232]/20 rounded-lg border border-[#A83232]/30 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Xóa tất cả bộ lọc</span>
          </button>
        )}
      </div>

    </div>
  );
};
