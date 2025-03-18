import { StyleSheet, View } from "react-native"
import { HomeStackParamList, PostResponseType } from "../../lib/type"
import Button from "../atoms/Button"
import { Dispatch, SetStateAction } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

interface Props {
    id: number;
    data: PostResponseType;
    setModalVisible: Dispatch<SetStateAction<boolean>>;
}

type PlaceDetailScreenNavigationProp = StackNavigationProp<HomeStackParamList>;

export default function EditButtons({ id, data, setModalVisible }: Props) {
    const navigation = useNavigation<PlaceDetailScreenNavigationProp>();

    return (
        <View style={styles.editButtonContainer}>
            <Button
                buttonStyle={[styles.button, { backgroundColor: "#74b9ff" }]}
                textStyle={styles.buttonText}
                onPress={() => navigation.navigate("AddPlace", {
                    id: data.id,
                    address: data.address,
                    latitude: data.latitude,
                    longitude: data.longitude,
                    title: data.title,
                    description: data.description,
                    photoUrl: data.photoUrl,
                })}
            >
                수정
            </Button>
            <Button
                buttonStyle={[styles.button, { backgroundColor: "red" }]}
                textStyle={styles.buttonText}
                onPress={() => { setModalVisible(true) }}
            >
                삭제
            </Button>
        </View>
    )
};

const styles = StyleSheet.create({
    editButtonContainer: {
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        padding: 10,
        alignItems: 'center',
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-around",
        elevation: 12
    },
    button: {
        backgroundColor: "black",
        paddingHorizontal: 24,
        paddingVertical: 4,
        borderRadius: 8
    },
    buttonText: {
        color: "white",
        fontWeight: "bold"
    }
});