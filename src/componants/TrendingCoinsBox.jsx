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
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

export default function TrendingCoinsBox() {
  const [trending, setTrending] = useState([]);
  const [charts, setCharts] = useState({});
  const [hourChanges, setHourChanges] = useState({});

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/search/trending")
      .then((res) => {
        const topCoins = res.data.coins.slice(0, 12);
        setTrending(topCoins);

        topCoins.forEach((coin) => {
          const id = coin.item.id;

          // Fetch sparkline
          axios
            .get(
              `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7&interval=daily`
            )
            .then((chartRes) => {
              const prices = chartRes.data.prices.map((p) => p[1]);
              setCharts((prev) => ({ ...prev, [id]: prices }));
            });

          // Fetch 1h % change
          axios
            .get(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true`)
            .then((detailRes) => {
              const change = detailRes.data.market_data.price_change_percentage_1h_in_currency?.usd;
              setHourChanges((prev) => ({ ...prev, [id]: change }));
            });
        });
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="bg-[#1a1f2e] text-white p-6 rounded-3xl shadow-2xl w-[420px] border border-white/10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">🔥 Trending Coins</h2>
        <span className="text-gray-400 text-sm">Top 12</span>
      </div>

      {trending.map((coin, index) => {
        const id = coin.item.id;
        const change1h = hourChanges[id];
        const priceColor = change1h >= 0 ? "text-green-400" : "text-red-400";

        return (
          <div
            key={id}
            className="flex items-center justify-between text-base py-3 border-b border-white/10 last:border-b-0"
          >
            {/* Left: Rank + Icon + Symbol */}
            <div className="flex items-center gap-3 w-1/2">
              <span className="text-gray-400 font-medium">{index + 1}.</span>
              <img src={coin.item.small} alt={coin.item.name} className="w-6 h-6 rounded-full" />
              <span className="text-white font-semibold">{coin.item.symbol.toUpperCase()}</span>
            </div>

            {/* Right: Sparkline + Price + 1h Change */}
            <div className="w-1/2 flex items-center justify-end gap-3">
              {charts[id] && (
                <div className="w-20 h-6">
                  <Line
                    data={{
                      labels: charts[id].map((_, i) => i),
                      datasets: [
                        {
                          data: charts[id],
                          borderColor: "#22c55e",
                          backgroundColor: "transparent",
                          borderWidth: 1.5,
                          pointRadius: 0,
                          tension: 0.4,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      plugins: { legend: { display: false }, tooltip: { enabled: false } },
                      scales: { x: { display: false }, y: { display: false } },
                    }}
                  />
                </div>
              )}
              <div className="flex flex-col text-right">
                <span className="text-blue-400 text-sm">
                  ${coin.item.price_btc.toFixed(8)}
                </span>
                {change1h !== undefined && (
                  <span className={`text-xs ${priceColor}`}>
                    {change1h.toFixed(2)}% (1h)
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
