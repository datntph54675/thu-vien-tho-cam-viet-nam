import React, { useState } from 'react';
import { BROCADE_COLLECTIONS, BROCADE_PATTERNS } from '../data/brocadeData';
import { BrocadeCollection, BrocadePattern } from '../types/brocade';
import { Layers, ArrowRight } from 'lucide-react';
import { BrocadeGrid } from './BrocadeGrid';

interface CollectionsViewProps {
  onSelectPattern: (pattern: BrocadePattern) => void;
  onGoToFullLibrary: () => void;
}

export const CollectionsView: React.FC<CollectionsViewProps> = ({
  onSelectPattern,
  onGoToFullLibrary
}) => {
  const [selectedColId, setSelectedColId] = useState<string>('sap-ong-hmong');

  const activeCollection = BROCADE_COLLECTIONS.find(c => c.id === selectedColId) || BROCADE_COLLECTIONS[0];
  const collectionPatterns = BROCADE_PATTERNS.filter(p => p.collectionId === selectedColId);

  return (
    <div className="space-y-12 pb-16 text-left">
      
      {/* Top Banner (Nền Chàm Đậm #20252B) */}
      <section className="bg-[#20252B] text-[#F7F2E8] py-14 border-b border-[#15191D] relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 brocade-border-ribbon" />
        <div className="content-container relative space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#15191D] border border-[#D5A642]/30 text-caption-fine font-bold text-[#D5A642] uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>Phân loại di sản chuyên sâu</span>
          </div>
          <h1 className="text-page-title font-extrabold font-serif-culture text-[#F7F2E8]">
            Bộ Sưu Tập Hoa Văn Thổ Cẩm
          </h1>
          <p className="text-body-main text-[#E9DFCC] max-w-3xl leading-relaxed">
            Phân loại chuyên sâu theo kỹ nghệ dệt thoi, nghệ thuật vẽ sáp ong và phong cách kỷ hà của từng không gian văn hóa đặc sắc.
          </p>
        </div>
      </section>

      <div className="content-container space-y-12">
        {/* Collection Tab Selector Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {BROCADE_COLLECTIONS.map((col) => {
            const isSelected = col.id === selectedColId;
            return (
              <div
                key={col.id}
                onClick={() => setSelectedColId(col.id)}
                className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#783B32] text-[#F7F2E8] border-[#D5A642] shadow-md ring-2 ring-[#D5A642]'
                    : 'bg-[#FFFFFF] text-[#20252B] border-[#E9DFCC] hover:border-[#D5A642] hover:shadow-xs'
                }`}
              >
                <div className="space-y-2">
                  <span className={`text-[11px] font-bold uppercase tracking-wider block ${
                    isSelected ? 'text-[#D5A642]' : 'text-[#A83232]'
                  }`}>
                    {col.ethnicGroup}
                  </span>
                  <h3 className="font-bold text-base font-serif-culture leading-snug">
                    {col.title}
                  </h3>
                  <p className={`text-caption-fine line-clamp-2 ${isSelected ? 'text-[#F0DCA7]' : 'text-[#6F5544]'}`}>
                    {col.subtitle}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-black/10 flex items-center justify-between text-caption-fine">
                  <span className={isSelected ? 'text-[#F7F2E8]/80' : 'text-[#6F5544]'}>
                    {col.patternCount} mẫu hoa văn
                  </span>
                  <span className={`font-bold flex items-center gap-1 ${
                    isSelected ? 'text-[#D5A642]' : 'text-[#20252B]'
                  }`}>
                    <span>{isSelected ? 'Đang xem' : 'Chọn xem'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Collection Deep-Dive Showcase (Nền Chàm Đậm #20252B) */}
        <div className="bg-[#20252B] text-[#F7F2E8] rounded-3xl p-7 sm:p-10 border border-[#D5A642]/20 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2 text-caption-fine font-bold text-[#D5A642] uppercase tracking-wider">
                <span>{activeCollection.region}</span>
                <span>·</span>
                <span>{activeCollection.ethnicGroup}</span>
              </div>
              <h2 className="text-section-title font-bold font-serif-culture leading-tight text-[#F7F2E8]">
                {activeCollection.title}
              </h2>
              <p className="text-body-main text-[#E9DFCC] leading-relaxed">
                {activeCollection.description}
              </p>
              <div className="pt-2 text-body-sub text-[#E9DFCC] flex items-center gap-2">
                <span className="font-bold text-[#D5A642]">Kỹ thuật nổi bật:</span>
                <span className="italic">{activeCollection.highlightTechnique}</span>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-2xl overflow-hidden aspect-[4/3] border border-[#D5A642]/30 shadow-md bg-[#15191D]">
                <img
                  src={activeCollection.coverImage}
                  alt={activeCollection.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Patterns inside this collection */}
        <div className="space-y-8">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-[#E9DFCC] pb-4">
            <h3 className="text-xl sm:text-2xl font-bold font-serif-culture text-[#20252B]">
              Các Mẫu Hoa Văn Trong Bộ Sưu Tập Này ({collectionPatterns.length} mẫu)
            </h3>
            <button
              onClick={onGoToFullLibrary}
              className="text-caption-fine font-bold text-[#A83232] hover:text-[#783B32] flex items-center gap-1 cursor-pointer"
            >
              <span>Mở trong Thư viện lớn với bộ lọc</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <BrocadeGrid
            patterns={collectionPatterns}
            onSelectPattern={onSelectPattern}
            onResetFilters={() => setSelectedColId('sap-ong-hmong')}
            itemsPerPage={6}
          />
        </div>
      </div>

    </div>
  );
};
