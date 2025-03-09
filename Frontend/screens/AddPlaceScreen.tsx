import { RouteProp } from "@react-navigation/native";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { MapStackParamList } from "../lib/type";
import MapView, { Marker } from "react-native-maps";
import ScreenContainer from "../components/templates/ScreenContainer";
import Geocoder from "react-native-geocoding";
import { GOOGLE_MAPS_API_KEY } from "@env";
import { useEffect } from "react";
import { StackScreenProps } from "@react-navigation/stack";


const { width, height } = Dimensions.get('window');
type Props = StackScreenProps<MapStackParamList, "AddPlace">

export default function AddPlaceScreen({ route }: Props) {
    const location = route.params;

    useEffect(() => {
        Geocoder.init(GOOGLE_MAPS_API_KEY, {
            language: "ko"
        });
    }, []);

    
    return (
        <ScreenContainer>
            <View style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        ...location,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05,
                    }}
                >
                    <Marker
                        title="선택된 장소"
                        coordinate={location}
                    />
                </MapView>
            </View>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    mapContainer: {
        width: "100%",
        height: height / 3,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "black",
        overflow: 'hidden'
    },
    map: {
        width: "100%",
        height: "100%",
    },
});