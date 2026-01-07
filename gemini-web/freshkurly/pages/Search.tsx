
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { searchWithAi } from '../services/geminiService';

interface SearchProps {
  onAddToCart: (product: Product) => void;
}

const Search: React.FC<SearchProps> = ({ onAddToCart }) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<Product[]>([]);
  const [aiMsg, setAiMsg] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const performSearch = async () => {
      setIsSearching(true);
      
      // Basic match
      const basicResults = PRODUCTS.filter(p => 
        p.name.includes(query) || 
        p.description.includes(query) || 
        p.category.includes(query)
      );

      // AI recommendation
      const aiResult = await searchWithAi(query, PRODUCTS);
      
      const suggestedItems = PRODUCTS.filter(p => aiResult.suggestedProducts.includes(p.id));
      
      // Merge results, removing duplicates
      const finalResults = Array.from(new Set([...basicResults, ...suggestedItems]));
      
      setResults(finalResults);
      setAiMsg(aiResult.message);
      setIsSearching(false);
    };

    if (query) {
      performSearch();
    }
  }, [query]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-2xl font-bold mb-2">
          '{query}' 검색 결과
        </h1>
        {isSearching ? (
          <div className="flex items-center gap-3 text-purple-600 animate-pulse">
            <i className="fa-solid fa-spinner fa-spin"></i>
            <span>AI가 최적의 미식 조합을 찾는 중입니다...</span>
          </div>
        ) : (
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <p className="text-purple-900 font-medium">
              <i className="fa-solid fa-robot mr-2"></i> {aiMsg}
            </p>
          </div>
        )}
      </div>

      {results.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {results.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
      ) : !isSearching && (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <i className="fa-solid fa-magnifying-glass text-4xl text-gray-300 mb-4"></i>
          <p className="text-gray-500">검색 결과가 없습니다. 다른 검색어를 입력해보세요.</p>
        </div>
      )}
    </div>
  );
};

export default Search;
