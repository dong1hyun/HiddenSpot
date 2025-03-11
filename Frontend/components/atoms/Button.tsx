import { ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface Props {
    children: ReactNode;
    isLoading?: boolean;
    style?: object;
    color?: string
    onPress: () => void;
}

export default function Button({ children, onPress, isLoading, style, color }: Props) {
    return (
        <TouchableOpacity
            disabled={isLoading}
            style={[styles.button, style]}
            onPress={onPress}
        >
            <Text style={[styles.text, {color}]}>
                {children}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 5,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "black",
    },
    text: {
        color: 'black',
        textAlign: 'center',
        fontWeight: "bold",
    }
});