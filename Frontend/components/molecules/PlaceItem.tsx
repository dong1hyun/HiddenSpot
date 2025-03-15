import { Image, Text } from "react-native";
import { StyleSheet, View } from "react-native";
import { PostResponseType } from "../../lib/type";

export default function PlaceItem({placeData}: {placeData: PostResponseType}) {
    const {id, title, address, created_at, photoUrl} = placeData;
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: photoUrl }} />
            <View>
                <Text>
                    {title}
                </Text>
                <Text>
                    {address}
                </Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        borderBottomWidth: 2,
        borderBottomColor: "gray",
        padding: 12,
        marginBottom: 16,
        gap: 12,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 8,
    },
});