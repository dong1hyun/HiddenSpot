// NavigationType

import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
    HomeNavigator: NavigatorScreenParams<HomeStackParamList>,
    MapNavigator: NavigatorScreenParams<MapStackParamList>,
}

export type AuthStackParamList = {
    Auth: undefined;
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

export type MyPageStackParamList = {
    MyPage: undefined;
    PlaceList: {
        type: "favorite" | "myPosts",
        headerTitle: string
    };
    UserInfoUpdate: undefined;
}

//FormType

export interface LoginFormType {
    email: string;
}

export interface RegisterFormType {
    email: string;
    nickName: string;
    interests: string[];
    token: string;
}

export interface PostFormType {
    title: string;
    description: string;
    photoUrl: string;
}

export interface UserInfoFormType {
    nickName: string;
    interests: string[];
    profileImageUrl: string;
}

// ResponseType

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
    tags: string[];
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

export interface NearbyPlaceResponseType {
    displayName: {
        text: string
    }
    photos: photo[]
    location: LocationType
    formattedAddress: string
}

type photo = {
    name: string
}

export interface RecommendationPlaceResponseType extends PostFormType {
    id: number;
    address: string;
    latitude: number;
    longitude: number;
    nickName: string;
    created_at: Date;
    updated_at: Date;
    _count: {likedBy: number}
}

export interface PlaceType {
    placeName: string;
    photoUrl: string | null;
    formattedAddress: string;
    location: LocationType;
    likeCount?: number;
}

export interface UserExistCheckType {
    nickNameExist: boolean
}

export interface FavoriteAndLikeType { 
    id: number;
    userEmail: string;
    placeId: number;
}