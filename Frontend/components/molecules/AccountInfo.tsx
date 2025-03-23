import { StyleSheet, Text, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AuthStore from "../../store/AuthStore";

export default function AccountInfo() {
    const { nickName, email } = AuthStore();
    return (
        <View style={styles.container}>
            <View style={styles.user}>
                <FontAwesome style={styles.userIcon} name="user-circle-o" />
                <View style={styles.userIds}>
                    <Text style={styles.nickName}>{nickName}</Text>
                    <Text style={styles.email}>{email}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: "white",
        borderRadius: 24,
        marginTop: 24,
    },
    userIcon: {
        fontSize: 36,
    },
    userIds: {
        gap: 3
    },
    user: {
        flexDirection: "row",
        gap: 24,
        alignItems: "center"
    },
    nickName: {
        fontWeight: "bold",
        fontSize: 24,
    },
    email: {
        color: "#636e72"
    }
});