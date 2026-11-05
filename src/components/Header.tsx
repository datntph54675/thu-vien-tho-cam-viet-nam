import React, { useState } from 'react';
import { Sparkles, Layers, BookOpen, Info, Menu, X, Search, Home, BookMarked } from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'trang-chu', label: 'Trang chủ', icon: Home },
    { id: 'thu-vien-tho-cam', label: 'Thư viện hoa văn', icon: Sparkles, highlight: true },
    { id: 'bo-suu-tap', label: 'Bộ sưu tập', icon: Layers },
    { id: 'cau-chuyen-di-san', label: 'Câu chuyện di sản', icon: BookOpen },
    { id: 'tai-lieu-tham-khao', label: 'Tài liệu tham khảo', icon: BookMarked },
    { id: 'gioi-thieu', label: 'Giới thiệu', icon: Info },
  ];

  const handleNavClick = (id: string) => {
    onSelectTab(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F7F2E8] border-b border-[#E9DFCC] shadow-xs">
      {/* Decorative woven pattern accent at top */}
      <div className="brocade-border-ribbon" />

      <div className="content-container">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Portal Identity */}
          <div 
            onClick={() => handleNavClick('trang-chu')}
            className="flex items-center gap-3 cursor-pointer group select-none text-left shrink-0"
          >
            {/* Geometric woven badge */}
            <div className="w-11 h-11 rounded-xl bg-[#20252B] text-[#F7F2E8] flex items-center justify-center border border-[#D5A642]/40 shadow-sm transition-transform group-hover:scale-105 relative overflow-hidden">
              <svg className="w-6 h-6 text-[#D5A642]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="6" y="6" width="12" height="12" transform="rotate(45 12 12)" stroke="currentColor" fill="none" />
                <circle cx="12" cy="12" r="2.5" fill="#A83232" />
                <line x1="12" y1="2" x2="12" y2="6" stroke="#D5A642" strokeWidth="1.5" />
                <line x1="12" y1="18" x2="12" y2="22" stroke="#D5A642" strokeWidth="1.5" />
                <line x1="2" y1="12" x2="6" y2="12" stroke="#D5A642" strokeWidth="1.5" />
                <line x1="18" y1="12" x2="22" y2="12" stroke="#D5A642" strokeWidth="1.5" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-bold text-[#20252B] tracking-tight group-hover:text-[#A83232] transition-colors font-serif-culture">
                  Thư Viện Hoa Văn Thổ Cẩm
                </span>
                <span className="text-[10px] font-bold text-[#A83232] uppercase tracking-widest bg-[#A83232]/10 border border-[#A83232]/20 px-1.5 py-0.5 rounded hidden sm:inline">
                  Việt Nam
                </span>
              </div>
              <p className="text-caption-fine text-[#6F5544] font-medium leading-none mt-0.5">
                Kho lưu trữ số &amp; Bảo tồn di sản dệt dân gian
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              
              if (item.highlight) {
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`relative flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                      isActive
                        ? 'bg-[#A83232] text-[#F7F2E8] shadow-sm ring-1 ring-[#783B32]'
                        : 'text-[#A83232] bg-[#A83232]/10 hover:bg-[#A83232]/20 border border-[#A83232]/20'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 text-[#D5A642]" />
                    <span>{item.label}</span>
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#D5A642] animate-pulse" />
                  </button>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                    isActive
                      ? 'text-[#20252B] bg-[#E9DFCC] font-bold'
                      : 'text-[#29251F] hover:text-[#A83232] hover:bg-[#E9DFCC]/50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-[#6F5544]" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Mobile menu trigger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-[#20252B] hover:text-[#A83232] hover:bg-[#E9DFCC] transition-colors"
              aria-label="Mở menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-[#E9DFCC] space-y-1 bg-[#F7F2E8]">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium ${
                    isActive
                      ? 'bg-[#20252B] text-[#F7F2E8] font-semibold'
                      : 'text-[#29251F] hover:bg-[#E9DFCC]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-[#D5A642]" />
                    <span>{item.label}</span>
                  </div>
                  {item.highlight && (
                    <span className="text-[10px] bg-[#A83232]/10 text-[#A83232] px-2 py-0.5 rounded-md font-semibold">
                      Trọng tâm
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

      </div>
    </header>
  );
};
