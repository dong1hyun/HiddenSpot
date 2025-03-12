import { Control, Controller, FieldValues, Path, RegisterOptions } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

interface Props<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    placeHolder: string;
    rules?: RegisterOptions<T>;
    invisible?: boolean;
    multiline?: boolean;
    style?: object;
    label: string;
}

export default function InputWithLabel<T extends FieldValues>({ control, name, rules, placeHolder, invisible, label, multiline, style }: Props<T>) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{label}</Text>
            <Controller
                control={control}
                name={name}
                rules={rules}
                render={({ field: { value, onChange } }) => (
                    <TextInput
                        style={[styles.text, style]}
                        placeholder={placeHolder}
                        value={value}
                        onChangeText={onChange}
                        secureTextEntry={invisible || false}
                        multiline={multiline || false}
                        textAlignVertical="top"
                        textAlign="left"
                    />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10
    },
    title: {
        marginBottom: 5
    },
    text: {
        borderColor: '#dfe6e9',
        borderWidth: 2,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 8
    }
});