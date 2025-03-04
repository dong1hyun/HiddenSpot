import { StyleSheet, Text, View } from "react-native";

export default function LoadingOverlay() {
    return (
        <View style={styles.loadingOverlay}>
            <Text>Loading...</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        zIndex: 1,
    },
});