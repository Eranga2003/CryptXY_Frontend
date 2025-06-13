import React from "react";
import Bgimg from "../componants/images/bgimg.jpg";
import Navbar from "../componants/navbar";
import Flag from "../componants/images/sri-lanka-flag.png";
import { Player } from "@lottiefiles/react-lottie-player";
import AnimationData from "../componants/images/Animation - 1749717225299.json";
import BitcoinStatsBox from "../componants/BitcoinStatsBox";
import TrendingCoinsBox from "../componants/TrendingCoinsBox";
import FearGreedBox from "../componants/FearGreedBox";
import AltcoinSeasonBox from "../componants/AltcoinSeasonBox";
import CryptoTickerBar from "../componants/liveprice.jsx";


export default function HomePage() {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${Bgimg})` }}
    >
      <Navbar />

      {/* Sidebar Boxes */}
      <div className="absolute top-37 left-6 z-20">
  <TrendingCoinsBox />
</div>

      <div className="absolute top-37 right-6 z-20">
        <BitcoinStatsBox />
      </div>
{/* Crypto Ticker Bar */}
<div className="w-full z-30">
  <CryptoTickerBar />
</div>

      {/* Glance Section */}
      <div className="pt-14 px-6 flex flex-col items-start gap-6 max-w-4xl mx-auto ">
        {/* Glance Box */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-10 w-full">
          <h1 className="text-white text-4xl md:text-5xl font-extrabold leading-snug tracking-tight drop-shadow-md flex flex-wrap items-center">
            Welcome to <span className="text-white ml-2">CryptX</span> —{" "}
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
              <img
                src={Flag}
                alt="Sri Lanka Flag"
                className="h-8 w-auto inline-block align-middle ml-2 rounded-sm"
              />
            </span>
            <span className="block mt-4 text-white font-semibold text-xl md:text-2xl">
              Crypto Platform, Offering Real-Time Trading Signals, In-Depth Market Analysis, Timely Airdrop Alerts, and Expert Tools to Help You Make Smarter, Data-Driven Investment Decisions.
            </span>
          </h1>
        </div>

        {/* Animation with Fear & Greed + Altcoin Index on sides */}
        <div className="w-full flex flex-col md:flex-row justify-center items-center gap-6 mt-2">
          <FearGreedBox />
          <Player
            autoplay
            loop
            src={AnimationData}
            style={{ height: "300px", width: "300px" }}
          />
          <AltcoinSeasonBox />
        </div>
      </div>
    </div>
  );
}
