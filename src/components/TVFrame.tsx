import React from 'react';
import { Tv } from 'lucide-react';
import { TVScreen } from './TVScreen';
import { TVControls } from './TVControls';

export const TVFrame: React.FC = () => {
  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="relative bg-[#8B4513] rounded-lg p-8 shadow-2xl">
        {/* Wood grain texture overlay */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1546484475-7f7bd55792da?auto=format&fit=crop&q=80')] rounded-lg" />
        
        {/* TV Header */}
        <div className="flex items-center justify-center mb-4 space-x-2">
          <Tv className="w-8 h-8 text-gray-200" />
          <h1 className="text-2xl font-bold text-gray-200">RetroTube TV</h1>
        </div>

        {/* Main TV Content */}
        <div className="relative aspect-video">
          <TVScreen />
          <TVControls />
        </div>
      </div>
    </div>
  );
};