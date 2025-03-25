import { Alert, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import * as Clipboard from "expo-clipboard";

export default function TextCopyButton({ text, style }: { text: string | undefined, style?: object}) {
    const onCopyPress = async () => {
        if (!text) return;
        await Clipboard.setStringAsync(text);
        Alert.alert("알림", "주소 복사 완료!");
    }
    return (
        <TouchableOpacity style={style} onPress={onCopyPress}>
            <FontAwesome6 style={styles.icon} name="copy" />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    icon: {
        fontSize: 20,
        paddingHorizontal: 10
    }
});