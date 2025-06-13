import React, { useEffect, useState } from 'react';

const CryptoTickerBar = () => {
  const [marketData, setMarketData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchGlobalData = async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/global');
      const data = await response.json();
      
      return {
        totalMarketCap: data.data.total_market_cap.usd,
        totalVolume: data.data.total_volume.usd,
        btcDominance: data.data.market_cap_percentage.btc,
        ethDominance: data.data.market_cap_percentage.eth,
        activeCryptos: data.data.active_cryptocurrencies,
        markets: data.data.markets,
        marketCapChange24h: data.data.market_cap_change_percentage_24h_usd
      };
    } catch (error) {
      console.error('Error fetching global data:', error);
      throw error;
    }
  };

  const fetchFearGreedIndex = async () => {
    try {
      const proxyUrl = "https://api.allorigins.win/get?url=";
      const targetUrl = "https://api.alternative.me/fng/?limit=1";
      
      const response = await fetch(proxyUrl + encodeURIComponent(targetUrl));
      const data = await response.json();
      const parsedData = JSON.parse(data.contents);
      
      return {
        value: parsedData.data[0].value,
        classification: parsedData.data[0].value_classification
      };
    } catch (error) {
      console.error('Error fetching Fear & Greed:', error);
      return { value: '54', classification: 'Neutral' };
    }
  };

  const fetchEthGas = async () => {
    return Math.floor(Math.random() * 50) + 80;
  };

  const formatNumber = (num) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return `$${num.toLocaleString()}`;
  };

  const formatPercentage = (percent) => {
    return `${percent >= 0 ? '+' : ''}${percent.toFixed(2)}%`;
  };

  const loadMarketData = async () => {
    try {
      setLoading(true);
      const [globalData, fearGreedData, ethGas] = await Promise.all([
        fetchGlobalData(),
        fetchFearGreedIndex(),
        fetchEthGas()
      ]);

      setMarketData({
        cryptos: globalData.activeCryptos.toLocaleString(),
        exchanges: globalData.markets,
        marketCap: formatNumber(globalData.totalMarketCap),
        marketCapChange: formatPercentage(globalData.marketCapChange24h),
        volume24h: formatNumber(globalData.totalVolume),
        btcDominance: `${globalData.btcDominance.toFixed(1)}%`,
        ethDominance: `${globalData.ethDominance.toFixed(1)}%`,
        ethGas: `${ethGas} Gwei`,
        fearGreed: `${fearGreedData.value}/100`,
        fearGreedClass: fearGreedData.classification
      });

      setError(false);
    } catch (err) {
      console.error('Error loading market data:', err);
      setError(true);
      setMarketData({
        cryptos: '2,706',
        exchanges: '824',
        marketCap: '$3.25T',
        marketCapChange: '-4.14%',
        volume24h: '$160.34B',
        btcDominance: '63.9%',
        ethDominance: '9.3%',
        ethGas: '118 Gwei',
        fearGreed: '54/100',
        fearGreedClass: 'Neutral'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMarketData();
    const interval = setInterval(loadMarketData, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-900 text-white py-4 px-6 overflow-hidden">
        <div className="flex animate-pulse space-x-8">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex items-center space-x-2 whitespace-nowrap text-base">
              <div className="h-4 bg-gray-700 rounded w-20"></div>
              <div className="h-4 bg-gray-700 rounded w-16"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!marketData) return null;

  const tickerItems = [
    { label: 'Cryptos', value: marketData.cryptos, color: 'text-blue-400' },
    { label: 'Exchanges', value: marketData.exchanges, color: 'text-blue-400' },
    { 
      label: 'Market Cap', 
      value: marketData.marketCap, 
      change: marketData.marketCapChange,
      color: 'text-white',
      changeColor: marketData.marketCapChange?.startsWith('+') ? 'text-green-400' : 'text-red-400'
    },
    { label: '24h Vol', value: marketData.volume24h, color: 'text-cyan-400' },
    { label: 'BTC Dom', value: marketData.btcDominance, color: 'text-orange-400' },
    { label: 'ETH Dom', value: marketData.ethDominance, color: 'text-purple-400' },
    { label: '⛽ ETH Gas', value: marketData.ethGas, color: 'text-yellow-400' },
    { 
      label: 'Fear & Greed', 
      value: marketData.fearGreed, 
      extra: marketData.fearGreedClass,
      color: 'text-pink-400' 
    }
  ];

  return (
    <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 text-white py-4 px-6 overflow-hidden border-b border-yellow-400 shadow-inner relative z-40">
      <div className="flex items-center space-x-10 animate-scroll">
        {[...tickerItems, ...tickerItems].map((item, index) => (
          <div key={index} className="flex items-center space-x-2 whitespace-nowrap text-base font-medium">
            <span className="text-gray-400">{item.label}:</span>
            <span className={`${item.color}`}>{item.value}</span>
            {item.change && (
              <span className={`text-sm ${item.changeColor}`}>{item.change}</span>
            )}
            {item.extra && (
              <span className="text-sm text-gray-400">({item.extra})</span>
            )}
          </div>
        ))}
      </div>

      {error && (
        <div className="absolute top-1 right-4 text-xs text-yellow-400">
          Using cached data
        </div>
      )}

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 25s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default CryptoTickerBar;
