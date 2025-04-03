import { Image, StyleSheet, Text, View } from "react-native"

export default function Logo() {
    return (
        <View style={styles.container}>
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
    logo: {
        fontSize: 24,
        color: "#1d96ff",
        fontWeight: "bold"
    }
});