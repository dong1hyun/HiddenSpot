import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AuthStore from "../../store/AuthStore";
import { StackNavigationProp } from "@react-navigation/stack";
import { MyPageStackParamList } from "../../lib/type";
import { useNavigation } from "@react-navigation/native";
import ProfileImage from "../atoms/ProfileImage";

type MyPageNavigationProp = StackNavigationProp<MyPageStackParamList, "UserInfoUpdate">;

export default function AccountInfo() {
    const navigation = useNavigation<MyPageNavigationProp>();
    const { nickName, email } = AuthStore();
    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate("UserInfoUpdate")}>
            <View style={styles.user}>
                <ProfileImage />
                <View style={styles.userIds}>
                    <Text style={styles.nickName}>{nickName}</Text>
                    <Text style={styles.email}>{email}</Text>
                </View>
            </View>
        </TouchableOpacity>
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
        color: "gray"
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
    },
    arrowIcon: {
        fontSize: 20,
        color: "gray"
    }
});