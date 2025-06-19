import React, { useState, useEffect } from "react";
import {
  Gift, Lock, DollarSign, Users, FileText, Star, FolderOpen, Grid, Calendar,
  Flame, FlaskConical, Bot, Globe, TrendingUp, LineChart
} from "lucide-react";
import CryptoTickerBar from "../componants/liveprice";

export default function AirdropPage() {
  const [airdrops, setAirdrops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAirdrops([
        // Hidden Gems
        { category: "Hidden Gems", name: "DPS Drops", desc: "MiniApp points", status: "Active", date: "18 Sep, 2024", type: "Point Farming" },
        { category: "Hidden Gems", name: "Morph", desc: "Bridge-to-Earn Points", status: "Active", date: "11 Oct, 2024", type: "Farming" },
        { category: "Hidden Gems", name: "ZetaChain", desc: "Cross-chain Rewards", status: "Active", date: "15 Aug, 2024", type: "Points" },

        // Trending Activities
        { category: "Trending Activities", name: "Abstract", desc: "Point Farming", status: "Active", date: "27 Jan, 2025", type: "Point Farming" },
        { category: "Trending Activities", name: "Ethereal", desc: "AI Protocol Rewards", status: "Active", date: "3 Jun, 2025", type: "Point Farming" },
        { category: "Trending Activities", name: "Ink Protocol", desc: "Decentralized Content Bonus", status: "Active", date: "10 May, 2025", type: "Potential Airdrop" },

        // Trading
        { category: "Trading", name: "Paradex", desc: "Trading Incentives", status: "Active", date: "3 Jan, 2025", type: "Point Farming" },
        { category: "Trading", name: "Hibachi", desc: "Volume-Based Farming", status: "Active", date: "5 Mar, 2025", type: "Trading" },
        { category: "Trading", name: "Vest Exchange", desc: "Loyalty Airdrop", status: "Active", date: "29 Apr, 2024", type: "Trading" },
        { category: "Trading", name: "Ranger DEX", desc: "Trading Reward Program", status: "Active", date: "12 Dec, 2024", type: "Trading" },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const grouped = airdrops.reduce((acc, drop) => {
    if (!acc[drop.category]) acc[drop.category] = [];
    acc[drop.category].push(drop);
    return acc;
  }, {});

  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      <aside className="w-64 bg-gray-900 px-4 py-6 border-r border-gray-800 sticky top-0 h-screen">
        <h1 className="text-xl font-bold mb-8 flex items-center gap-2">
          <Flame className="text-blue-500 w-6 h-6" /> CryptXY
        </h1>
        <div className="mb-6">
          <h2 className="text-sm font-medium text-gray-400">Featured Tabs</h2>
          <ul className="mt-2 space-y-2">
            <li className="flex items-center gap-2">
              <Gift className="w-5 h-5" />
              <span className="text-gray-300">Trump Family</span>
            </li>
            <li className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              <span className="text-gray-300">Made in USA</span>
            </li>
            <li className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <span className="text-gray-300">DeFAI</span>
            </li>
            <li className="flex items-center gap-2">
              <Flame className="w-5 h-5" />
              <span className="text-gray-300">AI Agents</span>
            </li>
            <li className="flex items-center gap-2">
              <Star className="w-5 h-5" />
              <span className="text-gray-300">Potential Airdrop</span>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-medium text-gray-400">Crypto Activities</h2>
          <ul className="mt-2 space-y-2">
            <li className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span className="text-gray-300">Token Unlocks</span>
            </li>
            <li className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              <span className="text-gray-300">Funding Rounds</span>
            </li>
            <li className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span className="text-gray-300">Investors & VCs</span>
            </li>
            <li className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              <span className="text-gray-300">Research</span>
            </li>
            <li className="flex items-center gap-2">
              <LineChart className="w-5 h-5" />
              <span className="text-gray-300">Market</span>
            </li>
          </ul>
        </div>
      </aside>

      <main className="flex-1 py-12 px-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <CryptoTickerBar />
          </div>
          <div className="flex items-center gap-3 mb-10">
            <Gift className="w-8 h-8 text-blue-500" />
            <h1 className="text-4xl font-extrabold">Crypto Activities</h1>
          </div>

          {loading ? (
            <div className="text-center text-gray-400 text-xl">Loading airdrops...</div>
          ) : (
            Object.entries(grouped).map(([section, drops]) => (
              <div key={section} className="mb-12">
                <div className={`rounded-2xl p-6 ${section === 'Hidden Gems' ? 'bg-blue-900' : section === 'Trading' ? 'bg-red-900' : 'bg-purple-900'}`}>
                  <h2 className="text-xl font-semibold mb-6">{section}</h2>
                  <div className="flex flex-wrap gap-4">
                    {drops.map((drop, i) => (
                      <div key={i} className="bg-gray-900 border border-gray-700 rounded-xl p-4 w-[260px]">
                        <div className="text-sm text-green-400 font-medium mb-1">🟢 {drop.status}</div>
                        <div className="text-xs text-gray-400 mb-2">From {drop.date}</div>
                        <div className="text-lg font-bold mb-1">{drop.name}</div>
                        <div className="text-sm text-gray-300 mb-3">{drop.desc}</div>
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gray-800 text-white">
                          {drop.type}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
