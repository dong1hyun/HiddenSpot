import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
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
                    <View key={link.title} style={styles.LinkContainer}>
                        <FontAwesome style={styles.icon} name={link.icon} />
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("PlaceList", {
                                    type: link.type
                                });
                            }}
                        >
                            <Text style={styles.name}>
                                {link.title}
                            </Text>
                        </TouchableOpacity>
                    </View>
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
        fontSize: 20,
    },
    icon: {
        fontSize: 24,
    }
})