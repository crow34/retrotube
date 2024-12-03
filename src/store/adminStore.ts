import { create } from 'zustand';
import { AdminState } from '../types/admin';
import { hashPassword, verifyPassword } from '../utils/auth';

const ADMIN_PASSWORD_HASH = '$2a$10$8K1p/9jh6vPH1L6q7.3x8O5k5j3qZF5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z'; // Replace with your hashed password

interface AdminStore extends AdminState {
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  toggleAdmin: () => void;
}

export const useAdminStore = create<AdminStore>((set) => ({
  isAuthenticated: false,
  isAdminOpen: false,

  login: async (username: string, password: string) => {
    if (username === 'admin' && await verifyPassword(password, ADMIN_PASSWORD_HASH)) {
      set({ isAuthenticated: true });
      return true;
    }
    return false;
  },

  logout: () => set({ isAuthenticated: false }),
  toggleAdmin: () => set((state) => ({ isAdminOpen: !state.isAdminOpen })),
}));