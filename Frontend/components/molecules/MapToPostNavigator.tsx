import { StyleSheet } from "react-native";
import { Text, View } from "react-native";
import Button from "../atoms/Button";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../lib/type";
import { useNavigation } from "@react-navigation/native";
import { useMapContext } from "../../context/MapContext";

type MapScreenNavigationProp = StackNavigationProp<RootStackParamList, "HomeNavigator">

interface Props {
    address: string;
    latitude: number;
    longitude: number;
}

export default function MapToPostNavigator({ address, latitude, longitude }: Props) {
    const { setMapPressed } = useMapContext();
    const navigation = useNavigation<MapScreenNavigationProp>();
    const onAddPress = () => {
        navigation.navigate("HomeNavigator", {
            screen: "AddPlace",
            params: {
                address,
                latitude,
                longitude
            }
        });
    }

    const onCancelPress = () => {
        setMapPressed(false);
    }

    return (
        <View style={styles.overlay}>
            <Text style={styles.title}>선택된 장소를 소개해보세요.</Text>
            <Text style={styles.address}>{address}</Text>
            <View style={styles.buttons}>
                <Button
                    buttonStyle={{ borderWidth: 0, paddingVertical: 4 }}
                    onPress={onAddPress}
                    disabled={!address}
                >
                    확인
                </Button>
                <Button
                    buttonStyle={{ borderWidth: 0, paddingVertical: 4 }}
                    onPress={onCancelPress}>
                    취소
                </Button>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 50,
        left: 0,
        right: 0,
        zIndex: 20,
        backgroundColor: "white",
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        opacity: 0.8
    },
    title: {
        fontWeight: "bold"
    },
    address: {
        color: "#636e72",
        fontSize: 12
    },
    buttons: {
        flexDirection: "row",
        gap: 30
    }
});