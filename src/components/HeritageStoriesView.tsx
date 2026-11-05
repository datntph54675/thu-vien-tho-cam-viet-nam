import React, { useState } from 'react';
import { HERITAGE_STORIES } from '../data/storiesData';
import { HeritageStory } from '../types/brocade';
import { 
  BookOpen, 
  Clock, 
  MapPin, 
  Quote, 
  ArrowRight, 
  X, 
  Share2, 
  Check
} from 'lucide-react';

interface HeritageStoriesViewProps {
  onSelectPatternById?: (patternId: string) => void;
  onExploreLibrary?: () => void;
}

export const HeritageStoriesView: React.FC<HeritageStoriesViewProps> = ({
  onSelectPatternById,
  onExploreLibrary
}) => {
  const [selectedStory, setSelectedStory] = useState<HeritageStory | null>(null);
  const [copied, setCopied] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleCopyQuote = (quote: string) => {
    navigator.clipboard.writeText(quote);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="py-12 text-left space-y-12">
      
      {/* Top Banner introducing Stories */}
      <section className="bg-[#20252B] text-[#F7F2E8] py-14 border-b border-[#15191D] relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 brocade-border-ribbon" />
        <div className="content-container relative space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#15191D] border border-[#D5A642]/30 text-caption-fine font-bold text-[#D5A642] uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Ký ức dân gian &amp; Di sản dệt truyền khẩu</span>
          </div>
          <h1 className="text-page-title font-extrabold font-serif-culture text-[#F7F2E8]">
            Câu Chuyện Di Sản Hoa Văn
          </h1>
          <p className="text-body-main text-[#E9DFCC] max-w-3xl leading-relaxed">
            Đằng sau mỗi đường chỉ thêu, nhát thoi dệt hay giọt sáp ong là những huyền thoại lập làng, triết lý nhân sinh và ký ức lịch sử được truyền giữ qua bàn tay của các nghệ nhân.
          </p>
        </div>
      </section>

      {/* Featured Story Cards Grid in content container */}
      <div className="content-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {HERITAGE_STORIES.map((story) => {
            const isError = imageErrors[story.id];

            return (
              <article
                key={story.id}
                className="group bg-[#FFFFFF] rounded-2xl border border-[#E9DFCC] hover:border-[#D5A642] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                {/* Story Image with Error Fallback */}
                <div 
                  onClick={() => setSelectedStory(story)}
                  className="relative aspect-[16/9] overflow-hidden bg-[#E9DFCC]/50 cursor-pointer"
                >
                  {!isError ? (
                    <img
                      src={story.heroImage}
                      alt={story.title}
                      onError={() => handleImageError(story.id)}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    /* SVG Coded Weaving Loom Fallback */
                    <div className="w-full h-full flex flex-col items-center justify-center bg-[#20252B] p-6 text-[#F7F2E8] relative overflow-hidden">
                      <svg
                        className="absolute inset-0 w-full h-full opacity-20"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 100 100"
                      >
                        <line x1="10" y1="20" x2="90" y2="20" stroke="#D5A642" strokeWidth="2" />
                        <line x1="10" y1="80" x2="90" y2="80" stroke="#D5A642" strokeWidth="2" />
                        <line x1="25" y1="10" x2="25" y2="90" stroke="#A83232" strokeWidth="2" />
                        <line x1="50" y1="10" x2="50" y2="90" stroke="#F7F2E8" strokeWidth="2" />
                        <line x1="75" y1="10" x2="75" y2="90" stroke="#A83232" strokeWidth="2" />
                        <polygon points="50,35 65,50 50,65 35,50" fill="none" stroke="#D5A642" strokeWidth="2" />
                      </svg>
                      <span className="text-xs font-bold text-[#D5A642] uppercase tracking-widest relative z-10 font-serif-culture">
                        {story.ethnicGroup}
                      </span>
                      <span className="text-caption-fine text-[#E9DFCC] relative z-10 text-center mt-1">
                        Hạt cườm chì &amp; Khung dệt Zèng Tà Ôi
                      </span>
                    </div>
                  )}

                  {/* Gradient bottom bar for tags */}
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#15191D]/80 to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[#F7F2E8] text-caption-fine">
                    <span className="font-bold text-[#D5A642] uppercase tracking-wider">
                      {story.ethnicGroup}
                    </span>
                    <span className="flex items-center gap-1 text-[#E9DFCC]">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{story.readTime}</span>
                    </span>
                  </div>
                </div>

                {/* Story Card Content */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-caption-fine text-[#6F5544]">
                      <MapPin className="w-3.5 h-3.5 text-[#A83232] shrink-0" />
                      <span>{story.region}</span>
                    </div>

                    <h2 
                      onClick={() => setSelectedStory(story)}
                      className="text-card-title font-bold text-[#20252B] font-serif-culture group-hover:text-[#A83232] transition-colors leading-snug cursor-pointer"
                    >
                      {story.title}
                    </h2>

                    <p className="text-caption-fine text-[#6F5544] italic">
                      {story.subtitle}
                    </p>

                    <p className="text-body-sub text-[#29251F]/80 line-clamp-3 leading-relaxed mt-2">
                      {story.excerpt}
                    </p>
                  </div>

                  {/* Quote pill */}
                  {story.folkSongOrQuote && (
                    <div className="bg-[#F7F2E8] border-l-4 border-[#A83232] p-3.5 rounded-r-xl text-caption-fine text-[#29251F] italic flex items-start gap-2">
                      <Quote className="w-4 h-4 text-[#A83232] shrink-0 mt-0.5" />
                      <span className="line-clamp-2 leading-relaxed">{story.folkSongOrQuote}</span>
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="pt-4 border-t border-[#E9DFCC] flex items-center justify-between">
                    <button
                      onClick={() => setSelectedStory(story)}
                      className="text-caption-fine font-bold text-[#20252B] hover:text-[#A83232] flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Đọc trọn vẹn câu chuyện</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    {story.relatedPatternId && onSelectPatternById && (
                      <button
                        onClick={() => onSelectPatternById(story.relatedPatternId!)}
                        className="text-caption-fine font-semibold text-[#A83232] hover:text-[#783B32] bg-[#A83232]/10 hover:bg-[#A83232]/20 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                      >
                        Xem hoa văn liên quan
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Reader Modal */}
      {selectedStory && (
        <div 
          className="fixed inset-0 z-50 bg-[#15191D]/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedStory(null)}
        >
          <div 
            className="relative bg-[#FFFFFF] w-full max-w-3xl max-h-[90vh] rounded-2xl shadow-2xl overflow-y-auto border border-[#E9DFCC] my-auto text-left flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Modal sticky bar */}
            <div className="sticky top-0 z-20 bg-[#F7F2E8]/95 backdrop-blur-md px-6 py-4 border-b border-[#E9DFCC] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#A83232]" />
                <span className="text-caption-fine font-bold text-[#20252B] uppercase tracking-wider">
                  Tư liệu ký sự di sản dệt
                </span>
              </div>
              <button
                onClick={() => setSelectedStory(null)}
                className="p-1.5 rounded-lg text-[#6F5544] hover:text-[#20252B] hover:bg-[#E9DFCC] transition-colors cursor-pointer"
                aria-label="Đóng"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal content */}
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-caption-fine text-[#6F5544] font-medium mb-1.5">
                  <span className="font-bold text-[#A83232] uppercase tracking-wider">
                    {selectedStory.ethnicGroup}
                  </span>
                  <span>·</span>
                  <span>{selectedStory.region}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#D5A642]" />
                    <span>{selectedStory.readTime}</span>
                  </span>
                </div>

                <h2 className="text-page-title font-bold text-[#20252B] font-serif-culture leading-tight">
                  {selectedStory.title}
                </h2>
                <p className="text-body-sub text-[#6F5544] italic mt-1">
                  {selectedStory.subtitle}
                </p>
              </div>

              {/* Hero Image */}
              <div className="rounded-xl overflow-hidden aspect-[16/9] border border-[#E9DFCC]">
                <img
                  src={selectedStory.heroImage}
                  alt={selectedStory.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Folk quote box */}
              {selectedStory.folkSongOrQuote && (
                <div className="bg-[#F7F2E8] border-l-4 border-[#A83232] p-4 rounded-r-xl relative text-[#29251F] text-body-sub italic space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2">
                      <Quote className="w-5 h-5 text-[#A83232] shrink-0 mt-0.5" />
                      <p>{selectedStory.folkSongOrQuote}</p>
                    </div>
                    <button
                      onClick={() => handleCopyQuote(selectedStory.folkSongOrQuote!)}
                      className="text-[#6F5544] hover:text-[#A83232] p-1 shrink-0 cursor-pointer"
                      title="Sao chép câu trích dẫn"
                    >
                      {copied ? <Check className="w-4 h-4 text-[#D5A642]" /> : <Share2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Article Paragraphs */}
              <div className="space-y-4 text-[#29251F] text-body-main leading-relaxed">
                {selectedStory.contentParagraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              {/* Key Insight */}
              <div className="bg-[#F7F2E8] border border-[#E9DFCC] rounded-xl p-5 space-y-2 text-caption-fine">
                <strong className="text-[#20252B] font-bold block text-sm font-serif-culture">
                  Thông điệp cốt lõi &amp; Giá trị nghệ thuật:
                </strong>
                <p className="text-[#29251F]/90 leading-relaxed text-body-sub">
                  {selectedStory.keyInsight}
                </p>
                <div className="pt-2 border-t border-[#E9DFCC] text-[#6F5544]">
                  <strong className="text-[#20252B]">Tầm vóc di sản:</strong> {selectedStory.culturalSignificance}
                </div>
              </div>

              {/* Academic References */}
              <div className="pt-4 border-t border-[#E9DFCC] text-caption-fine text-[#6F5544] space-y-1">
                <span className="font-bold text-[#20252B] block">Tài liệu tham khảo đối chứng:</span>
                <ul className="list-disc list-inside space-y-0.5">
                  {selectedStory.references.map((ref, idx) => (
                    <li key={idx} className="italic">{ref}</li>
                  ))}
                </ul>
              </div>

              {/* Modal footer */}
              <div className="pt-4 flex items-center justify-between flex-wrap gap-3">
                {selectedStory.relatedPatternId && onSelectPatternById ? (
                  <button
                    onClick={() => {
                      const id = selectedStory.relatedPatternId!;
                      setSelectedStory(null);
                      onSelectPatternById(id);
                    }}
                    className="px-5 py-2.5 bg-[#A83232] hover:bg-[#783B32] text-[#F7F2E8] rounded-xl text-caption-fine font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Mở hồ sơ hoa văn chi tiết</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#D5A642]" />
                  </button>
                ) : <div />}

                <button
                  onClick={() => setSelectedStory(null)}
                  className="px-6 py-2.5 bg-[#20252B] hover:bg-[#15191D] text-[#F7F2E8] rounded-xl text-caption-fine font-bold transition-colors cursor-pointer"
                >
                  Đóng bài viết
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
