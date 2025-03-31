import { Image, StyleSheet, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AuthStore from "../../store/AuthStore";

export default function ProfileImage({imageUrl}: {imageUrl?: string}) {
    return (
        <View>
            {imageUrl ?
                <Image style={styles.image} source={{uri: imageUrl}} resizeMode="cover" /> :
                <FontAwesome style={styles.userIcon} name="user-circle-o" />}
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        width: 50,
        height: 50,
        borderRadius: 100,
    },
    userIcon: {
        fontSize: 50,
        color: "#b2bec3"
    }
});