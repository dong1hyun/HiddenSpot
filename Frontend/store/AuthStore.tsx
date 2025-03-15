import { create } from "zustand";

interface StoreType {
    email: string;
    nickName: string;
    setEmail: (email: string) => void;
    setNickName: (nickName: string) => void;
}

const AuthStore = create<StoreType>((set) => ({
    email: "",
    nickName: "",
    setEmail: (email: string) => set((state) => ({email})),
    setNickName: (nickName: string) => set((state) => ({nickName}))
}));

export default AuthStore;