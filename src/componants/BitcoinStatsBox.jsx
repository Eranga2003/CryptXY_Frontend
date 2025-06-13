import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler // ✅ Filler plugin is imported
} from "chart.js";

// ✅ Register the Filler plugin here
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler);

export default function BitcoinStatsBox() {
  const [btc, setBtc] = useState(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Fetch market data
    axios
      .get("https://api.coingecko.com/api/v3/coins/bitcoin?localization=false")
      .then((res) => setBtc(res.data))
      .catch((err) => console.error(err));

    // Fetch price history for 30 days
    axios
      .get("https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30")
      .then((res) => {
        const prices = res.data.prices;
        setChartData({
          labels: prices.map((p) => {
            const date = new Date(p[0]);
            return `${date.getMonth() + 1}/${date.getDate()}`;
          }),
          datasets: [
            {
              label: "BTC Price (USD)",
              data: prices.map((p) => p[1]),
              borderColor: "#3b82f6",
              backgroundColor: "rgba(59, 130, 246, 0.1)",
              fill: true,
              tension: 0.4,
              pointRadius: 0,
            },
          ],
        });
      })
      .catch((err) => console.error(err));
  }, []);

  if (!btc || !chartData) return null;

  const market = btc.market_data;

  return (
    <div className="bg-[#0e1525] text-white p-8 rounded-2xl shadow-2xl w-[380px] lg:w-[420px] border border-white/10">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Bitcoin <span className="text-gray-300">BTC</span></h2>
        <span className="bg-gray-800 px-3 py-1 rounded-full text-sm text-white/80">
          #{btc.market_cap_rank}
        </span>
      </div>

      {/* Price */}
      <h1 className="text-4xl font-extrabold mb-1 text-blue-500">
        ${market.current_price.usd.toLocaleString()}
      </h1>
      <p className={`mb-4 font-medium ${market.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-500'}`}>
        {market.price_change_percentage_24h.toFixed(2)}% (24h)
      </p>

      {/* Stats Grid */}
      <div className="text-sm grid grid-cols-2 gap-4 text-white/90 mb-6">
        <div>
          <span className="font-semibold">Market Cap</span>
          <div className="text-base">${market.market_cap.usd.toLocaleString()}</div>
        </div>
        <div>
          <span className="font-semibold">FDV</span>
          <div className="text-base">${market.fully_diluted_valuation.usd.toLocaleString()}</div>
        </div>
        <div>
          <span className="font-semibold">24h Volume</span>
          <div className="text-base">${market.total_volume.usd.toLocaleString()}</div>
        </div>
        <div>
          <span className="font-semibold">Supply</span>
          <div className="text-base">
            {market.circulating_supply.toFixed(0)} / {market.max_supply.toFixed(0)} BTC
          </div>
        </div>
      </div>

      {/* Line Chart */}
      <div className="bg-white/5 p-3 rounded-lg">
        <Line data={chartData} options={{
          responsive: true,
          plugins: {
            legend: { display: false },
            tooltip: { mode: "index", intersect: false },
          },
          scales: {
            x: { ticks: { color: "#ddd" } },
            y: { ticks: { color: "#ddd" } },
          },
        }} />
      </div>

      {/* Profile Score */}
      <div className="mt-6">
        <div className="text-sm text-white/80 mb-1">Profile Score</div>
        <div className="w-full bg-gray-800 rounded-full h-3">
          <div className="bg-green-500 h-3 rounded-full w-full" />
        </div>
        <div className="text-right text-green-400 text-sm font-medium mt-1">100%</div>
      </div>
    </div>
  );
}
