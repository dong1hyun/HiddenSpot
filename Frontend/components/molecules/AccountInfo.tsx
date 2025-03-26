import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
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
            <MaterialIcons style={styles.arrowIcon} name="arrow-forward-ios" />
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
        position: "relative",
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
        position: "absolute",
        right: 10,
        top: 40,
        fontSize: 20,
        color: "gray"
    }
});