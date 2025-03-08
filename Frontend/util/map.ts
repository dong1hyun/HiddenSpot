import { GOOGLE_MAPS_API_KEY } from "@env";
import { LocationType } from "../lib/type";

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
        console.error("Error fetching places:", error);
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
        console.error(error);
    }
};

export const getNearPlace = async (location: LocationType) => {
    const params = {
        "includedTypes": ["restaurant"],
        "maxResultCount": 10,
        "locationRestriction": {
            "circle": {
                "center": location,
                "radius": 500.0
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
                "X-Goog-FieldMask": "places.displayName",
                "Accept-Language": "ko"
            }
        });
        const data = await response.json();
        console.log("주변장소:", data.places.map((place:any) => place.displayName));
        
    } catch (error) {
        console.error(error);
    }
}