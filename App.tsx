
import React, { useState, useEffect } from 'react';
import HeroSlider from './components/HeroSlider';
import IconMenu from './components/IconMenu';
import AITripPlanner from './components/AITripPlanner';
import VideoGallery from './components/VideoGallery';
import CommunityBoard from './components/CommunityBoard';
import ChatRoom from './components/ChatRoom';
import QuotationModal from './components/QuotationModal';
import AdminDashboard from './components/AdminDashboard';
import CategoryPage from './components/CategoryPage';
import BusinessPage from './components/BusinessPage';
import HotelVillaPage from './components/HotelVillaPage';
import GolfPage from './components/GolfPage';
import FoodPage from './components/FoodPage';
import CulturePage from './components/CulturePage';
import ForMenPage from './components/ForMenPage';
import TourPage from './components/TourPage';
import EventPage from './components/EventPage';
import { INITIAL_PRODUCTS, INITIAL_VIDEOS, INITIAL_POSTS, HERO_IMAGES, SUB_MENU_ITEMS, INITIAL_PAGE_CONTENTS } from './constants';
import { User, Product, VideoItem, CommunityPost, TripPlanResult, PageContent } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  
  // Routing State
  const [currentPage, setCurrentPage] = useState<'home' | 'admin' | 'category'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Lifted Content State (Dynamic Data)
  const [heroImages, setHeroImages] = useState<string[]>(HERO_IMAGES);
  const [menuItems, setMenuItems] = useState(SUB_MENU_ITEMS);
  
  // Persistence for products
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('tour_mgm_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  // Persistence for videos
  const [videos, setVideos] = useState<VideoItem[]>(() => {
    const saved = localStorage.getItem('tour_mgm_videos');
    return saved ? JSON.parse(saved) : INITIAL_VIDEOS;
  });

  const [posts, setPosts] = useState<CommunityPost[]>(() => {
    const saved = localStorage.getItem('tour_mgm_posts');
    return saved ? JSON.parse(saved) : INITIAL_POSTS;
  });

  // Persistence for Page Contents
  const [pageContents, setPageContents] = useState<Record<string, PageContent>>(() => {
    const saved = localStorage.getItem('tour_mgm_pages');
    return saved ? JSON.parse(saved) : INITIAL_PAGE_CONTENTS;
  });
  
  useEffect(() => {
    localStorage.setItem('tour_mgm_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('tour_mgm_videos', JSON.stringify(videos));
  }, [videos]);

  useEffect(() => {
    localStorage.setItem('tour_mgm_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('tour_mgm_pages', JSON.stringify(pageContents));
  }, [pageContents]);

  // Mock Users Database
  const [users, setUsers] = useState<User[]>([
    { id: 'admin', username: 'admin', role: 'admin', nickname: '관리자' },
    { id: 'u1', username: 'user1', role: 'user', nickname: '골프왕' },
    { id: 'u2', username: 'user2', role: 'user', nickname: '여행좋아' }
  ]);

  // Modal State
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
  const [generatedPlan, setGeneratedPlan] = useState<TripPlanResult | undefined>(undefined);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'rlathdud1~') {
      const adminUser = users.find(u => u.username === 'admin')!;
      setUser(adminUser);
      setShowAuthModal(false);
    } else {
       if (authMode === 'signup') {
         if (!nickname.trim()) {
           alert('닉네임을 입력해주세요.');
           return;
         }
         const newUser: User = { id: Date.now().toString(), username, role: 'user', nickname };
         setUsers([...users, newUser]);
         setUser(newUser);
         setShowAuthModal(false);
       } else {
         const existingUser = users.find(u => u.username === username);
         if (existingUser) {
           setUser(existingUser);
           setShowAuthModal(false);
         } else {
           alert('사용자 정보가 일치하지 않습니다.');
         }
       }
    }
  };

  const handleLogout = () => {
    setUser(null);
    setUsername('');
    setPassword('');
    setNickname('');
    setCurrentPage('home');
  };

  const handleProductClick = (id: string) => {
    const product = products.find(p => p.id === id);
    if (product) {
      setSelectedProduct(product);
    }
  };

  const handleMenuClick = (label: string) => {
    setSelectedCategory(label);
    setCurrentPage('category');
    window.scrollTo(0, 0);
  };

  const getFilteredProducts = () => {
    if (!selectedCategory) return [];
    if (selectedCategory === '추천 상품') return products;
    if (selectedCategory === '골프') return products.filter(p => p.type === 'golf');
    if (selectedCategory === '호텔&빌라') return products.filter(p => p.type === 'hotel');
    if (selectedCategory === '관광') return products.filter(p => p.type === 'tour');
    if (['이벤트', '베트남 문화', '먹거리', 'FOR MEN'].includes(selectedCategory)) return products;
    return [];
  };

  const isAdmin = user?.role === 'admin';

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <header className="sticky top-0 z-40 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
          <button onClick={() => setCurrentPage('home')} className="flex items-center gap-2 hover:opacity-80 transition">
             <div className="w-6 h-6 bg-gold-500 rounded-full flex items-center justify-center text-white font-bold text-xs">M</div>
             <h1 className="text-lg font-bold text-deepgreen tracking-tight">TOUR MGM</h1>
          </button>
          
          <nav className="flex gap-3 items-center">
            {isAdmin && (
              <button 
                onClick={() => setCurrentPage(currentPage === 'home' ? 'admin' : 'home')}
                className={`px-3 py-1 rounded font-bold text-xs transition ${
                  currentPage === 'admin' ? 'bg-deepgreen text-white' : 'bg-gray-100 text-deepgreen'
                }`}
              >
                {currentPage === 'home' ? '⚙️ 관리자' : '🏠 메인'}
              </button>
            )}

            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-600 hidden md:inline">
                  <span className="font-bold text-gold-600">{user.nickname}</span>님
                </span>
                <button onClick={handleLogout} className="text-xs text-gray-500 hover:text-red-500 underline">
                  로그아웃
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <button onClick={() => { setShowAuthModal(true); setAuthMode('login'); }} className="px-3 py-1 rounded-full border border-gold-500 text-gold-600 hover:bg-gold-50 text-xs font-medium">로그인</button>
                <button onClick={() => { setShowAuthModal(true); setAuthMode('signup'); }} className="px-3 py-1 rounded-full bg-gold-500 text-white hover:bg-gold-600 text-xs font-medium">회원가입</button>
              </div>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        {currentPage === 'admin' && isAdmin ? (
          <AdminDashboard 
            users={users} heroImages={heroImages} setHeroImages={setHeroImages}
            menuItems={menuItems} setMenuItems={setMenuItems} products={products} setProducts={setProducts}
            pageContents={pageContents} setPageContents={setPageContents}
          />
        ) : (
          <>
            {/* Home Page Content */}
            {currentPage === 'home' && (
              <>
                <HeroSlider images={heroImages} />
                <IconMenu items={menuItems} onItemClick={handleMenuClick} />
              </>
            )}

            {/* Category Page Content */}
            {currentPage === 'category' && selectedCategory ? (
              selectedCategory === '동영상' ? (
                <VideoGallery videos={videos} user={user} onUpdateVideos={setVideos} onReqLogin={() => setShowAuthModal(true)} onBack={() => setCurrentPage('home')} />
              ) : selectedCategory === '커뮤니티' ? (
                <CommunityBoard posts={posts} user={user} onUpdatePosts={setPosts} onReqLogin={() => setShowAuthModal(true)} onBack={() => setCurrentPage('home')} />
              ) : selectedCategory === '여행 만들기' ? (
                <AITripPlanner onPlanGenerated={(plan) => setGeneratedPlan(plan)} onBack={() => setCurrentPage('home')} />
              ) : selectedCategory === '비지니스' ? (
                <BusinessPage content={pageContents['business']} onBack={() => setCurrentPage('home')} />
              ) : selectedCategory === '호텔&빌라' ? (
                <HotelVillaPage content={pageContents['hotel']} onBack={() => setCurrentPage('home')} />
              ) : selectedCategory === '골프' ? (
                <GolfPage content={pageContents['golf']} onBack={() => setCurrentPage('home')} />
              ) : selectedCategory === '먹거리' ? (
                <FoodPage content={pageContents['food']} onBack={() => setCurrentPage('home')} />
              ) : selectedCategory === '베트남 문화' ? (
                <CulturePage content={pageContents['culture']} onBack={() => setCurrentPage('home')} />
              ) : selectedCategory === 'FOR MEN' ? (
                <ForMenPage content={pageContents['men']} onBack={() => setCurrentPage('home')} />
              ) : selectedCategory === '관광' ? (
                <TourPage content={pageContents['tour']} onBack={() => setCurrentPage('home')} />
              ) : selectedCategory === '이벤트' ? (
                <EventPage content={pageContents['event']} onBack={() => setCurrentPage('home')} />
              ) : (
                <CategoryPage category={selectedCategory} products={getFilteredProducts()} onProductClick={handleProductClick} onBack={() => setCurrentPage('home')} />
              )
            ) : null}
          </>
        )}
      </main>

      <footer className="bg-gray-800 text-gray-400 py-6">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="text-lg font-bold text-white mb-2">TOUR MGM 여행사</h2>
            <div className="space-y-1 text-sm">
               <p>주소: 59 LE VAN THIEM PMH Q7. HOCHIMINH VN</p>
               <p>전화번호: +84 77 803 8743</p>
               <p>이메일: seo9791@gmail.com</p>
               <p className="flex items-center gap-2"><span className="bg-yellow-400 text-black px-1 rounded text-xs font-bold">Kakao</span> 아이디: vnseen1</p>
            </div>
          </div>
          <div className="flex flex-col justify-end items-start md:items-end">
             <p className="text-xs mb-1">Copyright © TOUR MGM. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <ChatRoom user={user} onReqLogin={() => { setShowAuthModal(true); setAuthMode('login'); }} />

      {(selectedProduct || generatedPlan) && (
        <QuotationModal product={selectedProduct} plan={generatedPlan} onClose={() => { setSelectedProduct(undefined); setGeneratedPlan(undefined); }} />
      )}

      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-2xl relative">
            <button onClick={() => setShowAuthModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">✕</button>
            <h2 className="text-2xl font-bold text-center mb-6 text-deepgreen">{authMode === 'login' ? '로그인' : '회원가입'}</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-gold-500 outline-none" placeholder="아이디" />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-gold-500 outline-none" placeholder="비밀번호" />
              {authMode === 'signup' && <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-gold-500 outline-none" placeholder="닉네임" />}
              <button type="submit" className="w-full bg-gold-500 text-white font-bold py-3 rounded-lg hover:bg-gold-600 transition shadow-md">{authMode === 'login' ? '로그인 하기' : '가입 하기'}</button>
            </form>
            <div className="mt-4 text-center text-sm">
               <button onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')} className="text-deepgreen font-bold hover:underline">{authMode === 'login' ? '회원가입' : '로그인'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
