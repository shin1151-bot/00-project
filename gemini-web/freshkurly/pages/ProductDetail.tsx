
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { Product } from '../types';
import { getAiCuration } from '../services/geminiService';

interface ProductDetailProps {
  onAddToCart: (product: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ onAddToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [aiNote, setAiNote] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const found = PRODUCTS.find(p => p.id === id);
    if (found) {
      setProduct(found);
      loadCuration(found);
    } else {
      navigate('/');
    }
  }, [id, navigate]);

  const loadCuration = async (p: Product) => {
    setLoading(true);
    const note = await getAiCuration(p);
    setAiNote(note);
    setLoading(false);
  };

  if (!product) return null;

  const discountedPrice = product.discountRate 
    ? Math.floor(product.price * (1 - product.discountRate / 100))
    : product.price;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Product Image */}
        <div className="flex-1">
          <div className="rounded-xl overflow-hidden shadow-sm">
            <img src={product.image} alt={product.name} className="w-full object-cover aspect-square" />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col">
          <p className="text-gray-500 mb-2">{product.isDawnDelivery ? '샛별배송 (내일 새벽 도착 예정)' : '일반배송'}</p>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
          <p className="text-gray-500 mb-6">{product.description}</p>

          <div className="border-t border-b border-gray-100 py-6 mb-8">
            <div className="flex items-baseline gap-2 mb-1">
              {product.discountRate && (
                <span className="text-red-500 text-2xl font-bold">{product.discountRate}%</span>
              )}
              <span className="text-3xl font-bold">{discountedPrice.toLocaleString()}원</span>
            </div>
            {product.discountRate && (
              <p className="text-gray-400 line-through">{product.price.toLocaleString()}원</p>
            )}
          </div>

          {/* AI Curation Box */}
          <div className="bg-purple-50 rounded-xl p-6 mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-10">
              <i className="fa-solid fa-quote-right text-4xl text-purple-900"></i>
            </div>
            <h4 className="text-purple-900 font-bold mb-3 flex items-center gap-2">
              <i className="fa-solid fa-wand-magic-sparkles"></i> 큐레이터의 미식 노트
            </h4>
            {loading ? (
              <div className="animate-pulse space-y-2">
                <div className="h-4 bg-purple-200 rounded w-3/4"></div>
                <div className="h-4 bg-purple-200 rounded w-1/2"></div>
              </div>
            ) : (
              <p className="text-purple-800 text-sm leading-relaxed whitespace-pre-wrap">
                {aiNote}
              </p>
            )}
          </div>

          <div className="mt-auto flex gap-4">
            <button className="flex-shrink-0 w-14 h-14 border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
              <i className="fa-regular fa-heart text-xl text-gray-400"></i>
            </button>
            <button 
              onClick={() => onAddToCart(product)}
              className="flex-1 bg-kurly-purple text-white font-bold rounded-lg hover:bg-purple-900 transition-colors h-14"
            >
              장바구니 담기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
