import { StyleSheet, Text, View } from "react-native"
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function Logo() {
    return (
        <View style={styles.container}>
            <FontAwesome style={styles.icon} name="camera-retro" />
            <Text style={styles.logo}>
                Hidden Spot
            </Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5
    },
    icon: {
        fontSize: 24,
        color: "#336BDE",
    },
    logo: {
        fontSize: 24,
        color: "#336BDE",
        fontWeight: "bold"
    }
});