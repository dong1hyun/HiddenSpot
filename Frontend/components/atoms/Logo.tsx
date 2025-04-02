import { Image, StyleSheet, Text, View } from "react-native"

export default function Logo() {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require("../../assets/logo.png")} />
            <Text style={styles.logo}>
                HiddenSpot
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
    image: {
        width: 40,
        height: 40, 
    },
    logo: {
        fontSize: 24,
        color: "#329fff",
        fontWeight: "bold"
    }
});