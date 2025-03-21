import { GOOGLE_MAPS_API_KEY } from "@env";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import MapView, { MapPressEvent, Marker } from "react-native-maps";
import 'react-native-get-random-values';
import { MapStackParamList } from "../lib/type";
import Geocoder from "react-native-geocoding";
import Map from "../components/organisms/Map";
import { StackNavigationProp } from "@react-navigation/stack";
import BottomSlider from "../components/organisms/BottomSlider";

type MapScreenNavigationProp = StackNavigationProp<MapStackParamList, 'Map'>;

type MapScreenProps = {
    navigation: MapScreenNavigationProp;
};

export default function MapScreen({ navigation }: MapScreenProps) {
    useEffect(() => {
        Geocoder.init(GOOGLE_MAPS_API_KEY, {
            language: "ko"
        });
    }, []);

    return (
        <View style={styles.container}>
            <Map />
            <BottomSlider />
        </View  >
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