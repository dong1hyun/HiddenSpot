import { ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface Props {
    children: ReactNode;
    disabled?: boolean;
    buttonStyle?: object;
    textStyle?: object
    onPress: () => void;
}

export default function Button({ children, onPress, disabled, buttonStyle, textStyle }: Props) {
    return (
        <TouchableOpacity
            disabled={disabled}
            style={[styles.button, disabled && {opacity: 0.5} , buttonStyle]}
            onPress={onPress}
        >
            <Text style={[styles.text, textStyle]}>
                {children}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 8,
        backgroundColor: "black"
    },
    text: {
        color: 'white',
        textAlign: 'center',
        fontWeight: "bold",
    }
});