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
}

export type HomeStackParamList = {
    Home: undefined;
    PlaceDetail: {
        id: number
    };
    AddPlace: LocationType & {
        address: string;
        id?: number;
        photoUrl?: string;
        title?: string;
        description?: string;
    };
}

//FormType

export interface LoginFormType {
    email: string;
    password: string;
}

export interface RegisterFormType {
    email: string;
    password: string;
    confirm_password: string;
    nickName: string;
    interests: string[];
}

export interface PostFormType {
    title: string;
    description: string;
    photoUrl: string;
}

export interface PostResponseType extends PostFormType {
    id: number;
    address: string;
    latitude: number;
    longitude: number;
    nickName: string;
    created_at: Date;
    updated_at: Date;
    favoriteCount: number;
    likeCount: number;
    isFavorited: boolean;
    isLiked: boolean;
}


export interface LocationType {
    latitude: number;
    longitude: number;
}

export interface UserType {
    email: string;
    nickName: string;
    interests: string[];
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

export interface UserExistCheckType {
    emailExist: boolean,
    nickNameExist: boolean
}

export interface FavoriteAndLikeType { 
    id: number;
    userEmail: string;
    placeId: number;
}