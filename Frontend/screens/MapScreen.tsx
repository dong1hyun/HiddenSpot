import { GOOGLE_MAPS_API_KEY } from "@env";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import MapView, { MapPressEvent, Marker } from "react-native-maps";
import 'react-native-get-random-values';
import Button from "../components/atoms/Button";
import { Text } from "react-native";
import ModalContainer from "../components/templates/ModalContainer";
import { MapStackParamList } from "../lib/type";
import Geocoder from "react-native-geocoding";
import { fetchPlace, getAddress, getNearbyPlace } from "../util/map";
import Map from "../components/organisms/Map";
import { StackNavigationProp } from "@react-navigation/stack";
import BottomSlider from "../components/organisms/BottomSlider";
import MapProvider from "../context/MapContext";

type MapScreenNavigationProp = StackNavigationProp<MapStackParamList, 'Map'>;

type MapScreenProps = {
    navigation: MapScreenNavigationProp;
};

export default function MapScreen({ navigation }: MapScreenProps) {
    const mapRef = useRef<MapView>(null);

    useEffect(() => {
        Geocoder.init(GOOGLE_MAPS_API_KEY, {
            language: "ko"
        });
    }, []);

    // const onAddPress = () => {
    //     navigation.navigate("AddPlace", location);
    //     setModalVisible(false);
    // }

    return (
        <MapProvider>
            <View style={styles.container}>
                <Map mapRef={mapRef} />
                {/* <ModalContainer modalVisible={modalVisible} setModalVisible={setModalVisible}>
                    <>
                        <Text style={styles.modalTitle}>선택한 장소를 사람들에게 소개해보세요!</Text>
                        <View style={styles.modalButtons}>
                            <Button style={{ width: 90 }} onPress={onAddPress}>소개하기</Button>
                            <Button style={{ width: 90, borderColor: "red" }} color="red" onPress={() => setModalVisible(false)}>닫기</Button>
                        </View>
                    </>
                </ModalContainer> */}
                <BottomSlider mapRef={mapRef} />
            </View  >
        </MapProvider>
    );
}


const styles = StyleSheet.create({
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