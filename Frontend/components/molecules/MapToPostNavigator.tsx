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

export default function MapToPostNavigator({address, latitude, longitude}: Props) {
    const {setMapPressed} = useMapContext();
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
            <Text>선택된 장소를 소개해보세요.</Text>
            <Text>{address}</Text>
            <View style={styles.buttons}>
                <Button
                    buttonStyle={{ backgroundColor: "#74b9ff", borderWidth: 0, paddingVertical: 4 }}
                    onPress={onAddPress}>
                    확인
                </Button>
                <Button
                    buttonStyle={{ backgroundColor: "#ff7675", borderWidth: 0, paddingVertical: 4 }}
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
        gap: 10
    },
    buttons: {
        flexDirection: "row",
        gap: 10
    }
});