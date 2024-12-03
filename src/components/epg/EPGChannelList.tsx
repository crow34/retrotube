import React from 'react';
import { Channel } from '../../types/youtube';
import classNames from 'classnames';

interface EPGChannelListProps {
  channels: Channel[];
  selectedChannel: number | null;
  onSelectChannel: (channelId: number) => void;
}

export const EPGChannelList: React.FC<EPGChannelListProps> = ({
  channels,
  selectedChannel,
  onSelectChannel,
}) => {
  return (
    <div className="space-y-1">
      {channels.map((channel) => (
        <div
          key={channel.id}
          onClick={() => onSelectChannel(channel.id)}
          className={classNames(
            'p-2 cursor-pointer',
            'hover:bg-green-500 hover:text-black',
            selectedChannel === channel.id && 'bg-green-500 text-black'
          )}
        >
          <div className="flex items-center gap-2">
            <span className="w-8 text-right">{channel.id}</span>
            <span>{channel.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
};