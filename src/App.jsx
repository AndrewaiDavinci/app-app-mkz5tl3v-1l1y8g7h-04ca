import React, { useState, useEffect } from 'react';
import { X, ZoomIn, Heart, Download, Share2, Grid3X3, Image as ImageIcon } from 'lucide-react';
import { cn } from './lib/utils';

const galleryImages = [
  {
    id: 1,
    src: '/assets/asset.png',
    title: '신비로운 풍경',
    artist: '김예술',
    description: '자연의 아름다움을 담은 환상적인 작품입니다.',
    category: '풍경화',
    year: '2024'
  },
  {
    id: 2,
    src: '/assets/asset_1.png',
    title: '도시의 밤',
    artist: '박창작',
    description: '현대 도시의 역동적인 에너지를 표현한 작품입니다.',
    category: '도시',
    year: '2023'
  },
  {
    id: 3,
    src: '/assets/asset_2.png',
    title: '추상의 세계',
    artist: '이모던',
    description: '색채와 형태의 조화로 만들어낸 추상 작품입니다.',
    category: '추상화',
    year: '2024'
  },
  {
    id: 4,
    src: '/assets/asset_3.png',
    title: '자연의 조화',
    artist: '최자연',
    description: '자연 속 생명력을 표현한 섬세한 작품입니다.',
    category: '자연',
    year: '2023'
  },
  {
    id: 5,
    src: '/assets/asset_4.png',
    title: '모던 아트',
    artist: '정현대',
    description: '현대적 감각으로 재해석한 독창적인 작품입니다.',
    category: '현대미술',
    year: '2024'
  }
];

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [likedImages, setLikedImages] = useState(() => new Set());
  const [viewMode, setViewMode] = useState('grid');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 이미지 로딩 시뮬레이션
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const toggleLike = (imageId) => {
    setLikedImages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(imageId)) {
        newSet.delete(imageId);
      } else {
        newSet.add(imageId);
      }
      return newSet;
    });
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleDownload = (imageSrc, title) => {
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = `${title}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async (image) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: image.title,
          text: `${image.title} by ${image.artist}`,
          url: window.location.href
        });
      } catch (err) {
        console.log('공유가 취소되었습니다.');
      }
    } else {
      // 클립보드에 복사
      navigator.clipboard.writeText(`${image.title} by ${image.artist} - ${window.location.href}`);
      alert('링크가 클립보드에 복사되었습니다!');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent mb-4"></div>
          <p className="text-white text-lg">갤러리를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-md border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <ImageIcon className="h-8 w-8 text-white" />
              <h1 className="text-2xl font-bold text-white">아트 갤러리</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'masonry' : 'grid')}
                className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                <Grid3X3 className="h-4 w-4 text-white" />
                <span className="text-white text-sm">
                  {viewMode === 'grid' ? '그리드 보기' : '모자이크 보기'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Gallery */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">컬렉션</h2>
          <p className="text-white/70">아름다운 예술 작품들을 감상해보세요</p>
        </div>

        {/* Gallery Grid */}
        <div className={cn(
          "gap-6",
          viewMode === 'grid' 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            : "columns-1 sm:columns-2 lg:columns-3 space-y-6"
        )}>
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className={cn(
                "group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105 cursor-pointer",
                viewMode === 'masonry' && "break-inside-avoid mb-6"
              )}
              style={{
                animationDelay: `${index * 100}ms`
              }}
              onClick={() => handleImageClick(image)}
            >
              <div className="relative">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-semibold text-lg mb-1">{image.title}</h3>
                    <p className="text-white/80 text-sm">{image.artist}</p>
                  </div>
                  
                  <div className="absolute top-4 right-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(image.id);
                      }}
                      className={cn(
                        "p-2 rounded-full backdrop-blur-sm transition-colors",
                        likedImages.has(image.id)
                          ? "bg-red-500/80 text-white"
                          : "bg-white/20 text-white hover:bg-white/30"
                      )}
                    >
                      <Heart 
                        className={cn(
                          "h-4 w-4",
                          likedImages.has(image.id) && "fill-current"
                        )} 
                      />
                    </button>
                  </div>
                  
                  <div className="absolute top-4 left-4">
                    <ZoomIn className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>
              
              {/* Image Info */}
              <div className="p-4">
                <h3 className="text-white font-semibold mb-1">{image.title}</h3>
                <p className="text-white/70 text-sm mb-2">{image.artist} • {image.year}</p>
                <span className="inline-block px-2 py-1 bg-white/10 text-white/80 text-xs rounded-full">
                  {image.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 p-2 text-white hover:text-gray-300 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            
            {/* Image Container */}
            <div className="bg-white/5 backdrop-blur-md rounded-xl overflow-hidden border border-white/20">
              <div className="relative">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="w-full max-h-[60vh] object-contain"
                />
              </div>
              
              {/* Image Details */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">{selectedImage.title}</h2>
                    <p className="text-white/80 mb-1">작가: {selectedImage.artist}</p>
                    <p className="text-white/60 text-sm">제작년도: {selectedImage.year} • 장르: {selectedImage.category}</p>
                  </div>
                  
                  <button
                    onClick={() => toggleLike(selectedImage.id)}
                    className={cn(
                      "p-3 rounded-full transition-colors",
                      likedImages.has(selectedImage.id)
                        ? "bg-red-500/80 text-white"
                        : "bg-white/10 text-white hover:bg-white/20"
                    )}
                  >
                    <Heart 
                      className={cn(
                        "h-5 w-5",
                        likedImages.has(selectedImage.id) && "fill-current"
                      )} 
                    />
                  </button>
                </div>
                
                <p className="text-white/70 mb-6">{selectedImage.description}</p>
                
                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleDownload(selectedImage.src, selectedImage.title)}
                    className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <Download className="h-4 w-4 text-white" />
                    <span className="text-white text-sm">다운로드</span>
                  </button>
                  
                  <button
                    onClick={() => handleShare(selectedImage)}
                    className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <Share2 className="h-4 w-4 text-white" />
                    <span className="text-white text-sm">공유하기</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;