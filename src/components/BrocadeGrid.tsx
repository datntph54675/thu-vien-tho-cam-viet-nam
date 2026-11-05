import React, { useState } from 'react';
import { BrocadePattern } from '../types/brocade';
import { Eye, MapPin, AlertCircle, ChevronDown, CheckCircle2 } from 'lucide-react';

interface BrocadeGridProps {
  patterns: BrocadePattern[];
  onSelectPattern: (pattern: BrocadePattern) => void;
  onResetFilters: () => void;
  itemsPerPage?: number;
}

export const BrocadeGrid: React.FC<BrocadeGridProps> = ({
  patterns,
  onSelectPattern,
  onResetFilters,
  itemsPerPage = 9
}) => {
  const [visibleCount, setVisibleCount] = useState<number>(itemsPerPage);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  const visiblePatterns = patterns.slice(0, visibleCount);
  const hasMore = visibleCount < patterns.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + itemsPerPage);
  };

  // Empty state when search or filters return 0 results
  if (patterns.length === 0) {
    return (
      <div className="bg-[#FFFFFF] rounded-2xl border border-[#E9DFCC] p-12 text-center max-w-xl mx-auto my-12 shadow-sm text-left">
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#E9DFCC]/50 flex items-center justify-center text-[#A83232]">
          <AlertCircle className="w-7 h-7 text-[#A83232]" />
        </div>
        <h3 className="text-xl font-bold text-[#20252B] font-serif-culture text-center mb-2">
          Không tìm thấy hoa văn phù hợp
        </h3>
        <p className="text-body-sub text-[#6F5544] text-center mb-6 leading-relaxed">
          Không có mẫu hoa văn nào khớp với các tiêu chí tìm kiếm hoặc bộ lọc hiện tại của bạn. Bạn hãy thử mở rộng phạm vi tra cứu hoặc đặt lại bộ lọc.
        </p>
        <div className="text-center">
          <button
            onClick={onResetFilters}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#20252B] hover:bg-[#A83232] text-[#F7F2E8] text-caption-fine font-bold rounded-xl shadow-sm transition-all cursor-pointer"
          >
            <span>Đặt lại toàn bộ bộ lọc</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Grid of Cards (3 cols desktop, 2 cols tablet, 1 col mobile) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {visiblePatterns.map((pattern) => {
          const isImgError = imageErrors[pattern.id];

          return (
            <div
              key={pattern.id}
              className="group bg-[#FFFFFF] rounded-2xl border border-[#E9DFCC] hover:border-[#D5A642] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden text-left"
            >
              {/* Image Preview Container */}
              <div 
                onClick={() => onSelectPattern(pattern)}
                className="relative aspect-[4/3] bg-[#E9DFCC]/40 overflow-hidden cursor-pointer"
              >
                {!isImgError ? (
                  <img
                    src={pattern.imageUrl}
                    alt={`Hoa văn ${pattern.name} của người ${pattern.ethnicGroup}`}
                    onError={() => handleImageError(pattern.id)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  /* Fallback SVG Textile Pattern */
                  <div className="w-full h-full flex flex-col items-center justify-center bg-[#20252B] p-6 text-[#F7F2E8] relative overflow-hidden">
                    <svg
                      className="absolute inset-0 w-full h-full opacity-25"
                      xmlns="http://www.w3.org/2000/svg"
                      width="60"
                      height="60"
                      viewBox="0 0 60 60"
                    >
                      <path
                        d="M30 0 L60 30 L30 60 L0 30 Z"
                        fill="none"
                        stroke="#A83232"
                        strokeWidth="2"
                      />
                      <path
                        d="M30 15 L45 30 L30 45 L15 30 Z"
                        fill="none"
                        stroke="#D5A642"
                        strokeWidth="1.5"
                      />
                    </svg>
                    <span className="text-xs font-bold text-[#D5A642] uppercase tracking-widest relative z-10 font-serif-culture">
                      {pattern.ethnicGroup}
                    </span>
                    <span className="text-caption-fine text-[#E9DFCC] relative z-10 text-center mt-1">
                      {pattern.name}
                    </span>
                  </div>
                )}

                {/* Subtle vignette on bottom for text legibility */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#20252B]/70 to-transparent pointer-events-none" />

                {/* Overlay Status & Swatches */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[#F7F2E8] text-[11px]">
                  {pattern.isVerified ? (
                    <span className="inline-flex items-center gap-1 bg-[#20252B]/90 px-2.5 py-1 rounded-md text-[#D5A642] font-bold border border-[#D5A642]/30 shadow-xs">
                      <CheckCircle2 className="w-3 h-3 text-[#D5A642]" />
                      <span>Đã đối chứng học thuật</span>
                    </span>
                  ) : (
                    <span className="bg-[#20252B]/80 px-2 py-0.5 rounded text-[#E9DFCC]">
                      Dữ liệu mẫu
                    </span>
                  )}

                  {/* Swatches dots */}
                  <div className="flex items-center gap-1.5 bg-[#20252B]/90 px-2.5 py-1 rounded-md border border-[#D5A642]/30 shadow-xs">
                    {pattern.colorCodes.slice(0, 3).map((code, idx) => (
                      <span
                        key={idx}
                        className="w-2.5 h-2.5 rounded-full border border-white/20"
                        style={{ backgroundColor: code }}
                        title={pattern.dominantColors[idx] || 'Màu sắc'}
                      />
                    ))}
                  </div>
                </div>

                {/* Quick view button on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-[#20252B]/20">
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#20252B] text-[#F7F2E8] text-caption-fine font-bold rounded-lg shadow-md border border-[#D5A642]/40">
                    <Eye className="w-3.5 h-3.5 text-[#D5A642]" />
                    <span>Xem hồ sơ chi tiết</span>
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  {/* Clean unboxed metadata with typographic separators (anti-slop) */}
                  <div className="flex items-center gap-1.5 text-caption-fine text-[#6F5544] font-medium mb-2 flex-wrap">
                    <span className="font-bold text-[#A83232] uppercase tracking-wider text-[11px]">
                      {pattern.ethnicGroup}
                    </span>
                    <span aria-hidden="true" className="text-[#E9DFCC]">·</span>
                    <span>{pattern.region}</span>
                    <span aria-hidden="true" className="text-[#E9DFCC]">·</span>
                    <span>{pattern.category}</span>
                  </div>

                  {/* Pattern Name */}
                  <h3 
                    onClick={() => onSelectPattern(pattern)}
                    className="text-card-title font-bold text-[#20252B] font-serif-culture group-hover:text-[#A83232] transition-colors leading-snug cursor-pointer"
                  >
                    {pattern.name}
                  </h3>

                  {pattern.nativeName && (
                    <p className="text-caption-fine text-[#6F5544] italic mt-0.5">
                      Tên bản địa: {pattern.nativeName}
                    </p>
                  )}

                  {/* Description snippet */}
                  <p className="text-body-sub text-[#29251F]/80 line-clamp-2 mt-2 leading-relaxed">
                    {pattern.description}
                  </p>
                </div>

                {/* Card Footer with uniform height */}
                <div className="pt-4 border-t border-[#E9DFCC] flex items-center justify-between text-caption-fine">
                  <div className="text-[#6F5544] flex items-center gap-1 truncate max-w-[170px]" title={pattern.locality}>
                    <MapPin className="w-3.5 h-3.5 text-[#A83232] shrink-0" />
                    <span className="truncate">{pattern.locality}</span>
                  </div>

                  <button
                    onClick={() => onSelectPattern(pattern)}
                    className="px-3.5 py-1.5 bg-[#20252B] hover:bg-[#A83232] text-[#F7F2E8] font-bold rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <span>Xem chi tiết</span>
                    <Eye className="w-3.5 h-3.5 text-[#D5A642]" />
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Pagination / Load More button */}
      {hasMore && (
        <div className="text-center pt-6">
          <button
            onClick={handleLoadMore}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#FFFFFF] hover:bg-[#F7F2E8] text-[#20252B] hover:text-[#A83232] text-caption-fine font-bold rounded-xl border border-[#E9DFCC] hover:border-[#A83232] shadow-xs transition-all cursor-pointer"
          >
            <span>Tải thêm hoa văn ({patterns.length - visibleCount} mẫu còn lại)</span>
            <ChevronDown className="w-4 h-4 text-[#A83232]" />
          </button>
        </div>
      )}
    </div>
  );
};
