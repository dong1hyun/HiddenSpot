import { StyleSheet, Text, View } from "react-native";

export default function Error({ message }: { message: string | undefined }) {
    if(!message) return null;
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