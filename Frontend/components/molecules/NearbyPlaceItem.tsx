import { Image } from "react-native";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native"
import { LocationType } from "../../lib/type";

interface Props {
    placeName: string;
    photoUrl: string | null;
    location: LocationType
}

export default function NearbyPlaceItem({photoUrl, placeName}: Props) {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: photoUrl || "" }} />
            <Text>{placeName}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
    },
    image: {
        width: 50,
        height: 50
    }
});