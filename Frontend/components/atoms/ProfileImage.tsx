import { Image, StyleSheet, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AuthStore from "../../store/AuthStore";

export default function ProfileImage() {
    const { profileImageUrl } = AuthStore();
    return (
        <View>
            {profileImageUrl ?
                <Image style={styles.image} source={{uri: profileImageUrl}} resizeMode="cover" /> :
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