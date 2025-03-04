import { ReactNode } from "react";
import { GestureResponderEvent, Pressable, StyleSheet, Text } from "react-native";

interface Props {
    children: ReactNode;
    isLoading?: boolean
    onPress:  () => void;
}

export default function Button({ children, onPress, isLoading }: Props) {
    return (
        <Pressable 
        disabled={isLoading}
        style={styles.button}
        onPress={onPress} 
        >
            <Text style={styles.text}>
                {children}
            </Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 5,
        backgroundColor: 'blue',
        borderRadius: 12
    },
    text: {
        color: 'white',
        textAlign: 'center'
    }
});