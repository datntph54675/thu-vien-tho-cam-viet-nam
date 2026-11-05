import React from 'react';
import { ArrowDown, BookOpen, CheckCircle2 } from 'lucide-react';

interface BrocadeBannerProps {
  onExploreClick: () => void;
  totalPatterns: number;
  totalEthnicGroups: number;
}

export const BrocadeBanner: React.FC<BrocadeBannerProps> = ({
  onExploreClick,
  totalPatterns,
  totalEthnicGroups
}) => {
  return (
    <section className="relative overflow-hidden bg-[#20252B] text-[#F7F2E8] py-16 sm:py-24 border-b border-[#15191D]">
      {/* Symmetrical Brocade SVG Geometric Motifs in background */}
      <div className="absolute inset-0 pointer-events-none opacity-10 flex justify-between">
        {/* Left Brocade Diamond Border Column */}
        <svg className="h-full w-28 text-[#D5A642]" viewBox="0 0 100 800" fill="currentColor">
          <pattern id="brocade-left" width="100" height="100" patternUnits="userSpaceOnUse">
            <polygon points="50,10 90,50 50,90 10,50" fill="none" stroke="currentColor" strokeWidth="3" />
            <polygon points="50,25 75,50 50,75 25,50" fill="none" stroke="#A83232" strokeWidth="2" />
            <circle cx="50" cy="50" r="4" fill="currentColor" />
            <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          </pattern>
          <rect width="100" height="800" fill="url(#brocade-left)" />
        </svg>

        {/* Right Brocade Diamond Border Column */}
        <svg className="h-full w-28 text-[#D5A642] transform rotate-180" viewBox="0 0 100 800" fill="currentColor">
          <use href="#brocade-left" />
        </svg>
      </div>

      {/* Decorative center ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#A83232]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="content-container relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Main Copy (Phần A) */}
          <div className="lg:col-span-8 space-y-6 text-left">
            {/* Header Kicker */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#15191D] border border-[#D5A642]/30 text-xs font-semibold text-[#D5A642] tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-[#D5A642] animate-pulse" />
              <span>Dự án Di sản Số hóa Dệt Thổ cẩm Việt Nam</span>
            </div>

            {/* Title with standardized text-hero size */}
            <h1 className="text-hero font-extrabold tracking-tight text-[#F7F2E8] font-serif-culture">
              Thư viện Hoa văn <br className="hidden sm:inline" />
              <span className="text-[#D5A642]">Thổ cẩm Việt Nam</span>
            </h1>

            {/* Description */}
            <p className="text-body-main text-[#E9DFCC] font-normal max-w-2xl">
              Khám phá vẻ đẹp, câu chuyện và giá trị văn hóa được lưu giữ trong từng đường nét thổ cẩm truyền thống qua bàn tay khéo léo của các dân tộc Việt Nam.
            </p>

            {/* Sub-note on educational & preservation purpose */}
            <p className="text-body-sub text-[#E9DFCC]/80 leading-relaxed max-w-2xl border-l-2 border-[#A83232] pl-3.5 italic">
              Không gian số hóa phục vụ tìm hiểu văn hóa, nghiên cứu mỹ thuật dân gian, giáo dục truyền thống và bảo tồn di sản dệt thủ công trước nguy cơ mai một.
            </p>

            {/* Action buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreClick}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#D5A642] hover:bg-[#F0DCA7] text-[#15191D] font-bold text-sm rounded-xl shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>Khám phá thư viện</span>
                <ArrowDown className="w-4 h-4 animate-bounce text-[#783B32]" />
              </button>

              <a
                href="#ghi-chu-khao-cuu"
                onClick={(e) => {
                  const el = document.getElementById('ghi-chu-khao-cuu');
                  if (el) {
                    e.preventDefault();
                    el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="inline-flex items-center gap-2 px-5 py-3.5 bg-[#15191D] hover:bg-[#15191D]/80 text-[#F7F2E8] text-sm font-medium rounded-xl border border-[#D5A642]/30 transition-colors"
              >
                <BookOpen className="w-4 h-4 text-[#D5A642]" />
                <span>Phương pháp khảo cứu tư liệu</span>
              </a>
            </div>
          </div>

          {/* Quick Metrics / Cultural Card */}
          <div className="lg:col-span-4">
            <div className="bg-[#15191D] rounded-2xl p-6 sm:p-7 border border-[#D5A642]/20 shadow-xl space-y-5 text-left">
              <div className="flex items-center justify-between border-b border-[#20252B] pb-3">
                <span className="text-caption-fine font-semibold text-[#D5A642] uppercase tracking-wider">
                  Tổng quan dữ liệu số hóa
                </span>
                <span className="text-caption-fine text-[#E9DFCC]/60 font-mono">Phiên bản 2026</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#20252B] p-4 rounded-xl border border-[#D5A642]/15">
                  <span className="text-3xl font-bold text-[#F7F2E8] font-serif-culture">
                    {totalPatterns}+
                  </span>
                  <span className="block text-caption-fine text-[#E9DFCC]/80 mt-1 font-medium">
                    Mẫu hoa văn tra cứu
                  </span>
                </div>

                <div className="bg-[#20252B] p-4 rounded-xl border border-[#D5A642]/15">
                  <span className="text-3xl font-bold text-[#D5A642] font-serif-culture">
                    {totalEthnicGroups}+
                  </span>
                  <span className="block text-caption-fine text-[#E9DFCC]/80 mt-1 font-medium">
                    Dân tộc &amp; Cộng đồng
                  </span>
                </div>

                <div className="bg-[#20252B] p-4 rounded-xl border border-[#D5A642]/15">
                  <span className="text-3xl font-bold text-[#F0DCA7] font-serif-culture">
                    5
                  </span>
                  <span className="block text-caption-fine text-[#E9DFCC]/80 mt-1 font-medium">
                    Vùng văn hóa lớn
                  </span>
                </div>

                <div className="bg-[#20252B] p-4 rounded-xl border border-[#D5A642]/15">
                  <span className="text-3xl font-bold text-[#A83232] font-serif-culture">
                    100%
                  </span>
                  <span className="block text-caption-fine text-[#E9DFCC]/80 mt-1 font-medium">
                    Nguồn tư liệu đối chứng
                  </span>
                </div>
              </div>

              <div className="pt-2 text-caption-fine text-[#E9DFCC]/80 flex items-start gap-2 border-t border-[#20252B]">
                <CheckCircle2 className="w-4 h-4 text-[#D5A642] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Dữ liệu được kiểm chứng qua các hồ sơ di sản phi vật thể quốc gia và sách nghiên cứu của viện bảo tàng chuyên ngành.
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
