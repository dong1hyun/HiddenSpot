import { Control, Controller, FieldValues, Path, RegisterOptions } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

interface Props<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    placeHolder: string;
    rules?: RegisterOptions<T>;
    invisible: boolean,
    label: string
}

export default function InputWithLabel<T extends FieldValues>({ control, name, rules, placeHolder, invisible, label }: Props<T>) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{label}</Text>
            <Controller
                control={control}
                name={name}
                rules={rules}
                render={({ field: { value, onChange } }) => (
                    <TextInput
                        style={styles.text}
                        placeholder={placeHolder}
                        value={value}
                        onChangeText={onChange}
                        secureTextEntry={invisible}
                    />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // marginHorizontal: 20,
        marginVertical: 10
    },
    title: {
        marginBottom: 5
    },
    text: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 8
    }
});