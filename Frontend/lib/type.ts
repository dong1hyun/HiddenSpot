export type AuthStackParamList = {
    Login: undefined;
    Register: undefined;
};

export type MapStackParamList = {
    Map: undefined;
    AddPlace: {
        latitude: number;
        longitude: number;
    };
}

export interface LoginFormType {
    email: string;
    password: string;
}

export interface RegisterFormType {
    email: string;
    password: string;
    confirm_password:string;
    nickName: string
}

export interface UserType {
    email: string;
    nickName: string;
}