import React, { useEffect, useState } from 'react';
import { BrocadePattern } from '../types/brocade';
import { REFERENCE_SOURCES } from '../data/referencesData';
import { 
  X, 
  MapPin, 
  Sparkles, 
  Share2, 
  Check, 
  Printer, 
  ZoomIn, 
  Layers, 
  Calendar, 
  UserCheck,
  ExternalLink
} from 'lucide-react';

interface BrocadeDetailModalProps {
  pattern: BrocadePattern | null;
  onClose: () => void;
}

export const BrocadeDetailModal: React.FC<BrocadeDetailModalProps> = ({
  pattern,
  onClose
}) => {
  const [activeImageTab, setActiveImageTab] = useState<'main' | 'detail'>('main');
  const [isZoomed, setIsZoomed] = useState(false);
  const [copiedQuote, setCopiedQuote] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isZoomed) {
          setIsZoomed(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isZoomed, onClose]);

  // Lock background scrolling when modal is open
  useEffect(() => {
    if (pattern) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [pattern]);

  if (!pattern) return null;

  const currentDisplayImage = activeImageTab === 'detail' && pattern.detailImageUrl 
    ? pattern.detailImageUrl 
    : pattern.imageUrl;

  const handleCopyCitation = () => {
    const citation = `"${pattern.name}", Dân tộc: ${pattern.ethnicGroup}, Địa phương: ${pattern.locality}. Nguồn tư liệu: ${pattern.imageSource}. Cổng thông tin Thư viện Hoa văn Thổ cẩm Việt Nam.`;
    navigator.clipboard.writeText(citation);
    setCopiedQuote(true);
    setTimeout(() => setCopiedQuote(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-[#15191D]/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fadeIn"
      onClick={onClose}
    >
      
      {/* Modal Container */}
      <div 
        className="relative bg-white w-full max-w-4xl max-h-[92vh] rounded-2xl shadow-2xl overflow-y-auto border border-[#E9DFCC] flex flex-col my-auto text-left"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-pattern-title"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Sticky Header with Action Buttons */}
        <div className="sticky top-0 z-20 bg-[#F7F2E8]/95 backdrop-blur-md px-6 py-4 border-b border-[#E9DFCC] flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#A83232]" />
            <span className="text-caption-fine font-bold text-[#20252B] uppercase tracking-wider font-mono">
              Hồ sơ tư liệu di sản hoa văn
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyCitation}
              className="px-3 py-1.5 text-caption-fine font-medium text-[#20252B] bg-white hover:bg-[#E9DFCC]/50 rounded-lg transition-colors border border-[#E9DFCC] flex items-center gap-1.5 cursor-pointer"
              title="Sao chép trích dẫn học thuật"
            >
              {copiedQuote ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Đã chép</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-[#6F5544]" />
                  <span className="hidden sm:inline">Trích dẫn</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-1.5 text-caption-fine font-medium text-[#20252B] bg-white hover:bg-[#E9DFCC]/50 rounded-lg transition-colors border border-[#E9DFCC] hidden sm:flex items-center gap-1.5 cursor-pointer"
              title="In bản tóm tắt hồ sơ"
            >
              <Printer className="w-3.5 h-3.5 text-[#6F5544]" />
              <span>In hồ sơ</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#6F5544] hover:text-[#20252B] hover:bg-[#E9DFCC]/50 transition-colors cursor-pointer"
              aria-label="Đóng cửa sổ chi tiết (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Top Info Banner */}
          <div>
            {/* Metadata Breadcrumbs */}
            <div className="flex items-center gap-2 text-caption-fine text-[#6F5544] font-medium mb-2 flex-wrap">
              <span className="font-bold text-[#A83232] uppercase tracking-wider">
                {pattern.ethnicGroup}
              </span>
              <span aria-hidden="true" className="text-[#E9DFCC]">/</span>
              <span>{pattern.region}</span>
              <span aria-hidden="true" className="text-[#E9DFCC]">/</span>
              <span>{pattern.category}</span>
            </div>

            <h2 id="modal-pattern-title" className="text-page-title font-bold text-[#20252B] font-serif-culture">
              {pattern.name}
            </h2>

            {pattern.nativeName && (
              <p className="text-body-sub text-[#6F5544] italic mt-1">
                Tên bản địa: <span className="font-semibold text-[#20252B]">{pattern.nativeName}</span>
              </p>
            )}
          </div>

          {/* Visual Showcase (Main image + Detail image switcher) */}
          <div className="space-y-3">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] bg-[#15191D] rounded-2xl overflow-hidden border border-[#20252B] shadow-inner group">
              <img
                src={currentDisplayImage}
                alt={pattern.name}
                className={`w-full h-full object-cover transition-transform duration-300 ${isZoomed ? 'scale-150 cursor-zoom-out' : 'group-hover:scale-102 cursor-zoom-in'}`}
                onClick={() => setIsZoomed(!isZoomed)}
              />

              {/* Zoom hint overlay */}
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="absolute bottom-3 right-3 bg-[#15191D]/90 hover:bg-[#15191D] text-white px-3 py-1.5 rounded-lg text-caption-fine font-medium backdrop-blur-sm flex items-center gap-1.5 border border-[#D5A642]/30 cursor-pointer"
              >
                <ZoomIn className="w-3.5 h-3.5 text-[#D5A642]" />
                <span>{isZoomed ? 'Thu nhỏ' : 'Nhấn để phóng to'}</span>
              </button>

              <div className="absolute top-3 left-3 bg-[#15191D]/85 backdrop-blur-sm px-3 py-1 rounded-md text-[11px] text-[#F7F2E8] border border-[#20252B]">
                {activeImageTab === 'main' ? 'Ảnh tổng thể bố cục hoa văn' : 'Ảnh cận cảnh chi tiết cấu trúc dệt'}
              </div>
            </div>

            {/* Image toggle buttons if detail image exists */}
            {pattern.detailImageUrl && (
              <div className="flex gap-2">
                <button
                  onClick={() => { setActiveImageTab('main'); setIsZoomed(false); }}
                  className={`px-3 py-1.5 rounded-lg text-caption-fine font-medium transition-all cursor-pointer ${
                    activeImageTab === 'main'
                      ? 'bg-[#20252B] text-white'
                      : 'bg-[#F7F2E8] text-[#20252B] hover:bg-[#E9DFCC]'
                  }`}
                >
                  Ảnh tổng thể hoa văn
                </button>
                <button
                  onClick={() => { setActiveImageTab('detail'); setIsZoomed(false); }}
                  className={`px-3 py-1.5 rounded-lg text-caption-fine font-medium transition-all cursor-pointer ${
                    activeImageTab === 'detail'
                      ? 'bg-[#20252B] text-white'
                      : 'bg-[#F7F2E8] text-[#20252B] hover:bg-[#E9DFCC]'
                  }`}
                >
                  Ảnh cận cảnh sợi dệt / bề mặt
                </button>
              </div>
            )}
          </div>

          {/* Section 1: Mô tả hình dạng & cách bố trí họa tiết */}
          <div className="bg-[#F7F2E8] rounded-xl p-5 border border-[#E9DFCC] space-y-2">
            <h3 className="text-caption-fine font-bold text-[#20252B] uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-[#A83232]" />
              <span>Mô tả hình dáng &amp; Cấu trúc bố cục họa tiết</span>
            </h3>
            <p className="text-body-main text-[#29251F] leading-relaxed">
              {pattern.description}
            </p>
          </div>

          {/* Section 2: Thông số kỹ thuật & Xuất xứ (2 Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Col Left: Nguồn gốc & Bản sắc */}
            <div className="space-y-4">
              <h3 className="text-caption-fine font-bold text-[#20252B] uppercase tracking-wider border-b border-[#E9DFCC] pb-2">
                Nguồn gốc &amp; Không gian văn hóa
              </h3>

              <div className="space-y-3 text-body-sub">
                <div>
                  <span className="text-[#6F5544] block mb-0.5 text-caption-fine">Dân tộc / Cộng đồng:</span>
                  <span className="font-semibold text-[#20252B] text-card-title">{pattern.ethnicGroup}</span>
                </div>

                <div>
                  <span className="text-[#6F5544] block mb-0.5 text-caption-fine">Địa phương ghi nhận tư liệu:</span>
                  <span className="font-medium text-[#20252B] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#A83232]" />
                    <span>{pattern.locality} ({pattern.region})</span>
                  </span>
                </div>

                <div>
                  <span className="text-[#6F5544] block mb-0.5 text-caption-fine">Nghệ nhân / Cộng đồng nắm giữ:</span>
                  <span className="font-medium text-[#20252B] flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{pattern.creator}</span>
                  </span>
                </div>

                <div>
                  <span className="text-[#6F5544] block mb-0.5 text-caption-fine">Màu sắc chủ đạo &amp; Mã màu:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {pattern.dominantColors.map((colorName, idx) => (
                      <span 
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#E9DFCC] rounded-md text-[11px] font-medium text-[#20252B]"
                      >
                        <span 
                          className="w-2.5 h-2.5 rounded-full border border-black/10 shrink-0" 
                          style={{ backgroundColor: pattern.colorCodes[idx] || '#666' }}
                        />
                        <span>{colorName}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Col Right: Chất liệu & Kỹ thuật tạo hoa văn */}
            <div className="space-y-4">
              <h3 className="text-caption-fine font-bold text-[#20252B] uppercase tracking-wider border-b border-[#E9DFCC] pb-2">
                Chất liệu &amp; Kỹ thuật chế tác thủ công
              </h3>

              <div className="space-y-3 text-body-sub">
                <div>
                  <span className="text-[#6F5544] block mb-0.5 text-caption-fine">Kỹ thuật tạo hoa văn:</span>
                  <p className="font-semibold text-[#20252B] leading-relaxed">
                    {pattern.technique}
                  </p>
                </div>

                <div>
                  <span className="text-[#6F5544] block mb-0.5 text-caption-fine">Chất liệu sợi &amp; Phẩm nhuộm tự nhiên:</span>
                  <p className="font-normal text-[#29251F] leading-relaxed">
                    {pattern.materials}
                  </p>
                </div>

                <div>
                  <span className="text-[#6F5544] block mb-0.5 text-caption-fine">Thời điểm số hóa / Cập nhật:</span>
                  <span className="text-[#6F5544] flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#6F5544]" />
                    <span>Cập nhật ngày {pattern.updatedAt}</span>
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Section 3: Ý nghĩa văn hóa có nguồn tham khảo đối chứng */}
          <div className="bg-[#F0DCA7]/25 border border-[#D5A642]/40 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D5A642] shrink-0" />
              <h3 className="text-caption-fine font-bold text-[#20252B] uppercase tracking-wider">
                Ý nghĩa văn hóa &amp; Câu chuyện dân gian
              </h3>
            </div>
            <p className="text-body-main text-[#29251F] leading-relaxed">
              {pattern.culturalMeaning}
            </p>
            
            {/* References cited */}
            <div className="pt-3 border-t border-[#D5A642]/30 text-body-sub space-y-3">
              <span className="font-semibold text-[#20252B] block text-caption-fine">
                Tài liệu nghiên cứu tham khảo đối chứng:
              </span>
              <ul className="list-disc list-inside text-[#6F5544] space-y-1">
                {pattern.references.map((ref, idx) => (
                  <li key={idx} className="italic">{ref}</li>
                ))}
              </ul>

              {/* Linked Official Reference Sources with Notes & URLs */}
              {pattern.referenceIds && pattern.referenceIds.length > 0 && (
                <div className="pt-2 space-y-2">
                  <span className="font-bold text-[#20252B] text-caption-fine uppercase tracking-wider block">
                    Nguồn tư liệu đối chứng liên kết trong hệ thống:
                  </span>
                  <div className="space-y-2">
                    {pattern.referenceIds.map((refId) => {
                      const refItem = REFERENCE_SOURCES.find(r => r.id === refId);
                      if (!refItem) return null;
                      return (
                        <div key={refItem.id} className="bg-white/95 p-3 rounded-lg border border-[#E9DFCC] text-body-sub space-y-1.5 shadow-2xs">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <strong className="text-[#20252B] font-semibold block">{refItem.title}</strong>
                              <span className="text-caption-fine text-[#6F5544]">
                                {refItem.authorOrPublisher} {refItem.year ? `(${refItem.year})` : ''} · <span className="font-medium text-[#A83232]">{refItem.type}</span>
                              </span>
                            </div>
                            {refItem.hasValidUrl && (
                              <a
                                href={refItem.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 bg-[#20252B] hover:bg-[#15191D] text-white rounded text-caption-fine font-medium transition-colors"
                              >
                                <span>Mở gốc</span>
                                <ExternalLink className="w-3 h-3 text-[#D5A642]" />
                              </a>
                            )}
                          </div>
                          <p className="text-caption-fine text-[#6F5544] bg-[#F7F2E8] p-2 rounded border border-[#E9DFCC]">
                            <strong>Nội dung hỗ trợ:</strong> {refItem.note}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Section 4: Nguồn ảnh & Bản quyền sử dụng */}
          <div className="bg-[#F7F2E8] rounded-xl p-5 border border-[#E9DFCC] text-caption-fine space-y-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <span className="text-[#6F5544] block">Nguồn gốc ảnh &amp; Đơn vị lưu trữ:</span>
                <span className="font-medium text-[#20252B]">{pattern.imageSource}</span>
              </div>
              <div>
                <span className="text-[#6F5544] block">Giấy phép lưu hành:</span>
                <span className="inline-block px-2.5 py-1 bg-white border border-[#E9DFCC] text-[#20252B] rounded font-mono text-caption-fine font-semibold">
                  {pattern.license}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Back Button */}
          <div className="pt-2 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-[#20252B] hover:bg-[#15191D] text-white text-body-sub font-semibold rounded-xl shadow-sm transition-all cursor-pointer"
            >
              Quay lại danh sách hoa văn
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
