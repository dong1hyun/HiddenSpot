import { Image, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native"
import { PlaceType } from "../../lib/type";
import { useMapContext } from "../../context/MapContext";
import MapView from "react-native-maps";
import AntDesign from "react-native-vector-icons/AntDesign";

interface RefType {
    mapRef: React.RefObject<MapView>
}

export default function BottomSliderPlaceItem({ photoUrl, placeName, location, formattedAddress, mapRef, likeCount }: PlaceType & RefType) {
    const {setMapPressed, setModalVisible} = useMapContext();
    const onPlacePress = () => {
        setLocation(location);
        mapRef?.current?.animateToRegion({
            ...location,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
        });
        if(likeCount) { // 추천 게시물인 경우(좋아요가 존재하면 추천게시물)
            setMapPressed(false);
        }
        else setMapPressed(true);
    }
    const { setLocation } = useMapContext();
    return (
        <TouchableOpacity onPress={onPlacePress} style={styles.container}>
            <Image style={styles.image} source={photoUrl ? { uri: photoUrl } : require("../../assets/alt.jpg")} />
            <View style={styles.textContainer}>
                <Text>{placeName}</Text>
                <Text style={styles.address} numberOfLines={2} ellipsizeMode="tail">{formattedAddress}</Text>
            </View>
            {
                likeCount &&
                <View style={styles.likeContainer}>
                    <AntDesign name="heart" />
                    <Text>{likeCount}</Text>
                </View>
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        padding: 10,
        backgroundColor: "white",
        borderRadius: 16,
        elevation: 2,
        gap: 10,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 16
    },
    textContainer: {
        flex: 1,
    },
    address: {
        fontSize: 12,
        color: "gray"
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