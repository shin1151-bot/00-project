
export interface Product {
  id: string;
  name: string;
  price: number;
  discountRate?: number;
  image: string;
  category: string;
  description: string;
  tags: string[];
  isDawnDelivery: boolean;
  curatorComment?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface SearchState {
  query: string;
  results: Product[];
  isAiSearching: boolean;
  aiSuggestion?: string;
}
