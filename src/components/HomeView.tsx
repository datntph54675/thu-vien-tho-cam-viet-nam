import React, { useState } from 'react';
import { BrocadeBanner } from './BrocadeBanner';
import { BrocadeCollections } from './BrocadeCollections';
import { BROCADE_PATTERNS, BROCADE_COLLECTIONS } from '../data/brocadeData';
import { HERITAGE_STORIES } from '../data/storiesData';
import { BrocadePattern } from '../types/brocade';
import { 
  ArrowRight, 
  Sparkles, 
  Eye, 
  BookOpen, 
  MapPin, 
  Clock 
} from 'lucide-react';
import { BrocadeVerificationNote } from './BrocadeVerificationNote';

interface HomeViewProps {
  onGoToLibrary: (collectionId?: string) => void;
  onGoToStories: () => void;
  onGoToAbout: () => void;
  onSelectPattern: (pattern: BrocadePattern) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onGoToLibrary,
  onGoToStories,
  onSelectPattern
}) => {
  // 6 spotlight patterns for quick showcase on homepage
  const spotlightPatterns = BROCADE_PATTERNS.slice(0, 6);
  // 2 spotlight stories
  const spotlightStories = HERITAGE_STORIES.slice(0, 2);

  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImgError = (id: string) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div className="space-y-16 pb-16">
      
      {/* Banner giới thiệu chính (Phần A - Nền Chàm Đậm #20252B) */}
      <BrocadeBanner
        onExploreClick={() => onGoToLibrary()}
        totalPatterns={BROCADE_PATTERNS.length}
        totalEthnicGroups={10}
      />

      {/* 4 Bộ sưu tập nổi bật (Phần E - Nền Đỏ Đất #783B32) */}
      <div id="bo-suu-tap-section">
        <BrocadeCollections
          collections={BROCADE_COLLECTIONS}
          onSelectCollection={(colId) => onGoToLibrary(colId)}
        />
      </div>

      {/* Spotlight Patterns Section (Nền Trắng Ngà #F7F2E8, Thẻ #FFFFFF) */}
      <section className="content-container text-left">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#A83232]/10 text-xs font-bold text-[#A83232] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#D5A642]" />
              <span>Tuyển tập hoa văn đại diện</span>
            </div>
            <h2 className="text-section-title font-bold text-[#20252B] font-serif-culture">
              Hoa Văn Tiêu Biểu Trong Thư Viện
            </h2>
            <p className="text-body-sub text-[#6F5544] max-w-2xl leading-relaxed">
              Các mẫu hoa văn kinh điển đại diện cho phong cách dệt thoi, vẽ sáp ong và thêu luồn sợi của đồng bào các dân tộc Việt Nam.
            </p>
          </div>

          <button
            onClick={() => onGoToLibrary()}
            className="inline-flex items-center gap-2 text-caption-fine font-bold text-[#A83232] hover:text-[#783B32] bg-[#A83232]/10 hover:bg-[#A83232]/20 px-4 py-2.5 rounded-xl border border-[#A83232]/30 transition-colors shrink-0 cursor-pointer"
          >
            <span>Xem toàn bộ {BROCADE_PATTERNS.length} mẫu hoa văn</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 6 Grid items (3 cols desktop, 2 cols tablet, 1 col mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {spotlightPatterns.map((pattern) => (
            <div
              key={pattern.id}
              className="group bg-[#FFFFFF] rounded-2xl border border-[#E9DFCC] hover:border-[#D5A642] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div 
                onClick={() => onSelectPattern(pattern)}
                className="relative aspect-[4/3] bg-[#E9DFCC]/40 overflow-hidden cursor-pointer"
              >
                {!imageErrors[pattern.id] ? (
                  <img
                    src={pattern.imageUrl}
                    alt={pattern.name}
                    onError={() => handleImgError(pattern.id)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-[#20252B] p-4 text-[#F7F2E8]">
                    <span className="text-xs font-bold text-[#D5A642] uppercase font-serif-culture">
                      {pattern.ethnicGroup}
                    </span>
                    <span className="text-caption-fine text-[#E9DFCC] mt-1">{pattern.name}</span>
                  </div>
                )}
                
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#20252B]/70 to-transparent pointer-events-none" />
                
                <div className="absolute bottom-3 left-3 right-3 text-[#F7F2E8]">
                  <span className="text-[11px] font-bold text-[#D5A642] uppercase tracking-wider block">
                    {pattern.ethnicGroup}
                  </span>
                  <span className="text-caption-fine text-[#E9DFCC] flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#A83232]" />
                    <span>{pattern.locality}</span>
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-1.5 text-caption-fine text-[#6F5544] mb-1.5">
                    <span>{pattern.region}</span>
                    <span>·</span>
                    <span>{pattern.category}</span>
                  </div>
                  <h3 
                    onClick={() => onSelectPattern(pattern)}
                    className="text-card-title font-bold text-[#20252B] font-serif-culture group-hover:text-[#A83232] transition-colors cursor-pointer leading-snug"
                  >
                    {pattern.name}
                  </h3>
                  <p className="text-body-sub text-[#29251F]/80 line-clamp-2 mt-2 leading-relaxed">
                    {pattern.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E9DFCC] flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {pattern.colorCodes.slice(0, 3).map((code, idx) => (
                      <span
                        key={idx}
                        className="w-2.5 h-2.5 rounded-full border border-black/10"
                        style={{ backgroundColor: code }}
                        title={pattern.dominantColors[idx] || 'Màu sắc'}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => onSelectPattern(pattern)}
                    className="text-caption-fine font-bold text-[#20252B] hover:text-[#A83232] inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Chi tiết</span>
                    <Eye className="w-3.5 h-3.5 text-[#D5A642]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Heritage Stories Teaser Section (Nền Vải Lanh #E9DFCC) */}
      <section className="bg-[#E9DFCC] py-16 border-y border-[#6F5544]/20">
        <div className="content-container text-left space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#20252B] text-xs font-bold text-[#D5A642] uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5 text-[#D5A642]" />
                <span>Ký ức dân gian</span>
              </div>
              <h2 className="text-section-title font-bold text-[#20252B] font-serif-culture">
                Câu Chuyện Di Sản &amp; Nghệ Thuật Dệt
              </h2>
              <p className="text-body-sub text-[#6F5544] max-w-2xl leading-relaxed">
                Những ký sự và huyền thoại sống động gắn liền với nguồn gốc hoa văn và kỹ nghệ dệt tay của các đồng bào.
              </p>
            </div>

            <button
              onClick={onGoToStories}
              className="inline-flex items-center gap-1.5 text-caption-fine font-bold text-[#20252B] hover:text-[#A83232] transition-colors shrink-0 cursor-pointer"
            >
              <span>Xem tất cả câu chuyện di sản</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {spotlightStories.map((story) => (
              <div
                key={story.id}
                onClick={onGoToStories}
                className="bg-[#FFFFFF] rounded-2xl border border-[#E9DFCC] hover:border-[#D5A642] p-6 sm:p-7 flex flex-col justify-between transition-all cursor-pointer group shadow-xs hover:shadow-md"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-caption-fine text-[#6F5544]">
                    <span className="font-bold text-[#A83232] uppercase">{story.ethnicGroup}</span>
                    <span className="flex items-center gap-1 text-[#6F5544]">
                      <Clock className="w-3.5 h-3.5 text-[#D5A642]" />
                      <span>{story.readTime}</span>
                    </span>
                  </div>
                  <h3 className="text-card-title font-bold text-[#20252B] font-serif-culture group-hover:text-[#A83232] transition-colors leading-snug">
                    {story.title}
                  </h3>
                  <p className="text-body-sub text-[#29251F]/80 line-clamp-3 leading-relaxed">
                    {story.excerpt}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#E9DFCC] flex items-center justify-between text-caption-fine">
                  <span className="text-[#6F5544]">{story.region}</span>
                  <span className="font-bold text-[#20252B] group-hover:text-[#A83232] flex items-center gap-1">
                    <span>Đọc bài viết</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Verification Note */}
      <div className="content-container">
        <BrocadeVerificationNote />
      </div>

    </div>
  );
};
