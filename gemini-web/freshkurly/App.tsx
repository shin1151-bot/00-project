
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Search from './pages/Search';
import { CartItem, Product } from './types';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleAddToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    // Visual feedback could be added here
    alert(`${product.name} 상품이 장바구니에 담겼습니다.`);
  };

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} />
        
        <main>
          <Routes>
            <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />
            <Route path="/product/:id" element={<ProductDetail onAddToCart={handleAddToCart} />} />
            <Route path="/search" element={<Search onAddToCart={handleAddToCart} />} />
            <Route path="/cart" element={
              <div className="max-w-4xl mx-auto px-4 py-20 text-center">
                <h2 className="text-2xl font-bold mb-6">장바구니 준비 중</h2>
                <p className="text-gray-500 mb-8">주문 기능이 곧 업데이트될 예정입니다.</p>
                <div className="text-left bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold mb-4">현재 담긴 상품 ({cart.length})</h3>
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between py-2 border-b border-gray-200">
                      <span>{item.name} x {item.quantity}</span>
                      <span className="font-bold">{(item.price * item.quantity).toLocaleString()}원</span>
                    </div>
                  ))}
                  <div className="mt-4 pt-4 border-t border-gray-300 text-right">
                    <span className="text-xl font-bold">합계: {cart.reduce((s, i) => s + (i.price * i.quantity), 0).toLocaleString()}원</span>
                  </div>
                </div>
              </div>
            } />
          </Routes>
        </main>

        <footer className="bg-gray-100 border-t border-gray-200 py-12 mt-20">
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-600">
            <div>
              <h3 className="font-bold text-gray-900 mb-4">고객행복센터</h3>
              <p className="text-2xl font-bold text-gray-900 mb-2">1644-1107</p>
              <p className="mb-4">월~토요일 오전 7시 - 오후 6시</p>
              <button className="border border-gray-300 px-4 py-2 rounded">카톡 상담하기</button>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4">법인정보</h3>
              <p>주식회사 프레시컬리 | 대표자 : 김프레시</p>
              <p>사업자등록번호 : 123-45-67890</p>
              <p>통신판매업신고 : 2024-서울강남-0000</p>
              <p>주소 : 서울특별시 강남구 테헤란로 123</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4">SNS</h3>
              <div className="flex gap-4 text-xl">
                <i className="fa-brands fa-instagram cursor-pointer hover:text-purple-600"></i>
                <i className="fa-brands fa-facebook cursor-pointer hover:text-purple-600"></i>
                <i className="fa-brands fa-youtube cursor-pointer hover:text-purple-600"></i>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
