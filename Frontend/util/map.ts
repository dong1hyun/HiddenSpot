import { GOOGLE_MAPS_API_KEY } from "@env";
import { LocationType, NearbyPlaceResponseType, PlaceType } from "../lib/type";
import Geocoder from "react-native-geocoding";

export const fetchSearchPlace = async (query: string) => {
    const url = `https://places.googleapis.com/v1/places:searchText`;
    const params = {
        "pageSize": 10,
        "textQuery": query
    }
    try {
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(params),
            headers: {
                "Content-Type": "application/json",
                "X-Goog-Api-Key": GOOGLE_MAPS_API_KEY,
                "X-Goog-FieldMask": "places.displayName,places.photos,places.location,places.formattedAddress",
                "Accept-Language": "ko"
            }
        });
        const data = await response.json();
        if (data?.places?.length > 0) {
            const places = await fetchPlaceData(data.places);
            return places;
        }
    } catch (error) {
        console.error("장소 검색 에러:", error);
    }
};

export const getAddress = async (location: LocationType) => {
    try {
        const response = await Geocoder.from({
            latitude: location.latitude,
            longitude: location.longitude
        });

        const address = response?.results[0]?.formatted_address;
        return address;
    }
    catch (error) {
        console.error("좌표를 주소로 변환중 에러:", error);
    }
};

const fetchPhotoUrl = async (name: string | undefined) => {
    if (!name) return null;
    const url = `https://places.googleapis.com/v1/${name}/media?key=${GOOGLE_MAPS_API_KEY}&maxHeightPx=400&maxWidthPx=400`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("이미지 fetch에 실패했습니다.");
        }
        return response.url;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const fetchPlaceData = async (places: NearbyPlaceResponseType[]): Promise<PlaceType[] | undefined> => {
    try {
        const request = places.map((place: NearbyPlaceResponseType) => {
            const firstPhoto = place?.photos ? place.photos[0].name : undefined;
            return fetchPhotoUrl(firstPhoto)
                .then((photoUrl) => {
                    return ({
                    placeName: place?.displayName?.text,
                    photoUrl,
                    location: place?.location,
                    formattedAddress: place?.formattedAddress
                })});
        });
        const result = await Promise.all(request);
        return result;
    } catch (error) {
        console.error("장소 데이터 fetch에 실패했습니다.", error);
    }
}

export const getNearbyPlace = async (location: LocationType) => {
    const params = {
        "includedTypes": ['tourist_attraction', 'restaurant', 'cafe'],
        "maxResultCount": 10,
        "locationRestriction": {
            "circle": {
                "center": location,
                "radius": 200
            }
        }
    };
    try {
        const response = await fetch("https://places.googleapis.com/v1/places:searchNearby", {
            method: "POST",
            body: JSON.stringify(params),
            headers: {
                "Content-Type": "application/json",
                "X-Goog-Api-Key": GOOGLE_MAPS_API_KEY,
                "X-Goog-FieldMask": "places.displayName,places.photos,places.location,places.formattedAddress",
                "Accept-Language": "ko"
            }
        });
        const data = await response.json();
        if (data?.places) {
            const places = await fetchPlaceData(data.places);
            return places;
        }
    } catch (error) {
        console.error("주변 장소 추천 에러:", error);
    }
}