import React from 'react';
import { Power, Volume2, Sun, Contrast } from 'lucide-react';
import { useTVStore } from '../store/tvStore';
import { ControlKnob } from './ControlKnob';

export const TVControls: React.FC = () => {
  const { isOn, volume, brightness, contrast } = useTVStore();

  return (
    <div className="absolute -right-20 top-0 bottom-0 flex flex-col justify-center space-y-8">
      <ControlKnob
        icon={<Power />}
        value={isOn ? 100 : 0}
        onChange={() => useTVStore.getState().togglePower()}
        label="Power"
      />
      <ControlKnob
        icon={<Volume2 />}
        value={volume}
        onChange={(value) => useTVStore.getState().adjustVolume(value)}
        label="Volume"
      />
      <ControlKnob
        icon={<Sun />}
        value={brightness}
        onChange={(value) => useTVStore.getState().adjustBrightness(value)}
        label="Brightness"
      />
      <ControlKnob
        icon={<Contrast />}
        value={contrast}
        onChange={(value) => useTVStore.getState().adjustContrast(value)}
        label="Contrast"
      />
    </div>
  );
};