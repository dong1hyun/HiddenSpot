import { Image, StyleSheet, Text, View } from "react-native";
import ModalContainer from "../templates/ModalContainer";
import { Dispatch, SetStateAction } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

interface Props {
    setModalVisible: Dispatch<SetStateAction<boolean>>
    modalVisible: boolean
}

export default function MapNotice({ setModalVisible, modalVisible }: Props) {
    return (
        <ModalContainer modalVisible={modalVisible} setModalVisible={setModalVisible}>
            <View style={styles.container}>
                <View style={styles.notice}>
                    <MaterialCommunityIcons style={styles.me} name="human-greeting" />
                    <View>
                        <Text style={styles.text}>나의 현재 위치를 나타내요.</Text>
                        <Text style={styles.text}>주변의 흥미로운 장소를 찾아보세요.</Text>
                    </View>
                </View>
                <View style={styles.notice}>
                    <Ionicons name="pin" style={{ fontSize: 30, color: "#ff3939" }} />
                    <View>
                        <Text style={styles.text}>지도에서 원하는 곳을 터치해서 마커를 생성할 수 있어요.</Text>
                        <Text style={styles.text}>마커커 위치에 나만 알고 있는 장소를 소개해주세요.</Text>
                    </View>
                </View>
                <View style={styles.notice}>
                    <Image style={styles.image} source={require("../../assets/alt.jpg")} />
                    <View>
                        <Text style={styles.text}>다른 사용자가 추천하는 장소에요.</Text>
                        <Text style={styles.text}>터치해서 상세정보를 살펴보세요.</Text>
                    </View>
                </View>
            </View>
        </ModalContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        gap: 60,
        paddingHorizontal: 30,
    },
    me: {
        fontSize: 24,
        color: "#0984e3",
        backgroundColor: "rgba(255, 255, 0, 0.3)",
        borderRadius: 24,
        padding: 4,
    },
    notice: {
        flexDirection: "row",
        gap: 20,
        alignItems: "center"
    },
    image: {
        height: 30,
        width: 30
    },
    text: {
        color: "white"
    }
});