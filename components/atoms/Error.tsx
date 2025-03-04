import { StyleSheet, Text, View } from "react-native";

export default function Error({ message }: { message: string }) {
    return (
        <View>
            <Text style={styles.text}>{message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    text: {
        color: "red"
    }
});