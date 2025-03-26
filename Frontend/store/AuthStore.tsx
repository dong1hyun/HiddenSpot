import { create } from "zustand";

interface StoreType {
    email: string;
    nickName: string;
    interests: string[];
    profileImageUrl: string;
    setEmail: (email: string) => void;
    setNickName: (nickName: string) => void;
    setInterests: (interests: string[]) => void;
    setProfileImageUrl: (profileImageUrl: string) => void;
}

const AuthStore = create<StoreType>((set) => ({
    email: "",
    nickName: "",
    interests: [],
    profileImageUrl: "",
    setEmail: (email: string) => set((state) => ({email})),
    setNickName: (nickName: string) => set((state) => ({nickName})),
    setInterests: (interests: string[]) => set((state) => ({interests: [...interests]})),
    setProfileImageUrl: (profileImageUrl: string) => set((state) => ({profileImageUrl}))
}));

export default AuthStore;