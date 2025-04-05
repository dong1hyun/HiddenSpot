import { Image, Text, TouchableOpacity } from "react-native";
import { StyleSheet, View } from "react-native";
import { HomePlaceType, PostResponseType, RootStackParamList } from "../../lib/type";
import { getRelativeTime } from "../../util/date";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import AntDesign from "react-native-vector-icons/AntDesign";

type MyPageScreenNavigationProp = StackNavigationProp<RootStackParamList, "HomeNavigator">;

export default function MyPagePlaceItem({ placeData }: { placeData: HomePlaceType }) {
    const { id, title, address, created_at, photoUrl, likeCount, user: {nickName} } = placeData;
    const navigation = useNavigation<MyPageScreenNavigationProp>();
    return (
        <TouchableOpacity onPress={() => navigation.navigate(
            "HomeNavigator", {
            screen: "PlaceDetail",
            params: {
                id
            }
        })} style={styles.container}>
            <Image style={styles.image} source={{ uri: photoUrl }} />
            <View style={{flex: 1}}>
                <Text style={styles.title}>{title}</Text>
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.address}>{address}</Text>
                <Text style={styles.nickName}>{nickName}</Text>
            </View>
            <View style={styles.likeContainer}>
                <AntDesign name="heart" />
                <Text>{likeCount}</Text>
            </View>
            <Text style={styles.time}>{getRelativeTime(created_at.toString())}</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        position: "relative",
        flex: 1,
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#dfe6e9",
        padding: 12,
        marginTop: 12,
        marginBottom: 16,
        gap: 12,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    time: {
        position: "absolute",
        color: "gray",
        fontSize: 12,
        right: 5,
    },
    title: {
        fontWeight: "bold",
        fontSize: 16
    },
    address: {
        fontSize: 12,
        color: "gray",
    },
    nickName: {
        fontWeight: "500",
        marginTop: 8
    },
    likeContainer: {
        position: "absolute",
        right: 12,
        bottom: 6,
        flexDirection: "row",
        alignItems: "center",
        gap: 6
    },
});