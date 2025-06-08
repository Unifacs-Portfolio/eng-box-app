import { create } from 'zustand';
import { UserResponse } from '../types/user-response';
import { User } from '../types/user';

interface UserState {
	user: User | null;
	setUser: (newUser: User | null) => void;
	clearUser: () => void;
}

export const userStore = create<UserState>((set) => ({
	user: null,
	setUser: (newUser: User | null) => set({ user: newUser }),
	clearUser: () => set({ user: null }),
}));
