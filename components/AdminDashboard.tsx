
import React, { useState, useRef } from 'react';
import { User, Product, PageContent } from '../types';
import { INITIAL_PAGE_CONTENTS } from '../constants';

interface MenuItem {
  label: string;
  icon: string;
}

interface Props {
  users: User[];
  heroImages: string[];
  setHeroImages: (images: string[]) => void;
  menuItems: MenuItem[];
  setMenuItems: (items: MenuItem[]) => void;
  products: Product[];
  setProducts: (products: Product[]) => void;
  pageContents: Record<string, PageContent>;
  setPageContents: (contents: Record<string, PageContent>) => void;
}

const AdminDashboard: React.FC<Props> = ({
  users,
  heroImages,
  setHeroImages,
  menuItems,
  setMenuItems,
  products,
  setProducts,
  pageContents,
  setPageContents
}) => {
  const [activeTab, setActiveTab] = useState<'users' | 'hero' | 'menu' | 'products' | 'pages'>('users');
  
  // Hero Image State
  const [newImageUrl, setNewImageUrl] = useState('');
  const heroFileInputRef = useRef<HTMLInputElement>(null);

  // Product Form State
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productForm, setProductForm] = useState<Partial<Product>>({
    title: '', price: 0, location: '', duration: '3박 5일', description: '', image: '', type: 'golf'
  });
  const [itineraryText, setItineraryText] = useState('');
  const productFileInputRef = useRef<HTMLInputElement>(null);

  // Page Content Edit State
  const [selectedPageId, setSelectedPageId] = useState<string>('business');
  const [pageForm, setPageForm] = useState<PageContent>(pageContents['business'] || INITIAL_PAGE_CONTENTS['business']);
  const pageHeroInputRef = useRef<HTMLInputElement>(null);
  const pageIntroInputRef = useRef<HTMLInputElement>(null);

  // --- Helper: Handle File Upload (Base64) ---
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          callback(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMenuFileUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    handleFileUpload(e, (base64Url) => {
      const newItems = [...menuItems];
      newItems[index] = { ...newItems[index], icon: base64Url };
      setMenuItems(newItems);
    });
  };

  // --- 1. User Export ---
  const handleExportUsers = () => {
    const header = ['ID,Username,Nickname,Role'];
    const rows = users.map(u => `${u.id},${u.username},${u.nickname},${u.role}`);
    const csvContent = "data:text/csv;charset=utf-8," + [header, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "tour_mgm_users.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- 2. Hero Images ---
  const handleAddHeroImageURL = () => {
    if (newImageUrl) {
      setHeroImages([...heroImages, newImageUrl]);
      setNewImageUrl('');
    }
  };

  const handleHeroFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileUpload(e, (base64Url) => {
      setHeroImages([...heroImages, base64Url]);
      if (heroFileInputRef.current) heroFileInputRef.current.value = ''; // Reset input
    });
  };

  const handleDeleteImage = (index: number) => {
    if (confirm('이 이미지를 삭제하시겠습니까?')) {
      setHeroImages(heroImages.filter((_, i) => i !== index));
    }
  };

  // --- 3. Menu Items ---
  const handleMenuChange = (index: number, field: keyof MenuItem, value: string) => {
    const newItems = [...menuItems];
    newItems[index] = { ...newItems[index], [field]: value };
    setMenuItems(newItems);
  };

  // --- 4. Products ---
  const resetProductForm = () => {
    setProductForm({ title: '', price: 0, location: '', duration: '3박 5일', description: '', image: '', type: 'golf' });
    setItineraryText('');
    setEditingProductId(null);
    if (productFileInputRef.current) productFileInputRef.current.value = '';
  };

  const handleOpenAddProduct = () => {
    resetProductForm();
    setShowProductForm(true);
  };

  const handleEditProduct = (product: Product) => {
    setProductForm({ ...product });
    if (product.itinerary && product.itinerary.length > 0) {
      const text = product.itinerary
        .map(day => `${day.day}일차: ${day.activities.join(', ')}`)
        .join('\n');
      setItineraryText(text);
    } else {
      setItineraryText('');
    }
    setEditingProductId(product.id);
    setShowProductForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteProduct = (id: string) => {
    if(confirm('이 상품을 삭제하시겠습니까?')) {
        setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleProductImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileUpload(e, (base64Url) => {
      setProductForm(prev => ({ ...prev, image: base64Url }));
    });
  };

  const handleSaveProduct = () => {
      if(!productForm.title || !productForm.price) {
        alert('상품명과 가격은 필수입니다.');
        return;
      }

      let parsedItinerary = (productForm as Product).itinerary || [];
      if (itineraryText.trim()) {
        parsedItinerary = itineraryText.split('\n').map(line => {
          const match = line.match(/^(\d+)(일차|일|Day)?[:\s]*(.*)/i);
          if (match) {
             const day = parseInt(match[1]);
             const activities = match[3]
                .split(/,|،/)
                .map(s => s.trim())
                .filter(s => s.length > 0);
             return { day, activities };
          }
          return null;
        }).filter(item => item !== null) as { day: number; activities: string[] }[];
      }

      const finalProduct: Product = {
          id: editingProductId || Date.now().toString(),
          title: productForm.title!,
          description: productForm.description || '',
          price: productForm.price!,
          location: productForm.location || '호치민',
          duration: productForm.duration || '3박 5일',
          image: productForm.image || 'https://picsum.photos/seed/new/800/600',
          type: productForm.type || 'golf',
          itinerary: parsedItinerary.length > 0 ? parsedItinerary : undefined
      };

      if (editingProductId) {
        setProducts(products.map(p => p.id === editingProductId ? finalProduct : p));
        alert('상품이 수정되었습니다.');
      } else {
        setProducts([finalProduct, ...products]);
        alert('새 상품이 등록되었습니다.');
      }
      setShowProductForm(false);
      resetProductForm();
  };

  // --- 5. Page Content Management ---
  const handlePageSelect = (pageId: string) => {
    setSelectedPageId(pageId);
    setPageForm({ ...pageContents[pageId] });
  };

  const handlePageChange = (field: keyof PageContent, value: string) => {
    setPageForm(prev => ({ ...prev, [field]: value }));
  };

  const handlePageImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'heroImage' | 'introImage') => {
    handleFileUpload(e, (base64Url) => {
      setPageForm(prev => ({ ...prev, [field]: base64Url }));
    });
  };

  const handleGalleryImageUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    handleFileUpload(e, (base64Url) => {
        const newGallery = [...pageForm.galleryImages];
        if(index < newGallery.length) {
            newGallery[index] = base64Url;
        } else {
            newGallery.push(base64Url);
        }
        setPageForm(prev => ({ ...prev, galleryImages: newGallery }));
    });
  };

  const handleSavePageContent = () => {
    setPageContents({
      ...pageContents,
      [selectedPageId]: pageForm
    });
    alert(`${pageForm.title} 페이지가 업데이트되었습니다.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 relative">
      <h1 className="text-3xl font-bold text-deepgreen mb-8 flex items-center gap-2">
         <span className="text-4xl">🛠️</span> TOUR MGM 관리자 페이지
      </h1>
      
      {/* Navigation Tabs */}
      <div className="flex gap-2 mb-8 border-b-2 border-gray-100 overflow-x-auto pb-1 scrollbar-hide">
        {[
          { id: 'users', label: '👥 회원 관리' },
          { id: 'hero', label: '🖼️ 메인 슬라이드' },
          { id: 'menu', label: '🔘 메뉴 관리' },
          { id: 'products', label: '🛍️ 상품 관리' },
          { id: 'pages', label: '📄 서브 페이지 관리' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-3 font-bold rounded-t-xl transition-all whitespace-nowrap ${
              activeTab === tab.id 
                ? 'bg-deepgreen text-white shadow-lg -translate-y-1' 
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 min-h-[600px]">
        {activeTab === 'users' && (
          <div className="animate-fade-in-up">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">가입 회원 목록 <span className="text-sm font-normal text-gray-500">({users.length}명)</span></h3>
              <button onClick={handleExportUsers} className="bg-green-600 text-white px-5 py-2.5 rounded-lg font-bold hover:bg-green-700 shadow-md transition">엑셀(CSV) 다운로드</button>
            </div>
            <div className="overflow-x-auto rounded-xl border border-gray-100">
              <table className="w-full border-collapse">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-4 border-b text-left text-sm font-bold text-gray-600">ID</th>
                    <th className="p-4 border-b text-left text-sm font-bold text-gray-600">아이디</th>
                    <th className="p-4 border-b text-left text-sm font-bold text-gray-600">닉네임</th>
                    <th className="p-4 border-b text-left text-sm font-bold text-gray-600">권한</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {users.map(u => (
                    <tr key={u.id} className="hover:bg-gray-50 transition">
                      <td className="p-4 text-sm text-gray-500">{u.id}</td>
                      <td className="p-4 text-sm font-bold text-gray-800">{u.username}</td>
                      <td className="p-4 text-sm text-gray-700">{u.nickname || '-'}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-[10px] font-bold ${u.role === 'admin' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                          {u.role.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'hero' && (
           <div className="animate-fade-in-up">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">메인 이미지 관리</h3>
            <div className="mb-8 p-6 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
              <h4 className="font-bold mb-4 text-gray-700 flex items-center gap-2"><span>➕</span> 새 이미지 추가</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">이미지 URL 주소</label>
                    <div className="flex gap-2">
                      <input className="flex-1 border p-3 rounded-lg focus:ring-2 focus:ring-gold-500 outline-none" placeholder="https://..." value={newImageUrl} onChange={e => setNewImageUrl(e.target.value)} />
                      <button onClick={handleAddHeroImageURL} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">추가</button>
                    </div>
                  </div>
                  <div className="relative flex items-center py-2">
                    <div className="flex-grow border-t border-gray-200"></div>
                    <span className="flex-shrink mx-4 text-gray-400 text-xs font-bold">OR</span>
                    <div className="flex-grow border-t border-gray-200"></div>
                  </div>
                  <div>
                     <label className="block text-xs font-bold text-gray-500 mb-1">파일 업로드</label>
                     <input type="file" accept="image/*" ref={heroFileInputRef} onChange={handleHeroFileUpload} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gold-50 file:text-gold-700 hover:file:bg-gold-100 cursor-pointer" />
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-center min-h-[200px]">
                   {newImageUrl ? (
                      <img src={newImageUrl} className="max-h-40 rounded shadow-md" alt="Preview" />
                   ) : (
                      <p className="text-gray-400 text-sm">이미지 미리보기가 여기에 표시됩니다.</p>
                   )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {heroImages.map((img, idx) => (
                <div key={idx} className="relative group rounded-2xl overflow-hidden shadow-lg border border-gray-100 aspect-video">
                  <img src={img} alt="Hero" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                    <button onClick={() => handleDeleteImage(idx)} className="bg-red-600 text-white px-6 py-2.5 rounded-full font-bold hover:bg-red-700 transition transform scale-90 group-hover:scale-100">🗑️ 삭제하기</button>
                  </div>
                  <div className="absolute bottom-2 left-2 bg-black/50 text-white text-[10px] px-2 py-1 rounded">슬라이드 {idx + 1}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'menu' && (
           <div className="animate-fade-in-up">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">서브 메뉴 아이콘 및 명칭 관리</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {menuItems.map((item, idx) => (
                <div key={idx} className="border border-gray-100 p-6 rounded-2xl bg-gray-50 hover:shadow-md transition">
                  <div className="w-24 h-24 mx-auto mb-6 bg-white rounded-3xl shadow-sm border border-gray-200 flex items-center justify-center p-3 relative group">
                     <img src={item.icon} alt={item.label} className="w-full h-full object-contain" />
                     <label className="absolute inset-0 bg-black/40 rounded-3xl opacity-0 group-hover:opacity-100 transition flex items-center justify-center cursor-pointer">
                        <span className="text-white text-[10px] font-bold">변경</span>
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleMenuFileUpload(e, idx)} />
                     </label>
                  </div>
                  <div className="space-y-4">
                    <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Label Name</label>
                        <input className="w-full border-b-2 border-gray-200 bg-transparent py-2 font-bold text-gray-800 focus:border-gold-500 outline-none transition" value={item.label} onChange={(e) => handleMenuChange(idx, 'label', e.target.value)} />
                    </div>
                    <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Icon URL</label>
                        <input className="w-full border-b border-gray-200 bg-transparent py-1 text-xs text-gray-500 focus:border-gold-500 outline-none truncate" value={item.icon} onChange={(e) => handleMenuChange(idx, 'icon', e.target.value)} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'products' && (
           <div className="animate-fade-in-up">
            <div className="flex justify-between items-center mb-8 border-b pb-4">
               <h3 className="text-2xl font-bold text-gray-800">여행 상품 카탈로그</h3>
               <button 
                 onClick={() => { if (showProductForm) { setShowProductForm(false); resetProductForm(); } else { handleOpenAddProduct(); } }} 
                 className={`px-6 py-3 rounded-xl font-bold text-white transition-all shadow-lg ${showProductForm ? 'bg-gray-500 hover:bg-gray-600' : 'bg-gold-500 hover:bg-gold-600'}`}
               >
                 {showProductForm ? '✖ 취소' : '➕ 새 상품 등록'}
               </button>
            </div>

            {showProductForm && (
              <div className="bg-gold-50/50 p-8 rounded-2xl mb-12 border-2 border-gold-200 shadow-xl animate-fade-in-down">
                <h4 className="text-xl font-bold mb-6 text-deepgreen flex items-center gap-2">
                   <span>📦</span> {editingProductId ? '상품 정보 업데이트' : '신규 상품 기본 정보 입력'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                   <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-gray-500 mb-1">상품 타이틀</label>
                      <input className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-gold-500 outline-none" value={productForm.title} onChange={e=>setProductForm({...productForm, title: e.target.value})} placeholder="예: 호치민 VIP 골프 3박 5일" />
                   </div>
                   <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1">판매 가격 (원)</label>
                      <input type="number" className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-gold-500 outline-none" value={productForm.price || ''} onChange={e=>setProductForm({...productForm, price: parseInt(e.target.value)})} placeholder="0" />
                   </div>
                   <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1">지역</label>
                      <input className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-gold-500 outline-none" value={productForm.location} onChange={e=>setProductForm({...productForm, location: e.target.value})} placeholder="호치민, 붕따우 등" />
                   </div>
                   <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1">여행 기간</label>
                      <input className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-gold-500 outline-none" value={productForm.duration} onChange={e=>setProductForm({...productForm, duration: e.target.value})} placeholder="3박 5일" />
                   </div>
                   <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1">카테고리</label>
                      <select className="w-full border p-3 rounded-lg bg-white outline-none focus:ring-2 focus:ring-gold-500" value={productForm.type} onChange={e=>setProductForm({...productForm, type: e.target.value as any})}>
                          <option value="golf">⛳ 골프 투어</option>
                          <option value="tour">🏞️ 일반 관광</option>
                          <option value="hotel">🏨 호텔/풀빌라 전용</option>
                      </select>
                   </div>
                   <div className="md:col-span-3">
                      <label className="block text-xs font-bold text-gray-500 mb-1">메인 대표 이미지</label>
                      <div className="flex flex-col md:flex-row gap-4 items-center">
                         <input className="flex-1 w-full border p-3 rounded-lg text-sm" placeholder="URL 입력" value={productForm.image} onChange={e=>setProductForm({...productForm, image: e.target.value})} />
                         <span className="text-gray-400 font-bold">OR</span>
                         <input type="file" accept="image/*" ref={productFileInputRef} onChange={handleProductImageUpload} className="w-full text-xs" />
                      </div>
                   </div>
                   <div className="md:col-span-3">
                      <label className="block text-xs font-bold text-gray-500 mb-1">상세 일정 정보 (일차별)</label>
                      <textarea className="w-full border p-3 rounded-lg h-32 font-mono text-xs bg-white" placeholder="1일차: 도착 및 미팅&#10;2일차: 골프 라운딩 및 석식" value={itineraryText} onChange={e=>setItineraryText(e.target.value)} />
                   </div>
                   <div className="md:col-span-3">
                      <label className="block text-xs font-bold text-gray-500 mb-1">상품 간략 설명</label>
                      <textarea className="w-full border p-3 rounded-lg h-24 outline-none focus:ring-2 focus:ring-gold-500" value={productForm.description} onChange={e=>setProductForm({...productForm, description: e.target.value})} placeholder="고객에게 노출될 간략한 상품 요약 내용을 입력하세요." />
                   </div>
                </div>
                <div className="flex gap-4">
                   <button onClick={handleSaveProduct} className="flex-1 bg-deepgreen text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition transform active:scale-95">{editingProductId ? '수정된 정보로 저장' : '새로운 상품 등록 완료'}</button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.map(p => (
                <div key={p.id} className="group flex items-center border border-gray-100 p-4 rounded-2xl bg-white hover:shadow-lg transition gap-4 relative overflow-hidden">
                  <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                    <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" alt={p.title} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                       <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${p.type === 'golf' ? 'bg-green-100 text-green-700' : p.type === 'hotel' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}`}>
                          {p.type.toUpperCase()}
                       </span>
                       <span className="text-[10px] text-gray-400 font-bold">{p.location}</span>
                    </div>
                    <h4 className="font-bold text-gray-800 truncate mb-1">{p.title}</h4>
                    <p className="text-sm font-bold text-red-600">{p.price.toLocaleString()}원</p>
                  </div>
                  <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition duration-300">
                    <button onClick={() => handleEditProduct(p)} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition">
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                    </button>
                    <button onClick={() => handleDeleteProduct(p.id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition">
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'pages' && (
          <div className="animate-fade-in-up">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
               <div>
                  <h3 className="text-2xl font-bold text-gray-800">서브 페이지 상세 컨텐츠 관리</h3>
                  <p className="text-sm text-gray-500 mt-1">서브 메뉴(골프, 호텔 등) 클릭 시 나타나는 모든 텍스트와 이미지를 개별 편집합니다.</p>
               </div>
               <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-xl border border-gray-200 w-full md:w-auto">
                 <span className="text-xs font-bold text-gray-400 ml-2">편집할 페이지 선택:</span>
                 <select 
                   className="p-3 bg-white border border-gray-200 rounded-lg font-bold text-deepgreen shadow-sm outline-none focus:ring-2 focus:ring-gold-500"
                   value={selectedPageId}
                   onChange={(e) => handlePageSelect(e.target.value)}
                 >
                   {Object.values(pageContents).map((page: PageContent) => (
                     <option key={page.id} value={page.id}>{page.title}</option>
                   ))}
                 </select>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
               {/* Hero Section Edit */}
               <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                  <h4 className="text-lg font-bold text-deepgreen border-b-2 border-gold-200 pb-2 flex items-center gap-2">
                     <span>🌄</span> 1. 상단 배너 섹션
                  </h4>
                  <div className="space-y-4">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                           <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Hero Title</label>
                           <input className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-gold-500" value={pageForm.heroTitle} onChange={(e) => handlePageChange('heroTitle', e.target.value)} />
                        </div>
                        <div>
                           <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Hero Subtitle</label>
                           <input className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-gold-500" value={pageForm.heroSubtitle} onChange={(e) => handlePageChange('heroSubtitle', e.target.value)} />
                        </div>
                     </div>
                     <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Banner Background Image</label>
                        <input className="w-full p-2 border rounded-t-lg text-xs bg-gray-50" value={pageForm.heroImage} onChange={(e) => handlePageChange('heroImage', e.target.value)} />
                        <div className="relative group cursor-pointer border-x border-b border-gray-200 rounded-b-lg overflow-hidden h-40">
                           <img src={pageForm.heroImage} className="w-full h-full object-cover" alt="Hero Preview" />
                           <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-xs font-bold cursor-pointer">
                              이미지 파일 교체
                              <input type="file" onChange={(e) => handlePageImageUpload(e, 'heroImage')} className="hidden" accept="image/*" />
                           </label>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Intro Section Edit */}
               <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                  <h4 className="text-lg font-bold text-deepgreen border-b-2 border-gold-200 pb-2 flex items-center gap-2">
                     <span>📝</span> 2. 페이지 소개 섹션
                  </h4>
                  <div className="space-y-4">
                     <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Intro Title</label>
                        <input className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-gold-500" value={pageForm.introTitle} onChange={(e) => handlePageChange('introTitle', e.target.value)} />
                     </div>
                     <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Intro Description</label>
                        <textarea className="w-full p-3 border rounded-lg h-32 outline-none focus:ring-2 focus:ring-gold-500 resize-none text-sm" value={pageForm.introText} onChange={(e) => handlePageChange('introText', e.target.value)} />
                     </div>
                     <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Intro Highlight Image</label>
                        <div className="flex gap-4">
                           <div className="flex-1 space-y-2">
                              <input className="w-full p-2 border rounded text-xs bg-gray-50" value={pageForm.introImage} onChange={(e) => handlePageChange('introImage', e.target.value)} />
                              <label className="block w-full text-center py-2 border-2 border-dashed border-gray-200 rounded-lg text-xs font-bold text-gray-400 hover:bg-gray-50 cursor-pointer">
                                 파일에서 선택
                                 <input type="file" onChange={(e) => handlePageImageUpload(e, 'introImage')} className="hidden" accept="image/*" />
                              </label>
                           </div>
                           <div className="w-32 h-24 bg-gray-100 rounded-lg overflow-hidden shrink-0 border border-gray-200">
                              <img src={pageForm.introImage} className="w-full h-full object-cover" alt="Intro Preview" />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Manageable Sections (The "Core" added content) */}
               <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                  <h4 className="text-lg font-bold text-deepgreen border-b-2 border-gold-200 pb-2 mb-6 flex items-center justify-between">
                     <span className="flex items-center gap-2"><span>📂</span> 3. 상세 내용 섹션 (무제한 텍스트 블록)</span>
                     <button 
                        onClick={() => setPageForm({ ...pageForm, sections: [...pageForm.sections, { title: '', content: '' }] })}
                        className="text-[10px] bg-gold-500 text-white px-3 py-1.5 rounded-full hover:bg-gold-600 transition"
                     >+ 섹션 추가</button>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {pageForm.sections.map((section, idx) => (
                      <div key={idx} className="p-6 bg-gray-50 rounded-2xl border border-gray-200 relative group animate-fade-in-up">
                        <button 
                          onClick={() => {
                            const newSections = pageForm.sections.filter((_, i) => i !== idx);
                            setPageForm({ ...pageForm, sections: newSections });
                          }}
                          className="absolute -top-3 -right-3 bg-red-500 text-white w-8 h-8 rounded-full text-sm shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 z-10"
                        >✕</button>
                        <div className="space-y-4">
                           <div>
                              <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">Section {idx + 1} Title</label>
                              <input 
                                 className="w-full bg-white border border-gray-200 p-3 rounded-lg text-sm font-bold focus:ring-2 focus:ring-gold-500 outline-none" 
                                 placeholder="제목을 입력하세요" 
                                 value={section.title} 
                                 onChange={(e) => {
                                    const newSections = [...pageForm.sections];
                                    newSections[idx] = { ...newSections[idx], title: e.target.value };
                                    setPageForm({ ...pageForm, sections: newSections });
                                 }}
                              />
                           </div>
                           <div>
                              <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">Section {idx + 1} Content</label>
                              <textarea 
                                 className="w-full p-3 border border-gray-200 rounded-lg text-xs min-h-[100px] bg-white outline-none focus:ring-2 focus:ring-gold-500 resize-none" 
                                 placeholder="본문 내용을 상세히 입력하세요" 
                                 value={section.content} 
                                 onChange={(e) => {
                                    const newSections = [...pageForm.sections];
                                    newSections[idx] = { ...newSections[idx], content: e.target.value };
                                    setPageForm({ ...pageForm, sections: newSections });
                                 }}
                              />
                           </div>
                        </div>
                      </div>
                    ))}
                    {pageForm.sections.length === 0 && (
                       <div className="md:col-span-2 py-10 text-center border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 font-bold">
                          등록된 상세 섹션이 없습니다. 위 버튼을 눌러 추가해주세요.
                       </div>
                    )}
                  </div>
               </div>

               {/* Gallery Edit */}
               <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                  <h4 className="text-lg font-bold text-deepgreen border-b-2 border-gold-200 pb-2 mb-6 flex items-center justify-between">
                     <span className="flex items-center gap-2"><span>🖼️</span> 4. 이미지 갤러리</span>
                     <button 
                        onClick={() => setPageForm(prev => ({ ...prev, galleryImages: [...prev.galleryImages, 'https://via.placeholder.com/800x600?text=TOUR+MGM+NEW+IMAGE'] }))}
                        className="text-[10px] bg-gold-500 text-white px-3 py-1.5 rounded-full hover:bg-gold-600 transition"
                     >+ 이미지 칸 추가</button>
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                     {pageForm.galleryImages.map((img, idx) => (
                        <div key={idx} className="group relative aspect-square bg-gray-50 border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                           <img src={img} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" alt={`Gallery ${idx}`} />
                           <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                              <label className="text-[9px] bg-white text-black px-2 py-1 rounded cursor-pointer font-bold w-full text-center">
                                 교체
                                 <input type="file" onChange={(e) => handleGalleryImageUpload(e, idx)} className="hidden" accept="image/*" />
                              </label>
                              <button 
                                 onClick={() => {
                                    const newGallery = pageForm.galleryImages.filter((_, i) => i !== idx);
                                    setPageForm({ ...pageForm, galleryImages: newGallery });
                                 }}
                                 className="text-[9px] bg-red-600 text-white px-2 py-1 rounded font-bold w-full"
                              >삭제</button>
                           </div>
                           <div className="absolute top-1 left-1 bg-black/30 text-white text-[8px] px-1 rounded">{idx + 1}</div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            <div className="mt-12 flex justify-center">
               <button 
                 onClick={handleSavePageContent}
                 className="bg-deepgreen text-white px-12 py-5 rounded-2xl font-bold text-xl hover:bg-black shadow-2xl transition transform hover:-translate-y-1 flex items-center gap-3 active:scale-95"
               >
                 <span>💾</span> {pageForm.title} 페이지 변경사항 최종 저장
               </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
