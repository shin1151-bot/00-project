
import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Search, 
  Music, 
  Users, 
  Sparkles, 
  TrendingUp, 
  ExternalLink,
  ChevronRight,
  Heart,
  PlayCircle,
  Mic2
} from 'lucide-react';
import { getSongRecommendations, getTrendSummary } from './geminiService';
import { Idol, RankingItem, RecommendationResponse } from './types';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';

// Dummy Data for Idol Hub
const MOCK_IDOLS: Idol[] = [
  {
    id: '1',
    name: 'NewJeans',
    agency: 'ADOR',
    debutYear: 2022,
    description: '민희진이 프로듀싱한 5인조 걸그룹. 이지리스닝 곡들로 큰 인기.',
    popularityScore: 98,
    imageUrl: 'https://images.unsplash.com/photo-1621618608933-28771427a726?q=80&w=400&h=300&auto=format&fit=crop',
    mvUrl: 'https://www.youtube.com/results?search_query=NewJeans+MV',
    communityUrl: 'https://weverse.io/newjeans',
    tags: ['Y2K', 'Easy Listening', 'Hype Boy']
  },
  {
    id: '2',
    name: 'BTS',
    agency: 'BIGHIT MUSIC',
    debutYear: 2013,
    description: '설명이 필요 없는 글로벌 슈퍼스타. 현재 일부 멤버 군 복무 중에도 영향력 여전.',
    popularityScore: 100,
    imageUrl: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=400&h=300&auto=format&fit=crop',
    mvUrl: 'https://www.youtube.com/results?search_query=BTS+MV',
    communityUrl: 'https://weverse.io/bts',
    tags: ['Global', 'Dynamite', 'Army']
  },
  {
    id: '3',
    name: 'BLACKPINK',
    agency: 'YG Entertainment',
    debutYear: 2016,
    description: '글로벌 아이콘. 패션과 음악 모두에서 독보적인 위치를 점함.',
    popularityScore: 97,
    imageUrl: 'https://images.unsplash.com/photo-1632731853174-89d44c9f1390?q=80&w=400&h=300&auto=format&fit=crop',
    mvUrl: 'https://www.youtube.com/results?search_query=BLACKPINK+MV',
    communityUrl: 'https://weverse.io/blackpink',
    tags: ['Girl Crush', 'Fashion', 'Global']
  },
  {
    id: '4',
    name: 'IVE',
    agency: 'Starship',
    debutYear: 2021,
    description: '완성형 걸그룹. 장원영과 안유진을 중심으로 MZ세대의 아이콘.',
    popularityScore: 95,
    imageUrl: 'https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=400&h=300&auto=format&fit=crop',
    mvUrl: 'https://www.youtube.com/results?search_query=IVE+MV',
    communityUrl: 'https://weverse.io/ive',
    tags: ['Self-love', 'Wonyoung', 'Narcissistic']
  }
];

// Updated Mock Data for Inkigayo Chart with Community Links
const MOCK_RANKINGS: RankingItem[] = [
  { 
    rank: 1, 
    songTitle: 'Plot Twist', 
    artist: 'TWS', 
    imageUrl: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=100&h=100&auto=format&fit=crop', 
    score: 9800, 
    trend: 'up',
    communityUrl: 'https://weverse.io/tws'
  },
  { 
    rank: 2, 
    songTitle: 'Love wins all', 
    artist: 'IU', 
    imageUrl: 'https://images.unsplash.com/photo-1514525253361-bee8718a300c?q=80&w=100&h=100&auto=format&fit=crop', 
    score: 9450, 
    trend: 'same',
    communityUrl: 'https://www.edam-ent.com/artist/iu'
  },
  { 
    rank: 3, 
    songTitle: 'EASY', 
    artist: 'LE SSERAFIM', 
    imageUrl: 'https://images.unsplash.com/photo-1459749411177-042180ce673c?q=80&w=100&h=100&auto=format&fit=crop', 
    score: 9210, 
    trend: 'down',
    communityUrl: 'https://weverse.io/lesserafim'
  },
  { 
    rank: 4, 
    songTitle: 'Supernova', 
    artist: 'aespa', 
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=100&h=100&auto=format&fit=crop', 
    score: 8900, 
    trend: 'up',
    communityUrl: 'https://weverse.io/aespa'
  },
  { 
    rank: 5, 
    songTitle: 'Bam Yang Gang', 
    artist: 'BIBI', 
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=100&h=100&auto=format&fit=crop', 
    score: 8750, 
    trend: 'up',
    communityUrl: 'https://www.instagram.com/nakedbibi/'
  },
];

