/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { BrocadeLibraryPage } from './components/BrocadeLibraryPage';
import { CollectionsView } from './components/CollectionsView';
import { HeritageStoriesView } from './components/HeritageStoriesView';
import { AboutView } from './components/AboutView';
import { ReferencesView } from './components/ReferencesView';
import { BrocadeDetailModal } from './components/BrocadeDetailModal';
import { BROCADE_PATTERNS } from './data/brocadeData';
import { BrocadePattern } from './types/brocade';

type TabType = 'trang-chu' | 'thu-vien-tho-cam' | 'bo-suu-tap' | 'cau-chuyen-di-san' | 'tai-lieu-tham-khao' | 'gioi-thieu';

export default function App() {
  // Normalize and parse current hash
  const getInitialTab = (): TabType => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'trang-chu') return 'trang-chu';
      if (['thu-vien-tho-cam', 'thu-vien', 'brocade'].includes(hash)) return 'thu-vien-tho-cam';
      if (['bo-suu-tap', 'collections'].includes(hash)) return 'bo-suu-tap';
      if (['cau-chuyen-di-san', 'stories'].includes(hash)) return 'cau-chuyen-di-san';
      if (['tai-lieu-tham-khao', 'tai-lieu', 'references', 'ref'].includes(hash)) return 'tai-lieu-tham-khao';
      if (['gioi-thieu', 'about'].includes(hash)) return 'gioi-thieu';
    }
    return 'trang-chu';
  };

  const [currentTab, setCurrentTab] = useState<TabType>(getInitialTab);
  const [selectedPatternForModal, setSelectedPatternForModal] = useState<BrocadePattern | null>(null);
  const [preselectedCollectionId, setPreselectedCollectionId] = useState<string>('');

  // Handle tab change and synchronize URL hash
  const handleSelectTab = (tab: string, collectionId?: string) => {
    const validTab: TabType = (
      ['trang-chu', 'thu-vien-tho-cam', 'bo-suu-tap', 'cau-chuyen-di-san', 'tai-lieu-tham-khao', 'gioi-thieu'].includes(tab)
        ? tab
        : 'trang-chu'
    ) as TabType;

    setCurrentTab(validTab);
    if (collectionId) {
      setPreselectedCollectionId(collectionId);
    } else {
      setPreselectedCollectionId('');
    }

    if (typeof window !== 'undefined') {
      window.location.hash = validTab;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Listen to browser navigation (back/forward)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'trang-chu') {
        setCurrentTab('trang-chu');
      } else if (['thu-vien-tho-cam', 'thu-vien', 'brocade'].includes(hash)) {
        setCurrentTab('thu-vien-tho-cam');
      } else if (['bo-suu-tap', 'collections'].includes(hash)) {
        setCurrentTab('bo-suu-tap');
      } else if (['cau-chuyen-di-san', 'stories'].includes(hash)) {
        setCurrentTab('cau-chuyen-di-san');
      } else if (['tai-lieu-tham-khao', 'tai-lieu', 'references', 'ref'].includes(hash)) {
        setCurrentTab('tai-lieu-tham-khao');
      } else if (['gioi-thieu', 'about'].includes(hash)) {
        setCurrentTab('gioi-thieu');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Quick open pattern modal by ID (for links from Stories or References)
  const handleOpenPatternById = (patternId: string) => {
    const pattern = BROCADE_PATTERNS.find(p => p.id === patternId);
    if (pattern) {
      setSelectedPatternForModal(pattern);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F2E8] text-[#29251F] selection:bg-[#F0DCA7] selection:text-[#20252B] font-sans">
      
      {/* Shared Header Navigation */}
      <Header
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
      />

      {/* Main Routed Views */}
      <main className="flex-1">
        {currentTab === 'trang-chu' && (
          <HomeView
            onGoToLibrary={(colId) => handleSelectTab('thu-vien-tho-cam', colId)}
            onGoToStories={() => handleSelectTab('cau-chuyen-di-san')}
            onGoToAbout={() => handleSelectTab('gioi-thieu')}
            onSelectPattern={(pattern) => setSelectedPatternForModal(pattern)}
          />
        )}

        {currentTab === 'thu-vien-tho-cam' && (
          <BrocadeLibraryPage
            initialCollectionId={preselectedCollectionId}
            showBanner={false}
            showCollectionsSection={false}
          />
        )}

        {currentTab === 'bo-suu-tap' && (
          <CollectionsView
            onSelectPattern={(pattern) => setSelectedPatternForModal(pattern)}
            onGoToFullLibrary={() => handleSelectTab('thu-vien-tho-cam')}
          />
        )}

        {currentTab === 'cau-chuyen-di-san' && (
          <HeritageStoriesView
            onSelectPatternById={handleOpenPatternById}
            onExploreLibrary={() => handleSelectTab('thu-vien-tho-cam')}
          />
        )}

        {currentTab === 'tai-lieu-tham-khao' && (
          <ReferencesView
            onSelectPattern={(pattern) => setSelectedPatternForModal(pattern)}
            onExploreLibrary={() => handleSelectTab('thu-vien-tho-cam')}
          />
        )}

        {currentTab === 'gioi-thieu' && (
          <AboutView
            onExploreLibrary={() => handleSelectTab('thu-vien-tho-cam')}
            onGoToReferences={() => handleSelectTab('tai-lieu-tham-khao')}
          />
        )}
      </main>

      {/* Global Pattern Detail Modal (accessible across all pages) */}
      <BrocadeDetailModal
        pattern={selectedPatternForModal}
        onClose={() => setSelectedPatternForModal(null)}
      />

      {/* Shared Footer */}
      <Footer onSelectTab={handleSelectTab} />

    </div>
  );
}
