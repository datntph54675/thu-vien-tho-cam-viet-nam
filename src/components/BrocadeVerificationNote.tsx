import React from 'react';
import { BookOpen, ShieldCheck, FileCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export const BrocadeVerificationNote: React.FC = () => {
  return (
    <section id="ghi-chu-khao-cuu" className="my-12 bg-white rounded-2xl border border-[#E9DFCC] p-6 sm:p-8 shadow-xs text-left">
      <div className="flex items-center gap-2.5 text-caption-fine font-bold text-[#20252B] uppercase tracking-wider mb-3">
        <FileCheck className="w-4 h-4 text-emerald-700" />
        <span>Quy chuẩn Khảo cứu Tư liệu &amp; Minh bạch Dữ liệu Di sản</span>
      </div>

      <h3 className="text-section-title font-bold text-[#20252B] font-serif-culture mb-3">
        Nguyên tắc Khoa học trong Bảo tồn &amp; Tra cứu Thổ cẩm
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-body-sub text-[#6F5544] leading-relaxed mt-4">
        <div className="bg-[#F7F2E8] p-4 sm:p-5 rounded-xl border border-[#E9DFCC] space-y-2">
          <div className="flex items-center gap-2 font-bold text-[#20252B]">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Phân định dữ liệu khảo cứu</span>
          </div>
          <p className="text-caption-fine">
            Các bản ghi trong thư viện được đối chiếu với hồ sơ di sản phi vật thể quốc gia, sách chuyên khảo của Viện Dân tộc học và Bảo tàng Dân tộc học Việt Nam.
          </p>
        </div>

        <div className="bg-[#F7F2E8] p-4 sm:p-5 rounded-xl border border-[#E9DFCC] space-y-2">
          <div className="flex items-center gap-2 font-bold text-[#20252B]">
            <ShieldCheck className="w-4 h-4 text-[#D5A642] shrink-0" />
            <span>Tránh gán ghép tùy tiện</span>
          </div>
          <p className="text-caption-fine">
            Hệ thống tuyệt đối không tự ý suy diễn ý nghĩa tâm linh, thần bí hóa hoặc áp đặt ý nghĩa trừu tượng khi chưa có nguồn ghi chép dân tộc học được xác thực từ cộng đồng nắm giữ di sản.
          </p>
        </div>

        <div className="bg-[#F7F2E8] p-4 sm:p-5 rounded-xl border border-[#E9DFCC] space-y-2">
          <div className="flex items-center gap-2 font-bold text-[#20252B]">
            <BookOpen className="w-4 h-4 text-[#A83232] shrink-0" />
            <span>Tôn trọng nghệ nhân &amp; cộng đồng</span>
          </div>
          <p className="text-caption-fine">
            Mỗi hoa văn luôn ghi rõ dân tộc, nghệ nhân nắm giữ, địa danh cội nguồn và kỹ thuật dệt truyền thống, phục vụ mục đích nghiên cứu, giáo dục văn hóa phi thương mại.
          </p>
        </div>
      </div>

      <div className="pt-5 mt-6 border-t border-[#E9DFCC] flex items-center justify-between flex-wrap gap-3">
        <p className="text-caption-fine text-[#6F5544]">
          Danh mục gồm 12 nguồn tài liệu đối chứng đã qua thẩm định từ viện nghiên cứu, bảo tàng và văn bản pháp luật.
        </p>
        <a
          href="#tai-lieu-tham-khao"
          className="inline-flex items-center gap-1.5 text-caption-fine font-semibold text-[#A83232] hover:text-[#783B32] transition-colors"
        >
          <span>Xem trang Tài liệu tham khảo</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </section>
  );
};
