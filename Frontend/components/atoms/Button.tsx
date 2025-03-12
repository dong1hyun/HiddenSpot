import { ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface Props {
    children: ReactNode;
    disabled?: boolean;
    style?: object;
    color?: string
    onPress: () => void;
}

export default function Button({ children, onPress, disabled, style, color }: Props) {
    return (
        <TouchableOpacity
            disabled={disabled}
            style={[styles.button, disabled && {opacity: 0.5} , style]}
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