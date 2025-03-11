// NavigationType

import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
    HomeNavigator: NavigatorScreenParams<HomeStackParamList>,
    MapNavigator: NavigatorScreenParams<MapStackParamList>,
}

export type AuthStackParamList = {
    Login: undefined;
    Register: undefined;
};

export type MapStackParamList = {
    Map: undefined;
    AddPlace: LocationType & {address: string};
}

export type HomeStackParamList = {
    Home: undefined;
}


export interface LocationType {
    latitude: number;
    longitude: number;
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

type photo = {
    name: string
}

export interface NearbyPlaceResponseType {
    displayName: {
        text: string
    }
    photos: photo[]
    location: LocationType
    formattedAddress: string
}

export interface PlaceType {
    placeName: string;
    photoUrl: string | null;
    formattedAddress: string;
    location: LocationType;
}