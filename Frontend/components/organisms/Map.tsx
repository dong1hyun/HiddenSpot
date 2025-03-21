import MapView, { Marker, Region } from "react-native-maps";
import { useMapContext } from "../../context/MapContext";
import { useEffect, useState } from "react";
import { PostResponseType } from "../../lib/type";
import { StyleSheet, View } from "react-native";
import { getAddress } from "../../util/map";
import { getData } from "../../util/fetch";
import Markers from "./Markers";
import { API_URL } from "@env";
import MapToPostNavigator from "../molecules/MapToPostNavigator";
import MapToDetailNavigatorModal from "../molecules/MapToDetailNavigatorModal";

export default function Map() {
    const [markers, setMarkers] = useState<PostResponseType[]>();
    const { onMapPress, location, mapRef, mapPressed } = useMapContext();
    const [address, setAddress] = useState("");
    const fetchPlaces = async (region: Region) => {
        const { latitude, longitude, latitudeDelta, longitudeDelta } = region;

        if (latitudeDelta > 0.05) {
            setMarkers([]); // 줌 아웃 시 장소 숨김
            return;
        }

        const minLat = latitude - latitudeDelta / 2;
        const maxLat = latitude + latitudeDelta / 2;
        const minLng = longitude - longitudeDelta / 2;
        const maxLng = longitude + longitudeDelta / 2;
        
        const markers = await getData(`${API_URL}/place/marker?minLat=${minLat}&maxLat=${maxLat}&minLng=${minLng}&maxLng=${maxLng}`);
        setMarkers(markers);
    };

    useEffect(() => {
        if(location) {
            getAddress(location)
            .then((result) => {
                if(result) setAddress(result);
            })
            .catch((error) => {
                console.error(error);
            });
        }
    }, [location]);
    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: 37.5665,
                    longitude: 126.9780,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
                onPress={onMapPress}
                onRegionChangeComplete={fetchPlaces}
            >
                {
                    location && mapPressed &&
                    <Marker
                        coordinate={location}
                        title="선택된 장소"
                    />
                }
                <Markers markers={markers} />
            </MapView>
            {location && mapPressed &&
                <MapToPostNavigator address={address} latitude={location.latitude} longitude={location.longitude} />
            }
            {
                location && !mapPressed &&
                <MapToDetailNavigatorModal />
            }
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});