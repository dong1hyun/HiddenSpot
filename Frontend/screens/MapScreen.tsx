import { GOOGLE_MAPS_API_KEY } from "@env";
import { useRef, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import MapView, { MapPressEvent, Marker } from "react-native-maps";
import 'react-native-get-random-values';
import Button from "../components/atoms/Button";
import { Text } from "react-native";
import ModalContainer from "../components/templates/ModalContainer";

export default function MapScreen() {
    const [location, setLocation] = useState({
        latitude: 37.5665,
        longitude: 126.9780, // 기본 위치 (서울)
    });
    const [query, setQuery] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const mapRef = useRef<MapView>(null);

    const fetchPlaces = async () => {
        const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${GOOGLE_MAPS_API_KEY}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data?.results?.length > 0) {
                const place = data.results[0];
                console.log(place)
                const newLocation = {
                    latitude: place.geometry.location.lat,
                    longitude: place.geometry.location.lng,
                };

                setLocation(newLocation);
                mapRef?.current?.animateToRegion({
                    ...newLocation,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                });
            }
        } catch (error) {
            console.error("Error fetching places:", error);
        }
    };

    const onMarkerPress = () => {
        setModalVisible(true)
    }

    const onMapPress = (e: MapPressEvent) => {
        const { latitude, longitude } = e.nativeEvent.coordinate;
        setLocation({ latitude, longitude });
    };

    return (
        <View style={{ flex: 1 }}>
            <TextInput
                placeholder="장소를 검색하세요"
                onChangeText={setQuery}
                value={query}
                onSubmitEditing={fetchPlaces}
            />
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
            >
                <Marker
                    coordinate={location}
                    title="선택된 장소"
                    onPress={onMarkerPress}
                />
            </MapView>
            <ModalContainer modalVisible={modalVisible} setModalVisible={setModalVisible}>
                <>
                    <Text style={styles.modalTitle}>선택한 장소를 사람들에게 소개해보세요!</Text>
                    <View style={styles.modalButtons}>
                        <Button style={{ width: 90, borderColor: "#20bf6b" }} color="#20bf6b" onPress={() => { }}>소개하기</Button>
                        <Button style={{ width: 90, borderColor: "red" }} color="red" onPress={() => setModalVisible(false)}>닫기</Button>
                    </View>
                </>
            </ModalContainer>
        </View>
    );
}


const styles = StyleSheet.create({
    searchBar: {
        
    },
    container: {
        flex: 1,
    },
    map: {
        width: "100%",
        height: "100%",
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "center",
        width: 250,
        padding: 20,
        backgroundColor: "white",
        borderRadius: 10,
        alignItems: "center",
        gap: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        color: "white"
    },
});