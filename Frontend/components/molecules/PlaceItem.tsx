import { Image, Text, TouchableOpacity } from "react-native";
import { StyleSheet, View } from "react-native";
import { HomeStackParamList, PostResponseType } from "../../lib/type";
import { getRelativeTime } from "../../util/date";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import AntDesign from "react-native-vector-icons/AntDesign";

type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList, "Home">;

export default function PlaceItem({ placeData }: { placeData: PostResponseType }) {
    const { id, title, address, created_at, photoUrl, nickName, likeCount } = placeData;
    const navigation = useNavigation<HomeScreenNavigationProp>();
    return (
        <TouchableOpacity onPress={() => navigation.navigate("PlaceDetail", {id})} style={styles.container}>
            <Image style={styles.image} source={{ uri: photoUrl }} />
            <View>
                <View style={styles.topContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.time}>{getRelativeTime(created_at.toString())}</Text>
                </View>
                <Text style={styles.address}>{address}</Text>
                <Text style={styles.nickName}>{nickName}</Text>
            </View>
            <View style={styles.likeContainer}>
                <AntDesign name="heart" />
                <Text style={styles.likeCount}>{likeCount}</Text>
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
    },
    likeContainer: {
        position: "absolute",
        right: 3,
        bottom: 3,
        flexDirection: "row",
        alignItems: "center",
        gap: 8
    },
    likeCount: {

    },
});