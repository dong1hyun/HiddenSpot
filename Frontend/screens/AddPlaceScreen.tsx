import { RouteProp } from "@react-navigation/native";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { HomeStackParamList } from "../lib/type";
import ScreenContainer from "../components/templates/ScreenContainer";
import Geocoder from "react-native-geocoding";
import { GOOGLE_MAPS_API_KEY } from "@env";
import { useEffect, useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import StaticMap from "../components/molecules/StaticMap";
import FullScreenLoader from "../components/atoms/FullScreenLoader";
import AddPlaceForm from "../components/organisms/AddOrUpdatePlaceForm";

const { width, height } = Dimensions.get('window');

type AddPlaceScreenNavigationProp = StackNavigationProp<HomeStackParamList, "AddPlace">;
type AddPlaceScreenProp = RouteProp<HomeStackParamList, "AddPlace">;

interface Props {
    navigation: AddPlaceScreenNavigationProp,
    route: AddPlaceScreenProp
}

export default function AddPlaceScreen({ navigation, route }: Props) {
    const { latitude, longitude, address } = route.params;
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        Geocoder.init(GOOGLE_MAPS_API_KEY, {
            language: "ko"
        });
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <ScreenContainer>
                <Text style={styles.address}>주소: {address}</Text>
                <View style={styles.mapContainer}>
                    <StaticMap latitude={latitude} longitude={longitude} style={styles.map} />
                </View>
                <AddPlaceForm isLoading={isLoading} setIsLoading={setIsLoading} />
            </ScreenContainer>
            <FullScreenLoader loading={isLoading} />
        </View>
    );
};

const styles = StyleSheet.create({
    mapContainer: {
        width: "100%",
        height: height / 3,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#dfe6e9",
        overflow: 'hidden'
    },
    map: {
        width: "100%",
        height: "100%",
    },
    address: {
        fontSize: 15,
        fontWeight: "bold",
        marginVertical: 5
    },
});