import ModalContainer from "../templates/ModalContainer"
import { StyleSheet, Text, View } from "react-native"
import Button from "../atoms/Button"
import { Dispatch, SetStateAction } from "react"
import queryClient from "../../util/queryClient"
import { API_URL } from "@env"
import { deleteData } from "../../util/fetch"
import { StackNavigationProp } from "@react-navigation/stack"
import { HomeStackParamList } from "../../lib/type"
import { useNavigation } from "@react-navigation/native"

interface Props {
    id: number;
    modalVisible: boolean;
    setModalVisible: Dispatch<SetStateAction<boolean>>;
    setDeleteLoading: Dispatch<SetStateAction<boolean>>;
}

type PlaceDetailScreenNavigationProp = StackNavigationProp<HomeStackParamList>;

export default function PlaceDeleteModal({id, modalVisible, setModalVisible, setDeleteLoading}: Props) {
    const navigation = useNavigation<PlaceDetailScreenNavigationProp>();
    const deletePlace = async () => {
        try {
            setDeleteLoading(true);
            await deleteData(`${API_URL}/place/${id}`);
            setModalVisible(false);
            queryClient.invalidateQueries({queryKey: ['places']});
            navigation.navigate("Home");
        } catch(error) {
            console.error("장소 제거 에러", error);
        } finally {
            setDeleteLoading(false);
        }
    };
    return (
        <ModalContainer modalVisible={modalVisible} setModalVisible={setModalVisible}>
            <View style={styles.modalContainer}>
                <Text>정말 삭제하시겠습니까?</Text>
                <View style={styles.buttons}>
                    <Button buttonStyle={styles.button} onPress={() => setModalVisible(false)}>취소</Button>
                    <Button buttonStyle={styles.button} onPress={() => { deletePlace() }}>확인</Button>
                </View>
            </View>
        </ModalContainer>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: "white",
        gap: 12,
        padding: 32,
        borderRadius: 24,
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 32,
    },
    button: {
        paddingHorizontal: 12
    },
})