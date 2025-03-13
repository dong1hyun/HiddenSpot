import { RouteProp } from "@react-navigation/native";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { MapStackParamList } from "../lib/type";
import MapView, { Marker } from "react-native-maps";
import ScreenContainer from "../components/templates/ScreenContainer";
import Geocoder from "react-native-geocoding";
import { GOOGLE_MAPS_API_KEY } from "@env";
import { useEffect } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import AddPlaceForm from "../components/organisms/AddPlaceForm";

const { width, height } = Dimensions.get('window');

type AddPlaceScreenNavigationProp = StackNavigationProp<MapStackParamList, "AddPlace">;
type AddPlaceScreenProp = RouteProp<MapStackParamList, "AddPlace">;

interface Props {
    navigation: AddPlaceScreenNavigationProp,
    route: AddPlaceScreenProp
}

export default function AddPlaceScreen({ navigation, route }: Props) {
    const { latitude, longitude, address } = route.params;

    useEffect(() => {
        Geocoder.init(GOOGLE_MAPS_API_KEY, {
            language: "ko"
        });
    }, []);

    return (
        <View style={styles.container}>
            <ScreenContainer>
                <Text style={styles.address}>주소: {address}</Text>
                <View style={styles.mapContainer}>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude,
                            longitude,
                            latitudeDelta: 0.05,
                            longitudeDelta: 0.05,
                        }}
                    >
                        <Marker
                            title="선택된 장소"
                            coordinate={{
                                latitude,
                                longitude
                            }}
                        />
                    </MapView>
                </View>
                <AddPlaceForm address={address} latitude={latitude} longitude={longitude} />
            </ScreenContainer>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 40,
        backgroundColor: "white"
    },
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
    camera: {
        fontSize: 200,
        color: "gray"
    },
    imageContainer: {
        width: "100%",
        height: width,
        justifyContent: "center",
        alignItems: "center",
        borderStyle: "dashed",
        borderWidth: 2,
        borderRadius: 24,
        marginTop: 36
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 24,
    },
});