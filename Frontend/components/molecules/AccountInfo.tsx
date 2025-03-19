import { Pressable, StyleSheet, Text, View } from "react-native";
import { supabase } from "../../lib/supabase";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AuthStore from "../../store/AuthStore";

export default function AccountInfo() {
    const { nickName, email } = AuthStore();
    return (
        <View style={styles.container}>
            <View style={styles.user}>
                <FontAwesome style={styles.userIcon} name="user-circle-o" />
                <Text style={styles.nickName}>{nickName}</Text>
            </View>
            <Pressable onPress={() => supabase.auth.signOut()}><Text>로그아웃</Text></Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: "white",
        borderRadius: 24,
    },
    userIcon: {
        fontSize: 36,
    },
    user: {
        flexDirection: "row",
        gap: 12,
    },
    nickName: {
        fontWeight: "bold",
        fontSize: 24,
    }
});