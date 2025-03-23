
import React from 'react';

const LoadingFeed: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
      <p className="text-gray-500">Loading your personalized feed...</p>
    </div>
  );
};

export default LoadingFeed;
