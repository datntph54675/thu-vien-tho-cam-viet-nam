import React from 'react';
import { ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="bg-[#15191D] text-[#F7F2E8] border-t border-[#20252B] relative">
      {/* Top ethnic brocade ribbon */}
      <div className="brocade-border-ribbon" />

      <div className="content-container py-12 lg:py-16 text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          
          {/* Col 1: Identity & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="text-[#D5A642] text-xl font-bold font-serif-culture">✦</span>
              <span className="font-bold text-white text-base tracking-tight font-serif-culture">
                Thư Viện Hoa Văn Thổ Cẩm
              </span>
            </div>
            <p className="text-body-sub text-[#E9DFCC]/80 leading-relaxed">
              Thư viện số độc lập lưu trữ, tra cứu và bảo tồn hoa văn thổ cẩm truyền thống các dân tộc Việt Nam. Phục vụ công tác nghiên cứu, giáo dục văn hóa và bảo tồn di sản dệt trước nguy cơ mai một.
            </p>
            <div className="flex items-center gap-2 text-caption-fine text-[#E9DFCC]/70">
              <ShieldCheck className="w-4 h-4 text-[#D5A642] shrink-0" />
              <span>Bảo vệ quyền sở hữu trí tuệ văn hóa cộng đồng bản địa</span>
            </div>
          </div>

          {/* Col 2: Điều hướng Thư viện */}
          <div>
            <h3 className="text-caption-fine font-bold text-[#D5A642] uppercase tracking-wider mb-4">
              Tra Cứu &amp; Bộ Sưu Tập
            </h3>
            <ul className="space-y-2.5 text-body-sub text-[#E9DFCC]/85">
              <li>
                <button 
                  onClick={() => onSelectTab('thu-vien-tho-cam')}
                  className="hover:text-[#D5A642] transition-colors text-left"
                >
                  Tra cứu hoa văn theo Dân tộc &amp; Vùng miền
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTab('bo-suu-tap')}
                  className="hover:text-[#D5A642] transition-colors text-left"
                >
                  Kỹ thuật vẽ sáp ong lanh H&apos;Mông
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTab('bo-suu-tap')}
                  className="hover:text-[#D5A642] transition-colors text-left"
                >
                  Dệt chèn hạt cườm chì Zèng Tà Ôi (A Lưới)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTab('bo-suu-tap')}
                  className="hover:text-[#D5A642] transition-colors text-left"
                >
                  Hệ thống kỷ hà Ê Đê, M&apos;nông, Ba Na
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Ký sự di sản & Giới thiệu */}
          <div>
            <h3 className="text-caption-fine font-bold text-[#D5A642] uppercase tracking-wider mb-4">
              Câu Chuyện &amp; Dự Án
            </h3>
            <ul className="space-y-2.5 text-body-sub text-[#E9DFCC]/85">
              <li>
                <button 
                  onClick={() => onSelectTab('cau-chuyen-di-san')}
                  className="hover:text-[#D5A642] transition-colors text-left"
                >
                  Ký sự sắc chàm đại ngàn
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTab('cau-chuyen-di-san')}
                  className="hover:text-[#D5A642] transition-colors text-left"
                >
                  Truyền thuyết rùa thần trên cạp váy Mường - Thái
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTab('tai-lieu-tham-khao')}
                  className="hover:text-[#D5A642] transition-colors text-left font-medium text-[#F0DCA7]"
                >
                  Tài liệu tham khảo đối chứng (12 nguồn)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTab('gioi-thieu')}
                  className="hover:text-[#D5A642] transition-colors text-left"
                >
                  Phương pháp số hóa &amp; Liêm chính học thuật
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTab('trang-chu')}
                  className="hover:text-[#D5A642] transition-colors text-left"
                >
                  Tổng quan Thư viện số di sản
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Cam kết học thuật */}
          <div>
            <h3 className="text-caption-fine font-bold text-[#D5A642] uppercase tracking-wider mb-4">
              Cam Kết Khoa Học
            </h3>
            <div className="bg-[#20252B] rounded-xl p-4 border border-[#783B32]/30 text-caption-fine text-[#E9DFCC]/85 space-y-2">
              <p className="leading-relaxed">
                <strong className="text-white">Nguyên tắc trung thực:</strong> Không tự ý gán ghép ý nghĩa tâm linh hoặc phong thủy huyền bí khi chưa có tư liệu nghiên cứu đối chứng từ các viện bảo tàng và tài liệu dân tộc học.
              </p>
              <p className="text-[11px] text-[#E9DFCC]/60 pt-2 border-t border-stone-800">
                Nguồn tham khảo: Bảo tàng Dân tộc học VN, Viện Văn hóa Nghệ thuật Quốc gia, Bảo tàng Phụ nữ VN.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-caption-fine text-[#E9DFCC]/60">
          <p>© 2026 Thư viện Hoa văn Thổ cẩm Việt Nam. Phiên bản số hóa di sản văn hóa phi vật thể.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[#F0DCA7]">
              <Heart className="w-3.5 h-3.5 text-[#A83232]" />
              <span>Chung tay gìn giữ bản sắc 54 dân tộc anh em</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
