import React from 'react';
import { BrocadeCollection } from '../types/brocade';
import { ArrowRight, Sparkles, MapPin } from 'lucide-react';

interface BrocadeCollectionsProps {
  collections: BrocadeCollection[];
  selectedCollectionId?: string;
  onSelectCollection: (collectionId: string) => void;
}

export const BrocadeCollections: React.FC<BrocadeCollectionsProps> = ({
  collections,
  selectedCollectionId,
  onSelectCollection
}) => {
  return (
    <section className="py-16 bg-[#783B32] text-[#F7F2E8] border-b border-[#20252B] relative overflow-hidden">
      {/* Subtle brocade geometric pattern overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full text-[#F0DCA7]" xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80">
          <path d="M0 40 L40 0 L80 40 L40 80 Z" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M20 40 L40 20 L60 40 L40 60 Z" fill="none" stroke="#D5A642" strokeWidth="1" />
        </svg>
      </div>

      <div className="content-container relative">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4 text-left">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#20252B]/60 border border-[#D5A642]/30 text-xs font-semibold text-[#D5A642] tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#D5A642]" />
              <span>Tuyển tập di sản chuyên đề</span>
            </div>
            <h2 className="text-section-title font-bold text-[#F7F2E8] font-serif-culture">
              Bộ Sưu Tập Hoa Văn Nổi Bật
            </h2>
            <p className="text-body-sub text-[#F0DCA7] max-w-2xl leading-relaxed">
              Khám phá các dòng hoa văn đặc sắc theo kỹ thuật dệt độc bản và từng không gian văn hóa đặc trưng. Nhấn vào bộ sưu tập để tự động lọc danh sách hoa văn tương ứng.
            </p>
          </div>

          {selectedCollectionId && (
            <button
              onClick={() => onSelectCollection('')}
              className="text-xs font-bold text-[#D5A642] hover:text-[#F0DCA7] underline underline-offset-4 shrink-0 transition-colors"
            >
              Xem tất cả bộ sưu tập (Bỏ chọn)
            </button>
          )}
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((col) => {
            const isSelected = selectedCollectionId === col.id;

            return (
              <div
                key={col.id}
                onClick={() => onSelectCollection(isSelected ? '' : col.id)}
                className={`group relative flex flex-col justify-between bg-[#20252B] rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer text-left ${
                  isSelected 
                    ? 'ring-2 ring-[#D5A642] border-[#D5A642] shadow-xl -translate-y-1' 
                    : 'border-[#D5A642]/20 hover:border-[#D5A642]/60 hover:shadow-lg hover:-translate-y-0.5'
                }`}
              >
                {/* Image Cover */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#15191D]">
                  <img
                    src={col.coverImage}
                    alt={col.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#20252B] via-[#20252B]/40 to-transparent" />
                  
                  {/* Badges on image */}
                  <div className="absolute bottom-3 left-3 right-3 text-[#F7F2E8]">
                    <span className="text-[11px] font-bold text-[#D5A642] uppercase tracking-wider block">
                      {col.ethnicGroup}
                    </span>
                    <span className="text-caption-fine text-[#E9DFCC] flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-[#D5A642] shrink-0" />
                      <span>{col.region}</span>
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="text-card-title font-bold text-[#F7F2E8] font-serif-culture group-hover:text-[#D5A642] transition-colors leading-snug">
                      {col.title}
                    </h3>
                    <p className="text-caption-fine text-[#F0DCA7] font-medium italic mt-1">
                      {col.subtitle}
                    </p>
                    <p className="text-body-sub text-[#E9DFCC]/90 line-clamp-2 mt-2 leading-relaxed">
                      {col.description}
                    </p>
                  </div>

                  {/* Footer of card */}
                  <div className="pt-3 border-t border-[#15191D] flex items-center justify-between text-caption-fine">
                    <span className="text-[#E9DFCC]/70 font-medium">
                      {col.patternCount} mẫu đại diện
                    </span>
                    <span className={`font-bold flex items-center gap-1 transition-colors ${
                      isSelected ? 'text-[#D5A642]' : 'text-[#F0DCA7] group-hover:text-[#D5A642]'
                    }`}>
                      <span>{isSelected ? 'Đang lọc' : 'Lọc theo nhóm'}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
