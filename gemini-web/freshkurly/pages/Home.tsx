
import React from 'react';
import { PRODUCTS, CATEGORIES } from '../constants';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';

interface HomeProps {
  onAddToCart: (product: Product) => void;
}

const Home: React.FC<HomeProps> = ({ onAddToCart }) => {
  return (
    <div className="pb-20">
      {/* Main Hero Banner */}
      <section className="relative h-[300px] md:h-[450px] overflow-hidden bg-purple-900">
        <img 
          src="https://picsum.photos/seed/kurly-banner/1200/600" 
          alt="Main Banner" 
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            새벽을 여는 가장 신선한 방법
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8">
            엄선된 프리미엄 먹거리를 내일 아침 문 앞으로
          </p>
          <button className="bg-white text-purple-900 px-8 py-3 rounded-full font-bold hover:bg-purple-100 transition-colors">
            오늘의 특가 보기
          </button>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 mt-12">
        {/* Categories Scroller */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            카테고리별 탐색
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {CATEGORIES.map(cat => (
              <div 
                key={cat.id} 
                className="flex-shrink-0 w-24 flex flex-col items-center gap-2 cursor-pointer group"
              >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:bg-purple-50 transition-colors border border-gray-100">
                  <i className={`fa-solid ${cat.icon} text-2xl kurly-purple`}></i>
                </div>
                <span className="text-sm font-medium text-gray-700">{cat.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* This Week's Recommendation */}
        <section className="mb-16">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-1">놓치면 후회할 베스트</h2>
              <p className="text-gray-500">지금 가장 사랑받는 상품들을 만나보세요</p>
            </div>
            <button className="text-purple-600 font-medium flex items-center gap-1 hover:underline">
              전체보기 <i className="fa-solid fa-chevron-right text-xs"></i>
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
            {PRODUCTS.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={onAddToCart} 
              />
            ))}
          </div>
        </section>

        {/* Featured Section */}
        <section className="bg-purple-50 rounded-2xl p-8 md:p-12 mb-16 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <span className="inline-block bg-purple-200 text-purple-800 text-xs font-bold px-3 py-1 rounded-full mb-4">
              AI FRESH PICK
            </span>
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              오늘 당신의 기분에 맞는<br/>식탁을 추천해드려요
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              "지친 하루 끝에 힐링이 필요할 때", "친구들과 함께하는 활기찬 저녁"<br/>
              어떤 순간이든 FreshKurly AI가 최고의 미식 경험을 찾아드립니다.
            </p>
            <button className="bg-kurly-purple text-white px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity">
              AI 큐레이션 시작하기
            </button>
          </div>
          <div className="flex-1 w-full max-w-sm">
            <img 
              src="https://picsum.photos/seed/fresh-food/500/500" 
              alt="Fresh Selection" 
              className="rounded-2xl shadow-xl rotate-3"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
