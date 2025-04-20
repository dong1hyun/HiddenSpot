import { Dispatch, ReactNode, SetStateAction } from "react";
import { Modal, StyleSheet, TouchableWithoutFeedback, View } from "react-native";

interface Props {
    children: ReactNode;
    modalVisible: boolean;
    setModalVisible: Dispatch<SetStateAction<boolean>>
}

export default function ModalContainer({ children, modalVisible, setModalVisible }: Props) {
    const closeModal = () => {
        setModalVisible(false);
    }
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={closeModal}
        >
            <TouchableWithoutFeedback onPress={closeModal}>
                <View style={styles.modalContainer}>
                    <TouchableWithoutFeedback>
                        {children}
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 500
    }
})