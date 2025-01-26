import { create } from 'zustand';

interface UserState {
  user: {
    id: string;
    name: string;
    email: string;
    isAuthenticated: boolean;
  } | null;
  setUser: (user: { id: string; name: string; email: string }) => void;
  clearUser: () => void;
  authenticate: () => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null, // Initial state
  setUser: (user) =>
    set(() => ({
      user: { ...user, isAuthenticated: true },
    })),
  clearUser: () =>
    set(() => ({
      user: null,
    })),
  authenticate: () =>
    set((state) => {
      if (state.user) {
        return {
          user: { ...state.user, isAuthenticated: true },
        };
      }
      return state;
    }),
}));

export default useUserStore;
