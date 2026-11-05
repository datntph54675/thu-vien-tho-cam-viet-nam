import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  BROCADE_PATTERNS, 
  BROCADE_COLLECTIONS 
} from '../data/brocadeData';
import { BrocadePattern } from '../types/brocade';
import { BrocadeBanner } from './BrocadeBanner';
import { BrocadeCollections } from './BrocadeCollections';
import { BrocadeFilters } from './BrocadeFilters';
import { BrocadeGrid } from './BrocadeGrid';
import { BrocadeDetailModal } from './BrocadeDetailModal';
import { BrocadeVerificationNote } from './BrocadeVerificationNote';

interface BrocadeLibraryPageProps {
  initialCollectionId?: string;
  initialPatternId?: string;
  showBanner?: boolean;
  showCollectionsSection?: boolean;
  onExploreClick?: () => void;
}

export const BrocadeLibraryPage: React.FC<BrocadeLibraryPageProps> = ({
  initialCollectionId = '',
  initialPatternId = '',
  showBanner = true,
  showCollectionsSection = true,
  onExploreClick
}) => {
  // State for search and multi-criteria filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEthnic, setSelectedEthnic] = useState('Tất cả');
  const [selectedRegion, setSelectedRegion] = useState('Tất cả');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [selectedColor, setSelectedColor] = useState('Tất cả');
  const [selectedCollectionId, setSelectedCollectionId] = useState(initialCollectionId);
  const [sortBy, setSortBy] = useState<'name-asc' | 'name-desc' | 'date-newest'>('name-asc');
  
  // Selected pattern for modal detail view (Phần D)
  const [selectedPattern, setSelectedPattern] = useState<BrocadePattern | null>(null);

  // Sync initialPatternId if provided
  useEffect(() => {
    if (initialPatternId) {
      const found = BROCADE_PATTERNS.find(p => p.id === initialPatternId);
      if (found) {
        setSelectedPattern(found);
      }
    }
  }, [initialPatternId]);

  // Sync initialCollectionId if provided
  useEffect(() => {
    if (initialCollectionId) {
      setSelectedCollectionId(initialCollectionId);
    }
  }, [initialCollectionId]);

  // Ref to scroll to pattern grid smoothly
  const gridSectionRef = useRef<HTMLDivElement>(null);

  const handleBannerExplore = () => {
    if (onExploreClick) {
      onExploreClick();
    } else {
      gridSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCollection = (collectionId: string) => {
    setSelectedCollectionId(collectionId);
    gridSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedEthnic('Tất cả');
    setSelectedRegion('Tất cả');
    setSelectedCategory('Tất cả');
    setSelectedColor('Tất cả');
    setSelectedCollectionId('');
    setSortBy('name-asc');
  };

  const hasActiveFilters = Boolean(
    searchQuery.trim() !== '' ||
    selectedEthnic !== 'Tất cả' ||
    selectedRegion !== 'Tất cả' ||
    selectedCategory !== 'Tất cả' ||
    selectedColor !== 'Tất cả' ||
    selectedCollectionId !== ''
  );

  // Multi-criteria filter calculation
  const filteredPatterns = useMemo(() => {
    return BROCADE_PATTERNS.filter((p) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = p.name.toLowerCase().includes(q);
        const matchNative = p.nativeName?.toLowerCase().includes(q);
        const matchEthnic = p.ethnicGroup.toLowerCase().includes(q);
        const matchLocality = p.locality.toLowerCase().includes(q);
        const matchDesc = p.description.toLowerCase().includes(q);
        const matchMeaning = p.culturalMeaning.toLowerCase().includes(q);
        const matchTechnique = p.technique.toLowerCase().includes(q);
        const matchMaterials = p.materials.toLowerCase().includes(q);

        if (!matchName && !matchNative && !matchEthnic && !matchLocality && !matchDesc && !matchMeaning && !matchTechnique && !matchMaterials) {
          return false;
        }
      }

      // 2. Ethnic Group
      if (selectedEthnic !== 'Tất cả') {
        if (!p.ethnicGroup.toLowerCase().includes(selectedEthnic.toLowerCase())) {
          return false;
        }
      }

      // 3. Region
      if (selectedRegion !== 'Tất cả') {
        if (p.region !== selectedRegion) {
          return false;
        }
      }

      // 4. Category
      if (selectedCategory !== 'Tất cả') {
        if (p.category !== selectedCategory) {
          return false;
        }
      }

      // 5. Dominant Color
      if (selectedColor !== 'Tất cả') {
        const matchColor = p.dominantColors.some(c => 
          c.toLowerCase().includes(selectedColor.toLowerCase()) || 
          selectedColor.toLowerCase().includes(c.toLowerCase())
        );
        if (!matchColor) {
          return false;
        }
      }

      // 6. Highlight Collection
      if (selectedCollectionId) {
        if (p.collectionId !== selectedCollectionId) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'name-asc') {
        return a.name.localeCompare(b.name, 'vi');
      }
      if (sortBy === 'name-desc') {
        return b.name.localeCompare(a.name, 'vi');
      }
      if (sortBy === 'date-newest') {
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }
      return 0;
    });
  }, [
    searchQuery,
    selectedEthnic,
    selectedRegion,
    selectedCategory,
    selectedColor,
    selectedCollectionId,
    sortBy
  ]);

  return (
    <div className="min-h-screen bg-[#F7F2E8] text-[#29251F]">
      
      {/* Phần A — Banner giới thiệu */}
      {showBanner && (
        <BrocadeBanner
          onExploreClick={handleBannerExplore}
          totalPatterns={BROCADE_PATTERNS.length}
          totalEthnicGroups={10}
        />
      )}

      {/* Phần E — Bộ sưu tập nổi bật */}
      {showCollectionsSection && (
        <BrocadeCollections
          collections={BROCADE_COLLECTIONS}
          selectedCollectionId={selectedCollectionId}
          onSelectCollection={handleSelectCollection}
        />
      )}

      {/* Main Content Area */}
      <div 
        ref={gridSectionRef} 
        className="content-container py-10"
      >
        
        {/* Section Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 text-left">
          <div>
            <h2 className="text-section-title font-bold font-serif-culture text-[#20252B]">
              Tra Cứu &amp; Khám Phá Hoa Văn Thổ Cẩm
            </h2>
            <p className="text-body-sub text-[#6F5544] mt-1 max-w-2xl">
              Sử dụng các bộ lọc đa chiều dưới đây để tra cứu chi tiết từng mẫu hoa văn, kỹ thuật dệt thêu và giá trị văn hóa của các cộng đồng.
            </p>
          </div>
        </div>

        {/* Phần B — Tìm kiếm và bộ lọc */}
        <BrocadeFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedEthnic={selectedEthnic}
          onEthnicChange={setSelectedEthnic}
          selectedRegion={selectedRegion}
          onRegionChange={setSelectedRegion}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedColor={selectedColor}
          onColorChange={setSelectedColor}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onResetFilters={handleResetFilters}
          totalResults={filteredPatterns.length}
          totalAll={BROCADE_PATTERNS.length}
          hasActiveFilters={hasActiveFilters}
        />

        {/* Phần C — Danh sách hoa văn */}
        <BrocadeGrid
          patterns={filteredPatterns}
          onSelectPattern={(pattern) => setSelectedPattern(pattern)}
          onResetFilters={handleResetFilters}
          itemsPerPage={9}
        />

        {/* Transparent Academic Verification Note */}
        <BrocadeVerificationNote />

      </div>

      {/* Phần D — Chi tiết hoa văn Modal */}
      <BrocadeDetailModal
        pattern={selectedPattern}
        onClose={() => setSelectedPattern(null)}
      />

    </div>
  );
};
