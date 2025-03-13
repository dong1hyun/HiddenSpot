import { create } from "zustand";

interface StoreType {
    email: string;
    setEmail: (email: string) => void;
}

const AuthStore = create<StoreType>((set) => ({
    email: "",
    setEmail: (email: string) => set((state) => ({email})),
}));

export default AuthStore;