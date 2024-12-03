export interface Video {
  id: string;
  title: string;
}

export interface Channel {
  id: number;
  name: string;
  playlist: Video[];
  autopilot: boolean;
}

export interface TVState {
  currentChannel: number;
  channels: Channel[];
  isOn: boolean;
  volume: number;
  brightness: number;
  contrast: number;
  isStatic: boolean;
  currentVideoIndex: number;
}