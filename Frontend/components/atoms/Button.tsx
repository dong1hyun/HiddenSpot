import { ReactNode } from "react";
import { GestureResponderEvent, Pressable, StyleSheet, Text } from "react-native";

interface Props {
    children: ReactNode,
    onPress:  () => void;
}

export default function Button({ children, onPress }: Props) {
    return (
        <Pressable 
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