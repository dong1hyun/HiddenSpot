import { Dimensions, StyleSheet, View } from "react-native"
import FontAwesome from "react-native-vector-icons/FontAwesome";

const { width } = Dimensions.get('window');
export default function PlaceDetailLoadingScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.image} />
            <View style={styles.contentContainer}>
                <View style={styles.uerContainer}>
                    <FontAwesome style={styles.userIcon} name="user-circle-o" />
                </View>
                <View style={styles.gap}>
                    <View style={[styles.content, { width: 200 }]} />
                    <View style={[styles.content, { width: 50 }]} />
                    <View style={[styles.content, { width: 100 }]} />
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 36,
    },
    image: {
        height: width * 2 / 3,
        width: "100%",
        backgroundColor: "#b2bec3"
    },
    contentContainer: {
        flex: 1,
        padding: 16,
    },
    uerContainer: {
        flexDirection: 'row',
        alignItems: "center",
        gap: 10,
        borderBottomWidth: 2,
        borderBottomColor: "#dfe6e9",
        paddingBottom: 8,
        marginBottom: 12,
    },
    userIcon: {
        fontSize: 50,
        color: "#b2bec3"
    },
    content: {
        backgroundColor: "#dfe6e9",
        borderRadius: 12,
        height: 20,
    },
    gap: {
        gap: 8
    }
})