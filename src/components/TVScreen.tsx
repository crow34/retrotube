import React, { useEffect } from 'react';
import YouTube from 'react-youtube';
import { useTVStore } from '../store/tvStore';
import { StaticEffect } from './StaticEffect';

export const TVScreen: React.FC = () => {
  const { isOn, currentChannel, channels, brightness, contrast, isStatic, currentVideoIndex } = useTVStore();

  useEffect(() => {
    if (isStatic) {
      const timer = setTimeout(() => {
        useTVStore.getState().setStatic(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isStatic]);

  const handleVideoEnd = () => {
    useTVStore.getState().nextVideo();
  };

  if (!isOn) {
    return <div className="w-full h-full bg-black rounded-lg" />;
  }

  const currentChannelData = channels.find(c => c.id === currentChannel);
  const currentVideo = currentChannelData?.playlist[currentVideoIndex];

  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg">
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          filter: `brightness(${brightness}%) contrast(${contrast}%)`,
        }}
      >
        {isStatic ? (
          <StaticEffect />
        ) : (
          <YouTube
            videoId={currentVideo?.id}
            className="w-full h-full"
            opts={{
              width: '100%',
              height: '100%',
              playerVars: {
                autoplay: 1,
                controls: 0,
                modestbranding: 1,
              },
            }}
            onEnd={handleVideoEnd}
          />
        )}
      </div>
      
      <div className="absolute inset-0 pointer-events-none bg-scanlines opacity-10" />
      <div className="absolute inset-0 pointer-events-none rounded-lg" 
           style={{ boxShadow: 'inset 0 0 100px rgba(0,0,0,0.5)' }} />
    </div>
  );
};