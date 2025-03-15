import { Image, Text, TouchableOpacity } from "react-native";
import { StyleSheet, View } from "react-native";
import { PostResponseType } from "../../lib/type";
import { getRelativeTime } from "../../util/date";

export default function PlaceItem({placeData}: {placeData: PostResponseType}) {
    const {id, title, address, created_at, photoUrl, nickName} = placeData;
    return (
        <TouchableOpacity style={styles.container}>
            <Image style={styles.image} source={{ uri: photoUrl }} />
            <View>
                <View style={styles.topContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.time}>{getRelativeTime(created_at.toString())}</Text>
                </View>
                <Text style={styles.address}>{address}</Text>
                <Text style={styles.nickName}>{nickName}</Text>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#dfe6e9",
        padding: 12,
        marginBottom: 16,
        gap: 12,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    topContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "88%",
        backgroundColor: "white"
    },
    time: {
        color: "gray",
        fontSize: 12
    },
    title: {
        fontWeight: "bold",
        fontSize: 16
    },
    address: {
        fontSize: 12,
        color: "gray"
    },
    nickName: {
        fontWeight: "500",
        marginTop: 8
    }
});