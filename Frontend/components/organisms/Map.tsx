import MapView, { Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE } from "react-native-maps";
import { useMapContext } from "../../context/MapContext";
import { useEffect, useState } from "react";
import { LocationType, PostResponseType } from "../../lib/type";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { fetchPlacesOnMap, getAddress } from "../../util/map";
import Markers from "./Markers";
import MapToPostNavigator from "../molecules/MapToPostNavigator";
import MapToDetailNavigatorModal from "../molecules/MapToDetailNavigatorModal";
import * as Location from "expo-location";
import Spinner from "../atoms/SpinLoading";
import MyLocationMarker from "../atoms/MyLocationMarker";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MapNotice from "../molecules/MapNotice";

export default function Map() {
    const [curLocation, setCurLocation] = useState<LocationType | null>(null);
    const [markers, setMarkers] = useState<PostResponseType[]>([]);
    const { onMapPress, location, mapRef, mapPressed } = useMapContext();
    const [address, setAddress] = useState("");
    const [noticeVisible, setNoticeVisible] = useState(false);
    const onMyLocationButtonPress = () => {
        const newLocation = {
            latitude: curLocation?.latitude || 37.5665,
            longitude: curLocation?.longitude || 126.978
        }
        mapRef?.current?.animateToRegion({
            ...newLocation,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
        });
    }
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                return;
            }

            const subscription = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    timeInterval: 2000, // 2초마다 업데이트
                    distanceInterval: 5, // 5m 이동 시 업데이트
                },
                (newLocation) => {
                    setCurLocation({
                        latitude: newLocation.coords.latitude,
                        longitude: newLocation.coords.longitude
                    })
                }
            );

            return () => subscription.remove();
        })();
    }, []);

    useEffect(() => {
        if (location) {
            getAddress(location)
                .then((result) => {
                    if (result) setAddress(result);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [location]);
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onMyLocationButtonPress} style={styles.navigationIconButton}>
                <MaterialCommunityIcons name="target" style={styles.navigationIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setNoticeVisible(true)} style={styles.questionMarkIconButton}>
                <FontAwesome name="question-circle-o" style={styles.questionMarkIcon} />
            </TouchableOpacity>
            {
                curLocation ?
                    <MapView
                        provider={PROVIDER_DEFAULT}
                        ref={mapRef}
                        style={styles.map}
                        initialRegion={{
                            latitude: curLocation.latitude,
                            longitude: curLocation.longitude,
                            latitudeDelta: 0.02,
                            longitudeDelta: 0.02,
                        }}
                        onPress={onMapPress}
                        onRegionChangeComplete={(region) => fetchPlacesOnMap(region, setMarkers)}
                    >
                        {
                            location && mapPressed &&
                            <Marker
                                coordinate={location}
                                title="선택된 장소"
                            >
                                <Ionicons name="pin" style={{ fontSize: 40, color: "#ff3939" }} />
                            </Marker>
                        }
                        <Markers markers={markers} />
                        <MyLocationMarker latitude={curLocation?.latitude} longitude={curLocation?.longitude} />
                    </MapView> :
                    <Spinner isLoading={true} />
            }
            {location && mapPressed &&
                <MapToPostNavigator address={address} latitude={location.latitude} longitude={location.longitude} />
            }
            {
                location && !mapPressed &&
                <MapToDetailNavigatorModal />
            }
            {
                noticeVisible && 
                <MapNotice modalVisible={noticeVisible} setModalVisible={setNoticeVisible} />
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
    },
    map: {
        flex: 1,
    },
    navigationIconButton: {
        position: "absolute",
        fontSize: 20,
        right: 20,
        top: 130,
        zIndex: 15,
        color: "#0984e3",
        backgroundColor: "white",
        borderRadius: 24,
        padding: 4,
        flexDirection: "row",
        alignItems: "center",
    },
    questionMarkIconButton: {
        position: "absolute",
        fontSize: 20,
        right: 20,
        top: 80,
        zIndex: 15,
        color: "#0984e3",
        backgroundColor: "white",
        borderRadius: 24,
        padding: 4,
        flexDirection: "row",
        alignItems: "center",
    },
    navigationIcon: {
        fontSize: 24,
        color: "#0984e3"
    },
    questionMarkIcon: {
        fontSize: 24,
    }
});