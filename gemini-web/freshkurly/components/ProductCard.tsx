
import React from 'react';
import { Product } from '../types';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const navigate = useNavigate();
  const discountedPrice = product.discountRate 
    ? Math.floor(product.price * (1 - product.discountRate / 100))
    : product.price;

  return (
    <div className="group cursor-pointer bg-white rounded-lg overflow-hidden transition-all duration-300">
      <div className="relative aspect-[4/5] overflow-hidden" onClick={() => navigate(`/product/${product.id}`)}>
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-kurly-purple hover:text-white transition-colors"
        >
          <i className="fa-solid fa-cart-plus"></i>
        </button>
        {product.discountRate && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {product.discountRate}% OFF
          </div>
        )}
      </div>
      <div className="p-3" onClick={() => navigate(`/product/${product.id}`)}>
        <p className="text-xs text-gray-500 mb-1">{product.isDawnDelivery ? '샛별배송' : '일반배송'}</p>
        <h3 className="text-sm font-medium line-clamp-2 mb-2 group-hover:text-purple-800 transition-colors">
          {product.name}
        </h3>
        <div className="flex items-baseline gap-1">
          <span className="text-lg font-bold">{discountedPrice.toLocaleString()}원</span>
          {product.discountRate && (
            <span className="text-xs text-gray-400 line-through">
              {product.price.toLocaleString()}원
            </span>
          )}
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          {product.tags.slice(0, 2).map(tag => (
            <span key={tag} className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
