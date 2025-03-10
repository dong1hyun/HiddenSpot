import { GOOGLE_MAPS_API_KEY } from "@env";
import { LocationType, NearbyPlaceResponseType, PlaceType } from "../lib/type";
import Geocoder from "react-native-geocoding";

export const fetchPlace = async (query: string) => {
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${GOOGLE_MAPS_API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data?.results?.length > 0) {
            const place = data.results[0];
            const newLocation = {
                latitude: place.geometry.location.lat,
                longitude: place.geometry.location.lng,
            };

            return newLocation;
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

const fetchPhotoUrl = async (name: string) => {
    const url = `https://places.googleapis.com/v1/${name}/media?key=${GOOGLE_MAPS_API_KEY}&maxHeightPx=400&maxWidthPx=400`;
    try {
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error("이미지 fetch에 실패했습니다.");
        }
        return response.url;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const fetchPlaceData = async (places: NearbyPlaceResponseType[]):Promise<PlaceType[] | undefined> => {
    try {
        const request = places.map((place: NearbyPlaceResponseType) => {
            const firstPhoto = place?.photos[0]?.name;
            if (firstPhoto) {
                return fetchPhotoUrl(firstPhoto)
                    .then((photoUrl) => ({
                        placeName: place.displayName.text,
                        photoUrl,
                        location: place.location
                        
                    }))
            } else {
                return Promise.resolve({
                    placeName: place.displayName.text,
                    photoUrl: null,
                    location: place.location
                });
            }
        });
        const result = await Promise.all(request);
        return result;
    } catch (error) {
        console.error(error);
    }
}

export const getNearbyPlace = async (location: LocationType) => {
    const params = {
        "includedTypes": ['tourist_attraction', 'restaurant', 'cafe'],
        "maxResultCount": 3,
        "locationRestriction": {
            "circle": {
                "center": location,
                "radius": 100
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
                "X-Goog-FieldMask": "places.displayName,places.photos,places.location",
                "Accept-Language": "ko"
            }
        });
        const data = await response.json();
        // console.log("주변장소:", data.places.map((place:any) => place.photos.name));
        // console.log(data.places[0].photos);
        // console.log(data.places)
        const places = await fetchPlaceData(data.places);
        return places;
    } catch (error) {
        console.error("주변 장소 추천 에러:", error);
    }
}