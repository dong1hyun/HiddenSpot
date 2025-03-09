import { GOOGLE_MAPS_API_KEY } from "@env";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import MapView, { MapPressEvent, Marker } from "react-native-maps";
import 'react-native-get-random-values';
import Button from "../components/atoms/Button";
import { Text } from "react-native";
import ModalContainer from "../components/templates/ModalContainer";
import { MapStackParamList } from "../lib/type";
import ScreenContainer from "../components/templates/ScreenContainer";
import Geocoder from "react-native-geocoding";
import { fetchPlace, getAddress, getNearPlace } from "../util/map";
import Map from "../components/organisms/Map";
import { StackNavigationProp } from "@react-navigation/stack";
import BottomSlider from "../components/organisms/BottomSlider";

type MapScreenNavigationProp = StackNavigationProp<MapStackParamList, 'Map'>;

type MapScreenProps = {
    navigation: MapScreenNavigationProp;
};

export default function MapScreen({ navigation }: MapScreenProps) {
    const [location, setLocation] = useState({
        latitude: 37.5665,
        longitude: 126.9780, // 기본 위치 (서울)
    });

    const [query, setQuery] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [address, setAddress] = useState("");
    const mapRef = useRef<MapView>(null);

    useEffect(() => {
        Geocoder.init(GOOGLE_MAPS_API_KEY, {
            language: "ko"
        });
    }, []);

    const getPlaceData = async () => {
        try {
            const newLocation = await fetchPlace(query);
            if (newLocation) {
                setLocation(newLocation);
                mapRef?.current?.animateToRegion({
                    ...newLocation,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                });
                const address = await getAddress(newLocation);
                if (address) setAddress(address);
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

    const onAddPress = () => {
        navigation.navigate("AddPlace", location);
        setModalVisible(false);
    }

    useEffect(() => {
        getNearPlace(location);
    }, [location]);

    return (
        <ScreenContainer>
            <TextInput
                placeholder="장소를 검색하세요"
                onChangeText={setQuery}
                value={query}
                onSubmitEditing={getPlaceData}
            />
            <Map location={location} mapRef={mapRef} onMapPress={onMapPress} onMarkerPress={onMarkerPress} />
            <ModalContainer modalVisible={modalVisible} setModalVisible={setModalVisible}>
                <>
                    <Text style={styles.modalTitle}>선택한 장소를 사람들에게 소개해보세요!</Text>
                    <View style={styles.modalButtons}>
                        <Button style={{ width: 90 }} onPress={onAddPress}>소개하기</Button>
                        <Button style={{ width: 90, borderColor: "red" }} color="red" onPress={() => setModalVisible(false)}>닫기</Button>
                    </View>
                </>
            </ModalContainer>
            <BottomSlider />
        </ScreenContainer>
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