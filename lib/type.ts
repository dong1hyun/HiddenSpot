import { Dispatch, SetStateAction } from "react"

export interface AuthType {
    email: string
    password: string
    setLoading: Dispatch<SetStateAction<boolean>>
}

export type AuthStackParamList = {
    Login: undefined;
    Register: undefined;
};