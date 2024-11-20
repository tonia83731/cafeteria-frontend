import { create } from "zustand";
export type UserProfile = {
  id: number;
  name: string;
  email: string;
  languageId: number;
};
export interface UserState {
  profile: UserProfile | null;
  isAuth: boolean;
  setProfile: (data: UserProfile | null) => void;
}
export const useUserStore = create<UserState>()((set) => ({
  profile: null,
  isAuth: false,
  setProfile: (profile) =>
    set(() => ({
      profile,
      isAuth: !!profile,
    })),
}));
