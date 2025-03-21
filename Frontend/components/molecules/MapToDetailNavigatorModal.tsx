import { Dispatch, SetStateAction } from "react";
import ModalContainer from "../templates/ModalContainer";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useMapContext } from "../../context/MapContext";
import { View } from "react-native";
import { RootStackParamList } from "../../lib/type";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

const {width} = Dimensions.get("window");
type MapScreenNavigationProp = StackNavigationProp<RootStackParamList, "HomeNavigator">

export default function MapToDetailNavigatorModal() {
    const { modalVisible, setModalVisible, photoUrl, title, id } = useMapContext();
    const navigation = useNavigation<MapScreenNavigationProp>();
    const onDetailPress = () => {
        setModalVisible(false);
        navigation.navigate("HomeNavigator", {
            screen: "PlaceDetail",
            params: {
                id
            }
        });
    }
    return (
        <ModalContainer modalVisible={modalVisible} setModalVisible={setModalVisible}>
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>
                <Image style={styles.image} source={{ uri: photoUrl }} />
                <TouchableOpacity onPress={onDetailPress} style={styles.content}>
                    <Text>상세정보 보러가기</Text>
                </TouchableOpacity>
            </View>
        </ModalContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        zIndex: 10,
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
    },
    title: {
        fontSize: 36, 
        fontWeight: "300",
    },
    image: {
        height: width * 4 / 5,
        width: width * 4 / 5,
        borderRadius: 24,
    },
    content: {
        backgroundColor: "white",
        padding: 16,
        borderRadius: 24,
        gap: 12,
    },
    buttonContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8
    }
})