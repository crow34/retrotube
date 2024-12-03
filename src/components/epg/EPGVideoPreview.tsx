import React from 'react';
import YouTube from 'react-youtube';
import { useTVStore } from '../../store/tvStore';
import { Play, Pause } from 'lucide-react';

interface EPGVideoPreviewProps {
  channelId: number;
}

export const EPGVideoPreview: React.FC<EPGVideoPreviewProps> = ({ channelId }) => {
  const { channels } = useTVStore();
  const channel = channels.find(c => c.id === channelId);

  if (!channel) return null;

  return (
    <div className="space-y-4">
      <div className="aspect-video bg-black rounded overflow-hidden">
        <YouTube
          videoId={channel.playlist[0]?.id}
          className="w-full h-full"
          opts={{
            width: '100%',
            height: '100%',
            playerVars: {
              autoplay: 0,
              controls: 1,
              modestbranding: 1,
            },
          }}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm mb-1">Channel Number:</p>
          <p className="font-bold">{channel.id}</p>
        </div>
        <div>
          <p className="text-sm mb-1">Channel Name:</p>
          <p className="font-bold">{channel.name}</p>
        </div>
        <div className="col-span-2">
          <p className="text-sm mb-1">Current Program:</p>
          <p className="font-bold">{channel.playlist[0]?.title || 'Loading...'}</p>
        </div>
        <div className="col-span-2">
          <p className="text-sm mb-1">Autopilot:</p>
          <p className="font-bold">{channel.autopilot ? 'Enabled' : 'Disabled'}</p>
        </div>
      </div>
    </div>
  );
};