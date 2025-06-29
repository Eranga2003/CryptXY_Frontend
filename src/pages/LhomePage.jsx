// ... (imports remain unchanged)
import React, { useState, useEffect } from "react";
import Bgimg from "../componants/images/bgimg.jpg";
import Lnavbar from "../componants/Lnavbar.jsx";
import Flag from "../componants/images/sri-lanka-flag.png";
import SignalImg from "../componants/images/signel.png";
import NewsImg from "../componants/images/news.png";
import LearnImg from "../componants/images/Learn.png";
import AirdropImg from "../componants/images/Airdrop.png";
import { Player } from "@lottiefiles/react-lottie-player";
import AnimationData from "../componants/images/Animation - 1749717225299.json";
import BitcoinStatsBox from "../componants/BitcoinStatsBox.jsx";
import TrendingCoinsBox from "../componants/TrendingCoinsBox.jsx";
import FearGreedBox from "../componants/FearGreedBox.jsx";
import AltcoinSeasonBox from "../componants/AltcoinSeasonBox.jsx";
import CryptoTickerBar from "../componants/liveprice.jsx";
import { Link } from "react-router-dom";

export default function LhomePage() {
  const [topGainers, setTopGainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCoin, setHoveredCoin] = useState(null);

  useEffect(() => {
    const fetchTopGainers = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=percent_change_24h_desc&per_page=6&page=1&sparkline=false'
        );
        const data = await response.json();
        setTopGainers(data);
      } catch (error) {
        console.error('Error fetching top gainers:', error);
        setTopGainers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTopGainers();
  }, []);

  const formatPrice = (price) => {
    if (price < 0.01) return `$${price.toFixed(6)}`;
    if (price < 1) return `$${price.toFixed(4)}`;
    if (price < 100) return `$${price.toFixed(3)}`;
    return `$${price.toFixed(1)}`;
  };

  const formatPercentage = (percent) => {
    return `${percent >= 0 ? '+' : ''}${percent.toFixed(2)}%`;
  };

  return (
    <div className="relative min-h-screen bg-gray-50">
      <div
        className="relative min-h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${Bgimg})` }}>
        <Lnavbar />
        <div className="absolute top-37 left-6 z-20">
          <TrendingCoinsBox />
        </div>
        <div className="absolute top-37 right-6 z-20">
          <BitcoinStatsBox />
        </div>
        <div className="w-full z-30">
          <CryptoTickerBar />
        </div>

        <div className="pt-14 px-6 flex flex-col items-start gap-6 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-10 w-full">
            <h1 className="text-white text-4xl md:text-5xl font-extrabold leading-snug tracking-tight drop-shadow-md flex flex-wrap items-center">
              Welcome to <span className="text-white ml-2">CryptX</span> — 
              <span className="inline-flex items-center gap-0.5 ml-2">
                <span className="text-yellow-400">S</span>
                <span className="text-green-500">r</span>
                <span className="text-yellow-400">i</span>
                <span className="text-red-600">&nbsp;L</span>
                <span className="text-yellow-400">a</span>
                <span className="text-green-500">n</span>
                <span className="text-red-600">k</span>
                <span className="text-yellow-400">a</span>
                <span className="text-green-500">n</span>
                <img src={Flag} alt="Sri Lanka Flag" className="h-8 w-auto inline-block align-middle ml-2 rounded-sm" />
              </span>
              <span className="block mt-4 text-white font-semibold text-xl md:text-2xl">
                Crypto Platform, Offering Real-Time Trading Signals, In-Depth Market Analysis, Timely Airdrop Alerts, and Expert Tools to Help You Make Smarter, Data-Driven Investment Decisions.
              </span>
            </h1>
          </div>

          <div className="w-full flex flex-col md:flex-row justify-center items-center gap-6 mt-2">
            <FearGreedBox />
            <Player autoplay loop src={AnimationData} style={{ height: "300px", width: "300px" }} />
            <AltcoinSeasonBox />
          </div>
        </div>
      </div>

     {/* Feature Cards Section (Equal Height + Hover Zoom) */}
<div className="max-w-7xl mx-auto px-6 mb-20 mt-24">


<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
  {[
    {
      title: "Latest Finance News",
      desc: "Stay updated with the latest crypto trends, major updates, and market-moving news.",
      img: NewsImg,
      btnText: "Read News",
      bg: "bg-gray-800",
      hoverBg: "hover:bg-gray-700",
      route: "/news" // optional route key
    },
    {
      title: "Trading Signals 📍 Featured",
      desc: "Get expert buy/sell alerts with entry points, targets, and stop-loss levels.",
      img: SignalImg,
      btnText: "View Signals",
      bg: "bg-blue-500",
      hoverBg: "hover:bg-blue-600",
      route:"/MyPlansPage"
    },
    {
      title: "AirDrop",
      desc: "Discover free crypto giveaways from new projects.",
      img: AirdropImg,
      btnText: "Claim Airdrops",
      bg: "bg-green-500",
      hoverBg: "hover:bg-green-600",
      route: "/Airdrop" 
    },
    {
      title: "Learn",
      desc: "Explore guides, tips, and tutorials to build your crypto knowledge.",
      img: LearnImg,
      btnText: "Start Learning",
      bg: "bg-purple-500",
      hoverBg: "hover:bg-purple-600",
      route: "/LearnCrypto"
    }
  ].map((card, idx) => (
    <div
      key={idx}
      className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 h-full transform transition-transform duration-300 hover:scale-105 flex flex-col justify-between min-h-[400px]"
    >
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-3">{card.title}</h3>
        <p className="text-gray-600 text-base mb-5">{card.desc}</p>
      </div>
      <div>
        <img src={card.img} alt={card.title} className="w-20 h-20 object-contain mx-auto mb-5" />
        
        {card.route ? (
          <Link to={card.route}>
            <button
              className={`w-full ${card.bg} text-white py-2.5 rounded-lg ${card.hoverBg} text-base font-medium transition-colors`}
            >
              {card.btnText}
            </button>
          </Link>
        ) : (
          <button
            className={`w-full ${card.bg} text-white py-2.5 rounded-lg ${card.hoverBg} text-base font-medium transition-colors`}
          >
            {card.btnText}
          </button>
        )}
      </div>
    </div>
  ))}
</div>

</div>


      {/* Markets Section */}
<div className="max-w-7xl mx-auto px-6 mb-16">
  <div className="flex items-center justify-between mb-8">
    <h2 className="text-3xl font-bold text-gray-800">Markets</h2>
    <button className="text-blue-500 hover:text-blue-600 font-medium">
      More markets →
    </button>
  </div>

  <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-xl inline-flex">
    <button className="px-6 py-2 bg-gray-800 text-white rounded-lg font-medium text-sm">
      Top gainers
    </button>
    <button className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium text-sm">
      Top decliners
    </button>
    <button className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium text-sm">
      New markets
    </button>
    <button className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium text-sm">
      Top by market cap
    </button>
  </div>

  {loading ? (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white rounded-2xl p-4 shadow-sm animate-pulse">
          <div className="w-10 h-10 bg-gray-200 rounded-full mx-auto mb-3"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-3 bg-gray-200 rounded mb-3"></div>
          <div className="h-6 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>
  ) : (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {topGainers.map((coin) => (
        <div
          key={coin.id}
          className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100 text-center relative group"
          onMouseEnter={() => setHoveredCoin(coin.id)}
          onMouseLeave={() => setHoveredCoin(null)}
        >
          <img src={coin.image} alt={coin.name} className="w-10 h-10 rounded-full mx-auto mb-3" />
          <h3 className="font-bold text-gray-800 text-sm truncate">{coin.name}</h3>
          <p className="text-gray-500 text-xs uppercase mb-3">{coin.symbol}</p>
          <div className="text-lg font-bold text-gray-800 mb-1">
            {formatPrice(coin.current_price)}
          </div>
          <div className={`text-sm font-medium ${coin.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {formatPercentage(coin.price_change_percentage_24h)}
          </div>
          {hoveredCoin === coin.id && (
            <button className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-xs font-medium hover:bg-orange-600 transition-colors">
              Buy now
            </button>
          )}
        </div>
      ))}
    </div>
  )}
</div>


     {/* How to Get Started Section */}
<div className="max-w-7xl mx-auto px-6">
  <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">How to get started</h2>
  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
    {[
      {
        icon: "👤",
        number: "1",
        title: "Create account",
        desc: "Sign in to CEX.IO to register a new profile.",
        foot: "Register now",
      },
      {
        icon: "✓",
        number: "2",
        title: "Verify your identity",
        desc: "Spend less than five minutes completing the verification process.",
        foot: "Create your account first",
      },
      {
        icon: "💳",
        number: "3",
        title: "Buy or deposit crypto",
        desc: "Add funds to your CEX.IO account to access crypto services.",
        foot: "Verify your identity first",
      },
      {
        icon: "🚀",
        number: "4",
        title: "Start your journey",
        desc: "Explore crypto opportunities within the CEX.IO ecosystem.",
        foot: "Buy or deposit crypto first",
      },
    ].map((step, index) => (
      <div
        key={index}
        className="group bg-green-50 rounded-2xl p-8 shadow-lg border border-gray-100 transition duration-300 hover:bg-teal-600 hover:border-teal-600"
      >
        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-6 text-teal-600 text-2xl group-hover:bg-white/20 group-hover:text-white transition">
          <span>{step.icon}</span>
        </div>
        <div className="mb-6">
          <span className="text-4xl font-bold text-gray-700 group-hover:text-white transition">
            {step.number}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-4 text-gray-800 group-hover:text-white transition">
          {step.title}
        </h3>
        <p className="text-gray-600 mb-4 text-sm leading-relaxed group-hover:text-white transition">
          {step.desc}
        </p>
        <p className="text-gray-400 text-xs group-hover:text-white transition">
          {step.foot}
        </p>
      </div>
    ))}
  </div>
</div>


    </div>
  );
}
