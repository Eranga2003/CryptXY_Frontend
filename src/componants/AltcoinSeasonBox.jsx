import React, { useEffect, useState } from "react";

export default function AltcoinSeasonBox() {
  const [season, setSeason] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with mock data
    const mockData = {
      value: Math.floor(Math.random() * 100), // Random value between 0-100
      timestamp: Date.now(),
      trend: Math.random() > 0.5 ? 'up' : 'down'
    };

    setTimeout(() => {
      setSeason(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="bg-[#1a1f2e] text-white p-6 rounded-2xl shadow-2xl w-[360px] lg:w-[420px] border border-white/10">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-700 rounded mb-4"></div>
          <div className="h-12 bg-gray-700 rounded mb-2"></div>
          <div className="h-6 bg-gray-700 rounded mb-4 w-32"></div>
          <div className="h-1 bg-gray-700 rounded-full"></div>
        </div>
      </div>
    );
  }

  if (!season) return null;

  const getSeasonColor = (value) => {
    if (value >= 75) return 'bg-green-400';
    if (value >= 50) return 'bg-yellow-400';
    return 'bg-orange-400';
  };

  const getSeasonEmoji = (value) => {
    if (value >= 75) return '🚀';
    if (value >= 50) return '⚖️';
    return '₿';
  };

  return (
    <div className="bg-[#1a1f2e] text-white p-6 rounded-2xl shadow-2xl w-[360px] lg:w-[420px] border border-white/10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">🌗 Altcoin Season</h2>
        <span className="text-gray-400 text-sm">90‑day</span>
      </div>
      
      <div className="flex items-baseline gap-2 mb-2">
        <div className="text-4xl font-extrabold">{season.value}/100</div>
        <div className={`text-sm ${season.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
          {season.trend === 'up' ? '↗️' : '↘️'}
        </div>
      </div>
      
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-800 text-sm mb-4">
        <span>{getSeasonEmoji(season.value)}</span>
        <span>{season.value >= 75 ? "Altcoin Season" : season.value >= 50 ? "Mixed Market" : "Bitcoin Season"}</span>
      </div>
      
      <div className="h-2 bg-gray-700 rounded-full mt-4 overflow-hidden">
        <div
          className={`h-2 rounded-full transition-all duration-1000 ease-out ${getSeasonColor(season.value)}`}
          style={{ width: `${season.value}%` }}
        />
      </div>
      
      <div className="mt-3 text-xs text-gray-400 flex justify-between">
        <span>Bitcoin Season</span>
        <span>Altcoin Season</span>
      </div>
      
      <div className="mt-2 text-xs text-gray-500">
        {season.value >= 75 
          ? "75+ altcoins outperforming Bitcoin" 
          : season.value >= 50
          ? "Mixed market conditions"
          : "Bitcoin is outperforming most altcoins"
        }
      </div>
    </div>
  );
}