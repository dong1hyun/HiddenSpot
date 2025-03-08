export type AuthStackParamList = {
    Login: undefined;
    Register: undefined;
};

export interface LocationType {
    latitude: number;
    longitude: number;
}


export type MapStackParamList = {
    Map: undefined;
    AddPlace: LocationType;
}

export interface LoginFormType {
    email: string;
    password: string;
}

export interface RegisterFormType {
    email: string;
    password: string;
    confirm_password: string;
    nickName: string
}

export interface UserType {
    email: string;
    nickName: string;
}