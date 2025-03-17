import MapView, { Marker, Region } from "react-native-maps";
import { useMapContext } from "../../context/MapContext";
import { useEffect, useState } from "react";
import { MapStackParamList, PostResponseType } from "../../lib/type";
import Button from "../atoms/Button";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Image, StyleSheet, Text, View } from "react-native";
import { getAddress } from "../../util/map";
import { getData } from "../../util/fetch";
import Markers from "./Markers";
import { API_URL } from "@env";

type MapScreenNavigationProp = StackNavigationProp<MapStackParamList, "Map">

export default function Map({ mapRef }: { mapRef: React.RefObject<MapView> }) {
    const navigation = useNavigation<MapScreenNavigationProp>();
    const [markers, setMarkers] = useState<PostResponseType[]>();
    const { onMapPress, location, onMarkerPress, setLocation } = useMapContext();
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

    const onAddPress = () => {
        if(location) navigation.navigate("AddPlace", {
            latitude: location.latitude,
            longitude: location.longitude,
            address,
        });
    }

    const onCancelPress = () => {
        setLocation(null);
    }

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
                    location &&
                    <Marker
                        coordinate={location}
                        title="선택된 장소"
                        onPress={onMarkerPress}
                    />
                }
                <Markers markers={markers} />
            </MapView>
            {location &&
                <View style={styles.overlay}>
                    <Text>선택된 장소를 소개해보세요.</Text>
                    <Text>{address}</Text>
                    <View style={styles.buttons}>
                        <Button
                            buttonStyle={{backgroundColor: "#74b9ff", borderWidth: 0}}
                            onPress={onAddPress}>
                            확인
                        </Button>
                        <Button
                            buttonStyle={{backgroundColor: "#ff7675", borderWidth: 0}}
                            onPress={onCancelPress}>
                            취소
                        </Button>
                    </View>
                </View>
            }
        </View>

    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    overlay: {
        position: 'absolute',
        top: 50,
        left: 0,
        right: 0,
        zIndex: 10,
        backgroundColor: "white",
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        gap: 10
    },
    buttons: {
        flexDirection: "row",
        gap: 10
    }
});