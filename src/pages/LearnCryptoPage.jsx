import React, { useState } from "react";

export default function LearnCryptoPage() {
  const [learning, setLearning] = useState(false);

  const youtubeVideos = [
    {
      title: "What is Cryptocurrency?",
      description: "Get an overview of the basics of cryptocurrency and how it works.",
      videoId: "so0NIDiKdRg", 
    },
    {
      title: "How to Buy Bitcoin",
      description: "Learn how to buy Bitcoin and get started with crypto investments.",
      videoId: "GhUU2psXHPw",
    },
    {
      title: "Crypto Wallets Explained",
      description: "Understand the different types of crypto wallets and how to store your coins safely.",
      videoId: "2nW31X5PZdY", 
    },
    {
      title: "Crypto Trading for Beginners",
      description: "A beginner's guide to trading cryptocurrencies.",
      videoId: "YEO3hhtvXvE", 
    },
     {
    title: "Example Video",
    description: "A description of the video.",
    videoId: "f_KTlszy9C4", // This is the actual YouTube video ID
  },
  
{
    title: "Example Video",
    description: "A description of the video.",
    videoId: "HOYOSFwy3zU", // This is the actual YouTube video ID
  }
  ];

  const handleStartLearning = () => {
    setLearning(true);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-center items-center mb-12">
        <h1 className="text-4xl font-extrabold text-blue-500">Start Learning Crypto</h1>
      </div>
      
      {!learning ? (
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Learn Crypto</h2>
          <p className="mb-8">Explore guides, tips, and tutorials to build your crypto knowledge.</p>
          <button
            onClick={handleStartLearning}
            className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition"
          >
            Start Learning
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {youtubeVideos.map((video, index) => (
            <div key={index} className="bg-gray-800 rounded-xl shadow-lg p-6">
              <iframe
                width="100%"
                height="215"
                src={`https://www.youtube.com/embed/${video.videoId}`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <h3 className="text-xl font-bold mt-4">{video.title}</h3>
              <p className="text-sm text-gray-300 mt-2">{video.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
