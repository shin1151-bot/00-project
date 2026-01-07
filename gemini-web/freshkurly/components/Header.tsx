
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  cartCount: number;
}

const Header: React.FC<HeaderProps> = ({ cartCount }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => navigate('/')} 
          className="cursor-pointer text-2xl font-bold kurly-purple tracking-tight flex items-center"
        >
          <span className="bg-kurly-purple text-white px-2 rounded mr-1">F</span>
          <span>FreshKurly</span>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-8 relative hidden md:block">
          <input
            type="text"
            placeholder="AI에게 무엇이든 물어보세요 (예: 주말 홈파티 메뉴 추천)"
            className="w-full bg-gray-100 border-none rounded-full py-2.5 px-6 focus:ring-2 focus:ring-purple-200 transition-all outline-none text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="absolute right-4 top-2.5 text-gray-400 hover:text-purple-600">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>

        {/* Icons */}
        <div className="flex items-center space-gap-6 gap-6">
          <button className="text-gray-600 hover:text-purple-700 relative">
            <i className="fa-regular fa-heart text-xl"></i>
          </button>
          <button 
            onClick={() => navigate('/cart')}
            className="text-gray-600 hover:text-purple-700 relative"
          >
            <i className="fa-solid fa-cart-shopping text-xl"></i>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-kurly-purple text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
          <button className="md:hidden text-gray-600">
            <i className="fa-solid fa-bars text-xl"></i>
          </button>
        </div>
      </div>
      
      {/* Category Nav */}
      <nav className="bg-white border-t border-gray-100 hidden md:block">
        <div className="max-w-6xl mx-auto px-4 flex items-center gap-10 py-3 text-sm font-medium">
          <button className="kurly-purple flex items-center gap-2">
            <i className="fa-solid fa-bars"></i> 전체 카테고리
          </button>
          <button className="hover:text-purple-700">신상품</button>
          <button className="hover:text-purple-700">베스트</button>
          <button className="hover:text-purple-700">알뜰쇼핑</button>
          <button className="hover:text-purple-700">특가/혜택</button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
