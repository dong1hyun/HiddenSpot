import { Image, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native"
import { PlaceType } from "../../lib/type";
import { useMapContext } from "../../context/MapContext";
import MapView from "react-native-maps";

interface RefType {
    mapRef:  React.RefObject<MapView>
}

export default function BottomSliderPlaceItem({ photoUrl, placeName, location, formattedAddress, mapRef }: PlaceType & RefType) {
    const onPlacePress = () => {
        setLocation(location);
        mapRef?.current?.animateToRegion({
            ...location,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          });

    }
    const { setLocation } = useMapContext();
    return (
        <TouchableOpacity onPress={onPlacePress} style={styles.container}>
            <Image style={styles.image} source={photoUrl ? { uri: photoUrl } : require("../../assets/alt.jpg")} />
            <View>
                <Text>{placeName}</Text>
                <Text style={styles.address}>{formattedAddress}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 10,
        backgroundColor: "white",
        borderRadius: 16,
        elevation: 2,
        gap: 10
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 16
    },
    title: {

    },
    address: {
        fontSize: 12
    }
});