const COLORS = ['#ec4899', '#f43f5e', '#f97316', '#8b5cf6', '#06b6d4'];

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [preference, setPreference] = useState('');
  const [recommendations, setRecommendations] = useState<RecommendationResponse | null>(null);
  const [trendSummary, setTrendSummary] = useState('');
  const [isAiSearching, setIsAiSearching] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      const summary = await getTrendSummary();
      setTrendSummary(summary);
    };
    fetchInitialData();
  }, []);

  const handleAiRecommendation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!preference.trim()) return;
    setIsAiSearching(true);
    const res = await getSongRecommendations(preference);
    setRecommendations(res);
    setIsAiSearching(false);
  };

  const filteredIdols = MOCK_IDOLS.filter(idol => 
    idol.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    idol.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen pb-12">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-pink-100 px-4 py-4 mb-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-pink-500 rounded-lg text-white shadow-lg shadow-pink-200">
              <Sparkles size={24} />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              K-Idol Hub
            </h1>
          </div>
          <div className="relative w-full max-w-xs md:max-w-md ml-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="아티스트, 곡명, 장르 검색..."
              className="w-full pl-10 pr-4 py-2 bg-pink-50 border-none focus:ring-2 focus:ring-pink-300 rounded-full text-sm placeholder-pink-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 space-y-12">
        {/* Trend Section */}
        <section className="bg-gradient-to-br from-pink-500 via-rose-500 to-purple-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp size={28} />
              <h2 className="text-2xl font-bold">K-POP 트렌드 (25년 12월 기준)</h2>
            </div>
            <div className="text-lg opacity-90 prose prose-invert max-w-none">
              {trendSummary || "트렌드 분석 중..."}
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        </section>

        {/* Inkigayo Chart & Visualization */}
        <section className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-pink-50">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="bg-yellow-100 p-2 rounded-lg text-yellow-600">
                  <Mic2 size={20} />
                </div>
                <h2 className="text-xl font-bold text-gray-800">SBS 인기가요 차트</h2>
              </div>
              <span className="text-xs text-gray-400 font-medium italic">LIVE Update</span>
            </div>
            <div className="space-y-4">
              {MOCK_RANKINGS.map((item) => (
                <div key={item.rank} className="flex items-center justify-between p-3 hover:bg-pink-50/50 rounded-2xl transition-all group cursor-default">
                  <div className="flex items-center gap-4">
                    <span className={`w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full text-sm font-black shadow-sm ${
                      item.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white' : 
                      item.rank === 2 ? 'bg-gray-200 text-gray-600' : 
                      item.rank === 3 ? 'bg-amber-100 text-amber-700' : 'text-gray-400 bg-gray-50'
                    }`}>
                      {item.rank}
                    </span>
                    <div className="relative">
                      <img 
                        src={item.imageUrl} 
                        alt={item.songTitle} 
                        className="w-12 h-12 rounded-xl object-cover shadow-md group-hover:rotate-6 transition-transform"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="font-black text-gray-800 text-sm sm:text-base truncate">{item.songTitle}</div>
                      <a 
                        href={item.communityUrl || `https://www.youtube.com/results?search_query=${encodeURIComponent(item.artist + ' official')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-pink-500 font-bold truncate hover:underline flex items-center gap-1 group/link"
                      >
                        {item.artist}
                        <ExternalLink size={10} className="opacity-0 group-hover/link:opacity-100 transition-opacity" />
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-sm font-black text-gray-700">{item.score.toLocaleString()}</div>
                      <div className={`text-[10px] font-bold flex items-center justify-end gap-1 ${
                        item.trend === 'up' ? 'text-green-500' : 
                        item.trend === 'down' ? 'text-red-500' : 'text-gray-400'
                      }`}>
                        {item.trend === 'up' ? '▲' : item.trend === 'down' ? '▼' : '-'}
                        {item.trend === 'up' ? 'Hot' : ''}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-pink-50 flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="text-pink-500" size={24} />
              <h2 className="text-xl font-bold text-gray-800">차트 점수 분석</h2>
            </div>
            <div className="flex-1 h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MOCK_RANKINGS} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f0f0f0" />
                  <XAxis type="number" hide />
                  <YAxis 
                    type="category" 
                    dataKey="songTitle" 
                    axisLine={false} 
                    tickLine={false} 
                    width={80}
                    tick={{fontSize: 10, fontWeight: 700, fill: '#666'}}
                  />
                  <Tooltip 
                    cursor={{fill: '#fdf2f8'}} 
                    contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 8px 32px rgba(0,0,0,0.1)'}}
                    labelStyle={{fontWeight: 800, color: '#ec4899'}}
                  />
                  <Bar dataKey="score" radius={[0, 12, 12, 0]} barSize={30}>
                    {MOCK_RANKINGS.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-4 text-[10px] text-gray-400 text-center">* 점수는 음원, 음반, SNS, 투표 점수를 합산한 결과입니다.</p>
          </div>
        </section>

        {/* AI Song Recommendation Section */}
        <section className="bg-white rounded-2xl p-8 shadow-sm border border-pink-100">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <div className="inline-block p-3 bg-pink-100 rounded-2xl text-pink-600 mb-4">
              <Music size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">취향 맞춤 플레이리스트 추천 (10곡)</h2>
            <p className="text-gray-500 text-sm mb-6">Gemini AI가 당신의 분위기에 어울리는 최고의 K-POP을 선곡해드립니다. 곡을 클릭하면 MV로 연결됩니다.</p>
            <form onSubmit={handleAiRecommendation} className="flex flex-col sm:flex-row gap-3">
              <input 
                type="text" 
                placeholder="오늘 당신의 기분은 어떤가요? (예: 파이팅 넘치는, 비오는 날 센치한...)" 
                className="flex-1 px-6 py-4 bg-pink-50/50 border border-pink-100 focus:ring-2 focus:ring-pink-300 rounded-2xl transition-all outline-none text-gray-700"
                value={preference}
                onChange={(e) => setPreference(e.target.value)}
              />
              <button 
                type="submit" 
                disabled={isAiSearching}
                className="px-10 py-4 bg-pink-500 hover:bg-pink-600 disabled:bg-gray-400 text-white font-bold rounded-2xl shadow-lg shadow-pink-100 transition-all flex items-center justify-center gap-2 min-w-[160px]"
              >
                {isAiSearching ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    분석 중...
                  </div>
                ) : (
                  <>추천받기 <ChevronRight size={18} /></>
                )}
              </button>
            </form>
          </div>

          {recommendations && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {recommendations.recommendations.map((song, idx) => (
                <a 
                  key={idx}
                  href={`https://www.youtube.com/results?search_query=${encodeURIComponent(song.artist + ' ' + song.songTitle + ' MV')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 bg-white border border-pink-50 rounded-2xl flex items-center gap-4 hover:border-pink-300 hover:shadow-lg hover:-translate-y-1 transition-all group cursor-pointer block"
                >
                  <div className="w-12 h-12 flex-shrink-0 bg-gradient-to-br from-pink-400 to-purple-500 text-white flex items-center justify-center rounded-xl font-bold shadow-sm group-hover:scale-110 transition-transform">
                    {idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="font-bold text-gray-800 truncate">{song.songTitle}</h3>
                      <span className="text-xs px-2 py-0.5 bg-pink-50 text-pink-600 rounded-full font-medium whitespace-nowrap">
                        {song.vibe}
                      </span>
                    </div>
                    <p className="text-sm text-purple-600 font-semibold mb-1">{song.artist}</p>
                    <p className="text-xs text-gray-500 line-clamp-1 group-hover:line-clamp-none transition-all duration-300">{song.reason}</p>
                  </div>
                  <div className="p-3 bg-red-50 text-red-500 rounded-full group-hover:bg-red-500 group-hover:text-white transition-all shadow-sm">
                    <PlayCircle size={24} />
                  </div>
                </a>
              ))}
            </div>
          )}
        </section>

        {/* Idol Database / Cards */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Users className="text-purple-500" /> 아티스트 허브
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredIdols.map((idol) => (
              <div key={idol.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-pink-50 hover:shadow-xl transition-all duration-300 flex flex-col">
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={idol.imageUrl} 
                    alt={idol.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-pink-600 flex items-center gap-1 shadow-sm">
                      <Heart size={12} fill="currentColor" /> {idol.popularityScore}%
                    </div>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{idol.name}</h3>
                      <p className="text-xs text-purple-600 font-medium">{idol.agency} • {idol.debutYear} 데뷔</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">
                    {idol.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-6">
                    {idol.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] rounded uppercase font-semibold">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-auto">
                    <a 
                      href={idol.mvUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 py-2 bg-red-50 text-red-600 rounded-lg text-xs font-bold hover:bg-red-100 transition-colors"
                    >
                      <Music size={14} /> MV 검색
                    </a>
                    <a 
                      href={idol.communityUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 py-2 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-100 transition-colors"
                    >
                      <ExternalLink size={14} /> 커뮤니티
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-20 py-12 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex justify-center gap-6 mb-4">
             <div className="flex items-center gap-2 text-pink-500 font-black">
               <Sparkles size={16} /> K-Idol Hub
             </div>
          </div>
          <p className="text-xs text-gray-400 mb-2">© 2024 K-Idol Hub. 모든 정보는 실시간 트렌드 및 시뮬레이션 데이터를 바탕으로 합니다.</p>
          <p className="text-[10px] text-gray-300">Powered by Gemini AI 2.0</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
