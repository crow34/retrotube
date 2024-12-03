import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Play } from 'lucide-react';
import { useTVStore } from '../../store/tvStore';
import { EPGTimeSlots } from './EPGTimeSlots';
import { EPGChannelList } from './EPGChannelList';
import { EPGVideoPreview } from './EPGVideoPreview';

export const EPGGuide: React.FC = () => {
  const [selectedChannel, setSelectedChannel] = useState<number | null>(null);
  const { channels, setChannel } = useTVStore();

  const handleChannelSelect = (channelId: number) => {
    setSelectedChannel(channelId);
  };

  const handlePlayChannel = () => {
    if (selectedChannel) {
      setChannel(selectedChannel);
      window.open('/watch', '_blank');
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="border border-green-500 p-4 mb-4">
        <h1 className="text-2xl">RETROTUBE TV GUIDE</h1>
        <p className="text-sm">Channel Selection System v1.0</p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-[250px,1fr] gap-4">
        {/* Left Panel - Channel List */}
        <div className="border border-green-500 p-2">
          <div className="flex justify-between mb-2">
            <ChevronUp className="w-4 h-4" />
            <span>CHANNEL LIST</span>
            <ChevronDown className="w-4 h-4" />
          </div>
          <EPGChannelList 
            channels={channels}
            selectedChannel={selectedChannel}
            onSelectChannel={handleChannelSelect}
          />
        </div>

        {/* Right Panel - Time Slots and Preview */}
        <div className="space-y-4">
          <div className="border border-green-500 p-2">
            <EPGTimeSlots />
          </div>
          
          {selectedChannel && (
            <div className="border border-green-500 p-2">
              <EPGVideoPreview channelId={selectedChannel} />
              <button
                onClick={handlePlayChannel}
                className="mt-4 border border-green-500 px-4 py-2 flex items-center gap-2 hover:bg-green-500 hover:text-black"
              >
                <Play className="w-4 h-4" />
                Watch Channel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="border border-green-500 p-4 mt-4">
        <p className="text-sm">Press ENTER to select channel • Arrow keys to navigate • ESC to exit</p>
      </div>
    </div>
  );
};