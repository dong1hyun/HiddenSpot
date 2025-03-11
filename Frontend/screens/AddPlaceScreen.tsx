import { RouteProp } from "@react-navigation/native";
import { Button, Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { LocationType, MapStackParamList } from "../lib/type";
import MapView, { MapPressEvent, Marker } from "react-native-maps";
import ScreenContainer from "../components/templates/ScreenContainer";
import Geocoder from "react-native-geocoding";
import { GOOGLE_MAPS_API_KEY } from "@env";
import { useEffect, useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import * as ImagePicker from 'expo-image-picker';

const { width, height } = Dimensions.get('window');

type AddPlaceScreenNavigationProp = StackNavigationProp<MapStackParamList, "AddPlace">;
type AddPlaceScreenProp = RouteProp<MapStackParamList, "AddPlace">;

interface Props {
    navigation: AddPlaceScreenNavigationProp,
    route: AddPlaceScreenProp
}

export default function AddPlaceScreen({ navigation, route }: Props) {
    const {latitude, longitude, address} = route.params;
    
    useEffect(() => {
        Geocoder.init(GOOGLE_MAPS_API_KEY, {
            language: "ko"
        });
    }, []);

    const [image, setImage] = useState<string | null>(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            console.log(result);
            setImage(result.assets[0].uri);
        }
    };

    return (
        <ScreenContainer>
            <Text style={styles.address}>{address}</Text>
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
            <Button title="사진 선택" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={styles.image} />}
        </ScreenContainer>
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
    },
    image: {
        width: 100,
        height: 100,
    }
});