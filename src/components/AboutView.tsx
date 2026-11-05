import React from 'react';
import { 
  ShieldCheck, 
  BookOpen, 
  Sparkles, 
  Heart,
  ArrowRight
} from 'lucide-react';

interface AboutViewProps {
  onExploreLibrary: () => void;
  onGoToReferences?: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ 
  onExploreLibrary,
  onGoToReferences
}) => {
  return (
    <div className="content-container py-12 text-left space-y-12">
      
      {/* Hero Intro (Dark Zone: Chàm đậm + Đỏ son + Vàng nghệ) */}
      <section className="bg-[#20252B] text-[#F7F2E8] rounded-3xl p-8 sm:p-12 border border-[#783B32]/30 shadow-md relative overflow-hidden">
        <div className="brocade-border-ribbon absolute top-0 inset-x-0" />
        
        <div className="max-w-3xl space-y-5 pt-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#15191D] text-[#D5A642] rounded-lg text-caption-fine font-semibold border border-[#D5A642]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#D5A642]" />
            <span>Sứ Mệnh Số Hóa Di Sản Văn Hóa Dân Gian</span>
          </div>

          <h1 className="text-hero font-bold font-serif-culture text-white leading-tight">
            Thư Viện Hoa Văn Thổ Cẩm Việt Nam
          </h1>

          <p className="text-[#E9DFCC] text-body-main leading-relaxed">
            Hệ thống dữ liệu số hóa độc lập phục vụ công tác nghiên cứu, giáo dục nghệ thuật, bảo tồn di sản dệt thủ công truyền thống và tôn vinh bàn tay tài hoa của các nghệ nhân dân tộc thiểu số Việt Nam.
          </p>

          <div className="pt-3">
            <button
              onClick={onExploreLibrary}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#A83232] hover:bg-[#783B32] text-white text-body-sub font-semibold rounded-xl shadow-md transition-all cursor-pointer"
            >
              <span>Tra cứu thư viện ngay</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 3 Core Pillars (Light Zone: White cards on linen/ngà) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E9DFCC] shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-xl bg-[#A83232]/10 text-[#A83232] flex items-center justify-center font-bold">
            <BookOpen className="w-6 h-6" />
          </div>
          <h2 className="text-card-title font-bold text-[#20252B] font-serif-culture">
            Bảo Tồn Ký Ức Văn Hóa
          </h2>
          <p className="text-body-sub text-[#6F5544] leading-relaxed">
            Lưu trữ có hệ thống từng cấu trúc hoa văn, kỹ thuật dệt thoi, vẽ sáp ong và thêu đếm sợi đang đứng trước nguy cơ mai một trong thời đại công nghiệp hóa.
          </p>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E9DFCC] shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-xl bg-[#D5A642]/15 text-[#D5A642] flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-card-title font-bold text-[#20252B] font-serif-culture">
            Liêm Chính Học Thuật
          </h2>
          <p className="text-body-sub text-[#6F5544] leading-relaxed">
            Tuyệt đối không tự ý suy diễn ý nghĩa tâm linh phong thủy hoặc áp đặt biểu tượng khi chưa có tư liệu nghiên cứu đối chứng từ các viện bảo tàng chuyên ngành.
          </p>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E9DFCC] shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <Heart className="w-6 h-6" />
          </div>
          <h2 className="text-card-title font-bold text-[#20252B] font-serif-culture">
            Tôn Trọng Cộng Đồng
          </h2>
          <p className="text-body-sub text-[#6F5544] leading-relaxed">
            Ghi nhận chính xác nghệ nhân nắm giữ, xuất xứ cộng đồng bản địa và điều kiện sử dụng phi thương mại, tôn trọng tri thức bản địa theo công ước di sản UNESCO.
          </p>
        </div>
      </section>

      {/* Methodology and Sources */}
      <section className="bg-white rounded-2xl p-6 sm:p-10 border border-[#E9DFCC] shadow-xs space-y-6">
        <div>
          <h2 className="text-section-title font-bold text-[#20252B] font-serif-culture">
            Phương Pháp Thu Thập &amp; Nguồn Tư Liệu Khảo Cứu
          </h2>
          <p className="text-body-sub text-[#6F5544] mt-1.5 max-w-2xl leading-relaxed">
            Dữ liệu hoa văn trong thư viện được tổng hợp từ các cuộc điền dã dân tộc học, hồ sơ Di sản văn hóa phi vật thể Quốc gia và các công trình nghiên cứu mỹ thuật dân gian uy tín:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-body-sub text-[#29251F]">
          <div className="bg-[#F7F2E8] p-4 sm:p-5 rounded-xl border border-[#E9DFCC] space-y-1.5">
            <strong className="text-[#20252B] block font-semibold">
              Bảo tàng Dân tộc học Việt Nam &amp; Viện Dân tộc học
            </strong>
            <p className="text-caption-fine text-[#6F5544]">
              Các tài liệu đối chứng về kỹ thuật dệt lanh H&apos;Mông, thêu đếm sợi Dao Đỏ và hệ thống hoa văn các tộc người miền núi phía Bắc.
            </p>
          </div>

          <div className="bg-[#F7F2E8] p-4 sm:p-5 rounded-xl border border-[#E9DFCC] space-y-1.5">
            <strong className="text-[#20252B] block font-semibold">
              Hồ sơ Di sản Phi vật thể Quốc gia (Bộ VHTTDL)
            </strong>
            <p className="text-caption-fine text-[#6F5544]">
              Hồ sơ Nghề dệt Dèng (Zèng) của người Tà Ôi huyện A Lưới, Nghệ thuật tạo hoa văn trên trang phục của người Mông hoa, Dao tiền.
            </p>
          </div>

          <div className="bg-[#F7F2E8] p-4 sm:p-5 rounded-xl border border-[#E9DFCC] space-y-1.5">
            <strong className="text-[#20252B] block font-semibold">
              Công trình nghiên cứu kinh điển của các học giả
            </strong>
            <p className="text-caption-fine text-[#6F5544]">
              <em>&ldquo;Hoa văn Mường&rdquo;</em> (Nguyễn Từ Chi), <em>&ldquo;Trang phục cổ truyền các dân tộc Việt Nam&rdquo;</em> (Đoàn Thị Tình, Ngô Đức Thịnh).
            </p>
          </div>

          <div className="bg-[#F7F2E8] p-4 sm:p-5 rounded-xl border border-[#E9DFCC] space-y-1.5">
            <strong className="text-[#20252B] block font-semibold">
              Hợp tác xã &amp; Làng nghề dệt thổ cẩm truyền thống
            </strong>
            <p className="text-caption-fine text-[#6F5544]">
              Làng dệt Zèng A Lưới (Thừa Thiên Huế), làng Za Ra (Quảng Nam), làng thổ cẩm Mỹ Nghiệp (Ninh Thuận), Tả Phìn (Sa Pa).
            </p>
          </div>
        </div>

        {onGoToReferences && (
          <div className="pt-2 flex justify-start">
            <button
              onClick={onGoToReferences}
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#20252B] hover:bg-[#15191D] text-white rounded-xl text-body-sub font-semibold shadow-sm transition-all cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-[#D5A642]" />
              <span>Xem danh mục 12 nguồn tài liệu tham khảo đối chứng</span>
              <ArrowRight className="w-4 h-4 text-[#D5A642]" />
            </button>
          </div>
        )}
      </section>

    </div>
  );
};
