import React, { useEffect, useState } from "react";

export default function FearGreedBox() {
  const [fg, setFg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Using fetch with CORS proxy to avoid CORS issues
    const proxyUrl = "https://api.allorigins.win/get?url=";
    const targetUrl = "https://api.alternative.me/fng/?limit=1";
    
    fetch(proxyUrl + encodeURIComponent(targetUrl))
      .then(response => response.json())
      .then(data => {
        try {
          const parsedData = JSON.parse(data.contents);
          setFg(parsedData.data[0]);
        } catch (e) {
          // Fallback to mock data
          setFg({
            value: "54",
            value_classification: "Neutral",
            timestamp: Date.now(),
            time_until_update: "3600"
          });
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        // Fallback to mock data
        setFg({
          value: "54",
          value_classification: "Neutral",
          timestamp: Date.now(),
          time_until_update: "3600"
        });
        setLoading(false);
      });
  }, []);

  // Function to get color based on fear/greed value
  const getColor = (value) => {
    const numValue = parseInt(value);
    if (numValue <= 25) return "#ef4444"; // Red - Extreme Fear
    if (numValue <= 45) return "#f97316"; // Orange - Fear
    if (numValue <= 55) return "#eab308"; // Yellow - Neutral
    if (numValue <= 75) return "#84cc16"; // Light Green - Greed
    return "#22c55e"; // Green - Extreme Greed
  };

  // Function to get gradient colors for the gauge
  const getGradientColors = () => {
    return [
      { offset: "0%", color: "#ef4444" },    // Red
      { offset: "25%", color: "#f97316" },   // Orange
      { offset: "50%", color: "#eab308" },   // Yellow
      { offset: "75%", color: "#84cc16" },   // Light Green
      { offset: "100%", color: "#22c55e" }   // Green
    ];
  };

  // Create SVG path for half circle
  const createHalfCirclePath = (radius, strokeWidth) => {
    const centerX = 90;
    const centerY = 90;
    const actualRadius = radius - strokeWidth / 2;
    
    return `M ${centerX - actualRadius} ${centerY} A ${actualRadius} ${actualRadius} 0 0 1 ${centerX + actualRadius} ${centerY}`;
  };

  // Calculate needle position
  const getNeedleRotation = (value) => {
    const angle = (parseInt(value) / 100) * 180 - 90; // -90 to 90 degrees
    return angle;
  };

  if (loading) {
    return (
      <div className="bg-[#1a1f2e] text-white p-6 rounded-2xl shadow-2xl w-[360px] lg:w-[420px] border border-white/10">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-700 rounded mb-4"></div>
          <div className="h-32 bg-gray-700 rounded mb-4"></div>
          <div className="h-12 bg-gray-700 rounded mb-2"></div>
        </div>
      </div>
    );
  }

  if (!fg) return null;

  const gradientColors = getGradientColors();
  const needleRotation = getNeedleRotation(fg.value);

  return (
    <div className="bg-[#1a1f2e] text-white p-6 rounded-2xl shadow-2xl w-[360px] lg:w-[420px] border border-white/10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">📈 Fear & Greed</h2>
        <span className="text-gray-400 text-sm">Now</span>
      </div>

      {/* Half Circle Gauge */}
      <div className="flex justify-center mb-4">
        <div className="relative">
          <svg width="180" height="100" viewBox="0 0 180 100">
            {/* Gradient Definition */}
            <defs>
              <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                {gradientColors.map((color, index) => (
                  <stop key={index} offset={color.offset} stopColor={color.color} />
                ))}
              </linearGradient>
            </defs>
            
            {/* Background Arc */}
            <path
              d={createHalfCirclePath(70, 12)}
              fill="none"
              stroke="#374151"
              strokeWidth="12"
              strokeLinecap="round"
            />
            
            {/* Colored Arc */}
            <path
              d={createHalfCirclePath(70, 12)}
              fill="none"
              stroke="url(#gaugeGradient)"
              strokeWidth="12"
              strokeLinecap="round"
            />
            
            {/* Needle */}
            <g transform={`translate(90, 90)`}>
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="-50"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                transform={`rotate(${needleRotation})`}
                style={{ transformOrigin: "0 0" }}
              />
              {/* Needle center dot */}
              <circle cx="0" cy="0" r="4" fill="white" />
            </g>
          </svg>
          
          {/* Center Value Display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center mt-4">
            <div className="text-2xl font-bold" style={{ color: getColor(fg.value) }}>
              {fg.value}
            </div>
            <div className="text-xs text-gray-400">
              {fg.value_classification}
            </div>
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="flex justify-between text-xs text-gray-400 mb-3 px-2">
        <span>Fear</span>
        <span>Neutral</span>
        <span>Greed</span>
      </div>

      {/* Linear Progress Bar (Alternative) */}
      <div className="h-1 bg-gray-700 rounded-full mb-3 overflow-hidden">
        <div 
          className="h-1 rounded-full transition-all duration-1000 ease-out" 
          style={{ 
            width: `${fg.value}%`,
            background: `linear-gradient(90deg, ${gradientColors.map(c => c.color).join(', ')})`
          }}
        />
      </div>

      {/* Update Info */}
      {fg.time_until_update && (
        <div className="text-gray-400 text-xs text-center">
          Updates in {Math.floor(fg.time_until_update / 60)} minutes
        </div>
      )}
    </div>
  );
}