import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TVState } from '../types/youtube';
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';

const defaultChannels = [
  {
    id: 1,
    name: "Default Channel",
    playlist: [
      { id: "tJC_oQ5cyc4", title: "Default Video" },
    ],
    autopilot: true
  },
];

interface TVStore extends TVState {
  useFirebase: boolean;
  setUseFirebase: (useFirebase: boolean) => void;
  addChannel: (name: string, playlistIds: string[]) => Promise<void>;
  removeChannel: (id: number) => Promise<void>;
  updateChannel: (id: number, name: string, playlistIds: string[]) => Promise<void>;
  fetchChannels: () => Promise<void>;
  toggleAutopilot: (channelId: number) => void;
  nextVideo: () => void;
}

export const useTVStore = create<TVStore>()(
  persist(
    (set, get) => ({
      currentChannel: 1,
      channels: defaultChannels,
      isOn: false,
      volume: 50,
      brightness: 50,
      contrast: 50,
      isStatic: false,
      useFirebase: false,
      currentVideoIndex: 0,

      setUseFirebase: (useFirebase: boolean) => set({ useFirebase }),
      
      setChannel: (channel: number) => set({ currentChannel: channel, isStatic: true, currentVideoIndex: 0 }),
      togglePower: () => set((state) => ({ isOn: !state.isOn })),
      adjustVolume: (volume: number) => set({ volume }),
      adjustBrightness: (brightness: number) => set({ brightness }),
      adjustContrast: (contrast: number) => set({ contrast }),
      setStatic: (isStatic: boolean) => set({ isStatic }),

      toggleAutopilot: (channelId: number) => set((state) => ({
        channels: state.channels.map(channel =>
          channel.id === channelId
            ? { ...channel, autopilot: !channel.autopilot }
            : channel
        )
      })),

      nextVideo: () => set((state) => {
        const currentChannel = state.channels.find(c => c.id === state.currentChannel);
        if (!currentChannel?.autopilot) return state;
        
        const nextIndex = (state.currentVideoIndex + 1) % currentChannel.playlist.length;
        return { currentVideoIndex: nextIndex, isStatic: true };
      }),

      fetchChannels: async () => {
        if (!get().useFirebase) return;
        
        const querySnapshot = await getDocs(collection(db, 'channels'));
        const channels = querySnapshot.docs.map(doc => ({
          id: parseInt(doc.id),
          ...doc.data()
        })) as TVState['channels'];
        
        set({ channels });
      },

      addChannel: async (name: string, playlistIds: string[]) => {
        const newChannel = {
          id: Math.max(0, ...get().channels.map(c => c.id)) + 1,
          name,
          playlist: playlistIds.map(id => ({ id, title: '' })),
          autopilot: true
        };

        if (get().useFirebase) {
          await addDoc(collection(db, 'channels'), newChannel);
          await get().fetchChannels();
        } else {
          set((state) => ({
            channels: [...state.channels, newChannel]
          }));
        }
      },

      removeChannel: async (id: number) => {
        if (get().useFirebase) {
          await deleteDoc(doc(db, 'channels', id.toString()));
          await get().fetchChannels();
        } else {
          set((state) => ({
            channels: state.channels.filter(c => c.id !== id)
          }));
        }
      },

      updateChannel: async (id: number, name: string, playlistIds: string[]) => {
        const updatedChannel = {
          name,
          playlist: playlistIds.map(pid => ({ id: pid, title: '' }))
        };

        if (get().useFirebase) {
          await updateDoc(doc(db, 'channels', id.toString()), updatedChannel);
          await get().fetchChannels();
        } else {
          set((state) => ({
            channels: state.channels.map(c => 
              c.id === id ? { ...c, ...updatedChannel } : c
            )
          }));
        }
      }
    }),
    {
      name: 'tv-storage'
    }
  )
);