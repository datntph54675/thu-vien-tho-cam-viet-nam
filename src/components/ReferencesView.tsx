import React, { useState, useMemo } from 'react';
import { REFERENCE_SOURCES, REFERENCE_TYPES } from '../data/referencesData';
import { ReferenceType, BrocadePattern } from '../types/brocade';
import { BROCADE_PATTERNS } from '../data/brocadeData';
import { 
  BookMarked, 
  Search, 
  ExternalLink, 
  RotateCcw, 
  CheckCircle2, 
  FileText, 
  Building2, 
  Scale, 
  Database, 
  BookOpen, 
  Sparkles, 
  Eye, 
  ShieldCheck, 
  Info 
} from 'lucide-react';

interface ReferencesViewProps {
  onSelectPattern: (pattern: BrocadePattern) => void;
  onExploreLibrary: () => void;
}

export const ReferencesView: React.FC<ReferencesViewProps> = ({
  onSelectPattern,
  onExploreLibrary
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<ReferenceType>('Tất cả');
  const [selectedScope, setSelectedScope] = useState<string>('Tất cả');

  // Filter calculation
  const filteredReferences = useMemo(() => {
    return REFERENCE_SOURCES.filter((ref) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = ref.title.toLowerCase().includes(q);
        const matchAuthor = ref.authorOrPublisher.toLowerCase().includes(q);
        const matchDesc = ref.shortDescription.toLowerCase().includes(q);
        const matchNote = ref.note.toLowerCase().includes(q);

        if (!matchTitle && !matchAuthor && !matchDesc && !matchNote) {
          return false;
        }
      }

      // 2. Type filter
      if (selectedType !== 'Tất cả') {
        if (ref.type !== selectedType) {
          return false;
        }
      }

      // 3. Scope filter
      if (selectedScope !== 'Tất cả') {
        if (ref.relevanceScope !== selectedScope) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedType, selectedScope]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedType('Tất cả');
    setSelectedScope('Tất cả');
  };

  const hasActiveFilters = Boolean(
    searchQuery.trim() !== '' || 
    selectedType !== 'Tất cả' || 
    selectedScope !== 'Tất cả'
  );

  // Statistics calculation for academic report
  const verifiedCount = REFERENCE_SOURCES.filter(r => r.verifiedStatus === 'Đã xác minh thông tin xuất bản').length;
  const officialInstitutionsCount = REFERENCE_SOURCES.filter(r => r.verifiedStatus === 'Tư liệu đối chứng cơ quan chính thức').length;
  const pendingCount = REFERENCE_SOURCES.filter(r => r.verifiedStatus === 'Chờ bổ sung thông tin ấn bản').length;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Sách chuyên khảo':
        return <BookOpen className="w-4 h-4 text-[#D5A642]" />;
      case 'Bài báo / Tạp chí nghiên cứu':
        return <FileText className="w-4 h-4 text-[#A83232]" />;
      case 'Bảo tàng & Cơ quan di sản':
        return <Building2 className="w-4 h-4 text-[#783B32]" />;
      case 'Văn bản pháp luật':
        return <Scale className="w-4 h-4 text-[#20252B]" />;
      case 'Cơ sở dữ liệu & Thư viện':
        return <Database className="w-4 h-4 text-[#6F5544]" />;
      default:
        return <BookMarked className="w-4 h-4 text-[#20252B]" />;
    }
  };

  return (
    <div className="space-y-12 pb-16 text-left">
      
      {/* Top Banner (Nền Chàm Đậm #20252B) */}
      <section className="bg-[#20252B] text-[#F7F2E8] py-14 border-b border-[#15191D] relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 brocade-border-ribbon" />
        <div className="content-container relative space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#15191D] border border-[#D5A642]/30 text-caption-fine font-bold text-[#D5A642] uppercase tracking-wider">
            <BookMarked className="w-3.5 h-3.5" />
            <span>Thư mục tài liệu &amp; Nguồn chứng cứ khoa học</span>
          </div>
          <h1 className="text-page-title font-extrabold font-serif-culture text-[#F7F2E8]">
            Tài Liệu Tham Khảo Đối Chứng
          </h1>
          <p className="text-body-main text-[#E9DFCC] max-w-3xl leading-relaxed">
            Danh mục các công trình nghiên cứu dân tộc học, hồ sơ di sản văn hóa phi vật thể, văn bản quy phạm pháp luật và cơ sở dữ liệu chuyên ngành dùng làm căn cứ đối soát cho từng mẫu hoa văn thổ cẩm.
          </p>
        </div>
      </section>

      <div className="content-container space-y-10">
        
        {/* Metrics Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E9DFCC] shadow-xs space-y-1">
            <span className="text-caption-fine text-[#6F5544] font-medium">Tổng nguồn tham khảo</span>
            <div className="text-2xl font-bold text-[#20252B] font-serif-culture">
              {REFERENCE_SOURCES.length} tài liệu
            </div>
            <span className="text-caption-fine text-[#6F5544]/80 block">Được cập nhật đối chứng</span>
          </div>

          <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E9DFCC] shadow-xs space-y-1">
            <span className="text-caption-fine text-[#6F5544] font-medium">Đã xác minh xuất bản</span>
            <div className="text-2xl font-bold text-[#A83232] font-serif-culture">
              {verifiedCount} nguồn
            </div>
            <span className="text-caption-fine text-[#A83232] block">Có năm &amp; đơn vị phát hành</span>
          </div>

          <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E9DFCC] shadow-xs space-y-1">
            <span className="text-caption-fine text-[#6F5544] font-medium">Cơ quan &amp; Viện nghiên cứu</span>
            <div className="text-2xl font-bold text-[#D5A642] font-serif-culture">
              {officialInstitutionsCount} nguồn
            </div>
            <span className="text-caption-fine text-[#D5A642] block">Bảo tàng &amp; Cổng chuyên ngành</span>
          </div>

          <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E9DFCC] shadow-xs space-y-1">
            <span className="text-caption-fine text-[#6F5544] font-medium">Chờ bổ sung ấn bản</span>
            <div className="text-2xl font-bold text-[#6F5544] font-serif-culture">
              {pendingCount} nguồn
            </div>
            <span className="text-caption-fine text-[#6F5544] block">Tiếp tục đối chiếu điền dã</span>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#E9DFCC] shadow-xs p-6 sm:p-7 space-y-5">
          
          {/* Top: Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#6F5544]">
              <Search className="w-4 h-4 text-[#A83232]" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên sách, tác giả, cơ quan phát hành, từ khóa nội dung..."
              className="w-full pl-11 pr-4 py-3 text-body-sub bg-[#F7F2E8] border border-[#E9DFCC] rounded-xl text-[#29251F] placeholder-[#6F5544]/70 focus:outline-none focus:ring-2 focus:ring-[#A83232] focus:bg-[#FFFFFF] transition-all"
            />
          </div>

          {/* Filter controls row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
            
            {/* Filter by Type */}
            <div>
              <label className="block text-caption-fine font-bold text-[#20252B] uppercase tracking-wider mb-2">
                Phân loại tài liệu
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as any)}
                className="w-full text-caption-fine font-medium bg-[#F7F2E8] border border-[#E9DFCC] rounded-lg px-3.5 py-2.5 text-[#20252B] focus:outline-none focus:ring-2 focus:ring-[#A83232] transition-colors"
              >
                {REFERENCE_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Filter by Scope */}
            <div>
              <label className="block text-caption-fine font-bold text-[#20252B] uppercase tracking-wider mb-2">
                Phạm vi liên quan học thuật
              </label>
              <select
                value={selectedScope}
                onChange={(e) => setSelectedScope(e.target.value)}
                className="w-full text-caption-fine font-medium bg-[#F7F2E8] border border-[#E9DFCC] rounded-lg px-3.5 py-2.5 text-[#20252B] focus:outline-none focus:ring-2 focus:ring-[#A83232] transition-colors"
              >
                <option value="Tất cả">Tất cả phạm vi</option>
                <option value="Nguồn trực tiếp về dệt, trang phục & hoa văn">Nguồn trực tiếp về dệt, trang phục &amp; hoa văn</option>
                <option value="Nguồn bối cảnh dân tộc học & văn hóa chung">Nguồn bối cảnh dân tộc học &amp; văn hóa chung</option>
                <option value="Khung pháp lý bảo tồn di sản">Khung pháp lý bảo tồn di sản</option>
              </select>
            </div>

          </div>

          {/* Status & Reset button */}
          <div className="pt-4 border-t border-[#E9DFCC] flex items-center justify-between text-caption-fine text-[#29251F]">
            <div>
              Hiển thị <strong className="text-[#A83232] font-bold text-sm">{filteredReferences.length}</strong> / {REFERENCE_SOURCES.length} tài liệu phù hợp
            </div>

            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-caption-fine font-bold text-[#A83232] hover:text-[#783B32] bg-[#A83232]/10 hover:bg-[#A83232]/20 rounded-lg border border-[#A83232]/30 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Xóa bộ lọc</span>
              </button>
            )}
          </div>

        </div>

        {/* References List */}
        <div className="space-y-5">
          {filteredReferences.map((ref, index) => {
            const supportedPatterns = ref.supportedPatternIds
              ? BROCADE_PATTERNS.filter(p => ref.supportedPatternIds?.includes(p.id))
              : [];

            return (
              <div
                key={ref.id}
                className="bg-[#FFFFFF] rounded-2xl border border-[#E9DFCC] hover:border-[#D5A642] p-6 sm:p-7 shadow-xs hover:shadow-md transition-all space-y-4"
              >
                {/* Header row: Index, Type icon, Status */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E9DFCC] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#E9DFCC] text-[#20252B] text-caption-fine font-bold flex items-center justify-center shrink-0">
                      {index + 1}
                    </span>
                    <div className="flex items-center gap-1.5 text-caption-fine font-bold text-[#20252B]">
                      {getTypeIcon(ref.type)}
                      <span>{ref.type}</span>
                    </div>
                    <span className="text-[#E9DFCC]">·</span>
                    <span className="text-caption-fine text-[#6F5544] font-medium">
                      {ref.relevanceScope}
                    </span>
                  </div>

                  <div>
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-md text-[11px] font-bold ${
                      ref.verifiedStatus === 'Đã xác minh thông tin xuất bản'
                        ? 'bg-[#A83232]/10 text-[#A83232] border border-[#A83232]/30'
                        : ref.verifiedStatus === 'Tư liệu đối chứng cơ quan chính thức'
                          ? 'bg-[#D5A642]/15 text-[#783B32] border border-[#D5A642]/40'
                          : 'bg-[#E9DFCC] text-[#29251F] border border-[#E9DFCC]'
                    }`}>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D5A642]" />
                      <span>{ref.verifiedStatus}</span>
                    </span>
                  </div>
                </div>

                {/* Title & Author */}
                <div className="space-y-1">
                  <h3 className="text-card-title font-bold text-[#20252B] font-serif-culture leading-snug">
                    {ref.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-2 text-caption-fine text-[#6F5544]">
                    <span className="font-bold text-[#20252B]">
                      {ref.authorOrPublisher}
                    </span>
                    {ref.year && (
                      <>
                        <span className="text-[#E9DFCC]">·</span>
                        <span className="text-[#6F5544]">Năm: {ref.year}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Short Description */}
                <p className="text-body-sub text-[#29251F]/90 leading-relaxed">
                  {ref.shortDescription}
                </p>

                {/* Specific Content Support Note */}
                <div className="bg-[#F7F2E8] rounded-xl p-4 border border-[#E9DFCC] text-caption-fine text-[#29251F] space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-[#20252B]">
                    <Info className="w-3.5 h-3.5 text-[#A83232] shrink-0" />
                    <span>Nội dung tài liệu thực sự hỗ trợ cho dự án:</span>
                  </div>
                  <p className="leading-relaxed pl-5 text-[#6F5544]">
                    {ref.note}
                  </p>
                </div>

                {/* Supported Patterns Link Chips */}
                {supportedPatterns.length > 0 && (
                  <div className="pt-2 flex flex-wrap items-center gap-2 text-caption-fine">
                    <span className="text-[#6F5544] font-bold">Hoa văn đối chiếu:</span>
                    {supportedPatterns.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => onSelectPattern(p)}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-[#F7F2E8] hover:bg-[#E9DFCC] text-[#20252B] rounded-lg border border-[#E9DFCC] transition-colors font-medium text-[11px] cursor-pointer"
                      >
                        <Sparkles className="w-3 h-3 text-[#D5A642]" />
                        <span>{p.name}</span>
                        <Eye className="w-3 h-3 text-[#A83232]" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Action buttons: Open source URL */}
                <div className="pt-4 border-t border-[#E9DFCC] flex items-center justify-between flex-wrap gap-2">
                  <span className="text-caption-fine text-[#6F5544] truncate max-w-md font-mono">
                    {ref.url}
                  </span>

                  {ref.hasValidUrl && (
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#20252B] hover:bg-[#A83232] text-[#F7F2E8] text-caption-fine font-bold rounded-xl shadow-xs transition-all"
                    >
                      <span>Mở tài liệu gốc</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#D5A642]" />
                    </a>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* Academic Methodology Band (Dải nền Chàm Đậm #20252B) */}
        <div className="bg-[#20252B] text-[#F7F2E8] rounded-3xl p-8 sm:p-10 border border-[#D5A642]/30 text-body-sub space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-[#D5A642] font-bold uppercase tracking-wider text-caption-fine">
            <ShieldCheck className="w-5 h-5 text-[#D5A642]" />
            <span>Nguyên Tắc Trích Dẫn &amp; Liêm Chính Học Thuật Bảo Tàng</span>
          </div>
          <p className="leading-relaxed text-[#E9DFCC]">
            Thư viện hoa văn thổ cẩm Việt Nam cam kết tuân thủ quy chuẩn trung thực: mỗi tài liệu chỉ được liên kết với hồ sơ hoa văn khi có nội dung minh chứng tương ứng. Hệ thống tuyệt đối không tự tạo DOI, ISBN hoặc số trang giả mạo. Việc đưa vào danh mục tài liệu đối chứng không đồng nghĩa với việc toàn bộ các hoa văn đều đã hoàn tất xác minh tuyệt đối mà luôn ghi rõ tình trạng kiểm chứng thực tế.
          </p>
          <div className="pt-2 text-caption-fine text-[#F0DCA7] border-t border-[#15191D]">
            Cơ quan thẩm định độc lập: Bảo tàng Dân tộc học Việt Nam, Viện Dân tộc học và Cục Di sản Văn hóa (Bộ VHTTDL).
          </div>
        </div>

      </div>

    </div>
  );
};
