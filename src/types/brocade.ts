export type Region = 
  | 'Tất cả'
  | 'Tây Bắc'
  | 'Đông Bắc'
  | 'Trường Sơn - Bắc Trung Bộ'
  | 'Tây Nguyên'
  | 'Duyên hải Nam Trung Bộ';

export type Category = 
  | 'Tất cả'
  | 'Hình học & Kỷ hà'
  | 'Động vật'
  | 'Thực vật & Hoa lá'
  | 'Thiên nhiên & Vũ trụ'
  | 'Đời sống & Lao động';

export type ColorFilter = 
  | 'Tất cả'
  | 'Đỏ đất'
  | 'Chàm/Xanh thẫm'
  | 'Vàng đất/Vàng nghệ'
  | 'Đen tuyền'
  | 'Trắng ngà'
  | 'Xanh lục';

export interface BrocadePattern {
  id: string;
  name: string;
  nativeName?: string;
  slug: string;
  description: string;
  ethnicGroup: string;
  region: 'Tây Bắc' | 'Đông Bắc' | 'Trường Sơn - Bắc Trung Bộ' | 'Tây Nguyên' | 'Duyên hải Nam Trung Bộ';
  locality: string;
  category: 'Hình học & Kỷ hà' | 'Động vật' | 'Thực vật & Hoa lá' | 'Thiên nhiên & Vũ trụ' | 'Đời sống & Lao động';
  dominantColors: string[];
  colorCodes: string[];
  imageUrl: string;
  detailImageUrl?: string;
  imageSource: string;
  creator: string;
  culturalMeaning: string;
  materials: string;
  technique: string;
  references: string[];
  referenceIds?: string[]; // Liên kết định danh với các tài liệu tham khảo chính thức
  license: string;
  createdAt: string;
  updatedAt: string;
  isVerified: boolean; // Phân định rõ tư liệu đã có nguồn khảo cứu đối chứng
  collectionId?: string;
}

export interface BrocadeCollection {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  coverImage: string;
  ethnicGroup: string;
  region: string;
  patternCount: number;
  highlightTechnique: string;
}

export interface UserRole {
  name: string;
  role: 'guest' | 'researcher' | 'curator';
  avatar?: string;
}

export interface HeritageStory {
  id: string;
  title: string;
  subtitle: string;
  ethnicGroup: string;
  region: string;
  heroImage: string;
  readTime: string;
  excerpt: string;
  contentParagraphs: string[];
  keyInsight: string;
  folkSongOrQuote?: string;
  culturalSignificance: string;
  relatedPatternId?: string;
  references: string[];
}

export type ReferenceType = 
  | 'Tất cả'
  | 'Sách chuyên khảo'
  | 'Bài báo / Tạp chí nghiên cứu'
  | 'Bảo tàng & Cơ quan di sản'
  | 'Văn bản pháp luật'
  | 'Cơ sở dữ liệu & Thư viện';

export interface ReferenceItem {
  id: string;
  title: string;
  authorOrPublisher: string;
  year?: number | string;
  type: 'Sách chuyên khảo' | 'Bài báo / Tạp chí nghiên cứu' | 'Bảo tàng & Cơ quan di sản' | 'Văn bản pháp luật' | 'Cơ sở dữ liệu & Thư viện';
  shortDescription: string;
  url: string;
  hasValidUrl: boolean;
  verifiedStatus: 'Đã xác minh thông tin xuất bản' | 'Tư liệu đối chứng cơ quan chính thức' | 'Chờ bổ sung thông tin ấn bản';
  relevanceScope: 'Nguồn trực tiếp về dệt, trang phục & hoa văn' | 'Nguồn bối cảnh dân tộc học & văn hóa chung' | 'Khung pháp lý bảo tồn di sản';
  supportedPatternIds?: string[];
  note: string;
}
