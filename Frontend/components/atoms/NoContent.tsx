import { Text } from "react-native";
import { StyleSheet, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function NoContent({text}: {text: string}) {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.text}>{text}</Text>
                <AntDesign style={styles.icon} name="meh" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12
    },
    icon: {
        fontSize: 24,
    },
    text: {
        fontSize: 20,
        fontWeight: "bold"
    }
});