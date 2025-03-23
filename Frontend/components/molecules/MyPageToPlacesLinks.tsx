import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import { MyPageLinks } from "../../lib/const";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MyPageStackParamList } from "../../lib/type";

type MyPageNavigationProp = StackNavigationProp<MyPageStackParamList, "PlaceList">;

export default function MyPageToPlacesLinks() {
    const navigation = useNavigation<MyPageNavigationProp>();
    return (
        <View style={styles.container}>
            {
                MyPageLinks.map((link) => (
                    <TouchableOpacity
                        key={link.title}
                        style={styles.LinkContainer}
                        onPress={() => {
                            navigation.navigate("PlaceList", {
                                type: link.type,
                                headerTitle: link.title
                            });
                        }}
                    >
                        <FontAwesome style={styles.typeIcon} name={link.icon} />
                        <Text style={styles.name}>
                            {link.title}
                        </Text>
                        <Ionicons style={styles.nextIcon} name="chevron-forward" />
                    </TouchableOpacity>
                ))
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: "white",
        borderRadius: 24,
        marginTop: 24,
        gap: 24,
    },
    LinkContainer: {
        flexDirection: "row",
        alignItems: "flex-end",
        gap: 16,
    },
    name: {
        fontSize: 16,
    },
    typeIcon: {
        fontSize: 20,
    },
    nextIcon: {
        position: "absolute",
        fontSize: 16,
        right: 0
    }
})