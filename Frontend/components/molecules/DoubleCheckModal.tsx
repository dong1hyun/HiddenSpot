import ModalContainer from "../templates/ModalContainer"
import { StyleSheet, Text, View } from "react-native"
import Button from "../atoms/Button"
import { Dispatch, SetStateAction } from "react"
import FullScreenLoader from "../atoms/FullScreenLoader";

interface Props {
    modalVisible: boolean;
    setModalVisible: Dispatch<SetStateAction<boolean>>;
    execute: () => void;
    notification: string;
    buttonText: string;
}

export default function DoubleCheckModal({ modalVisible, setModalVisible, execute, buttonText, notification }: Props) {
    return (
        <ModalContainer modalVisible={modalVisible} setModalVisible={setModalVisible}>
            <View style={styles.modalContainer}>
                <Text>{notification}</Text>
                <View style={styles.buttons}>
                    <Button buttonStyle={styles.button} onPress={() => execute()}>{buttonText}</Button>
                    <Button buttonStyle={styles.button} onPress={() => setModalVisible(false)}>취소</Button>
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