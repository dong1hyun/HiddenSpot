import { StyleSheet, Text, View } from "react-native";
import { useFavoriteMutation, useLikeMutation } from "../../util/place";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";

interface Props {
    email: string;
    placeId: number;
    favoriteCount: number;
    likeCount: number;
    isFavorited: boolean;
    isLiked: boolean;
}

export default function LikeAndFavoriteButton({ email, placeId, favoriteCount, likeCount, isFavorited, isLiked }: Props) {
    const { mutate: toggleFavorite } = useFavoriteMutation(email, placeId, isFavorited);
    const { mutate: toggleLike } = useLikeMutation(email, placeId, isLiked);
    return (
        <View style={styles.container} >
            <View style={styles.buttonContainer}>
                <AntDesign onPress={() => { toggleLike() }} name={isLiked ? "heart" : "hearto"} style={styles.heartIcon} />
                <Text>{likeCount}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <FontAwesome onPress={() => { toggleFavorite() }} name={isFavorited ? "bookmark" : "bookmark-o"} style={styles.starIcon} />
                <Text>{favoriteCount}</Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        flexDirection: "row",
        right: 0,
        gap: 24
    },
    buttonContainer: {
        flexDirection: "row",
        gap: 12
    },
    starIcon: {
        fontSize: 28,
        color: ""
    },
    heartIcon: {
        fontSize: 26,
        color: ""
    }
})