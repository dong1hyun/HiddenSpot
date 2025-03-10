import { Image, Pressable } from "react-native";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native"
import { LocationType, PlaceType } from "../../lib/type";
import { useMapContext } from "../../context/MapContext";

export default function NearbyPlaceItem({ photoUrl, placeName, location, formattedAddress }: PlaceType) {
    const { setLocation } = useMapContext();
    return (
        <Pressable onPress={() => setLocation(location)} style={styles.container}>
            <Image style={styles.image} source={photoUrl ? { uri: photoUrl } : require("../../assets/alt.jpg")} />
            <View>
                <Text>{placeName}</Text>
                <Text>{formattedAddress}</Text>
            </View>
        </Pressable>
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
    }
});